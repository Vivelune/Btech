"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TIERS = [
  { label: "Hobby", href: "/hobby" },
  { label: "Individual", href: "/individual" },
  { label: "Team", href: "/team" },
  { label: "Enterprise", href: "/enterprise" },
] as const;

export default function PricingTierNav() {
  const pathname = usePathname();

  return (
    <div
      className="mx-auto flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md"
      style={{ fontFamily: "var(--font-dm-sans, ui-sans-serif)" }}
    >
      {TIERS.map((tier) => {
        const isActive = pathname === tier.href;
        return (
          <Link
            key={tier.href}
            href={tier.href}
            className={cn(
              "rounded-full px-4 py-1.5 text-[13.5px] font-semibold transition-colors duration-200",
              isActive
                ? "bg-[#3a9e5f] text-[#04140b]"
                : "text-white/60 hover:text-white"
            )}
          >
            {tier.label}
          </Link>
        );
      })}
    </div>
  );
}