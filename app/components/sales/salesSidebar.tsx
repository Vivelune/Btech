"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  PenLine,
  BarChart3,
  LogOut,
  X,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

type SalesSidebarProps = {
  open: boolean;
  onClose: () => void;
};

const navigation = [
  {
    label: "Dashboard",
    href: "/sales",
    icon: LayoutDashboard,
  },
  {
    label: "Leads",
    href: "/sales/leads",
    icon: Users,
  },
  {
    label: "Compose",
    href: "/sales/compose",
    icon: PenLine,
  },
  {
    label: "Analytics",
    href: "/sales/analytics",
    icon: BarChart3,
  },
];

export default function SalesSidebar({
  open,
  onClose,
}: SalesSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sales sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
          border-r border-emerald-900/60 bg-[#0A241B]
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-emerald-900/60 px-6">
          <Link
            href="/sales"
            onClick={onClose}
            className="flex items-center gap-3 text-xl font-bold tracking-wide text-[#F5F1E8]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#65FFAD] text-lg font-bold text-[#062017]">
              B
            </span>

            BTECH
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#F5F1E8] transition hover:bg-emerald-900/50 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Sales label */}
        <div className="px-5 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#65FFAD]">
            Sales Workspace
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/sales"
                ? pathname === "/sales"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 rounded-xl px-4 py-3
                  text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-[#65FFAD] text-[#062017]"
                      : "text-[#E8E6DC] hover:bg-emerald-900/60"
                  }
                `}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-emerald-900/60 p-4">
          <p className="mb-3 px-1 text-xs text-emerald-300/60">
            BTECH Sales
          </p>

          <SignOutButton>
            <button
              type="button"
              onClick={onClose}
              className="
                flex w-full items-center gap-3 rounded-xl
                px-4 py-3 text-sm font-medium
                text-[#E8E6DC]
                transition
                hover:bg-red-500/10
                hover:text-red-300
              "
            >
              <LogOut size={20} />
              Sign out
            </button>
          </SignOutButton>
        </div>
      </aside>
    </>
  );
}