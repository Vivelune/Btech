"use client";

import { useState } from "react";
import { Eye, Pencil, RefreshCcw, Send } from "lucide-react";

import LeadSelector from "./LeadSelector";
import RichTextEditor from "./RichTextEditor";
import AIPrompt from "./AIPromt";
import EmailPreview from "./EmailPreview";
import { demoLeads } from "../sales-data";

export default function ComposeForm() {
  const [leadId, setLeadId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const selectedLead = demoLeads.find(
    (lead) => lead.id === leadId
  );

  function handleGenerate(text: string) {
    setBody(text);

    if (!subject) {
      setSubject("Following up on your interest in BTech Solutions");
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">

      <div className="space-y-6">

        <div className="rounded-2xl border border-emerald-900/40 bg-[#102D22] p-6">

          <h2 className="text-lg font-bold">
            Compose Email
          </h2>

          <p className="mt-1 text-sm text-emerald-100/50">
            Create and review a personalized sales email.
          </p>

          <div className="mt-6 space-y-5">

            <LeadSelector
              value={leadId}
              onChange={setLeadId}
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-emerald-100">
                Subject
              </label>

              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject..."
                className="w-full rounded-xl border border-emerald-900/50 bg-[#0b241b] px-4 py-3 text-sm text-[#F5F1E8] outline-none placeholder:text-emerald-100/30 focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-emerald-100">
                Email Body
              </label>

              <RichTextEditor
                value={body}
                onChange={setBody}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-800 px-4 py-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-900/40"
              >
                <Eye size={17} />
                Review
              </button>

              <button
                type="button"
                onClick={() => setBody("")}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-800 px-4 py-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-900/40"
              >
                <Pencil size={17} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => setBody(body)}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-800 px-4 py-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-900/40"
              >
                <RefreshCcw size={17} />
                Regenerate
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-[#071a13] hover:bg-emerald-300"
              >
                <Send size={17} />
                Send Email
              </button>
            </div>
          </div>
        </div>

        <AIPrompt onGenerate={handleGenerate} />
      </div>

      <div>
        {showPreview ? (
          <EmailPreview
            subject={subject}
            body={body}
            recipient={selectedLead?.email ?? ""}
          />
        ) : (
          <div className="rounded-2xl border border-dashed border-emerald-800 bg-[#102D22] p-10 text-center">
            <Eye
              size={32}
              className="mx-auto text-emerald-300"
            />

            <h3 className="mt-4 font-bold">
              Email Preview
            </h3>

            <p className="mt-2 text-sm text-emerald-100/50">
              Click Review to preview your email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}