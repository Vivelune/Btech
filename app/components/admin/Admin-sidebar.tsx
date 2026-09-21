"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  UserCog,
  LogOut,
  X,
  UsersRound,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function AdminSidebar({
  open,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isLeadsActive = pathname.startsWith("/admin/leads");
  const isUsersActive = pathname.startsWith("/admin/users");
  const isAccountManagementActive = pathname.startsWith(
    "/admin/account-management"
  );
  const isSalesRepsActive = pathname.startsWith("/admin/sales-reps");

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
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
            href="/admin"
            onClick={onClose}
            className="text-xl font-bold tracking-wide text-[#F5F1E8]"
          >
            BTECH
          </Link>

          {/* Close button — mobile only */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#F5F1E8] hover:bg-emerald-900/50 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {/* Dashboard */}
          <Link
            href="/admin"
            onClick={onClose}
            className={`
              flex items-center gap-3 rounded-xl px-4 py-3
              text-sm font-medium transition
              ${
                pathname === "/admin"
                  ? "bg-[#65FFAD] text-[#062017]"
                  : "text-[#E8E6DC] hover:bg-emerald-900/60"
              }
            `}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          {/* Leads */}
          <Link
            href="/admin/leads"
            onClick={onClose}
            className={`
              flex items-center gap-3 rounded-xl px-4 py-3
              text-sm font-medium transition
              ${
                isLeadsActive
                  ? "bg-[#65FFAD] text-[#062017]"
                  : "text-[#E8E6DC] hover:bg-emerald-900/60"
              }
            `}
          >
            <BriefcaseBusiness size={20} />
            Leads
          </Link>

          {/* Users */}
          <Link
            href="/admin/users"
            onClick={onClose}
            className={`
              flex items-center gap-3 rounded-xl px-4 py-3
              text-sm font-medium transition
              ${
                isUsersActive
                  ? "bg-[#65FFAD] text-[#062017]"
                  : "text-[#E8E6DC] hover:bg-emerald-900/60"
              }
            `}
          >
            <Users size={20} />
            Users
          </Link>

          {/* Sales Reps */}
          <Link
            href="/admin/sales-reps"
            onClick={onClose}
            className={`
              flex items-center gap-3 rounded-xl px-4 py-3
              text-sm font-medium transition
              ${
                isSalesRepsActive
                  ? "bg-[#65FFAD] text-[#062017]"
                  : "text-[#E8E6DC] hover:bg-emerald-900/60"
              }
            `}
          >
            <UsersRound size={20} />
            Sales Reps
          </Link>

          {/* Account Management */}
          <Link
            href="/admin/account-management"
            onClick={onClose}
            className={`
              flex items-center gap-3 rounded-xl px-4 py-3
              text-sm font-medium transition
              ${
                isAccountManagementActive
                  ? "bg-[#65FFAD] text-[#062017]"
                  : "text-[#E8E6DC] hover:bg-emerald-900/60"
              }
            `}
          >
            <UserCog size={20} />
            Account Management
          </Link>
        </nav>

        {/* Bottom section */}
        <div className="border-t border-emerald-900/60 p-4">
          {/* Admin label */}
          <p className="mb-3 px-1 text-xs text-emerald-300/60">
            BTECH Admin
          </p>

          {/* Sign out */}
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