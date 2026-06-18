"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, Mail, Phone, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

const services = [
  { label: "Digital Solutions", href: "#" },
  { label: "Logo Design", href: "#" },
  { label: "App Development", href: "#" },
  { label: "Web Development", href: "#" },
  { label: "Digital Marketing", href: "#" },
];

const company = [
  { label: "About Us", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Knowledge Base", href: "#" },
  { label: "Feedback", href: "#" },
];

const socials = [
  { label: "Fb", href: "#" },
  { label: "Tw", href: "#" },
  { label: "Ln", href: "#" },
];

export default function EnhancedGlassyFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative w-full overflow-hidden bg-slate-900 border-t border-white/5 dark:bg-zinc-950 font-sans">
      
      {/* Editorial Watermark Mesh — Ties directly into the Journey Hero structure */}
    

      {/* Ambient Radial Vignettes */}
      <div className="absolute top-0 right-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/[0.02] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 h-[300px] w-[300px] rounded-full bg-amber-500/[0.01] blur-[100px] pointer-events-none" />

      {/* Top Ambient Data Strip */}
      

      {/* Primary Structure */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Studio Description block with floating identity container */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-md">
                <Compass className="h-5 w-5 text-emerald-400 animate-spin-slow" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">BTech Studio</span>
                <p className="text-[11px] text-zinc-500 uppercase tracking-widest mt-0.5">Digital Transformation</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-zinc-400 max-w-sm">
              An engineering group forging hyper-optimized digital infrastructure, clean tactile interfaces, and secure enterprise application layers.
            </p>

            {/* Monospace Social Tags */}
            <div className="flex items-center gap-2 pt-2">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="text-xs font-mono text-zinc-500 border border-white/5 bg-white/[0.01] px-3 py-1.5 rounded-lg transition-all duration-300 hover:border-white/20 hover:text-white"
                >
                  {s.label} <span className="text-[9px] text-zinc-600">↗</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Blocks grouped into clean visual arrays */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4 lg:col-start-6">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-medium tracking-widest text-zinc-500 uppercase tracking-wider">// Capabilities</span>
              <nav className="flex flex-col space-y-2.5">
                {services.map((item) => (
                  <Link key={item.label} href={item.href} className="group flex items-center text-sm text-zinc-400 transition-colors hover:text-white w-fit">
                    <motion.span whileHover={{ x: 2 }} className="flex items-center">
                      {item.label}
                    </motion.span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <span className="text-[11px] font-mono font-medium tracking-widest text-zinc-500 uppercase tracking-wider">// Core</span>
              <nav className="flex flex-col space-y-2.5">
                {company.map((item) => (
                  <Link key={item.label} href={item.href} className="group flex items-center text-sm text-zinc-400 transition-colors hover:text-white w-fit">
                    <motion.span whileHover={{ x: 2 }} className="flex items-center">
                      {item.label}
                    </motion.span>
                  </Link>
                ))}
              </nav>

              <div className="pt-4 flex flex-col space-y-2 text-xs font-mono text-zinc-500">
                <a href="tel:+12158637222" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <Phone className="h-3 w-3 text-emerald-500/50" /> +1 215 863 7222
                </a>
                <a href="mailto:info@btech.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <Mail className="h-3 w-3 text-emerald-500/50" /> info@btech.com
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Input Layered like real hardware specular panels */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[11px] font-mono font-medium tracking-widest text-zinc-500 uppercase tracking-wider">// Dispatch</span>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Subscribe to receive structural product teardowns and telemetry telemetry straight from our design lab.
            </p>
            
            <div className="space-y-3">
              <div className="relative flex items-center rounded-xl p-1 bg-white/[0.01] border border-white/5 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email string"
                  className="w-full h-9 bg-transparent pl-3 pr-10 text-xs text-white placeholder-zinc-600 outline-none"
                />
                <button 
                  aria-label="Submit Email"
                  className="absolute right-1.5 h-7 w-7 flex items-center justify-center rounded-lg bg-emerald-500 text-slate-950 transition-all duration-300 hover:bg-emerald-400 hover:scale-[1.03] cursor-pointer"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </button>
              </div>
              
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-600">
                <Sparkles className="h-3 w-3 text-amber-500/30 animate-pulse" />
                <span>Encrypted telemetry transfer.</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Copyright Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 border-t border-white/5 py-8 relative z-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-zinc-600" />
            <p>© 2026 BTech Solutions. All systems configured.</p>
          </div>
          
          <nav className="flex items-center gap-6 text-[11px]">
            {bottomLinks.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-zinc-300 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

    </footer>
  );
}

const bottomLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookies", href: "#" },
];