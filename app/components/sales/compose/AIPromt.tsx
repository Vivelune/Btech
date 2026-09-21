"use client";

import { Bot, Sparkles } from "lucide-react";
import { useState } from "react";

type Props = {
  onGenerate: (text: string) => void;
};

export default function AIPrompt({
  onGenerate,
}: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!prompt.trim()) return;

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    onGenerate(
      `Hello,\n\nThank you for your interest in BTech Solutions. Based on your request regarding "${prompt}", we would be happy to discuss how our services can support your business.\n\nPlease let us know a convenient time for a discussion.\n\nBest regards,\nAlhaji\nBTech Solutions`
    );

    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-emerald-800/50 bg-emerald-400/5 p-5">
      <div className="flex items-center gap-2">
        <Bot size={18} className="text-emerald-300" />

        <h3 className="font-bold">
          AI Email Assistant
        </h3>
      </div>

      <p className="mt-2 text-xs text-emerald-100/50">
        Describe what you want the email to say and generate
        a draft.
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        placeholder="Example: Write a professional follow-up for a company interested in web design..."
        className="mt-4 w-full resize-none rounded-xl border border-emerald-900/50 bg-[#0b241b] p-4 text-sm text-[#F5F1E8] outline-none placeholder:text-emerald-100/30 focus:border-emerald-400"
      />

      <button
        type="button"
        onClick={generate}
        disabled={loading || !prompt.trim()}
        className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-bold text-[#071a13] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Sparkles size={17} />
        {loading ? "Generating..." : "Generate with AI"}
      </button>
    </div>
  );
}