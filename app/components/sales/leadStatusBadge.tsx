import type { LeadStatus } from "@/lib/sale-data";

export default function LeadStatusBadge({
  status,
}: {
  status: LeadStatus;
}) {
  const styles: Record<LeadStatus, string> = {
    New: "bg-blue-400/10 text-blue-300 border-blue-400/20",
    Contacted: "bg-yellow-400/10 text-yellow-300 border-yellow-400/20",
    Replied: "bg-purple-400/10 text-purple-300 border-purple-400/20",
    Interested: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
    "Meeting Booked":
      "bg-orange-400/10 text-orange-300 border-orange-400/20",
    Qualified:
      "bg-[#65FFAD]/10 text-[#65FFAD] border-[#65FFAD]/20",
    Converted:
      "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}