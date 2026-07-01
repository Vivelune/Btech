"use client";

import { motion } from "framer-motion";
import { 
  Layout, Code2, Monitor, Search, ArrowLeft, 
  CheckCircle2, Cpu, ShieldCheck, Zap, Layers, BarChart3 
} from "lucide-react";
import Link from "next/link";

// Detailed breakdown data extending your home page capabilities
const deepDiveCapabilities = [
  {
    id: "01",
    title: "Custom Brand Environments",
    tagline: "Tailored Architecture",
    desc: "We ditch cookie-cutter templates. Your website is engineered from scratch, matching your exact brand positioning with pixel-perfect precision and semantic code layouts.",
    icon: Layout,
    color: "from-emerald-500 to-teal-500",
    textHighlight: "text-emerald-500",
    features: [
      { title: "Proprietary Design Systems", details: "Component-driven design architectures tokenized for strict brand consistency across all viewports." },
      { title: "Semantic Document Structure", details: "Clean, valid HTML5 engineered for optimal accessibility (WCAG compliance) and search parsing." },
      { title: "Fluid & Dynamic Layouts", details: "No rigid breakpoints. Interfaces scale seamlessly using fluid typography and advanced CSS Grid/Flexbox setups." }
    ],
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Figma Ecosystem"]
  },
  {
    id: "02",
    title: "High-Performance E-commerce",
    tagline: "Conversion Engine",
    desc: "Blazing fast digital storefronts built to scale. Optimized conversion funnels, micro-interactions, and instant checkout flows designed to minimize cart abandonment.",
    icon: Code2,
    color: "from-blue-500 to-indigo-500",
    textHighlight: "text-blue-500",
    features: [
      { title: "Headless Commerce Implementations", details: "Decoupled frontend layers tied to robust commerce APIs for lightning-fast catalog navigation." },
      { title: "Instant-Checkout Frameworks", details: "Streamlined single-page checkouts integrated with Apple Pay, Stripe, and global local payment rails." },
      { title: "Real-time Inventory & Syncing", details: "Event-driven edge functions that process stock levels instantly, avoiding overselling during high-traffic drops." }
    ],
    techStack: ["Shopify Plus API", "MedusaJS", "Stripe SDK", "Vercel Edge"]
  },
  {
    id: "03",
    title: "Complex Web Applications",
    tagline: "Next.js Infrastructure",
    desc: "Robust frontends paired with hyper-scalable backends. We build dynamic software applications, client portals, and custom dashboards using modern framework mechanics.",
    icon: Monitor,
    color: "from-purple-500 to-pink-500",
    textHighlight: "text-purple-500",
    features: [
      { title: "Server-Driven Architectures", details: "Utilizing Next.js App Router for server-side rendering (SSR) and streaming data to slash initial load times." },
      { title: "State Management & Real-time Hooks", details: "Secure client-side state combined with WebSocket connections for collaborative or instantly updated user dashboards." },
      { title: "Enterprise Security Compliance", details: "Ironclad RBAC (Role-Based Access Control), CSRF protection, and end-to-end encrypted API requests." }
    ],
    techStack: ["Next.js (App Router)", "TypeScript", "tRPC / GraphQL", "Node.js / PostgreSQL"]
  },
  {
    id: "04",
    title: "Technical Search Optimization",
    tagline: "Search Visibility",
    desc: "SEO isn't an afterthought. Our structural architecture guarantees optimal Core Web Vitals, semantic markup, and automatic schema injection for maximum visibility.",
    icon: Search,
    color: "from-amber-500 to-orange-500",
    textHighlight: "text-amber-500",
    features: [
      { title: "Core Web Vitals Engineering", details: "Achieving perfect 100/100 Lighthouse metrics by crushing Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP)." },
      { title: "Automated JSON-LD Schema", details: "Dynamic generation of structured metadata context blueprints so crawlers explicitly understand your organization and products." },
      { title: "Edge-Rendered Robots & Sitemaps", details: "Instantly generated dynamic sitemaps updating the exact second you append or adjust your applications." }
    ],
    techStack: ["Google Search Console API", "Next.js Metadata API", "Lighthouse CI"]
  },
];

const valueProps = [
  { icon: Zap, title: "Sub-Second Load Times", desc: "Static generation and dynamic edge-caching guarantee users don't wait." },
  { icon: ShieldCheck, title: "Enterprise Grade Security", desc: "Monitored inputs, sanitized database interactions, and zero-trust paradigms." },
  { icon: Cpu, title: "Scalable Infrastructure", desc: "Designed to handle massive traffic surges effortlessly without infrastructure degradation." },
];

export default function WebDevDetailedPage() {
  return (
    <main className="relative w-full bg-slate-50 min-h-screen dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 overflow-x-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* HEADER NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 pt-8">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to overview
        </Link>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 pt-16 pb-24">
        <div className="max-w-3xl space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900/30 dark:bg-emerald-950/30 dark:text-emerald-400"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Deep Dive Architecture Specification</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-zinc-50"
          >
            Engineering Elite <span className="text-emerald-600 dark:text-emerald-400">Web Ecosystems.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed text-slate-600 dark:text-zinc-400"
          >
            We don’t assemble websites; we author custom engineering solutions designed to capture market value. Discover the granular frameworks, methodologies, and technologies we deploy to ensure your application dominates your sector.
          </motion.p>
        </div>

        {/* TOP LEVEL METRICS / HIGHLIGHTS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 border-t border-slate-200 pt-12 dark:border-zinc-800"
        >
          {valueProps.map((prop, i) => {
            const PropIcon = prop.icon;
            return (
              <div key={i} className="flex gap-4 items-start">
                <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm text-emerald-500">
                  <PropIcon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-slate-900 dark:text-zinc-100">{prop.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 leading-normal">{prop.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* DETAILED CAPABILITIES ACCORDION / EXPANSION */}
      <section className="bg-white/60 dark:bg-zinc-900/40 border-t border-b border-slate-200 dark:border-zinc-900/80 backdrop-blur-sm py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 space-y-24">
          
          {deepDiveCapabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div 
                key={capability.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 first:pt-0 border-t first:border-t-0 border-slate-200/60 dark:border-zinc-800/60"
              >
                {/* Structural Anchor / Left Column */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${capability.color} text-white shadow-md`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-mono font-bold tracking-widest text-slate-400 dark:text-zinc-500">
                      SERVICE {capability.id}
                    </span>
                  </div>
                  
                  <span className={`text-xs font-semibold uppercase tracking-wider ${capability.textHighlight}`}>
                    {capability.tagline}
                  </span>
                  
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 sm:text-3xl">
                    {capability.title}
                  </h2>
                  
                  <p className="text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {capability.desc}
                  </p>

                  {/* Dev-Centric Tech Badges */}
                  <div className="pt-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-zinc-500 block mb-2.5">
                      Engineered Using:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {capability.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-xs font-mono px-2.5 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 rounded-md border border-slate-200/40 dark:border-zinc-700/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Granular Breakdown Bulletins / Right Column */}
                <div className="lg:col-span-7 lg:pl-6 flex flex-col justify-center">
                  <div className="bg-white dark:bg-zinc-900/60 rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 p-6 md:p-8 space-y-6 shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 border-b border-slate-100 dark:border-zinc-800/60 pb-3">
                      Architectural Deliverables & Standards
                    </h3>
                    
                    <div className="space-y-6">
                      {capability.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-4 items-start group">
                          <CheckCircle2 className={`h-5 w-5 shrink-0 mt-0.5 ${capability.textHighlight}`} />
                          <div className="space-y-1">
                            <h4 className="text-base font-semibold text-slate-900 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                              {feature.title}
                            </h4>
                            <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
                              {feature.details}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>
      </section>

      {/* HIGHLY OPTIMIZED FINAL CONVERSION CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-16 dark:bg-zinc-900 border border-slate-800 shadow-xl"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-emerald-400 border border-zinc-700/50">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Ready for Implementation</span>
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Let's engineer a performance setup aligned with your pipeline goals.
            </h2>
            
            <p className="text-zinc-400 text-base leading-relaxed">
              We operate exclusively without middleware and unnecessary bloatware. Get in touch directly to schedule an architectural scoping review for your stack.
            </p>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-400 shadow-lg shadow-emerald-500/10"
              >
                Initiate Project Discovery
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}