
// Sample data — replace with a Prisma query (e.g. prisma.lead.findMany())

import { Lead } from "./leads";

// once contact form submissions are written to the database.
export const leads: Lead[] = [
  {
    id: "1",
    name: "Amb Hassan Conteh MOCK",
    email: "hassan@btech.com",
    service: "Web Development",
    message:
      "We need a modern company website with a blog and contact form integration. Timeline is 6 weeks.",
    submittedAt: "2026-08-04T10:15:00Z",
    status: "NEW",
  },
  {
    id: "2",
    name: "Fatmata Kamara MOCK",
    email: "fatmata@agrimarket.sl",
    service: "App Development",
    message:
      "Looking for a mobile app to connect farmers directly with buyers across Sierra Leone.",
    submittedAt: "2026-08-02T14:30:00Z",
    status: "CONTACTED",
  },
  {
    id: "3",
    name: "Ibrahim Sesay MOCK",
    email: "ibrahim@example.com",
    service: "Digital Marketing",
    message:
      "We want to run a social media campaign for our new product launch next month.",
    submittedAt: "2026-07-28T09:00:00Z",
    status: "CONTACTED",
  },
];

export function getLeadById(id: string): Lead | undefined {
  return leads.find((lead) => lead.id === id);
}