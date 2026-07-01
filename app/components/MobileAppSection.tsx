//MobileAppSection


"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { Smartphone, Layers, Zap, Search } from "lucide-react";
const features = [
  { title: "Native iOS & Android", icon: <Smartphone size={20} /> },
  { title: "Scalable Architecture", icon: <Layers size={20} /> },
  { title: "High-Speed Performance", icon: <Zap size={20} /> },
  { title: "App Store Optimization", icon: <Search size={20} /> }
];
export default function MobileAppSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('reveal-active');
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
      className="relative w-full py-32 px-6 lg:px-24 bg-slate-50 flex items-center justify-center overflow-hidden opacity-0 translate-y-10 transition-all duration-[1.5s] reveal-container"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-20 z-10">
        
        {/* Content Side */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="space-y-4">
            <span className="text-emerald-600 font-bold tracking-[0.2em] uppercase text-[12px]">Advanced Mobile Solutions</span>
            <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]">
              Engineered for <br/>
              <span className="text-emerald-600">The Digital Horizon.</span>
            </h2>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
            We transform complex business requirements into intuitive, high-performance mobile applications. Built for security, speed, and seamless user experiences.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((item) => (
              <div key={item.title} className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-emerald-600 bg-emerald-50 p-2.5 rounded-xl">
                  {item.icon}
                </div>
                <span className="text-slate-800 font-semibold text-sm">{item.title}</span>
              </div>
            ))}
          </div>
          <Link href="/mobile-services" className="inline-block mt-4 text-emerald-700 font-bold underline underline-offset-8 decoration-emerald-500">
            See our development process
          </Link>
        </div>
        {/* Visual Side */}
        <div className="flex-1 relative w-full">
          <div className="relative rounded-[2rem] border border-white bg-white/60 backdrop-blur-3xl p-4 shadow-[0_20px_50px_rgba(5,150,105,0.15)]">
            <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-slate-200">
              <Image
                src="/mobiledev.jpg"
                alt="Mobile App Development"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Glass Badge */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-6 rounded-3xl shadow-xl hidden lg:block">
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">Development Suite</p>
              <p className="text-2xl font-bold">State-of-the-art</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .reveal-container { transition: opacity 1.5s, transform 1.5s; }
        .reveal-active { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </section>
  );
}