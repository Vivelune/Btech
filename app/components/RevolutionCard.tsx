"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Globe, ShieldAlert, Timer } from "lucide-react";
import Link from "next/link";

export default function RevolutionCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 py-24 sm:px-6 select-none"
    >
      {/* Premium Minimalist Light Ambient Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(15,23,42,0.02)_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Main Structural Editorial Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-xl rounded-[2.5rem] border border-slate-200/60 bg-white/80 p-8 backdrop-blur-3xl sm:p-12 shadow-[0_32px_64px_rgba(15,23,42,0.04)]"
      >
        {/* Subtle Pure Green Highlight Edge */}
        <div className="absolute inset-x-24 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-emerald-600">
              Market Intelligence
            </span>
          </div>
          <span className="text-xs tracking-widest text-slate-400 font-medium uppercase">
            Insight Brief
          </span>
        </div>

        {/* Bold Editorial Title Block */}
        <div className="mt-10 space-y-5">
          <h2 className="text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl leading-[1.1]">
            The Digital Shift <br />
            <span className="font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-emerald-600">
              Accelerates Daily.
            </span>
          </h2>
          <p className="text-base font-normal text-slate-500 max-w-md leading-relaxed">
            Inaction carries compounding operational risk. Forward-looking enterprises must redefine their baseline to capture modern scale.
          </p>
        </div>

        {/* Clean Metrics Track Stack */}
        <div className="mt-10 space-y-2.5">
          
          {/* Track Item 01 */}
          <motion.div
            whileHover={{ backgroundColor: "rgba(16,185,129,0.01)", borderColor: "rgba(16,185,129,0.3)" }}
            className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 transition-all duration-300 group/item"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 group-hover/item:border-emerald-500/30 transition-colors shadow-sm">
                <Globe className="h-4 w-4 text-slate-400 group-hover/item:text-emerald-600 transition-colors" />
              </div>
              <span className="text-sm font-medium text-slate-800 tracking-wide">Global Trajectory</span>
            </div>
            <span className="text-xs font-semibold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
              Hyper-Scale
            </span>
          </motion.div>

          {/* Track Item 02 */}
          <motion.div
            whileHover={{ backgroundColor: "rgba(16,185,129,0.01)", borderColor: "rgba(16,185,129,0.3)" }}
            className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 transition-all duration-300 group/item"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 group-hover/item:border-emerald-500/30 transition-colors shadow-sm">
                <ShieldAlert className="h-4 w-4 text-slate-400 group-hover/item:text-emerald-600 transition-colors" />
              </div>
              <span className="text-sm font-medium text-slate-800 tracking-wide">Legacy Vulnerability</span>
            </div>
            <span className="text-xs font-semibold tracking-wider text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full">
              Critical Risk
            </span>
          </motion.div>

          {/* Track Item 03 */}
          <motion.div
            whileHover={{ backgroundColor: "rgba(16,185,129,0.01)", borderColor: "rgba(16,185,129,0.3)" }}
            className="flex items-center justify-between rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 transition-all duration-300 group/item"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 group-hover/item:border-emerald-500/30 transition-colors shadow-sm">
                <Timer className="h-4 w-4 text-slate-400 group-hover/item:text-emerald-600 transition-colors" />
              </div>
              <span className="text-sm font-medium text-slate-800 tracking-wide">Deployment Window</span>
            </div>
            <span className="text-xs font-bold tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-2 shadow-[0_2px_8px_rgba(16,185,129,0.08)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Now
            </span>
          </motion.div>

        </div>

        {/* Premium Strategic Statement Callout */}
        <div className="mt-8 relative overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-b from-slate-50 to-white p-6">
          <div className="absolute top-5 right-5">
            <Sparkles className="h-4 w-4 text-emerald-500/30" />
          </div>
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase block">
            Executive Assessment
          </span>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 font-light">
            While strategies are debated in silos, market anomalies are captured swiftly by operators utilizing fluid internal automation and dynamic customer experiences. The window to secure decisive <span className="font-semibold text-emerald-600">leverage is narrowing</span>.
          </p>
        </div>

        {/* High-Contrast Luxury Slate-to-Green Action Button */}
        <div className="mt-10">
          <Link href="/contactform">
          <button className="group w-full flex items-center justify-between rounded-2xl bg-slate-950 p-4 transition-all duration-300 hover:bg-slate-900 hover:scale-[1.01] shadow-[0_20px_40px_rgba(15,23,42,0.15)] cursor-pointer border-0">
            <div className="pl-2">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400 block text-left">
                Next Steps
              </span>
              <h3 className="text-xl font-black text-white tracking-tight mt-0.5">
                Begin Transformation
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white transition-all duration-300 group-hover:bg-emerald-600 group-hover:scale-105 shadow-[0_4px_12px_rgba(16,185,129,0.3)]">
              <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
            </div>
          </button>
          </Link>
        </div>

      </motion.div>
    </section>
  );
}