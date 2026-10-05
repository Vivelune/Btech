"use client";

import { useMemo, useState } from "react";
import {
  Bot,
  CheckCircle2,
  Loader2,
  Mail,
  Send,
  Sparkles,
  User,
  AlertCircle,
} from "lucide-react";

type Lead = {
  id: string;
  name: string;
  email: string;
  service: string;
  status: string;
};

type EmailComposeProps = {
  leads: Lead[];
};

export default function EmailCompose({
  leads,
}: EmailComposeProps) {
  const [selectedLeadId, setSelectedLeadId] = useState(
    leads[0]?.id ?? ""
  );

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [aiPrompt, setAiPrompt] = useState(
    "Write a professional and friendly follow-up email. Keep it personalized, clear and concise."
  );

  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedLead = useMemo(
    () =>
      leads.find(
        (lead) => lead.id === selectedLeadId
      ),
    [leads, selectedLeadId]
  );

  async function handleGenerateAI() {
    setError("");
    setSuccess("");

    if (!selectedLeadId) {
      setError("Please select a lead first.");
      return;
    }

    if (!aiPrompt.trim()) {
      setError("Please enter instructions for the AI.");
      return;
    }

    setGenerating(true);

    try {
      const response = await fetch(
        "/api/leads/ai-generate-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leadId: selectedLeadId,
            prompt: aiPrompt,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "AI generation failed."
        );
      }

      setSubject(data.subject ?? "");
      setMessage(data.body ?? "");

      setSuccess(
        "AI email generated successfully. Review it before sending."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while generating the email."
      );
    } finally {
      setGenerating(false);
    }
  }

  async function handleSendEmail() {
    setError("");
    setSuccess("");

    if (!selectedLeadId) {
      setError("Please select a lead first.");
      return;
    }

    if (!subject.trim()) {
      setError("Please enter an email subject.");
      return;
    }

    if (!message.trim()) {
      setError("Please enter an email message.");
      return;
    }

    setSending(true);

    try {
      const response = await fetch(
        "/api/emails/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leadId: selectedLeadId,
            subject,
            body: message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Email sending failed."
        );
      }

      setSuccess(
        `Email sent successfully to ${selectedLead?.email}.`
      );

      setSubject("");
      setMessage("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while sending the email."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      {/* Main Compose Area */}
      <div className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-[#65FFAD]/10 p-3 text-[#65FFAD]">
            <Mail size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#F5F1E8]">
              Compose Email
            </h2>

            <p className="text-sm text-white/40">
              Create and send personalized outreach.
            </p>
          </div>
        </div>

        {/* Lead */}
        <div>
          <label
            htmlFor="lead"
            className="mb-2 block text-sm font-medium text-white/70"
          >
            Lead
          </label>

          <select
            id="lead"
            value={selectedLeadId}
            onChange={(event) => {
              setSelectedLeadId(event.target.value);
              setError("");
              setSuccess("");
            }}
            className="w-full rounded-xl border border-white/10 bg-[#061A13] px-4 py-3 text-sm text-[#F5F1E8] outline-none transition focus:border-[#65FFAD]/50"
          >
            {leads.length === 0 ? (
              <option value="">
                No assigned leads available
              </option>
            ) : (
              leads.map((lead) => (
                <option
                  key={lead.id}
                  value={lead.id}
                >
                  {lead.name} — {lead.email}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Selected Lead Info */}
        {selectedLead && (
          <div className="mt-4 rounded-xl border border-white/10 bg-[#061A13]/70 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-white/5 p-2 text-white/60">
                <User size={18} />
              </div>

              <div className="min-w-0">
                <p className="font-medium text-[#F5F1E8]">
                  {selectedLead.name}
                </p>

                <p className="mt-1 text-sm text-white/40">
                  {selectedLead.email}
                </p>

                <p className="mt-2 text-xs text-[#65FFAD]">
                  {selectedLead.service} ·{" "}
                  {selectedLead.status}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Subject */}
        <div className="mt-6">
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-medium text-white/70"
          >
            Subject
          </label>

          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(event) =>
              setSubject(event.target.value)
            }
            placeholder="Email subject"
            className="w-full rounded-xl border border-white/10 bg-[#061A13] px-4 py-3 text-sm text-[#F5F1E8] placeholder:text-white/25 outline-none transition focus:border-[#65FFAD]/50"
          />
        </div>

        {/* Message */}
        <div className="mt-6">
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-white/70"
          >
            Message
          </label>

          <textarea
            id="message"
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            placeholder="Write your email message here..."
            rows={16}
            className="w-full resize-y rounded-xl border border-white/10 bg-[#061A13] px-4 py-3 text-sm leading-6 text-[#F5F1E8] placeholder:text-white/25 outline-none transition focus:border-[#65FFAD]/50"
          />
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#65FFAD]/20 bg-[#65FFAD]/5 p-4 text-sm text-[#65FFAD]">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{success}</p>
          </div>
        )}

        {/* Send */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleSendEmail}
            disabled={
              sending ||
              generating ||
              !selectedLeadId
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#65FFAD] px-5 py-3 text-sm font-semibold text-[#061A13] transition hover:bg-[#7cffb9] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Email
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Panel */}
      <aside className="h-fit rounded-2xl border border-[#65FFAD]/15 bg-[#0A241B]/80 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#65FFAD]/10 p-3 text-[#65FFAD]">
            <Bot size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-[#F5F1E8]">
              AI Email Assistant
            </h2>

            <p className="text-xs text-white/40">
              Powered by Gemini
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="ai-prompt"
            className="mb-2 block text-sm font-medium text-white/70"
          >
            AI Instructions
          </label>

          <textarea
            id="ai-prompt"
            value={aiPrompt}
            onChange={(event) =>
              setAiPrompt(event.target.value)
            }
            rows={8}
            placeholder="Tell the AI what kind of email you want..."
            className="w-full resize-y rounded-xl border border-white/10 bg-[#061A13] px-4 py-3 text-sm leading-6 text-[#F5F1E8] placeholder:text-white/25 outline-none transition focus:border-[#65FFAD]/50"
          />
        </div>

        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={
            generating ||
            sending ||
            !selectedLeadId
          }
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#65FFAD]/30 bg-[#65FFAD]/10 px-5 py-3 text-sm font-semibold text-[#65FFAD] transition hover:bg-[#65FFAD]/15 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {generating ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate with AI
            </>
          )}
        </button>

        <div className="mt-5 rounded-xl border border-white/10 bg-[#061A13]/60 p-4">
          <div className="flex gap-3">
            <Bot
              size={18}
              className="mt-0.5 shrink-0 text-[#65FFAD]"
            />

            <p className="text-xs leading-5 text-white/40">
              AI uses the selected lead's information,
              including their service interest, inquiry,
              pipeline status, priority, tags and notes.
              Always review the generated email before
              sending it.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}