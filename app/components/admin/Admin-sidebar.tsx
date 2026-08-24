"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  X,
} from "lucide-react";

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
};

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: ClipboardList, exact: false },
  { href: "/admin/users", label: "Users", icon: Users, exact: false },
];

export default function AdminSidebar({
  open,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

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
            BTECH
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
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#65FFAD] text-[#062017]"
                    : "text-[#E8E6DC] hover:bg-emerald-900/60"
                }`}
              >
                <Icon size={20} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-emerald-900/60 p-4">
          <p className="text-xs text-emerald-300/60">
            BTECH Admin
          </p>
        </div>
      </aside>
    </>
  );
}