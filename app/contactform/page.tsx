"use client";

import React, { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Cloud,
  Laptop,
  Smartphone,
  Megaphone,
  Palette,
  FileText,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ChevronDown,
  Mail,
  Clock,
  MapPin,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const services = [
  { icon: <Cloud className="w-4 h-4" />, label: "Digital Solutions" },
  { icon: <Laptop className="w-4 h-4" />, label: "Web Development" },
  { icon: <Smartphone className="w-4 h-4" />, label: "App Development" },
  { icon: <Megaphone className="w-4 h-4" />, label: "Digital Marketing" },
  { icon: <Palette className="w-4 h-4" />, label: "Logo Design" },
  { icon: <FileText className="w-4 h-4" />, label: "Form Builder" },
];

const serviceDescriptions: Record<string, string> = {
  "Digital Solutions": "Cloud infrastructure & digital transformation for modern enterprises.",
  "Web Development": "High-performance websites and web apps built with modern frameworks.",
  "App Development": "Native and cross-platform mobile apps with seamless UX.",
  "Digital Marketing": "Data-driven campaigns across search, social, and content channels.",
  "Logo Design": "Brand identities and visual systems that make lasting impressions.",
  "Form Builder": "Custom forms with integrations, validation, and analytics.",
};

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [selectedService, setSelectedService] = useState("");
  const [activeService, setActiveService] = useState<string | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".gsap-back", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.45, delay: 0.1 })
      .fromTo(".gsap-left", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7 }, "-=0.25")
      .fromTo(".gsap-right", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.7 }, "-=0.6")
      .fromTo(".gsap-service-pill", { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.06 }, "-=0.4");
  }, { scope: containerRef });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xojovoja", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormState("success");
        form.reset();
        setSelectedService("");
        setActiveService(null);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(52,211,153,0.2)",
    color: "#E2F4FF",
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
    e.currentTarget.style.border = "1px solid rgba(52,211,153,0.6)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(52,211,153,0.12)";
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
    e.currentTarget.style.border = "1px solid rgba(52,211,153,0.2)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <main
      ref={containerRef}
      className="min-h-screen font-sans antialiased"
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "linear-gradient(145deg, #060E1A 0%, #081A14 50%, #071220 100%)",
      }}
    >
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(29,78,216,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "45vw", height: "45vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "40%", left: "40%", width: "30vw", height: "30vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)" }} />
      </div>

      {/* Top nav */}
      <div
        className="relative z-10 w-full px-6 sm:px-10 py-4 flex items-center justify-between"
        style={{
          background: "rgba(6,14,26,0.7)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(52,211,153,0.12)",
        }}
      >
        <Link
          href="/"
          className="gsap-back opacity-0 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 group"
          style={{ color: "#7BAFC4" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#34D399")}
          onMouseLeave={e => (e.currentTarget.style.color = "#7BAFC4")}
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to home
        </Link>
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "#2DD4BF", letterSpacing: "0.2em" }}
        >
          BTech Solutions
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row gap-7 items-start">

          {/* ── LEFT PANEL ── hidden on mobile, visible on lg+ ── */}
          <div className="gsap-left opacity-0 hidden lg:flex lg:w-[42%] flex-shrink-0 flex-col gap-5">

            {/* Info card */}
            <div
              className="rounded-2xl p-8 sm:p-10 relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(13,33,65,0.95) 0%, rgba(9,37,30,0.95) 60%, rgba(11,25,50,0.95) 100%)",
                border: "1px solid rgba(52,211,153,0.18)",
                boxShadow: "0 0 60px rgba(29,78,216,0.15), 0 0 40px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Inner glow top */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.4), rgba(96,165,250,0.3), transparent)" }} />
              {/* Radial accent */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(29,78,216,0.15) 0%, transparent 70%)" }} />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)" }} />

              <div className="relative z-10">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "#34D399" }}>
                    Start a Project
                  </p>
                </div>

                <h1
                  className="text-3xl sm:text-4xl font-extrabold leading-[1.12] tracking-tight mb-4"
                  style={{ fontFamily: "'Syne', sans-serif", color: "#E8F4FF" }}
                >
                  Let's build something{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(110deg, #34D399 0%, #2DD4BF 40%, #60A5FA 80%)" }}
                  >
                    great together.
                  </span>
                </h1>

                <p className="text-sm leading-relaxed mb-8" style={{ color: "#7BAFC4" }}>
                  Describe your project and we'll connect you with the right team. Most enquiries get a personal reply within one business day.
                </p>

                {/* Contact details */}
                <div className="space-y-3 mb-8">
                  {[
                    { icon: <Mail className="w-4 h-4" />, label: "info@btechsolutions.com" },
                    { icon: <Clock className="w-4 h-4" />, label: "Mon – Fri, 9 am – 6 pm GMT" },
                    { icon: <MapPin className="w-4 h-4" />, label: "Freetown, Sierra Leone" },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-3 text-sm" style={{ color: "#CBD5E1" }}>
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(52,211,153,0.1)",
                          border: "1px solid rgba(52,211,153,0.2)",
                          color: "#34D399",
                        }}
                      >
                        {icon}
                      </span>
                      {label}
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px w-full mb-7" style={{ background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.2), rgba(96,165,250,0.15), transparent)" }} />

                {/* Services label */}
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA] shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "#60A5FA" }}>
                    Our Services
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => { setSelectedService(s.label); setActiveService(s.label); }}
                      className="gsap-service-pill opacity-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer"
                      style={
                        activeService === s.label
                          ? {
                              background: "linear-gradient(110deg, rgba(52,211,153,0.25), rgba(96,165,250,0.2))",
                              border: "1px solid rgba(52,211,153,0.5)",
                              color: "#34D399",
                              boxShadow: "0 0 12px rgba(52,211,153,0.2)",
                            }
                          : {
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "#7BAFC4",
                            }
                      }
                    >
                      <span style={{ color: activeService === s.label ? "#34D399" : "#60A5FA" }}>{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Active service description */}
                {activeService && (
                  <div
                    className="mt-4 px-4 py-3 rounded-xl text-xs leading-relaxed transition-all duration-300"
                    style={{
                      background: "rgba(52,211,153,0.06)",
                      border: "1px solid rgba(52,211,153,0.15)",
                      color: "#7BAFC4",
                    }}
                  >
                    <span className="font-bold" style={{ color: "#34D399" }}>{activeService}: </span>
                    {serviceDescriptions[activeService]}
                  </div>
                )}
              </div>
            </div>

            {/* Trust badge */}
            <div
              className="rounded-2xl px-6 py-5 flex items-center gap-4"
              style={{
                background: "linear-gradient(135deg, rgba(13,33,65,0.9) 0%, rgba(9,37,30,0.9) 100%)",
                border: "1px solid rgba(96,165,250,0.2)",
                boxShadow: "0 0 30px rgba(96,165,250,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(52,211,153,0.12)",
                  border: "1px solid rgba(52,211,153,0.25)",
                  boxShadow: "0 0 16px rgba(52,211,153,0.15)",
                }}
              >
                <CheckCircle2 className="w-5 h-5" style={{ color: "#34D399" }} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "#E2F4FF" }}>100% response guaranteed</p>
                <p className="text-xs mt-0.5" style={{ color: "#7BAFC4" }}>Every submission gets a personal reply — no bots, no templates.</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL — FORM ── full width on mobile, flex-1 on lg+ ── */}
          <div className="gsap-right opacity-0 w-full lg:flex-1 max-w-2xl mx-auto lg:max-w-none lg:mx-0">
            <div
              className="rounded-2xl p-8 sm:p-10 relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, rgba(11,28,60,0.97) 0%, rgba(8,32,26,0.97) 55%, rgba(10,22,48,0.97) 100%)",
                border: "1px solid rgba(52,211,153,0.2)",
                boxShadow: "0 0 80px rgba(29,78,216,0.18), 0 0 50px rgba(16,185,129,0.1), inset 0 1px 0 rgba(255,255,255,0.07)",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Top shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.5), rgba(52,211,153,0.5), transparent)" }} />
              {/* Corner glow top-right */}
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 65%)" }} />
              {/* Corner glow bottom-left */}
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(29,78,216,0.12) 0%, transparent 65%)" }} />

              {formState === "success" ? (
                <div className="relative z-10 flex flex-col items-center justify-center py-16 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                    style={{
                      background: "rgba(52,211,153,0.12)",
                      border: "1px solid rgba(52,211,153,0.3)",
                      boxShadow: "0 0 30px rgba(52,211,153,0.2)",
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8" style={{ color: "#34D399" }} />
                  </div>
                  <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif", color: "#E2F4FF" }}>
                    Message received!
                  </h2>
                  <p className="text-sm max-w-xs leading-relaxed" style={{ color: "#7BAFC4" }}>
                    We'll review your project and get back to you within one business day.
                  </p>
                  <button
                    onClick={() => { setFormState("idle"); setActiveService(null); }}
                    className="mt-8 text-sm font-semibold underline underline-offset-4 transition-colors duration-200"
                    style={{ color: "#34D399" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#E2F4FF")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#34D399")}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="relative z-10">
                  {/* Form header */}
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#2DD4BF", boxShadow: "0 0 8px rgba(45,212,191,0.8)" }} />
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: "#2DD4BF" }}>
                        Send a Message
                      </p>
                    </div>
                    <h2
                      className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1.5"
                      style={{ fontFamily: "'Syne', sans-serif", color: "#E8F4FF" }}
                    >
                      Tell us about your project
                    </h2>
                    <p className="text-sm" style={{ color: "#7BAFC4" }}>
                      Fields marked <span className="font-bold" style={{ color: "#34D399" }}>*</span> are required.
                    </p>
                  </div>

                  {formState === "error" && (
                    <div
                      className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm mb-6"
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "#FCA5A5",
                      }}
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Something went wrong. Please try again or email us directly.</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: "#7BAFC4" }}>
                          Full Name <span style={{ color: "#34D399" }}>*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Amb Hassan Conteh"
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                          style={{ ...inputStyle, caretColor: "#34D399" }}
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: "#7BAFC4" }}>
                          Email Address <span style={{ color: "#34D399" }}>*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="hassan@btech.com"
                          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
                          style={{ ...inputStyle, caretColor: "#34D399" }}
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                        />
                      </div>
                    </div>

                    {/* Service select */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="service" className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: "#7BAFC4" }}>
                        Service Needed <span style={{ color: "#34D399" }}>*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="service"
                          name="service"
                          required
                          value={selectedService}
                          onChange={(e) => { setSelectedService(e.target.value); setActiveService(e.target.value); }}
                          className="w-full appearance-none rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 cursor-pointer pr-10"
                          style={{ ...inputStyle, colorScheme: "dark" }}
                          onFocus={inputFocus}
                          onBlur={inputBlur}
                        >
                          <option value="" disabled style={{ background: "#0B1C3C", color: "#3D6B7A" }}>
                            Select a service…
                          </option>
                          {services.map((s) => (
                            <option key={s.label} value={s.label} style={{ background: "#0B1C3C", color: "#E2F4FF" }}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "#3D6B7A" }} />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: "#7BAFC4" }}>
                        Message <span style={{ color: "#34D399" }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Describe your project — what you're building, your timeline, any specific requirements…"
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 resize-none leading-relaxed"
                        style={{ ...inputStyle, caretColor: "#34D399" }}
                        onFocus={inputFocus}
                        onBlur={inputBlur}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className="group w-full flex items-center justify-center gap-2.5 font-bold text-sm px-8 py-4 rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(110deg, #1a6b4a 0%, #1D4ED8 50%, #0e7c5a 100%)",
                        backgroundSize: "200% auto",
                        color: "#E8F4FF",
                        boxShadow: "0 4px 24px rgba(52,211,153,0.25), 0 2px 12px rgba(29,78,216,0.2)",
                        border: "1px solid rgba(52,211,153,0.3)",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundPosition = "right center";
                        e.currentTarget.style.boxShadow = "0 6px 32px rgba(52,211,153,0.4), 0 2px 16px rgba(29,78,216,0.3)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundPosition = "left center";
                        e.currentTarget.style.boxShadow = "0 4px 24px rgba(52,211,153,0.25), 0 2px 12px rgba(29,78,216,0.2)";
                      }}
                    >
                      {formState === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 stroke-[2.5]" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs pt-1" style={{ color: "#3D6B7A" }}>
                      We respect your privacy. Your details are never shared with third parties.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
