"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
};

export default function ComposePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadId, setLeadId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(true);

  useEffect(() => {
    async function loadLeads() {
      try {
        const response = await fetch(
          "/api/leads?pageSize=100"
        );

        const data = await response.json();

        setLeads(data.leads ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingLeads(false);
      }
    }

    loadLeads();
  }, []);

  async function sendEmail() {
    if (!leadId || !subject.trim() || !body.trim()) {
      alert("Please select a lead and complete the email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/emails/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId,
          subject,
          body,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to send email"
        );
      }

      alert("Email sent successfully.");

      setSubject("");
      setBody("");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to send email"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">

        <div className="mb-8">
          <p className="text-sm font-medium text-[#65FFAD]">
            Sales
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#F5F1E8]">
            Compose Email
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Send an email directly through the CRM.
          </p>
        </div>

        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">

          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Lead
            </label>

            <select
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
              disabled={loadingLeads}
              className="w-full rounded-xl border border-white/10 bg-[#0A241B] px-4 py-3 text-sm text-white outline-none focus:border-[#65FFAD]"
            >
              <option value="">
                {loadingLeads
                  ? "Loading leads..."
                  : "Select a lead"}
              </option>

              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.name} — {lead.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Subject
            </label>

            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              className="w-full rounded-xl border border-white/10 bg-[#0A241B] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#65FFAD]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Message
            </label>

            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              placeholder="Write your email..."
              className="w-full rounded-xl border border-white/10 bg-[#0A241B] px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/30 focus:border-[#65FFAD]"
            />
          </div>

          <button
            onClick={sendEmail}
            disabled={loading}
            className="rounded-xl bg-[#3a9e5f] px-5 py-3 text-sm font-bold text-[#04140b] hover:bg-[#65FFAD] disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Email"}
          </button>

        </div>
      </div>
    </section>
  );
}