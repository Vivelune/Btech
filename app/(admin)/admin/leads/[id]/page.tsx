
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Briefcase,
  Calendar,
  MessageSquare,
} from "lucide-react";
import prisma from "@/lib/prisma";

const statusStyles: Record<string, string> = {
  NEW: "bg-green-100 text-green-700",
  CONTACTED: "bg-blue-100 text-blue-700",
  CONVERTED: "bg-emerald-100 text-emerald-800",
  ARCHIVED: "bg-gray-100 text-gray-600",
};

export default async function LeadDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
<<<<<<< Updated upstream
  const lead = await getLeadById(id);
=======
>>>>>>> Stashed changes

  const lead = await prisma.lead.findUnique({
    where: {
      id,
    },
  });

  if (!lead) {
    notFound();
  }

  const formattedDate = new Date(lead.submittedAt).toLocaleString(
    "en-GB",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );

  return (
    <main className="min-h-screen bg-white px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/admin/leads"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#3a9e5f] transition-colors hover:text-[#0a1f14]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Lead Management
        </Link>

        <div className="overflow-hidden rounded-2xl border border-green-100 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#0a1f14] px-8 py-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4ade80]">
                Lead Details
              </p>

              <h1 className="mt-1 text-2xl font-bold text-white">
                {lead.name}
              </h1>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[lead.status] ?? "bg-gray-100 text-gray-600"}`}
            >
              {lead.status}
            </span>
          </div>

          {/* Key details */}
          <div className="divide-y divide-green-50 px-8 py-2">
            <DetailRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={lead.email}
            />

            <DetailRow
              icon={<Briefcase className="h-4 w-4" />}
              label="Service Needed"
              value={lead.service}
            />

            <DetailRow
              icon={<Calendar className="h-4 w-4" />}
              label="Submitted"
              value={formattedDate}
            />
          </div>

          {/* Message */}
          <div className="bg-green-50/40 px-8 py-6">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0a1f14]">
              <MessageSquare className="h-4 w-4 text-[#3a9e5f]" />
              Message
            </div>

            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
              {lead.message}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-green-100 px-8 py-5">
            <a
              href={`mailto:${lead.email}`}
              className="rounded-lg bg-[#3a9e5f] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0a1f14]"
            >
              Reply by Email
            </a>

            <button
              type="button"
              className="rounded-lg border border-green-200 px-4 py-2 text-sm font-semibold text-[#0a1f14] transition-colors hover:bg-green-50"
            >
              Mark as Contacted
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-4">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-[#3a9e5f]">
        {icon}
      </span>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </p>

        <p className="text-sm font-medium text-[#0a1f14]">
          {value}
        </p>
      </div>
    </div>
  );
<<<<<<< Updated upstream
}
=======
}

>>>>>>> Stashed changes
