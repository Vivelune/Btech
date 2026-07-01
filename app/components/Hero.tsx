"use client";

import React, { useRef } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Cloud, 
  Laptop, 
  Smartphone, 
  Megaphone, 
  Palette, 
  FileText, 
  MessageSquare 
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";


const streamlinedCapabilities = [
  { icon: <Cloud className="w-5 h-5 text-[#39ef73]" />, label: "Digital Solutions" },
  { icon: <Laptop className="w-5 h-5 text-[#39ef73]" />, label: "Web Development" },
  { icon: <Smartphone className="w-5 h-5 text-[#39ef73]" />, label: "App Development" },
  { icon: <Megaphone className="w-5 h-5 text-[#39ef73]" />, label: "Digital Marketing" },
  { icon: <Palette className="w-5 h-5 text-[#39ef73]" />, label: "Logo Design" },
  { icon: <FileText className="w-5 h-5 text-[#39ef73]" />, label: "Form Builder" },
];

export default function Hero() {
  const containerScope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.fromTo(".gsap-badge", { opacity: 0, scale: 0.95, y: -20 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, delay: 0.2 })
      .fromTo(".gsap-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
      .fromTo(".gsap-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
      .fromTo(".gsap-cta", { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.4")
      .fromTo(".gsap-panel", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.6")
      .fromTo(".gsap-tag-item", { opacity: 0, scale: 0.9, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05 }, "-=0.4");
  }, { scope: containerScope });

  return (
    <section 
      ref={containerScope}
      className="relative w-full min-h-screen bg-[#062615] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0d4722] via-[#062615] to-[#03140b] text-white overflow-hidden font-sans flex flex-col justify-between antialiased select-none"
    >
      
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=20')] bg-cover bg-center opacity-5 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[32rem] bg-[#39ef73]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto px-6 sm:px-12 text-center flex-1 flex flex-col justify-center items-center z-10 pt-28">
        <div className="gsap-badge opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm backdrop-blur-md w-fit mb-8 shadow-inner">
          
          <span className="text-xs font-bold tracking-widest text-gray-200 uppercase">The Future of Digital Integration</span>
        </div>
        
        <h1 className="gsap-title opacity-0 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 max-w-3xl">
          Build the <br />
          <span className="bg-gradient-to-r from-[#86f5a6] via-[#39ef73] to-[#a3f9be] bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(57,239,115,0.2)]">
            impossible solutions.
          </span>
        </h1>
        
        <p className="gsap-desc opacity-0 text-base sm:text-lg text-gray-300/90 font-normal max-w-2xl leading-relaxed mb-10">
          Transform ambitious operational concepts into high-efficiency production platforms with optimized user workflows, modern clean layouts, and scalable technology systems.
        </p>
        
        <div className="gsap-cta opacity-0">
          <Link href="/contactform">
          <button className="group relative flex items-center gap-3 bg-gradient-to-r from-[#1ad154] to-[#39ef73] text-[#03140b] font-bold px-8 py-4 rounded-xl shadow-[0_4px_30px_rgba(57,239,115,0.3)] transition-all duration-300 active:scale-[0.98] w-fit cursor-pointer">
            <span>Get Started Today</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 stroke-[2.5]" />
          </button>
          </Link>
        </div>
      </div>

      <div className="gsap-panel opacity-0 w-full bg-[#03140b]/60 border-t border-white/10 backdrop-blur-md relative z-10 py-10">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-12">
          
          <p className="text-center text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-6">
            Core Specialized Enterprise Capability Streams
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {streamlinedCapabilities.map((capability, idx) => (
              <div
                key={idx}
                className="gsap-tag-item opacity-0 flex flex-col items-start justify-between p-5 rounded-xl bg-white/[0.03] border border-white/10 transition-all duration-300 hover:bg-white/[0.06] hover:border-[#39ef73]/40 hover:-translate-y-1 group shadow-md"
              >
                <div className="bg-[#03140b]/80 p-2.5 rounded-xl border border-white/5 transition-all duration-300 group-hover:scale-105 group-hover:border-[#39ef73]/20 shadow-inner mb-4">
                  {capability.icon}
                </div>
                <span className="text-xs font-bold tracking-tight text-gray-300 group-hover:text-white transition-colors duration-200">
                  {capability.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
<Link href="/contactform" className="fixed bottom-6 right-6 w-14 h-14 rounded-xl bg-gradient-to-r from-[#1ad154] to-[#39ef73] text-[#03140b] flex items-center justify-center shadow-lg shadow-[#39ef73]/20 transition-all duration-300 hover:scale-105 active:scale-95 z-50 group cursor-pointer border border-white/10"
>
  <MessageSquare className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6 stroke-[2.5]"/>
 </Link>

    </section>
  );
}