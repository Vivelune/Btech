"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Layout, Monitor, Search, Terminal } from "lucide-react";

const capabilities = [
  {
    id: "01",
    title: "Custom Brand Environments",
    tagline: "Tailored Architecture",
    desc: "We ditch cookie-cutter templates. Your website is engineered from scratch, matching your exact brand positioning with pixel-perfect precision and semantic code layouts.",
    icon: Layout,
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50/40",
  },
  {
    id: "02",
    title: "High-Performance E-commerce",
    tagline: "Conversion Engine",
    desc: "Blazing fast digital storefronts built to scale. Optimized conversion funnels, micro-interactions, and instant checkout flows designed to minimize cart abandonment.",
    icon: Code2,
    color: "from-blue-500 to-indigo-500",
    bgLight: "bg-blue-50/40",
  },
  {
    id: "03",
    title: "Complex Web Applications",
    tagline: "Next.js Infrastructure",
    desc: "Robust frontends paired with hyper-scalable backends. We build dynamic software applications, client portals, and custom dashboards using modern framework mechanics.",
    icon: Monitor,
    color: "from-purple-500 to-pink-500",
    bgLight: "bg-purple-50/40",
  },
  {
    id: "04",
    title: "Technical Search Optimization",
    tagline: "Search Visibility",
    desc: "SEO isn't an afterthought. Our structural architecture guarantees optimal Core Web Vitals, semantic markup, and automatic schema injection for maximum visibility.",
    icon: Search,
    color: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50/40",
  },
];

export default function WebDevCard() {
  return (
    <section className="relative w-full bg-slate-50 px-4 py-24 dark:bg-zinc-950 sm:px-6 lg:px-12 xl:px-24">
      {/* Background Matrix Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          
          {/* LEFT SIDE: Sticky Anchor (Tells the user exactly what this section is about) */}
          <div className="w-full lg:sticky lg:top-24 lg:w-[40%] lg:max-h-[calc(100vh-12rem)] flex flex-col justify-between py-2">
            <div className="space-y-6">
              {/* Context Tagline */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-800 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              >
                <Terminal className="h-3.5 w-3.5 text-emerald-500" />
                <span>Capabilities & Core Services</span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-zinc-50"
              >
                Our core expertise in <span className="text-emerald-600 dark:text-emerald-400">Web Development.</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-base leading-relaxed text-slate-600 dark:text-zinc-400"
              >
                We construct high-end digital architecture. Here is a granular breakdown of how we design, build, and optimize applications to scale your business.
              </motion.p>
            </div>

            {/* Bottom Call to Action inside Sticky Column */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block pt-12"
            >
              <Link
                href="/web-dev"
                className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-slate-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                View full breakdown
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Animated Stacked Cards */}
          <div className="w-full space-y-6 lg:w-[60%]">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 md:p-8"
                >
                  {/* Subtle Top Accent Color Line on Hover */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    {/* Icon & Counter Box */}
                    <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-sm`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-wider text-slate-400 dark:text-zinc-500 md:pl-1">
                        {item.id}
                      </span>
                    </div>

                    {/* Text Details */}
                    <div className="space-y-2 flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {item.tagline}
                      </span>
                      <h3 className="text-xl font-medium text-slate-900 dark:text-zinc-100">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Mobile-only CTA anchor */}
            <div className="block pt-4 lg:hidden">
              <Link
                href="/web-dev"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-950"
              >
                View full breakdown
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}