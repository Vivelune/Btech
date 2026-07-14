import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import PricingTierNav from "../components/PricingSection";

const FEATURES = [
  "Everything in Hobby",
  "One active project, launched and maintained",
  "Direct email support, 2 business-day response",
  "Monthly design & dev check-in call",
  "Small bug fixes and feature requests included",
] as const;

export default function IndividualPage() {
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
          Individual
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-relaxed text-white/60">
          For freelancers and solo founders who need one project built right
          and kept running.
        </p>

        <div className="mt-8">
          <PricingTierNav />
        </div>
      </section>

      <section className="mx-auto max-w-md px-6 pb-24">
        <div className="rounded-3xl border border-[#3a9e5f]/40 bg-[#3a9e5f]/[0.06] p-8 shadow-[0_0_0_1px_rgba(58,158,95,0.15)]">
          <span className="inline-flex items-center rounded-full bg-[#3a9e5f]/20 px-3 py-1 text-[11px] font-semibold text-[#4ade80]">
            Most popular
          </span>
          <div className="mt-4 flex items-baseline gap-1">
            <span
              className="text-[3rem] font-bold leading-none"
              style={{ fontFamily: "var(--font-syne, ui-sans-serif)" }}
            >
              $149
            </span>
            <span className="text-[15px] font-medium text-white/50">
              /month
            </span>
          </div>
          <p className="mt-2 text-[14px] text-white/50">
            Billed monthly. Cancel anytime.
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
            Get started
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        <p className="mt-6 text-center text-[13.5px] text-white/40">
          Managing more than one project?{" "}
          <Link
            href="/team"
            className="font-semibold text-[#4ade80] hover:underline"
          >
            See the Team plan
          </Link>
        </p>
      </section>
    </main>
  );
}