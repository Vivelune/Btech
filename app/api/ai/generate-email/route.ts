
import { NextRequest, NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";
import prisma from "@/lib/prisma";
import { requireStaff } from "@/lib/requireStaff";
import { logActivity } from "@/lib/activity";

function canAccess(
  user: { role: string; id: number },
  lead: { assignedToId: number | null }
) {
  return user.role === "ADMIN" || lead.assignedToId === user.id;
}

const MODEL =
  process.env.GEMINI_MODEL || "gemini-flash-latest";

function isTransientGeminiError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return (
    message.includes("503") ||
    message.includes("UNAVAILABLE") ||
    message.includes("429") ||
    message.includes("RESOURCE_EXHAUSTED")
  );
}

async function generateWithRetry(
  params: Parameters<typeof gemini.models.generateContent>[0],
  { maxAttempts = 3, baseDelayMs = 800 } = {}
) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await gemini.models.generateContent(params);
    } catch (err) {
      lastError = err;

      const isLastAttempt = attempt === maxAttempts;
      if (!isTransientGeminiError(err) || isLastAttempt) {
        throw err;
      }

      // 800ms, 1600ms, ... — 503/429 from Gemini are usually resolved
      // within a couple of seconds of temporary overload on their end.
      const delay = baseDelayMs * 2 ** (attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireStaff();

    if (!user) {
      return response!;
    }

    const body = await req.json().catch(() => null);

    if (
      !body ||
      typeof body.leadId !== "string" ||
      typeof body.prompt !== "string" ||
      !body.prompt.trim()
    ) {
      return NextResponse.json(
        {
          error: "leadId and prompt are required",
        },
        {
          status: 400,
        }
      );
    }

    const lead = await prisma.lead.findUnique({
      where: {
        id: body.leadId,
      },
    });

    if (!lead) {
      return NextResponse.json(
        {
          error: "Lead not found",
        },
        {
          status: 404,
        }
      );
    }

    if (!canAccess(user, lead)) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const context = `
Lead name: ${lead.name}
Service interested in: ${lead.service || "Not specified"}
Original inquiry message: ${lead.message}
Pipeline status: ${lead.status}
Priority: ${lead.priority}
Tags: ${lead.tags.join(", ") || "none"}
Internal notes: ${lead.notes || "none"}
`.trim();

    const instructions = `
You are writing a personalized outreach email on behalf of a business.

Write the email specifically for the lead below. Do not write a generic email.

Follow the sender's custom instructions exactly for:
- tone
- angle
- purpose
- call to action

Lead context:
${context}

Sender's instructions:
${body.prompt.trim()}

Return only a JSON object containing:
1. subject
2. body

The body must be HTML suitable for sending directly as an email.

Do not use placeholders such as [Your Name].
Unless the sender's instructions specify another signature, sign off as:
The Team
`.trim();

    let result: Awaited<ReturnType<typeof gemini.models.generateContent>>;
    try {
      result = await generateWithRetry({
        model: MODEL,
        contents: instructions,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              subject: { type: "string" },
              body: { type: "string" },
            },
            required: ["subject", "body"],
          },
        },
      });
    } catch (err) {
      console.error("Gemini email generation failed:", err);
      return NextResponse.json(
        {
          error: isTransientGeminiError(err)
            ? "The AI service is temporarily overloaded. Please try again in a moment."
            : err instanceof Error
              ? err.message
              : "AI generation failed",
        },
        { status: 502 }
      );
    }

    const rawText = result.text?.trim();

    if (!rawText) {
      console.error("Gemini returned an empty response.");

      return NextResponse.json(
        {
          error: "AI returned an empty response",
        },
        {
          status: 502,
        }
      );
    }

    let parsed: {
      subject: string;
      body: string;
    };

    try {
      let jsonText = rawText;

      // Remove markdown code fences if Gemini ever returns them.
      if (jsonText.startsWith("```")) {
        jsonText = jsonText
          .replace(/^```(?:json)?\s*/i, "")
          .replace(/\s*```$/i, "")
          .trim();
      }

      parsed = JSON.parse(jsonText);
    } catch (err) {
      console.error(
        "Failed to parse Gemini response:",
        rawText,
        err
      );

      return NextResponse.json(
        {
          error: "AI returned an unexpected format",
        },
        {
          status: 502,
        }
      );
    }

    if (
      !parsed ||
      typeof parsed.subject !== "string" ||
      typeof parsed.body !== "string" ||
      !parsed.subject.trim() ||
      !parsed.body.trim()
    ) {
      return NextResponse.json(
        {
          error: "AI response is missing subject or body",
        },
        {
          status: 502,
        }
      );
    }

    try {
      await logActivity({
        leadId: lead.id,
        userId: user.id,
        type: "ai_email_generated",
        detail: `Prompt: "${body.prompt.trim().slice(0, 200)}"`,
      });
    } catch (err) {
      // Do not fail a successful AI generation just because
      // activity logging failed.
      console.error(
        "Failed to log AI email activity:",
        err
      );
    }

    return NextResponse.json(
      {
        subject: parsed.subject.trim(),
        body: parsed.body.trim(),
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(
      "AI email route error:",
      err
    );

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unexpected server error",
      },
      {
        status: 500,
      }
    );
  }
}