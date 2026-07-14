import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

const FEATURES = [
  {
    title: "Marketplace listings",
    desc: "Farmers post produce with quantity, price, and harvest date; buyers filter by crop and region.",
  },
  {
    title: "Price tracker",
    desc: "A running view of regional market prices so farmers can see what a fair asking price looks like before they list.",
  },
  {
    title: "Farmer profiles",
    desc: "A public profile per farmer — what they grow, where, and a history of completed sales — to build buyer trust.",
  },
  {
    title: "Mobile money checkout",
    desc: "Payment flows built around mobile money, the way most buyers and sellers in the region actually transact.",
  },
] as const;

const STACK = ["HTML", "CSS", "JavaScript", "Supabase"] as const;

export default function AgriMarketCaseStudy() {
  return (
    <main
      className="min-h-screen bg-[#0a1f14] text-white"
      style={{ fontFamily: "var(--font-dm-sans, ui-sans-serif)" }}
    >
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-40 md:pt-48">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to work
        </Link>

        <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#4ade80]">
          Product Build · Sierra Leone
        </p>
        <h1
          className="mt-4 text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-tight"
          style={{ fontFamily: "var(--font-syne, ui-sans-serif)" }}
        >
          AgriMarket SL
        </h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-white/60">
          A demo platform connecting Sierra Leonean farmers directly with
          buyers — built to show what a lightweight, mobile-first agricultural
          marketplace could look like in a market with patchy connectivity
          and cash-first habits.
        </p>
      </section>

      {/* Problem / Approach / Outcome */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/40">
              The problem
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
              Farmers had no easy way to reach buyers outside their immediate
              area, and no visibility into whether a price offered was fair.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/40">
              The approach
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
              A vanilla HTML/CSS/JS front end with a Supabase backend, kept
              deliberately simple so it stays fast on low-end devices and
              slower connections.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/40">
              The outcome
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/70">
              A working demo covering listings, price tracking, farmer
              profiles, and mobile money checkout — a foundation ready to
              pilot with a real cooperative.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2
          className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold"
          style={{ fontFamily: "var(--font-syne, ui-sans-serif)" }}
        >
          What's inside
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h3 className="text-[15.5px] font-bold text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2
          className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold"
          style={{ fontFamily: "var(--font-syne, ui-sans-serif)" }}
        >
          Built with
        </h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {STACK.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[13.5px] font-medium text-white/65"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-32 text-center">
        <h3
          className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold"
          style={{ fontFamily: "var(--font-syne, ui-sans-serif)" }}
        >
          Building something similar?
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-white/55">
          We're happy to talk through what a real pilot would take — from
          data model to payments.
        </p>
        <Link
          href="/contactform"
          className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-[#3a9e5f] px-6 py-3 text-[14px] font-bold text-[#04140b] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Let's talk
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </Link>
      </section>
    </main>
  );
}