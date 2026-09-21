import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardList,
  Mail,
  Users,
  BarChart3,
} from "lucide-react";
import { salesLeads } from "@/lib/sale-data";

export default function SalesDashboard() {
  const stats = [
    {
      label: "Total Leads",
      value: salesLeads.length,
      icon: Users,
    },
    {
      label: "New Leads",
      value: salesLeads.filter((l) => l.status === "New").length,
      icon: ClipboardList,
    },
    {
      label: "Interested",
      value: salesLeads.filter((l) => l.status === "Interested").length,
      icon: BarChart3,
    },
    {
      label: "Converted",
      value: salesLeads.filter((l) => l.status === "Converted").length,
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
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-[#65FFAD]/10 p-3 text-[#65FFAD]">
                    <Icon size={20} />
                  </div>

                  <span className="text-xs text-white/30">
                    This week
                  </span>
                </div>

                <p className="mt-5 text-3xl font-bold text-[#F5F1E8]">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm text-white/45">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
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
                  Search, filter, add and manage your leads.
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
                  Create personalized outreach for your leads.
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
    </section>
  );
}