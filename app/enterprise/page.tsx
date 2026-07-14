import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import PricingTierNav from "../components/PricingSection";

const FEATURES = [
  "Everything in Team",
  "Dedicated engineering pod sized to your roadmap",
  "Custom SLA and security review",
  "Onboarding, migration, and legacy handoff support",
  "Quarterly business reviews with our leadership",
  "Direct line to your account lead, same-day response",
] as const;

export default function EnterprisePage() {
  return (
    <main
      className="min-h-screen bg-[#0a1f14] text-white"
      style={{ fontFamily: "var(--font-dm-sans, ui-sans-serif)" }}
    >
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-40 text-center md:pt-48">
        <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#4ade80]">
          Pricing
        </p>
        <h1
          className="mt-4 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight"
          style={{ fontFamily: "var(--font-syne, ui-sans-serif)" }}
        >
          Enterprise
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-relaxed text-white/60">
          For larger organizations with complex requirements, compliance
          needs, or an established roadmap that needs a dedicated team.
        </p>

        <div className="mt-8">
          <PricingTierNav />
        </div>
      </section>

      <section className="mx-auto max-w-md px-6 pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <div className="flex items-baseline gap-1">
            <span
              className="text-[3rem] font-bold leading-none"
              style={{ fontFamily: "var(--font-syne, ui-sans-serif)" }}
            >
              Custom
            </span>
          </div>
          <p className="mt-2 text-[14px] text-white/50">
            Scoped to your team, timeline, and requirements.
          </p>

          <ul className="mt-8 flex flex-col gap-3.5">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Check
                  size={17}
                  className="mt-0.5 shrink-0 text-[#4ade80]"
                  strokeWidth={2.5}
                />
                <span className="text-[14.5px] leading-snug text-white/75">
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/contactform"
            className="mt-8 flex items-center justify-center gap-1.5 rounded-full bg-[#3a9e5f] px-6 py-3 text-[14px] font-bold text-[#04140b] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Request a quote
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        <p className="mt-6 text-center text-[13.5px] text-white/40">
          Just getting started instead?{" "}
          <Link
            href="/hobby"
            className="font-semibold text-[#4ade80] hover:underline"
          >
            See the Hobby plan
          </Link>
        </p>
      </section>
    </main>
  );
}
