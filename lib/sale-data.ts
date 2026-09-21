export const leadStatuses = [
  "New",
  "Contacted",
  "Replied",
  "Interested",
  "Meeting Booked",
  "Qualified",
  "Converted",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export type SalesLead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  status: LeadStatus;
  source: string;
  lastActivity: string;
  assignedTo: string;
};

export const salesLeads: SalesLead[] = [
  {
    id: "lead-001",
    name: "Alhaji Kamara",
    company: "Kamara Construction",
    email: "alhaji@example.com",
    phone: "+232 76 646 2222",
    website: "https://example.com",
    status: "New",
    source: "Website",
    lastActivity: "Today",
    assignedTo: "Alhaji",
  },
  {
    id: "lead-002",
    name: "Mohamed Conteh",
    company: "Conteh Enterprises",
    email: "mohamed@example.com",
    phone: "+232 77 000 000",
    website: "https://example.com",
    status: "Contacted",
    source: "Facebook",
    lastActivity: "Yesterday",
    assignedTo: "Alhaji",
  },
  {
    id: "lead-003",
    name: "Sarah Johnson",
    company: "Johnson Digital",
    email: "sarah@example.com",
    phone: "+232 78 000 000",
    website: "https://example.com",
    status: "Interested",
    source: "Referral",
    lastActivity: "2 days ago",
    assignedTo: "Alhaji",
  },
  {
    id: "lead-004",
    name: "Ibrahim Bangura",
    company: "Bangura Trading",
    email: "ibrahim@example.com",
    phone: "+232 76 111 111",
    website: "https://example.com",
    status: "Meeting Booked",
    source: "Website",
    lastActivity: "3 days ago",
    assignedTo: "Alhaji",
  },
  {
    id: "lead-005",
    name: "Fatmata Sesay",
    company: "Sesay Holdings",
    email: "fatmata@example.com",
    phone: "+232 77 222 222",
    website: "https://example.com",
    status: "Qualified",
    source: "Instagram",
    lastActivity: "4 days ago",
    assignedTo: "Alhaji",
  },
  {
    id: "lead-006",
    name: "Abdul Kamara",
    company: "AK Solutions",
    email: "abdul@example.com",
    phone: "+232 78 333 333",
    website: "https://example.com",
    status: "Converted",
    source: "Referral",
    lastActivity: "1 week ago",
    assignedTo: "Alhaji",
  },
];