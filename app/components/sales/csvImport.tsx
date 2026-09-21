"use client";

import { useState } from "react";
import { Upload, CheckCircle2, AlertCircle } from "lucide-react";

type Row = {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
};

export default function CsvImport() {
  const [rows, setRows] = useState<Row[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setErrors([]);

    const reader = new FileReader();

    reader.onload = () => {
      const text = String(reader.result || "");

      const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

      if (lines.length < 2) {
        setErrors(["The CSV file must contain a header and at least one row."]);
        return;
      }

      const headers = lines[0]
        .split(",")
        .map((item) => item.trim().toLowerCase());

      const required = [
        "name",
        "company",
        "email",
        "phone",
        "website",
      ];

      const missing = required.filter(
        (field) => !headers.includes(field)
      );

      if (missing.length > 0) {
        setErrors([
          `Missing columns: ${missing.join(", ")}`,
        ]);
        return;
      }

      const imported: Row[] = [];
      const rowErrors: string[] = [];

      lines.slice(1).forEach((line, index) => {
        const values = line.split(",");

        const row = {
          name: values[headers.indexOf("name")]?.trim() || "",
          company:
            values[headers.indexOf("company")]?.trim() || "",
          email:
            values[headers.indexOf("email")]?.trim() || "",
          phone:
            values[headers.indexOf("phone")]?.trim() || "",
          website:
            values[headers.indexOf("website")]?.trim() || "",
        };

        if (!row.name || !row.email) {
          rowErrors.push(
            `Row ${index + 2}: name and email are required.`
          );
        } else {
          imported.push(row);
        }
      });

      setRows(imported);
      setErrors(rowErrors);
    };

    reader.readAsText(file);
  }

  return (
    <div>
      <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center hover:border-[#65FFAD]/40">
        <Upload className="mb-3 text-[#65FFAD]" size={30} />

        <p className="font-medium text-[#F5F1E8]">
          Upload CSV file
        </p>

        <p className="mt-1 text-sm text-white/40">
          name, company, email, phone, website
        </p>

        <input
          type="file"
          accept=".csv,text/csv"
          onChange={handleFile}
          className="hidden"
        />
      </label>

      {errors.length > 0 && (
        <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 p-4">
          <div className="flex gap-2 text-red-300">
            <AlertCircle size={18} />

            <p className="font-medium">
              Import errors
            </p>
          </div>

          <ul className="mt-2 space-y-1 text-sm text-red-200/70">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {rows.length > 0 && (
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-[#F5F1E8]">
              Preview ({rows.length} leads)
            </p>

            <CheckCircle2 className="text-[#65FFAD]" size={20} />
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-white/[0.03]">
                <tr>
                  {["Name", "Company", "Email", "Phone", "Website"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3 text-xs uppercase tracking-wide text-white/40"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={index}
                    className="border-t border-white/5"
                  >
                    <td className="px-4 py-3 text-sm text-[#F5F1E8]">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/60">
                      {row.company}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/60">
                      {row.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/60">
                      {row.phone}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/60">
                      {row.website}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="mt-5 rounded-xl bg-[#65FFAD] px-5 py-3 text-sm font-bold text-[#062017] hover:bg-[#4ade80]">
            Confirm Import
          </button>
        </div>
      )}
    </div>
  );
}