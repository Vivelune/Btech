import prisma from "./prisma";
import { Lead } from "./leads";

// Converts a Prisma Lead row (submittedAt: Date) into the client-safe
// Lead shape used by the admin UI (submittedAt: ISO string).
function toLead(row: {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  submittedAt: Date;
  status: Lead["status"];
}): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    service: row.service,
    message: row.message,
    submittedAt: row.submittedAt.toISOString(),
    status: row.status,
  };
}

export async function getLeads(): Promise<Lead[]> {
  console.log("STEP 1: about to query");
  const rows = await prisma.lead.findMany({
    orderBy: { submittedAt: "desc" },
  });
  console.log("STEP 2: query finished, count =", rows.length);
  console.log("STEP 3: raw rows =", JSON.stringify(rows, null, 2));
  return rows.map(toLead);
}

export async function getLeadById(id: string): Promise<Lead | undefined> {
  const row = await prisma.lead.findUnique({ where: { id } });
  return row ? toLead(row) : undefined;
}
