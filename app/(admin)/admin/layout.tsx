    "use client";

import AdminSidebar from "@/app/components/admin/Admin-sidebar";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#061A13] text-[#F5F1E8]">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-emerald-900/60 bg-[#061A13]/95 px-4 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-[#65FFAD] hover:bg-emerald-900/50"
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>

          <span className="ml-3 font-semibold text-[#F5F1E8]">
            BTECH DASHBOARD
          </span>
        </header>

        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}