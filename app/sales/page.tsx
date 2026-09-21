import Link from "next/link";
import {
  Users,
  Mail,
  CalendarCheck,
  TrendingUp,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Leads",
    value: "0",
    description: "All assigned leads",
    icon: Users,
  },
  {
    label: "Emails Sent",
    value: "0",
    description: "This month",
    icon: Mail,
  },
  {
    label: "Meetings",
    value: "0",
    description: "Booked meetings",
    icon: CalendarCheck,
  },
  {
    label: "Conversion Rate",
    value: "0%",
    description: "Current conversion",
    icon: TrendingUp,
  },
];

const pipeline = [
  { label: "New", count: 0 },
  { label: "Contacted", count: 0 },
  { label: "Replied", count: 0 },
  { label: "Interested", count: 0 },
  { label: "Meeting Booked", count: 0 },
  { label: "Qualified", count: 0 },
  { label: "Converted", count: 0 },
];

export default function SalesDashboard() {
  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================================
            HEADER
        ================================= */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-[#65FFAD]">
              Sales Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1E8] sm:text-4xl">
              Overview
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
              Manage your leads, outreach, meetings and sales pipeline from
              one place.
            </p>
          </div>

          <Link
            href="/sales/compose"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#65FFAD] px-5 py-3 text-sm font-bold text-[#062017] transition hover:bg-[#4ade80]"
          >
            Compose Email
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* ================================
            STAT CARDS
        ================================= */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#65FFAD]/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                      {stat.label}
                    </p>

                    <p className="mt-3 text-3xl font-bold text-[#F5F1E8]">
                      {stat.value}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#65FFAD]/20 bg-[#65FFAD]/10 p-3">
                    <Icon
                      size={20}
                      className="text-[#65FFAD]"
                    />
                  </div>
                </div>

                <p className="mt-3 text-xs text-white/40">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ================================
            SALES PIPELINE
        ================================= */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
              Lead Pipeline
            </p>

            <h2 className="mt-2 text-xl font-bold text-[#F5F1E8]">
              Sales Pipeline
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Track leads through each stage of the sales process.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {pipeline.map((stage) => (
              <div
                key={stage.label}
                className="rounded-xl border border-white/10 bg-[#0A241B] p-4 transition hover:border-[#65FFAD]/20"
              >
                <p className="min-h-[32px] text-xs font-medium leading-4 text-white/50">
                  {stage.label}
                </p>

                <p className="mt-3 text-2xl font-bold text-[#F5F1E8]">
                  {stage.count}
                </p>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-0 rounded-full bg-[#65FFAD]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================
            QUICK ACTIONS
        ================================= */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          {/* Leads */}
          <Link
            href="/sales/leads"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#65FFAD]/30 hover:bg-white/[0.05]"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-[#65FFAD]/10 p-3">
                <Users
                  size={20}
                  className="text-[#65FFAD]"
                />
              </div>

              <ChevronRight
                size={18}
                className="text-white/30 transition group-hover:translate-x-1 group-hover:text-[#65FFAD]"
              />
            </div>

            <h3 className="mt-4 text-base font-bold text-[#F5F1E8]">
              Manage Leads
            </h3>

            <p className="mt-1 text-sm leading-6 text-white/40">
              View, search, filter and manage your assigned leads.
            </p>
          </Link>

          {/* Compose */}
          <Link
            href="/sales/compose"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#65FFAD]/30 hover:bg-white/[0.05]"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-[#65FFAD]/10 p-3">
                <Mail
                  size={20}
                  className="text-[#65FFAD]"
                />
              </div>

              <ChevronRight
                size={18}
                className="text-white/30 transition group-hover:translate-x-1 group-hover:text-[#65FFAD]"
              />
            </div>

            <h3 className="mt-4 text-base font-bold text-[#F5F1E8]">
              Compose Email
            </h3>

            <p className="mt-1 text-sm leading-6 text-white/40">
              Create personalized outreach messages for your leads.
            </p>
          </Link>

          {/* Analytics */}
          <Link
            href="/sales/analytics"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#65FFAD]/30 hover:bg-white/[0.05]"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-[#65FFAD]/10 p-3">
                <TrendingUp
                  size={20}
                  className="text-[#65FFAD]"
                />
              </div>

              <ChevronRight
                size={18}
                className="text-white/30 transition group-hover:translate-x-1 group-hover:text-[#65FFAD]"
              />
            </div>

            <h3 className="mt-4 text-base font-bold text-[#F5F1E8]">
              View Analytics
            </h3>

            <p className="mt-1 text-sm leading-6 text-white/40">
              Monitor outreach performance and sales activity.
            </p>
          </Link>
        </div>

        {/* ================================
            EMPTY STATE
        ================================= */}
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#65FFAD]/10">
            <Users
              size={22}
              className="text-[#65FFAD]"
            />
          </div>

          <h2 className="mt-4 text-lg font-bold text-[#F5F1E8]">
            No leads assigned yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/40">
            Once leads are assigned to you, they will appear here and in the
            Leads section of your sales dashboard.
          </p>

          <Link
            href="/sales/leads"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-[#F5F1E8] transition hover:border-[#65FFAD]/30 hover:bg-[#65FFAD]/10 hover:text-[#65FFAD]"
          >
            Go to Leads
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}