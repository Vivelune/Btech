import { ShieldCheck } from "lucide-react";
import SalesRepAssignment from "@/app/components/sales/Admin/SalesRepAssignment";

export default function SalesAdminPage() {
  return (
    <div className="min-h-screen bg-[#071a13] px-4 py-6 text-[#F5F1E8] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-emerald-300">
            <ShieldCheck size={17} />
            Admin / Sales Management
          </div>

          <h1 className="text-3xl font-bold">
            Sales Representative Management
          </h1>

          <p className="mt-2 text-sm text-emerald-100/50">
            View sales representatives and assign or reassign leads.
          </p>
        </div>

        <SalesRepAssignment />
      </div>
    </div>
  );
}