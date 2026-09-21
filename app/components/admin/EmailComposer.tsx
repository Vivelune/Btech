"use client";

import { useState, useTransition } from "react";

type EmailRecord = {
  id: string;
  subject: string;
  status: string;
};

const STATUS_COLORS: Record<string, string> = {
  QUEUED: "text-white/40",
  SENT: "text-sky-300",
  DELIVERED: "text-[#4ade80]",
  OPENED: "text-[#65FFAD]",
  BOUNCED: "text-red-400",
  REPLIED: "text-violet-300",
  FAILED: "text-red-500",
};

export default function EmailComposer({
  leadId,
  emails,
}: {
  leadId: string;
  emails: EmailRecord[];
}) {
  const [prompt, setPrompt] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isGenerating, startGenerating] = useTransition();
  const [isSending, startSending] = useTransition();
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  function handleGenerate() {
    if (!prompt.trim()) {
      setMessage({ type: "error", text: "Enter instructions for the AI first." });
      return;
    }
    setMessage(null);
    startGenerating(async () => {
      try {
        const res = await fetch("/api/ai/generate-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leadId, prompt }),
        });
        const data = await res.json();
        if (!res.ok) {
          setMessage({ type: "error", text: data.error ?? "Generation failed." });
          return;
        }
        setSubject(data.subject);
        setBody(data.body);
      } catch {
        setMessage({ type: "error", text: "Generation failed." });
      }
    });
  }

  function handleSend() {
    if (!subject.trim() || !body.trim()) {
      setMessage({ type: "error", text: "Subject and body are required." });
      return;
    }
    setMessage(null);
    startSending(async () => {
      try {
        const res = await fetch("/api/emails/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leadId, subject, body }),
        });
        const data = await res.json();
        if (!res.ok) {
          setMessage({ type: "error", text: data.error ?? "Send failed." });
          return;
        }
        setMessage({ type: "success", text: "Email sent." });
        setSubject("");
        setBody("");
        setPrompt("");
      } catch {
        setMessage({ type: "error", text: "Send failed." });
      }
    });
  }

  return (
    <div className="mt-3 space-y-4">
      {emails.length > 0 && (
        <div className="space-y-1.5">
          {emails.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-[12.5px]"
            >
              <span className="truncate text-white/70">{e.subject}</span>
              <span
                className={`ml-2 shrink-0 font-bold uppercase ${
                  STATUS_COLORS[e.status] ?? "text-white/40"
                }`}
              >
                {e.status}
              </span>
            </div>
          ))}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
          AI draft instructions
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Friendly follow-up offering a discount"
            className="flex-1 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#F5F1E8] placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="shrink-0 rounded-full border border-[#4ade80]/40 bg-[#4ade80]/10 px-4 py-2 text-[12.5px] font-bold text-[#4ade80] transition hover:bg-[#4ade80]/20 disabled:opacity-50"
          >
            {isGenerating ? "Generating…" : "Generate with AI"}
          </button>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#F5F1E8] focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/40">
          Body (HTML)
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#F5F1E8] focus:outline-none focus:ring-1 focus:ring-[#4ade80]"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSend}
          disabled={isSending}
          className="rounded-full bg-[#3a9e5f] px-5 py-2 text-[13px] font-bold text-[#04140b] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50"
        >
          {isSending ? "Sending…" : "Send email"}
        </button>

        {message && (
          <p
            className={`text-[13px] ${
              message.type === "error" ? "text-red-400" : "text-[#4ade80]"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}