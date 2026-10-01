"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

type AIPromptProps = {
  leadId: string;
  prompt: string;
  onPromptChange: (value: string) => void;
  onGenerated: (data: {
    subject: string;
    body: string;
  }) => void;
};

export default function AIPrompt({
  leadId,
  prompt,
  onPromptChange,
  onGenerated,
}: AIPromptProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateEmail() {
    if (!leadId) {
      setError("Please select a lead first.");
      return;
    }

    if (!prompt.trim()) {
      setError("Please enter instructions for the AI.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/ai/generate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId,
          prompt: prompt.trim(),
        }),
      });

      const raw = await response.text();

      let data: {
        subject?: string;
        body?: string;
        error?: string;
      } = {};

      if (raw.trim()) {
        try {
          data = JSON.parse(raw);
        } catch (parseError) {
          console.error("AI JSON parse error:", parseError);

          throw new Error(
            "The AI server returned an invalid response."
          );
        }
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            `AI request failed with status ${response.status}.`
        );
      }

      if (!data.subject || !data.body) {
        throw new Error(
          "The AI response did not contain a subject and email body."
        );
      }

      onGenerated({
        subject: data.subject,
        body: data.body,
      });
    } catch (error) {
      console.error("AI generation error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to generate email."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-[#65FFAD]/15 bg-[#0A241B]/80 p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#65FFAD]/10 text-[#65FFAD]">
          <Sparkles size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-[#F5F1E8]">
            AI Email Assistant
          </h3>

          <p className="text-xs text-white/40">
            Generate a personalized email from the selected lead.
          </p>
        </div>
      </div>

      <label
        htmlFor="ai-prompt"
        className="mb-2 block text-sm font-medium text-[#F5F1E8]"
      >
        Instructions for AI
      </label>

      <textarea
        id="ai-prompt"
        value={prompt}
        onChange={(event) => {
          onPromptChange(event.target.value);
          if (error) {
            setError("");
          }
        }}
        placeholder="Example: Write a friendly follow-up email explaining our web development service and invite the lead to schedule a short call."
        rows={5}
        className="w-full resize-none rounded-xl border border-white/10 bg-[#061A13] px-4 py-3 text-sm text-[#F5F1E8] outline-none placeholder:text-white/25 focus:border-[#65FFAD]/50"
        disabled={loading}
      />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-white/35">
          The AI uses the selected lead&apos;s CRM information.
        </p>

        <button
          type="button"
          onClick={generateEmail}
          disabled={loading || !leadId}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#65FFAD] px-5 py-2.5 text-sm font-bold text-[#062017] transition hover:bg-[#4ade80] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2
                size={17}
                className="animate-spin"
              />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={17} />
              Generate AI Email
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}
    </div>
  );
}