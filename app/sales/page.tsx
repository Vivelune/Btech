import { getCurrentUser } from "@/lib/getCurrentUser";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardList,
  Mail,
  Users,
  BarChart3,
} from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-5">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-[#65FFAD]/10 p-3 text-[#65FFAD]">
          <Icon size={20} />
        </div>

        <span className="text-xs text-white/30">
          Current
        </span>
      </div>

      <p className="mt-5 text-3xl font-bold text-[#F5F1E8]">
        {value}
      </p>

      <p className="mt-1 text-sm text-white/45">
        {label}
      </p>
    </div>
  );
}

export default async function SalesDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const leads = await prisma.lead.findMany({
    where: {
      assignedToId: user.id,
    },
    select: {
      status: true,
      estimatedValue: true,
    },
  });

  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "NEW"
  ).length;

  const interested = leads.filter(
    (lead) => lead.status === "INTERESTED"
  ).length;

  const converted = leads.filter(
    (lead) => lead.status === "CONVERTED"
  ).length;

  const pipelineValue = leads.reduce(
    (sum, lead) => sum + (lead.estimatedValue ?? 0),
    0
  );

  const stats = [
    {
      label: "Total Leads",
      value: totalLeads,
      icon: Users,
    },
    {
      label: "New Leads",
      value: newLeads,
      icon: ClipboardList,
    },
    {
      label: "Interested",
      value: interested,
      icon: BarChart3,
    },
    {
      label: "Converted",
      value: converted,
      icon: Mail,
    },
  ];

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#65FFAD]">
            Sales Workspace
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#F5F1E8]">
            Sales Dashboard
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Manage leads, outreach and sales performance from one place.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
              Pipeline Value
            </p>

            <p className="mt-3 text-3xl font-bold text-[#65FFAD]">
              ${pipelineValue.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>

            <p className="mt-2 text-sm text-white/40">
              Estimated value of your assigned leads.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/sales/leads"
              className="group rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6 transition hover:border-[#65FFAD]/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#F5F1E8]">
                    Manage Leads
                  </h2>

                  <p className="mt-2 text-sm text-white/45">
                    Search, filter and manage your leads.
                  </p>
                </div>

                <ArrowUpRight
                  className="text-[#65FFAD] transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  size={22}
                />
              </div>
            </Link>

            <Link
              href="/sales/compose"
              className="group rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6 transition hover:border-[#65FFAD]/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#F5F1E8]">
                    Compose Email
                  </h2>

                  <p className="mt-2 text-sm text-white/45">
                    Create personalized outreach.
                  </p>
                </div>

                <ArrowUpRight
                  className="text-[#65FFAD] transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  size={22}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}