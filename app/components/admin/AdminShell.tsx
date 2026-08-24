"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "./Admin-sidebar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061A13]">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />

      {/* Mobile top bar — sidebar itself is fixed/hidden off-canvas below lg */}
      <div className="flex h-16 items-center border-b border-emerald-900/60 px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
          className="rounded-lg p-2 text-[#F5F1E8] hover:bg-emerald-900/50"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* lg:pl-72 clears the fixed w-72 sidebar on desktop */}
      <main className="lg:pl-72">{children}</main>
    </div>
  );
}