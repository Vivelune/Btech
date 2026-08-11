"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  X,
} from "lucide-react";

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

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
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
        <div className="flex h-20 items-center justify-between border-b border-emerald-900/60 px-6">
          <Link
            href="/admin"
            onClick={onClose}
            className="text-xl font-bold tracking-wide text-[#F5F1E8]"
          >
            ALHAJIBTECH
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#F5F1E8] hover:bg-emerald-900/50 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#E8E6DC] transition hover:bg-emerald-900/60"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            href="/admin/leads"
            onClick={onClose}
            className={`
              flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
              transition
              ${
                isLeadsActive
                  ? "bg-[#65FFAD] text-[#062017]"
                  : "text-[#E8E6DC] hover:bg-emerald-900/60"
              }
            `}
          >
            <Users size={20} />
            Leads
          </Link>
        </nav>

        <div className="border-t border-emerald-900/60 p-4">
          <p className="text-xs text-emerald-300/60">
            ALHAJIBTECH Admin
          </p>
        </div>
      </aside>
    </>
  );
}