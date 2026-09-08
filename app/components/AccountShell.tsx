"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import AccountSidebar from "./AccountSidebar";

export default function AccountShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061A13]">
      <AccountSidebar
        open={open}
        onClose={() => setOpen(false)}
      />

      {/* Mobile top bar */}
      <div className="flex h-16 items-center border-b border-emerald-900/60 px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open account sidebar"
          className="rounded-lg p-2 text-[#F5F1E8] hover:bg-emerald-900/50"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop sidebar spacing */}
      <main className="lg:pl-72">
        {children}
      </main>
    </div>
  );
}