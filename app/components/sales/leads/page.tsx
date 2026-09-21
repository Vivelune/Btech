import LeadsTable from "../leadsTable";

export default function LeadsPage() {
  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <LeadsTable />
      </div>
    </section>
  );
}