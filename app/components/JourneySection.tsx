"use client";

import { motion } from "framer-motion";
import { Compass, Mail, Phone, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function GlassyJourneySection() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-900 px-4 py-20 dark:bg-zinc-950 sm:px-6 lg:px-16">
      
      {/* 1. Ambient Background Textures (Simulating image_cef666.jpg sunset gradients) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.05),transparent_50%)]" />
      
      {/* Structural grid lines from your main theme */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Massive Editorial Background Type (Layered underneath the main glass sheet) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none text-[15vw] font-black tracking-tighter text-white/[0.02] dark:text-zinc-900/10 uppercase whitespace-nowrap z-0">
        BTECH WORKS
      </div>

      {/* 2. Premium Frosted Glass Card Wrapper */}
      <div className="relative z-10 w-full max-w-xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] dark:border-zinc-800/40 dark:bg-zinc-950/20 sm:p-12 lg:p-16">
        
        {/* Internal Core Glow Source */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-emerald-500/20 blur-[60px] dark:bg-emerald-500/10" />

        <div className="flex w-full flex-col items-center text-center space-y-8">
          
          {/* Glass Shield Icon Holder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-md dark:border-zinc-800 dark:bg-black/40"
          >
            <Compass className="h-7 w-7 animate-spin-slow text-emerald-400" />
          </motion.div>

          {/* Typography Layer */}
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]"
            >
              Ready to start your{" "}
              <span className="relative inline-block font-black text-transparent bg-clip-text bg-[length:200%_auto] bg-[linear-gradient(110deg,#34d399,#10b981,#34d399,#0d9488,#34d399)] animate-shimmer">
                journey?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-sm text-sm leading-relaxed text-slate-400 dark:text-zinc-400"
            >
              Let&apos;s create something extraordinary together. Your vision combined with our technical execution strategy.
            </motion.p>
          </div>

          {/* Hyper-minimal micro-quote pill matching details from image_cef666.jpg */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-full border border-white/5 bg-white/[0.02] px-4 py-1.5 backdrop-blur-sm"
          >
            <p className="text-[11px] font-mono tracking-wider uppercase text-slate-400 dark:text-zinc-500 flex items-center justify-center gap-2">
              <span>// Vision into reality</span>
              <Sparkles className="h-3 w-3 text-amber-400 shrink-0" />
            </p>
          </motion.div>

          {/* Action Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
          >
            <Link
              href="/contactform"
              className="group flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-black/20 transition-all duration-200 hover:bg-slate-100 hover:scale-[1.02]"
            >
              Get Started Today
              <Mail className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="tel:+12158637222"
              className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:bg-white/[0.08]"
            >
              <Phone className="h-4 w-4 text-emerald-400" />
              +1 215 863 7222
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Floating System Glass Trigger Utility Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] shadow-2xl backdrop-blur-xl transition-colors hover:bg-white/[0.1]"
      >
        <ArrowUpRight className="h-5 w-5 text-white" />
      </motion.button>
    </section>
  );
}