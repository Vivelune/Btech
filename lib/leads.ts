export type LeadStatus = "NEW" | "CONTACTED" | "CONVERTED" | "ARCHIVED";

export interface Lead {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  submittedAt: string; // ISO date string
  status: LeadStatus;
}