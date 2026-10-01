"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Send,
  Loader2,
  User,
  RefreshCw,
} from "lucide-react";

import AIPrompt from "./AiPrompt";

type Lead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  status: string;
};

type LeadsResponse = {
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
};

export default function ComposeForm() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadId, setLeadId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [prompt, setPrompt] = useState("");

  const [loadingLeads, setLoadingLeads] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadLeads() {
    try {
      setLoadingLeads(true);
      setError("");

      const response = await fetch(
        "/api/leads?page=1&pageSize=100",
        {
          cache: "no-store",
        }
      );

      const raw = await response.text();

      let data: LeadsResponse & {
        error?: string;
      } = {
        leads: [],
        total: 0,
        page: 1,
        pageSize: 100,
      };

      if (raw.trim()) {
        try {
          data = JSON.parse(raw);
        } catch {
          throw new Error(
            "The server returned an invalid leads response."
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load leads."
        );
      }

      setLeads(data.leads ?? []);
    } catch (error) {
      console.error(
        "Load leads error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load leads."
      );
    } finally {
      setLoadingLeads(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  function handleAIResponse(data: {
    subject: string;
    body: string;
  }) {
    setSubject(data.subject);
    setBody(data.body);
    setSuccess("AI email generated successfully.");
    setError("");
  }

  async function sendEmail() {
    if (!leadId) {
      setError("Please select a lead.");
      return;
    }

    if (!subject.trim()) {
      setError("Please enter an email subject.");
      return;
    }

    if (!body.trim()) {
      setError("Please enter an email body.");
      return;
    }

    try {
      setSending(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        "/api/emails/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leadId,
            subject: subject.trim(),
            body: body.trim(),
          }),
        }
      );

      const raw = await response.text();

      let data: {
        email?: unknown;
        error?: string;
      } = {};

      if (raw.trim()) {
        try {
          data = JSON.parse(raw);
        } catch {
          throw new Error(
            "The email server returned an invalid response."
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Email sending failed with status ${response.status}.`
        );
      }

      setSuccess("Email sent successfully.");

      setSubject("");
      setBody("");
      setPrompt("");
      setLeadId("");
    } catch (error) {
      console.error(
        "Send email error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to send email."
      );
    } finally {
      setSending(false);
    }
  }

  function resetForm() {
    setLeadId("");
    setSubject("");
    setBody("");
    setPrompt("");
    setError("");
    setSuccess("");
  }

  const selectedLead = leads.find(
    (lead) => lead.id === leadId
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#65FFAD]/10 text-[#65FFAD]">
            <Mail size={21} />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#65FFAD]">
              Sales Workspace
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#F5F1E8]">
              Compose Email
            </h1>
          </div>
        </div>

        <p className="mt-3 text-sm text-white/45">
          Create personalized outreach for your CRM leads.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="rounded-xl border border-[#65FFAD]/20 bg-[#65FFAD]/5 px-4 py-3 text-sm text-[#65FFAD]">
          {success}
        </div>
      )}

      {/* Lead Selection */}
      <div className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6">
        <div className="mb-4 flex items-center gap-3">
          <User
            size={19}
            className="text-[#65FFAD]"
          />

          <h2 className="font-semibold text-[#F5F1E8]">
            Select Lead
          </h2>
        </div>

        <select
          value={leadId}
          onChange={(event) => {
            setLeadId(event.target.value);
            setError("");
            setSuccess("");
          }}
          disabled={loadingLeads}
          className="w-full rounded-xl border border-white/10 bg-[#061A13] px-4 py-3 text-sm text-[#F5F1E8] outline-none focus:border-[#65FFAD]/50 disabled:opacity-50"
        >
          <option value="">
            {loadingLeads
              ? "Loading leads..."
              : "Select a lead"}
          </option>

          {leads.map((lead) => (
            <option
              key={lead.id}
              value={lead.id}
            >
              {lead.name} — {lead.email}
            </option>
          ))}
        </select>

        {selectedLead && (
          <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <p className="font-medium text-[#F5F1E8]">
              {selectedLead.name}
            </p>

            <p className="mt-1 text-sm text-white/45">
              {selectedLead.email}
            </p>

            {selectedLead.company && (
              <p className="mt-1 text-xs text-white/35">
                {selectedLead.company}
              </p>
            )}

            {selectedLead.service && (
              <p className="mt-1 text-xs text-[#65FFAD]/60">
                {selectedLead.service}
              </p>
            )}
          </div>
        )}
      </div>

      {/* AI Assistant */}
      <AIPrompt
        leadId={leadId}
        prompt={prompt}
        onPromptChange={setPrompt}
        onGenerated={handleAIResponse}
      />

      {/* Email Editor */}
      <div className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#F5F1E8]">
            Email
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Review and edit the email before sending.
          </p>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="email-subject"
            className="mb-2 block text-sm font-medium text-[#F5F1E8]"
          >
            Subject
          </label>

          <input
            id="email-subject"
            value={subject}
            onChange={(event) =>
              setSubject(event.target.value)
            }
            placeholder="Email subject"
            className="w-full rounded-xl border border-white/10 bg-[#061A13] px-4 py-3 text-sm text-[#F5F1E8] outline-none placeholder:text-white/25 focus:border-[#65FFAD]/50"
          />
        </div>

        {/* Body */}
        <div className="mt-5">
          <label
            htmlFor="email-body"
            className="mb-2 block text-sm font-medium text-[#F5F1E8]"
          >
            Message
          </label>

          <textarea
            id="email-body"
            value={body}
            onChange={(event) =>
              setBody(event.target.value)
            }
            placeholder="Write your email here or generate one using AI..."
            rows={14}
            className="w-full resize-y rounded-xl border border-white/10 bg-[#061A13] px-4 py-3 text-sm leading-6 text-[#F5F1E8] outline-none placeholder:text-white/25 focus:border-[#65FFAD]/50"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={resetForm}
            disabled={sending}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-[#F5F1E8] transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={17} />
            Clear
          </button>

          <button
            type="button"
            onClick={sendEmail}
            disabled={sending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#65FFAD] px-6 py-3 text-sm font-bold text-[#062017] transition hover:bg-[#4ade80] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Sending...
              </>
            ) : (
              <>
                <Send size={17} />
                Send Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}