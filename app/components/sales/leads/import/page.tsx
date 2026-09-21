import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CsvImport from "../../csvImport";

export default function ImportLeadsPage() {
  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/sales/leads"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#65FFAD]"
        >
          <ArrowLeft size={16} />
          Back to leads
        </Link>

        <div className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-[#F5F1E8]">
            Bulk Import Leads
          </h1>

          <p className="mt-2 mb-8 text-sm text-white/45">
            Upload a CSV file, review the leads and confirm the import.
          </p>

          <CsvImport />
        </div>
      </div>
    </section>
  );
}