import type { LeadStatus } from "@/app/components/sales/leads/LeadStatusDropdown";

const statusLabels: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  REPLIED: "Replied",
  INTERESTED: "Interested",
  MEETING_BOOKED: "Meeting Booked",
  QUALIFIED: "Qualified",
  CONVERTED: "Converted",
  LOST: "Lost",
};

const styles: Record<LeadStatus, string> = {
  NEW: "bg-blue-400/10 text-blue-300 border-blue-400/20",
  CONTACTED: "bg-yellow-400/10 text-yellow-300 border-yellow-400/20",
  REPLIED: "bg-purple-400/10 text-purple-300 border-purple-400/20",
  INTERESTED: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
  MEETING_BOOKED:
    "bg-orange-400/10 text-orange-300 border-orange-400/20",
  QUALIFIED:
    "bg-[#65FFAD]/10 text-[#65FFAD] border-[#65FFAD]/20",
  CONVERTED:
    "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  LOST: "bg-red-400/10 text-red-300 border-red-400/20",
};

export default function LeadStatusBadge({
  status,
}: {
  status: LeadStatus;
}) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}