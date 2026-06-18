//Digital Marketing Section 

"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { TrendingUp, Megaphone, FileText, BarChart3, ArrowRight } from "lucide-react";
const features = [
  { name: "Social Media", icon: Megaphone, color: "text-emerald-600" },
  { name: "PPC Campaigns", icon: TrendingUp, color: "text-amber-600" },
  { name: "Content Strategy", icon: FileText, color: "text-emerald-600" },
  { name: "Live Analytics", icon: BarChart3, color: "text-blue-600" },
];
export default function DigitalMarketingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("reveal-active");
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 px-6 lg:px-24 bg-white overflow-hidden opacity-0 translate-y-12 transition-all duration-[1.5s] reveal-container"
    >
      {/* Abstract background shapes using brand colors */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px]" />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
        
        {/* Content Side: High-impact typography */}
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full">
             <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
             <span className="text-emerald-800 font-bold text-[10px] uppercase tracking-widest">Growth Engines</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[0.95]">
            Marketing That <span className="text-emerald-600">Converts.</span>
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
            We move beyond vanity metrics. By architecting data-backed funnels, we ensure every click, impression, and interaction drives your bottom line.
          </p>
          <Link href="/services" className="group inline-flex items-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all">
            View Analytics Suite <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        {/* Visual Side: Dashboard/Data aesthetic */}
        <div className="flex-1 w-full grid grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div 
              key={f.name} 
              className={`p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-shadow ${i % 2 !== 0 ? 'mt-8' : ''}`}
            >
              <div className={`mb-4 p-3 rounded-2xl bg-slate-50 w-fit ${f.color}`}>
                <f.icon size={24} />
              </div>
              <h3 className="font-bold text-slate-900">{f.name}</h3>
              <p className="text-xs text-slate-500 mt-1">High-performance optimization</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .reveal-container { transition: opacity 1.5s, transform 1.5s; }
        .reveal-active { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </section>
  );
}