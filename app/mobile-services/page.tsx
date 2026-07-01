"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Terminal, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight 
} from "lucide-react";

const steps = [
  {
    phase: "Phase 01",
    title: "Discovery & Architecture",
    description: "Before laying a single line of code, we deep-dive into your system requirements. We map out data flows, system integrations, and choose the optimal tech stack tailored for ultimate longevity.",
    icon: <Terminal size={24} />,
    deliverables: ["Technical Specification Document", "API & Database Schema blueprints", "Infrastructure cost estimates"]
  },
  {
    phase: "Phase 02",
    title: "High-Fidelity Prototyping",
    description: "We sculpt user journeys that feel native and effortless. By building interactive, responsive wireframes, we eliminate friction points early and secure user-experience validation.",
    icon: <Layers size={24} />,
    deliverables: ["Interactive Figma Prototypes", "Component Design System", "User Persona Mapping"]
  },
  {
    phase: "Phase 03",
    title: "Agile Engineering & Sprinting",
    description: "Our development follows clean-code paradigms. We build with modular architecture, strict TypeScript typing, and optimize every query to promise sub-millisecond execution speeds.",
    icon: <Cpu size={24} />,
    deliverables: ["Milestone Demo Releases", "CI/CD Deployment Pipelines", "Optimized Production Builds"]
  },
  {
    phase: "Phase 04",
    title: "Quality Assurance & Launch",
    description: "Rigorous automated end-to-end testing meets manual vulnerability assessments. We fine-tune your platform for App Store guidelines and web core vitals before flipping the switch.",
    icon: <ShieldCheck size={24} />,
    deliverables: ["Automated Test Suites", "Security Penetration Report", "App Store / Cloud Deployment"]
  }
];

export default function DevelopmentDetailsPage() {
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll(".reveal-item");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main ref={pageRef} className="bg-slate-50 min-h-screen relative overflow-hidden selection:bg-emerald-500/30">
      
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-slate-900/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navigation Strip */}
      <div className="max-w-7xl mx-auto px-6 lg:px-24 pt-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors font-semibold group"
        >
          <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Platform Overview
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24 pt-16 pb-24 text-center lg:text-left">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            <Sparkles size={14} /> Blueprint for Execution
          </span>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-950 tracking-tight leading-[1.05]">
            How We Build <br />
            <span className="text-emerald-600">Enterprise Value.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed pt-2">
            Great software isn't built by accident. We use a transparent, high-precision lifecycle management process to ensure your web and mobile applications hit the market flawlessly.
          </p>
        </div>
      </section>

      {/* Interactive Process Timeline */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24 pb-32">
        <div className="relative border-l border-slate-200 ml-4 lg:ml-8 pl-8 lg:pl-16 space-y-20">
          
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative reveal-item opacity-0 translate-y-12 transition-all duration-[1.2s] ease-out"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[51px] lg:-left-[83px] top-0 bg-slate-900 text-white w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-bold border-4 border-slate-50 shadow-md">
                {index + 1}
              </div>

              {/* Step Content Architecture */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-emerald-600 font-bold tracking-[0.15em] uppercase text-[11px]">
                    {step.phase}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-950 flex items-center gap-3">
                    <span className="text-emerald-600 bg-emerald-50 p-2 rounded-xl border border-emerald-100 block lg:hidden">
                      {step.icon}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base lg:text-lg">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Card (Glassmorphic Side Panel) */}
                <div className="lg:col-span-5 bg-white/70 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group hover:border-emerald-200">
                  <div className="flex items-center gap-3 mb-4 text-slate-800 font-bold text-sm uppercase tracking-wide">
                    <div className="hidden lg:block text-emerald-600 bg-emerald-50 p-2 rounded-xl">
                      {step.icon}
                    </div>
                    Key Deliverables
                  </div>
                  <ul className="space-y-2.5">
                    {step.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Conversion / CTA Footer Section */}
      <section className="bg-slate-900 text-white relative py-24 px-6 lg:px-24 overflow-hidden rounded-t-[3rem]">
        <div className="absolute inset-0 bg-emerald-600/10 pointer-events-none mix-blend-overlay" />
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight">
            Ready to Bring Your <br />
            <span className="text-emerald-400">Project to Reality?</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base lg:text-lg">
            Let’s collaborate to build highly scalable, fast, secure software optimized exactly for your business metrics.
          </p>
          <div className="pt-4">
            <Link 
              href="/contactform" 
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
            >
              Kickstart Your Project 
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Global CSS Injector for Staggered Scrolling Animation */}
      <style jsx global>{`
        .reveal-active { 
          opacity: 1 !important; 
          transform: translateY(0) !important; 
        }
      `}</style>
    </main>
  );
}