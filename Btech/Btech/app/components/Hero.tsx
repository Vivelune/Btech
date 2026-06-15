"use client";
import React, { useState } from "react";
const services = [
  {
    category: "DIGITAL SOLUTIONS",
    items: [
      { icon: "⚡", label: "Cloud Services" },
      { icon: "🤖", label: "AI Integration" },
      { icon: "🔒", label: "Cybersecurity" },
      { icon: "📊", label: "Data Analytics" },
      { icon: "🔗", label: "API Solutions" },
    ],
  },
  {
    category: "WEB DEVELOPMENT",
    items: [
      { icon: "💻", label: "Web Applications" },
      { icon: "🛒", label: "E-commerce" },
      { icon: "✏️", label: "CMS Development" },
      { icon: "📱", label: "Responsive Design" },
      { icon: "⚙️", label: "Web Hosting" },
    ],
  },
  {
    category: "APP DEVELOPMENT",
    items: [
      { icon: "🍎", label: "iOS Apps" },
      { icon: "🤖", label: "Android Apps" },
      { icon: "🔄", label: "Cross-Platform" },
      { icon: "🎨", label: "App Design" },
      { icon: "🔧", label: "Maintenance" },
    ],
  },
  {
    category: "DIGITAL MARKETING",
    items: [
      { icon: "📣", label: "Social Media Marketing" },
      { icon: "🎯", label: "Paid Advertising" },
      { icon: "📄", label: "Content Marketing" },
      { icon: "🔍", label: "SEO Services" },
      { icon: "📧", label: "Email Campaigns" },
    ],
  },
  {
    category: "LOGO DESIGN",
    items: [
      { icon: "🏢", label: "Brand Identity" },
      { icon: "⚠️", label: "Logo Design" },
      { icon: "📋", label: "Brand Guidelines" },
      { icon: "💼", label: "Business Cards" },
      { icon: "🎨", label: "Visual Assets" },
    ],
  },
  {
    category: "FORM BUILDER",
    items: [
      { icon: "📝", label: "Contact Forms" },
      { icon: "✅", label: "Quiz Forms" },
      { icon: "👤", label: "Registration Forms" },
      { icon: "📊", label: "Poll Forms" },
      { icon: "🔗", label: "Survey Builder" },
    ],
  },
];
export default function Hero() {
  const [activeTab, setActiveTab] = useState(services[0].category);
  return (
    <section className="relative w-full min-h-screen overflow-hidden text-white font-sans animate-pop-in"
      style={{ background: "radial-gradient(circle at top left, rgba(82,255,162,0.18), rgba(6,38,17,0.96) 35%, #04120b 100%)" }}>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=20')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none" />
      
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-20 z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm backdrop-blur-md w-fit mb-8 animate-[fadeIn_0.8s_ease-out]">
          <span className="text-[#39ef73]">✨</span>
          <span className="text-sm font-medium tracking-wide text-gray-200">Future of Digital</span>
        </div>
        <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-8 animate-[slideUp_0.8s_ease-out]">
          Build the <br />
          <span className="bg-gradient-to-r from-[#86f5a6] via-[#39ef73] to-[#a3f9be] bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(57,239,115,0.2)]">
            impossible
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300/90 font-light max-w-xl leading-relaxed mb-12 animate-[slideUp_1s_ease-out]">
          Transform your vision into reality with our comprehensive suite of digital services.
        </p>
        <button className="group relative flex items-center gap-3 bg-gradient-to-r from-[#1ad154] to-[#39ef73] text-[#03140b] font-semibold px-8 py-4 rounded-full shadow-[0_4px_30px_rgba(57,239,115,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_40px_rgba(57,239,115,0.6)] w-fit active:scale-98 animate-[slideUp_1.2s_ease-out]">
          <span>Get Started</span>
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex bg-white/[0.06] border-l border-white/10 backdrop-blur-xl relative">
        <div className="w-[40%] border-r border-white/10 flex flex-col py-12">
          {services.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveTab(category.category)}
              className={`w-full text-left px-8 py-5 text-sm font-bold tracking-wider transition-all duration-300 relative border-b border-white/[0.03] last:border-0 ${
                activeTab === category.category
                  ? "text-[#39ef73] bg-white/[0.04]"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.01]"
              }`}
            >
              {activeTab === category.category && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#39ef73] shadow-[0_0_10px_rgba(57,239,115,0.8)]" />
              )}
              {category.category}
            </button>
          ))}
        </div>
        <div className="w-[60%] p-12 overflow-y-auto flex flex-col justify-center">
          {services.map((category) => {
            if (category.category !== activeTab) return null;
            return (
              <div
                key={category.category}
                className="flex flex-wrap gap-4 animate-[fadeInRight_0.4s_ease-out]"
              >
                {category.items.map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.1] hover:border-[#39ef73]/40 hover:-translate-y-1 cursor-default group"
                  >
                    <span className="text-base filter drop-shadow-[0_2px_8px_rgba(250,250,250,0.2)] group-hover:scale-110 transition-transform duration-300">
                      {tag.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                      {tag.label}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <button className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#1e5bf2] text-white flex items-center justify-center shadow-[0_4px_24px_rgba(30,91,242,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#2b66f5] active:scale-95 z-50 group">
        <svg
          className="w-7 h-7 transition-transform duration-300 group-hover:rotate-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; opacity: 0; }
          to { opacity: 1; opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(15px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}