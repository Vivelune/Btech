import AddLeadForm from "@/app/components/sales/leads/AddLeadForm";

export default function NewLeadPage() {
  return (
    <div className="min-h-screen bg-[#071a13] px-4 py-6 text-[#F5F1E8] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <p className="text-sm font-semibold text-emerald-300">
            Sales / Leads / New
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Add New Lead
          </h1>

          <p className="mt-2 text-sm text-emerald-100/50">
            Enter the information for a new sales lead.
          </p>
        </div>

        <AddLeadForm />
      </div>
    </div>
  );
}