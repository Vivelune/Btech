import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Data — replace with real engagements as they're published
// ---------------------------------------------------------------------------

const FEATURED = {
  title: "AgriMarket SL",
  tag: "Product Build",
  desc: "A farmer-to-buyer marketplace platform for Sierra Leone, built to make price discovery, listings, and mobile money payments accessible on any connection.",
  stack: ["Supabase", "Vanilla JS", "Mobile Money"],
  href: "/work/agrimarket-sl",
};

const PROJECTS = [
  {
    title: "Coastal Retail Co.",
    tag: "Web Development",
    desc: "A headless storefront rebuild that cut checkout time and gave the merchandising team a CMS they could run without a developer.",
    year: "2025",
  },
  {
    title: "Horizon Fintech",
    tag: "Digital Solutions",
    desc: "An internal operations dashboard consolidating four spreadsheets into one real-time view for a 40-person finance team.",
    year: "2025",
  },
  {
    title: "Bloom Marketing Group",
    tag: "Digital Marketing",
    desc: "A brand site and content system designed to support a growing agency's own client pitches.",
    year: "2024",
  },
] as const;

export default function WorkPage() {
  return (
    <main
      className="min-h-screen bg-[#0a1f14] text-white"
      style={{ fontFamily: "var(--font-dm-sans, ui-sans-serif)" }}
    >
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-40 md:pt-48">
        <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#4ade80]">
          Selected Work
        </p>
        <h1
          className="mt-4 max-w-2xl text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.05] tracking-tight"
          style={{ fontFamily: "var(--font-syne, ui-sans-serif)" }}
        >
          Products and platforms we've shipped for founders and teams.
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/60">
          Every engagement starts with a real constraint — a slow checkout,
          a market with no price transparency, a team stuck in spreadsheets.
          Here's what came out the other side.
        </p>
      </section>

      {/* Featured case */}
      <section className="mx-auto max-w-5xl px-6 pb-8">
        <Link
          href={FEATURED.href}
          className="group grid gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:bg-white/[0.06] md:grid-cols-[1.1fr,1fr] md:p-10"
        >
          <div className="flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center rounded-full border border-[#3a9e5f]/40 bg-[#3a9e5f]/10 px-3 py-1 text-[12px] font-semibold text-[#4ade80]">
                {FEATURED.tag}
              </span>
              <h2
                className="mt-5 text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight"
                style={{ fontFamily: "var(--font-syne, ui-sans-serif)" }}
              >
                {FEATURED.title}
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/60">
                {FEATURED.desc}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {FEATURED.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-white/5 px-3 py-1 text-[12px] font-medium text-white/50"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-between rounded-2xl border border-white/5 bg-gradient-to-br from-[#3a9e5f]/20 to-transparent p-6 md:items-center md:justify-center">
            <span className="text-[15px] font-semibold text-white/70">
              Read the case study
            </span>
            <ArrowUpRight
              size={20}
              className="text-[#4ade80] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </div>
        </Link>
      </section>

      {/* Project grid */}
      <section className="mx-auto max-w-5xl px-6 pb-32">
        <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/40">
          More engagements
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:bg-white/[0.06]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/50">
                    {p.tag}
                  </span>
                  <span className="text-[12px] text-white/30">{p.year}</span>
                </div>
                <h4
                  className="mt-4 text-[18px] font-bold"
                  style={{ fontFamily: "var(--font-syne, ui-sans-serif)" }}
                >
                  {p.title}
                </h4>
                <p className="mt-2 text-[14px] leading-relaxed text-white/55">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-white/35">
          Placeholder engagements — swap in real client names and outcomes as
          case studies go live.
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-32 text-center">
        <h3
          className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold"
          style={{ fontFamily: "var(--font-syne, ui-sans-serif)" }}
        >
          Have a project in mind?
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-white/55">
          Tell us what you're building and we'll tell you honestly whether
          we're the right team for it.
        </p>
        <Link
          href="/contactform"
          className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-[#3a9e5f] px-6 py-3 text-[14px] font-bold text-[#04140b] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Start a conversation
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </Link>
      </section>
    </main>
  );
}