
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

    let result;

    const MAX_RETRIES = 3;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        result = await gemini.models.generateContent({
          model: MODEL,
          contents: instructions,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "object",
              properties: {
                subject: {
                  type: "string",
                },
                body: {
                  type: "string",
                },
              },
              required: ["subject", "body"],
            },
          },
        });

        // Gemini succeeded, so stop retrying.
        break;
      } catch (err) {
        console.error(
          `Gemini generation attempt ${attempt}/${MAX_RETRIES} failed:`,
          err
        );

        const errorStatus =
          typeof err === "object" &&
          err !== null &&
          "status" in err
            ? (err as { status?: number }).status
            : undefined;

        // Only retry temporary service-unavailable errors.
        if (errorStatus !== 503 || attempt === MAX_RETRIES) {
          return NextResponse.json(
            {
              error:
                errorStatus === 503
                  ? "The AI service is temporarily busy. Please try again in a moment."
                  : err instanceof Error
                    ? err.message
                    : "AI generation failed",
            },
            {
              status: errorStatus === 503 ? 503 : 502,
            }
          );
        }

        // Wait before retrying:
        // Attempt 1 -> 1.5 seconds
        // Attempt 2 -> 3 seconds
        const delay = attempt * 1500;

        await new Promise((resolve) =>
          setTimeout(resolve, delay)
        );
      }
    }

    // Make sure Gemini actually returned a result.
    if (!result) {
      return NextResponse.json(
        {
          error:
            "AI generation failed. No response was received.",
        },
        {
          status: 502,
        }
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