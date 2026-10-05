"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";

export default function ImportLeadsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    imported: number;
    skipped: number;
    errors: string[];
  } | null>(null);

  async function upload() {
    if (!file) return;

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/leads/import", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Import failed");
      }

      setResult(data);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Import failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">

        <Link
          href="/sales/leads"
          className="text-sm text-[#65FFAD]"
        >
          ← Back to Leads
        </Link>

        <h1 className="mt-5 text-3xl font-bold text-[#F5F1E8]">
          Bulk Upload Leads
        </h1>

        <p className="mt-2 text-sm text-white/50">
          Upload a CSV file to import leads into the CRM.
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <div className="rounded-xl border border-dashed border-white/20 p-8 text-center">
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFile(e.target.files?.[0] ?? null)
              }
              className="block w-full text-sm text-white/60 file:mr-4 file:rounded-lg file:border-0 file:bg-[#3a9e5f] file:px-4 file:py-2 file:font-semibold file:text-[#04140b]"
            />

            <p className="mt-4 text-xs text-white/40">
              Required columns: name, email
            </p>

            <p className="mt-1 text-xs text-white/30">
              Optional: company, phone, website, service, message,
              priority, tags, estimatedValue
            </p>
          </div>

          <button
            onClick={upload}
            disabled={!file || loading}
            className="mt-6 rounded-xl bg-[#3a9e5f] px-5 py-3 text-sm font-bold text-[#04140b] hover:bg-[#65FFAD] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Importing..." : "Import CSV"}
          </button>

          {result && (
            <div className="mt-6 rounded-xl border border-[#65FFAD]/20 bg-[#65FFAD]/5 p-5">
              <p className="font-semibold text-[#65FFAD]">
                Import complete
              </p>

              <p className="mt-2 text-sm text-white/70">
                Imported: {result.imported}
              </p>

              <p className="text-sm text-white/70">
                Skipped: {result.skipped}
              </p>

              {result.errors.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-red-300">
                    Errors
                  </p>

                  <ul className="mt-2 space-y-1 text-xs text-red-300/80">
                    {result.errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}