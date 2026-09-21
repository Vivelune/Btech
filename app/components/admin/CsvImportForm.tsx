"use client";

import { useRef, useState, useTransition } from "react";

export default function CsvImportForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    imported: number;
    skipped: number;
    errors: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Choose a CSV file first.");
      return;
    }
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    startTransition(async () => {
      try {
        const res = await fetch("/api/leads/import", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Import failed.");
          return;
        }
        setResult(data);
        if (fileRef.current) fileRef.current.value = "";
      } catch {
        setError("Import failed.");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
        Bulk import leads (CSV)
      </p>
      <p className="mb-3 text-[12px] text-white/40">
        Columns: name, email (required); company, phone, website, service,
        message, priority, tags (semicolon-separated), estimatedValue
        (optional)
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept=".csv"
          className="text-[13px] text-white/70 file:mr-3 file:rounded-full file:border-0 file:bg-white/[0.08] file:px-3 file:py-1.5 file:text-[12.5px] file:font-bold file:text-[#F5F1E8]"
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-[#3a9e5f] px-4 py-1.5 text-[12.5px] font-bold text-[#04140b] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
        >
          {isPending ? "Importing…" : "Import"}
        </button>
      </div>

      {error && <p className="mt-2 text-[13px] text-red-400">{error}</p>}
      {result && (
        <p className="mt-2 text-[13px] text-[#4ade80]">
          Imported {result.imported}, skipped {result.skipped}.
          {result.errors.length > 0 && (
            <span className="block text-white/40">
              {result.errors.join(" · ")}
            </span>
          )}
        </p>
      )}
    </form>
  );
}