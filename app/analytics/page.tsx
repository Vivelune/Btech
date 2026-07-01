"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Megaphone, 
  TrendingUp, 
  FileText, 
  BarChart3, 
  CheckCircle2, 
  Globe, 
  Zap, 
  LineChart, 
  PieChart 
} from "lucide-react";

const capabilities = [
  {
    name: "Social Media Systems",
    icon: Megaphone,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    metric: "+142% Avg Engagement",
    description: "We don't just post content; we engineer viral loops and hyper-targeted community spaces that actively capture intent.",
    bullets: ["Algorithmic optimization", "Paid social architecture", "Creator/KOL acquisition pipeline"]
  },
  {
    name: "Precision PPC Campaigns",
    icon: TrendingUp,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    metric: "3.8x Target ROAS",
    description: "Algorithmic bidding matrices paired with dynamic creative optimization. Every single dollar is mapped directly to a revenue event.",
    bullets: ["Intent-based Google Search networks", "Retargeting funnel mastery", "CPA programmatic buying"]
  },
  {
    name: "Content Engine & SEO",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    metric: "#1 Ranking Domination",
    description: "Content built around search intelligence. We establish topical authority that out-ranks competitors and secures free, compounding organic traffic.",
    bullets: ["Semantic entity mapping", "Technical core web vitals SEO", "High-intent buyer guide creation"]
  },
  {
    name: "Real-Time Analytics Suite",
    icon: BarChart3,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    metric: "100% Attribution Accuracy",
    description: "No more tracking guesswork. Get custom looker dashboards that track absolute customer lifetime value (LTV) and multi-touch attribution.",
    bullets: ["Server-side tracking & API gating", "Cohorted churn analytics", "Custom event-driven pipelines"]
  },
];

export default function DigitalMarketingDetailsPage() {
  const [activeTab, setActiveTab] = useState("roas");
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("reveal-active");
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll(".reveal-item");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <main ref={pageRef} className="bg-white min-h-screen relative overflow-hidden selection:bg-emerald-500/20">
      
      {/* Dynamic Ambient Background Blurs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-24 pt-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors font-semibold group"
        >
          <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Growth Hub
        </Link>
      </div>

      {/* Hero Header Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24 pt-16 pb-24">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-emerald-800 font-bold text-[10px] uppercase tracking-widest">Enterprise Analytics Suite</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.05]">
            The Data Engine Behind <br />
            <span className="text-emerald-600">High-Velocity Scale.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl pt-2">
            Stop guessing your marketing spend impact. Welcome to our end-to-end performance environment, mapping user behavior directly to balance-sheet results.
          </p>
        </div>
      </section>

      {/* Live Simulation Matrix Dashboard */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24 pb-28 reveal-item opacity-0 translate-y-10 transition-all duration-[1.2s]">
        <div className="bg-slate-950 text-white rounded-[2.5rem] p-8 lg:p-12 shadow-[0_30px_70px_rgba(5,150,105,0.15)] relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Control Panel */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-emerald-400 font-mono tracking-wider uppercase text-xs block">// Live System Interface</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Interactive Funnel Analytics</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Click across our predictive model metrics below to explore how we calibrate scaling pipelines dynamically for premium applications.
              </p>
              
              <div className="space-y-3 pt-2">
                <button 
                  onClick={() => setActiveTab("roas")}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${activeTab === 'roas' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-900/60'}`}
                >
                  <span className="font-semibold text-sm">Target ROAS Modeler</span>
                  <LineChart size={16} />
                </button>
                <button 
                  onClick={() => setActiveTab("cac")}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${activeTab === 'cac' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-900/60'}`}
                >
                  <span className="font-semibold text-sm">CAC Compression Ratio</span>
                  <PieChart size={16} />
                </button>
              </div>
            </div>

            {/* Simulated UI Screen */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4 text-slate-500">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                </div>
                <span>live_analytics_node_v3.ts</span>
              </div>
              
              {activeTab === "roas" ? (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-emerald-400">// Modeling compounding Returns On Ad Spend</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                      <p className="text-slate-500 text-[10px]">AD BUDGET</p>
                      <p className="text-lg font-bold text-white mt-1">$45,000</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                      <p className="text-slate-500 text-[10px]">CONVERSIONS</p>
                      <p className="text-lg font-bold text-emerald-400 mt-1">+382%</p>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                      <p className="text-slate-500 text-[10px]">NET ROAS</p>
                      <p className="text-lg font-bold text-amber-400 mt-1">4.21x</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-950 border border-slate-800 h-24 rounded-lg p-2 flex items-end gap-1">
                    <div className="bg-slate-800 w-full h-[30%] rounded-sm" />
                    <div className="bg-slate-800 w-full h-[45%] rounded-sm" />
                    <div className="bg-slate-700 w-full h-[40%] rounded-sm" />
                    <div className="bg-emerald-600/60 w-full h-[65%] rounded-sm animate-pulse" />
                    <div className="bg-emerald-500 w-full h-[90%] rounded-sm" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-blue-400">// Optimizing and compressing Customer Acquisition Costs</p>
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Baseline Unoptimized CAC:</span>
                      <span className="text-red-400 line-through">$142.50</span>
                    </div>
                    <div className="flex justify-between text-white font-bold">
                      <span>Post Attribution Engine CAC:</span>
                      <span className="text-emerald-400">$38.10</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    By routing pixel triggers via custom clean rooms, server-side handlers capture cold-start profiles without cookie dependency.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-24 pb-32">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950">Deep Pillar Architecture</h2>
          <p className="text-slate-600 text-sm">How we build data channels that predictably move audiences from curiosity to checkout.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap, i) => (
            <div 
              key={cap.name}
              className={`reveal-item opacity-0 translate-y-12 transition-all duration-[1.2s] border border-slate-100 bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group ${i % 2 !== 0 ? 'lg:translate-y-6' : ''}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl ${cap.bgColor} ${cap.color}`}>
                  <cap.icon size={26} />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 bg-slate-900 text-white rounded-full">
                  {cap.metric}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-950 mb-3">{cap.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{cap.description}</p>
              
              <ul className="space-y-2.5 border-t border-slate-100 pt-6">
                {cap.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-100 py-24 px-6 lg:px-24 rounded-t-[3.5rem] relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
            Deploy an Engine That <br />
            <span className="text-emerald-600">Never Stops Compounding.</span>
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto text-sm lg:text-base">
            Connect with our execution strategists for a completely customized cross-channel growth architecture evaluation.
          </p>
          <div className="pt-2">
            <Link 
              href="/contactform" 
              className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-[0_10px_25px_rgba(16,185,129,0.2)] hover:scale-[1.01]"
            >
              Secure Your Growth Audit
              <Zap size={16} />
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .reveal-active { 
          opacity: 1 !important; 
          transform: translateY(0) !important; 
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </main>
  );
}