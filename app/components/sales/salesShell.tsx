"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import SalesSidebar from "./salesSidebar";

export default function SalesShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061A13]">
      <SalesSidebar
        open={open}
        onClose={() => setOpen(false)}
      />

      {/* Mobile top bar */}
      <div className="flex h-16 items-center border-b border-emerald-900/60 bg-[#061A13] px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open sales sidebar"
          className="rounded-lg p-2 text-[#F5F1E8] transition hover:bg-emerald-900/50"
        >
          <Menu size={22} />
        </button>

        <span className="ml-3 text-sm font-bold tracking-wide text-[#F5F1E8]">
          BTECH SALES
        </span>
      </div>

      {/* Main content */}
      <main className="lg:pl-72">
        {children}
      </main>
    </div>
  );
}