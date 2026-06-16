"use client";

import { motion } from "framer-motion";
import { Compass, Eye, ShieldCheck, Target, Zap } from "lucide-react";

const pillars = [
  {
    title: "Experiential Design",
    desc: "Crafting digital spaces that refuse to be forgotten.",
    icon: Eye,
    accent: "border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    hoverLine: "from-emerald-500 to-teal-400",
    yOffset: "lg:translate-y-4" // Subtle vertical staggered layout
  },
  {
    title: "Hyper-Performance",
    desc: "Turning passive traffic into predictable revenue.",
    icon: Zap,
    accent: "border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    hoverLine: "from-amber-500 to-orange-400",
    yOffset: "lg:-translate-y-4" // Alternating stagger to create dynamic depth
  },
  {
    title: "Future-Proof Stability",
    desc: "Engineering architecture that scales globally.",
    icon: ShieldCheck,
    accent: "border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    hoverLine: "from-blue-500 to-indigo-400",
    yOffset: "lg:translate-y-4"
  },
];

export default function DeepVisionSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-100 px-4 py-24 dark:bg-black sm:px-6 lg:px-16 xl:px-24">
      {/* Patterned Void Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Floating Glass Container Block */}
        <div className="relative rounded-3xl border border-slate-200/60 bg-white/60 p-6 backdrop-blur-xl shadow-2xl shadow-slate-900/5 dark:border-zinc-800/50 dark:bg-zinc-950/40 sm:p-10 lg:p-16">
          
          {/* Internal Glow Source */}
          <div className="absolute -top-10 left-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px] dark:bg-emerald-600/5" />

          {/* Core Philosophy Section (Centered layout for symmetry and visual balance) */}
          <div className="relative z-20 mx-auto max-w-3xl text-center space-y-6 mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-inner dark:border-zinc-800 dark:bg-black dark:text-zinc-300"
            >
              <Compass className="h-4 w-4 animate-spin-slow text-emerald-500" />
              <span>Strategic Execution Philosophy</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl dark:text-zinc-50 lg:text-6xl lg:leading-[1.12]"
            >
              Great Brands Are Architected From A{" "}
              <span className="relative inline-block font-black text-transparent bg-clip-text bg-[length:200%_auto] bg-[linear-gradient(110deg,#10b981,#059669,#10b981,#0d9488,#10b981)] animate-shimmer dark:bg-[linear-gradient(110deg,#34d399,#10b981,#34d399,#0d9488,#34d399)]">
                Bold Vision.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto max-w-2xl text-base leading-relaxed text-slate-700 dark:text-zinc-400 sm:text-lg"
            >
              We engineer <span className="font-semibold text-slate-950 dark:text-zinc-100">captivating digital ecosystems</span> designed to seize critical attention and ruthlessly convert it into trust. 
            </motion.p>
          </div>

          {/* The Vision Ribbon Grid (Safe, symmetric alternative to absolute coordinates) */}
          <div className="relative z-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 pt-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-md shadow-slate-950/5 ${pillar.accent} ${pillar.yOffset} dark:border-zinc-800/80 dark:bg-zinc-950/80`}
                >
                  {/* Neon Top Ribbon Line that activates on Hover */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${pillar.hoverLine} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                  <div className="space-y-5">
                    {/* High-End Icon Shield with Internal Shadow */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-inner transition-transform duration-300 group-hover:scale-105 dark:border-zinc-800 dark:bg-black">
                      <Icon className={`h-6 w-6 ${pillar.iconColor}`} />
                    </div>

                    {/* Pillar Narrative */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-slate-950 dark:text-zinc-100">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>

                  {/* Corner Accent Sparkle Indicator */}
                  <Target className="absolute -bottom-2.5 -right-2.5 h-7 w-7 text-slate-300/60 dark:text-zinc-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}