import { NextRequest, NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import prisma from "@/lib/prisma";
import { requireStaff } from "@/lib/requireStaff";
import { logActivity } from "@/lib/activity";

const VALID_PRIORITIES = ["LOW", "MEDIUM", "HIGH"];
const VALID_TAGS = ["Web Development", "SEO", "E-commerce", "Maintenance"];

/**
 * Expected CSV columns (header row required): name, email.
 * Optional: company, phone, website, service, message,
 * priority (LOW/MEDIUM/HIGH), tags (semicolon-separated, matching
 * VALID_TAGS), estimatedValue (plain number).
 *
 * ADMIN and SALES_REP can both use this. Sales reps' imported leads are
 * auto-assigned to themselves (same pattern as single-lead creation in
 * app/api/leads/route.ts) — they can't bulk-import leads for anyone else.
 */
export async function POST(req: NextRequest) {
  const { user, response } = await requireStaff();
  if (!user) return response!;

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json(
      { error: "Upload a CSV file under the 'file' field" },
      { status: 400 }
    );
  }

  const text = await file.text();

  let rows: Record<string, string>[];
  try {
    rows = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
  } catch {
    return NextResponse.json({ error: "Could not parse CSV" }, { status: 400 });
  }

  let imported = 0;
  const errors: string[] = [];

  for (const [i, row] of rows.entries()) {
    const rowNumber = i + 2; // +1 for header row, +1 for 1-indexing

    if (!row.name || !row.email) {
      errors.push(`Row ${rowNumber}: missing required name/email`);
      continue;
    }

    const tags = row.tags
      ? row.tags
          .split(";")
          .map((t) => t.trim())
          .filter((t) => VALID_TAGS.includes(t))
      : [];

    const upperPriority = (row.priority ?? "").toUpperCase();
    const priority = VALID_PRIORITIES.includes(upperPriority)
      ? upperPriority
      : "MEDIUM";

    const parsedValue = row.estimatedValue ? Number(row.estimatedValue) : null;
    const estimatedValue =
      parsedValue !== null && !Number.isNaN(parsedValue) ? parsedValue : null;

    try {
      const lead = await prisma.lead.create({
        data: {
          name: row.name,
          email: row.email,
          company: row.company || null,
          phone: row.phone || null,
          website: row.website || null,
          service: row.service || null,
          message: row.message ?? "",
          priority: priority as "LOW" | "MEDIUM" | "HIGH",
          tags,
          estimatedValue,
          // Sales reps can only ever bulk-import leads assigned to
          // themselves — same rule as single-lead creation.
          assignedToId: user.role === "SALES_REP" ? user.id : null,
        },
      });

      await logActivity({
        leadId: lead.id,
        userId: user.id,
        type: "lead_created",
        detail: "Imported via CSV",
      });

      imported++;
    } catch {
      errors.push(`Row ${rowNumber}: failed to save (${row.email})`);
    }
  }

  return NextResponse.json({ imported, skipped: errors.length, errors });
}