"use client";

import { useState } from "react";
import {
  Sparkles,
  Eye,
  RefreshCw,
  Send,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

export default function ComposeEditor() {
  const [body, setBody] = useState(
    "Hello Alhaji,\n\nI wanted to reach out regarding how BTech can support your digital needs.\n\nBest regards,\nBTech Sales Team"
  );

  const [prompt, setPrompt] = useState("");

  function generateWithAI() {
    if (!prompt.trim()) return;

    setBody(
      `Hello Alhaji,\n\n${prompt}\n\nI would be happy to discuss this further with you.\n\nBest regards,\nBTech Sales Team`
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-white/10 bg-[#0A241B]/80 p-6">
        <div className="grid gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Select Lead
            </label>

            <select className="w-full rounded-xl border border-white/10 bg-[#102D22] px-4 py-3 text-sm text-[#F5F1E8] outline-none focus:border-[#65FFAD]/50">
              <option>Alhaji Kamara — Kamara Construction</option>
              <option>Mohamed Conteh — Conteh Enterprises</option>
              <option>Sarah Johnson — Johnson Digital</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Subject
            </label>

            <input
              defaultValue="Let’s discuss how BTech can help your business"
              className="w-full rounded-xl border border-white/10 bg-[#102D22] px-4 py-3 text-sm text-[#F5F1E8] outline-none focus:border-[#65FFAD]/50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Email Body
            </label>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#102D22]">
              <div className="flex gap-1 border-b border-white/10 p-2">
                {[Bold, Italic, Underline].map((Icon, index) => (
                  <button
                    key={index}
                    type="button"
                    className="rounded-lg p-2 text-white/50 hover:bg-white/10 hover:text-white"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>

              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={14}
                className="w-full resize-none bg-transparent p-4 text-sm leading-7 text-[#F5F1E8] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-[#F5F1E8] hover:bg-white/[0.05]">
              <Eye size={16} />
              Review
            </button>

            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-[#F5F1E8] hover:bg-white/[0.05]">
              <RefreshCw size={16} />
              Regenerate
            </button>

            <button className="inline-flex items-center gap-2 rounded-xl bg-[#65FFAD] px-5 py-2.5 text-sm font-bold text-[#062017] hover:bg-[#4ade80]">
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#65FFAD]/10 bg-[#0A241B]/80 p-5">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-[#65FFAD]" />

          <h2 className="font-semibold text-[#F5F1E8]">
            AI Assistant
          </h2>
        </div>

        <p className="mt-2 text-sm leading-6 text-white/40">
          Tell the AI what you want the email to communicate.
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={8}
          placeholder="Example: Write a friendly introduction explaining BTech's web design service..."
          className="mt-5 w-full rounded-xl border border-white/10 bg-[#102D22] p-4 text-sm text-[#F5F1E8] outline-none placeholder:text-white/25 focus:border-[#65FFAD]/50"
        />

        <button
          onClick={generateWithAI}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#65FFAD] px-4 py-3 text-sm font-bold text-[#062017] hover:bg-[#4ade80]"
        >
          <Sparkles size={16} />
          Generate with AI
        </button>
      </div>
    </div>
  );
}