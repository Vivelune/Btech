export type LeadStatus = | "NEW" | "CONTACTED" | "REPLIED" | "INTERESTED" | "MEETING_BOOKED" | "QUALIFIED" | "CONVERTED" | "LOST";

export interface Lead {
  id: string;
  name: string;
  email: string;
  service: string | null;
  message: string;
  submittedAt: string; // ISO date string
  status: LeadStatus;
}