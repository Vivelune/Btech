export type LeadStatus =
  | "New"
  | "Contacted"
  | "Replied"
  | "Interested"
  | "Meeting Booked"
  | "Qualified"
  | "Converted";

export type LeadPriority = "Low" | "Medium" | "High";

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  status: LeadStatus;
  priority: LeadPriority;
  service: string;
  lastActivity: string;
  assignedTo: string;
};

export const pipelineStatuses: LeadStatus[] = [
  "New",
  "Contacted",
  "Replied",
  "Interested",
  "Meeting Booked",
  "Qualified",
  "Converted",
];

export const demoLeads: Lead[] = [
  {
    id: "LEAD-001",
    name: "Alhaji Kamara",
    company: "Kamara Trading",
    email: "alhaji@kamaratrading.com",
    phone: "+232 76 123456",
    website: "https://kamaratrading.com",
    status: "New",
    priority: "High",
    service: "Web Design",
    lastActivity: "Today",
    assignedTo: "Alhaji",
  },
  {
    id: "LEAD-002",
    name: "Mohamed Bangura",
    company: "Bangura Construction",
    email: "mohamed@banguraconstruction.com",
    phone: "+232 77 234567",
    website: "https://banguraconstruction.com",
    status: "Contacted",
    priority: "Medium",
    service: "Digital Marketing",
    lastActivity: "Yesterday",
    assignedTo: "Alhaji",
  },
  {
    id: "LEAD-003",
    name: "Fatmata Sesay",
    company: "Sesay Enterprises",
    email: "fatmata@sesayenterprises.com",
    phone: "+232 78 345678",
    website: "https://sesayenterprises.com",
    status: "Replied",
    priority: "High",
    service: "SEO",
    lastActivity: "2 days ago",
    assignedTo: "Alhaji",
  },
  {
    id: "LEAD-004",
    name: "Abdul Conteh",
    company: "Conteh Logistics",
    email: "abdul@contehlogistics.com",
    phone: "+232 76 456789",
    website: "https://contehlogistics.com",
    status: "Interested",
    priority: "High",
    service: "Web Design",
    lastActivity: "3 days ago",
    assignedTo: "Alhaji",
  },
  {
    id: "LEAD-005",
    name: "Isata Koroma",
    company: "Koroma Fashion",
    email: "isata@koromafashion.com",
    phone: "+232 77 567890",
    website: "https://koromafashion.com",
    status: "Meeting Booked",
    priority: "Medium",
    service: "Social Media",
    lastActivity: "4 days ago",
    assignedTo: "Alhaji",
  },
  {
    id: "LEAD-006",
    name: "Ibrahim Turay",
    company: "Turay Properties",
    email: "ibrahim@turayproperties.com",
    phone: "+232 78 678901",
    website: "https://turayproperties.com",
    status: "Qualified",
    priority: "High",
    service: "Digital Marketing",
    lastActivity: "5 days ago",
    assignedTo: "Alhaji",
  },
  {
    id: "LEAD-007",
    name: "Mariama Jalloh",
    company: "Jalloh Pharmacy",
    email: "mariama@jallohpharmacy.com",
    phone: "+232 76 789012",
    website: "https://jallohpharmacy.com",
    status: "Converted",
    priority: "High",
    service: "Web Design",
    lastActivity: "1 week ago",
    assignedTo: "Alhaji",
  },
];