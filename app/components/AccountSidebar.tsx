"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  LayoutDashboard,
  X,
  LogOut,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

type AccountSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function AccountSidebar({
  open,
  onClose,
}: AccountSidebarProps) {
  const pathname = usePathname();

  const isAccountActive =
    pathname === "/account";

  const isProfileActive =
    pathname.startsWith("/account/profile");

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close account sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
          border-r border-emerald-900/60 bg-[#0A241B]
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b border-emerald-900/60 px-6">
          <Link
            href="/account"
            onClick={onClose}
            className="text-xl font-bold tracking-wide text-[#F5F1E8]"
          >
            BTECH
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#F5F1E8] hover:bg-emerald-900/50 lg:hidden"
            aria-label="Close account sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          <Link
            href="/account"
            onClick={onClose}
            className={`
              flex items-center gap-3 rounded-xl px-4 py-3
              text-sm font-medium transition
              ${
                isAccountActive
                  ? "bg-[#65FFAD] text-[#062017]"
                  : "text-[#E8E6DC] hover:bg-emerald-900/60"
              }
            `}
          >
            <LayoutDashboard size={20} />
            Account
          </Link>

          <Link
            href="/account/profile"
            onClick={onClose}
            className={`
              flex items-center gap-3 rounded-xl px-4 py-3
              text-sm font-medium transition
              ${
                isProfileActive
                  ? "bg-[#65FFAD] text-[#062017]"
                  : "text-[#E8E6DC] hover:bg-emerald-900/60"
              }
            `}
          >
            <User size={20} />
            Profile
          </Link>
        </nav>

        {/* Sign out at bottom */}
        <div className="border-t border-emerald-900/60 p-4">
          <SignOutButton>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#E8E6DC] transition hover:bg-red-400/10 hover:text-red-300"
            >
              <LogOut size={20} />
              Sign out
            </button>
          </SignOutButton>

          <p className="mt-3 px-4 text-xs text-emerald-300/60">
            BTECH Account
          </p>
        </div>
      </aside>
    </>
  );
}