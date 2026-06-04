import React, { useState } from "react";

interface ServiceTag {
  name: string;
  icon: string;
}

interface ServiceCategory {
  id: string;
  title: string;
  tags: ServiceTag[];
}

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<string>("digital-solutions");

  const servicesData: ServiceCategory[] = [
    {
      id: "digital-solutions",
      title: "DIGITAL SOLUTIONS",
      tags: [
        { name: "Cloud Services", icon: "☁️" },
        { name: "AI Integration", icon: "⚙️" },
        { name: "Cybersecurity", icon: "🔒" },
        { name: "Data Analytics", icon: "📊" },
      ],
    },
    {
      id: "web-development",
      title: "WEB DEVELOPMENT",
      tags: [
        { name: "Web Applications", icon: "💻" },
        { name: "E-commerce", icon: "🛒" },
        { name: "CMS Development", icon: "📝" },
        { name: "Responsive Design", icon: "🖥️" },
      ],
    },
    {
      id: "app-development",
      title: "APP DEVELOPMENT",
      tags: [
        { name: "iOS Apps", icon: "📱" },
        { name: "Android Apps", icon: "🤖" },
        { name: "Cross-Platform", icon: "🔄" },
        { name: "App Design", icon: "🎨" },
      ],
    },
    {
      id: "digital-marketing",
      title: "DIGITAL MARKETING",
      tags: [
        { name: "Social Media Marketing", icon: "📢" },
        { name: "Paid Advertising", icon: "🎯" },
        { name: "Content Marketing", icon: "📄" },
      ],
    },
    {
      id: "logo-design",
      title: "LOGO DESIGN",
      tags: [
        { name: "Brand Identity", icon: "✨" },
        { name: "Logo Design", icon: "📐" },
        { name: "Brand Guidelines", icon: "📋" },
        { name: "Business Cards", icon: "📇" },
      ],
    },
    {
      id: "form-builder",
      title: "FORM BUILDER",
      tags: [
        { name: "Contact Forms", icon: "✉️" },
        { name: "Quiz Forms", icon: "☑️" },
        { name: "Registration Forms", icon: "👥" },
        { name: "Poll Forms", icon: "🗳️" },
      ],
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#062615] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#0d4722] via-[#062615] to-[#03140b] text-white overflow-hidden font-sans flex flex-col lg:flex-row items-stretch select-none">
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

      <div className="flex-1 flex bg-white/[0.02] border-l border-white/10 backdrop-blur-md relative">
        <div className="w-[40%] border-r border-white/10 flex flex-col py-12">
          {servicesData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`w-full text-left px-8 py-5 text-sm font-bold tracking-wider transition-all duration-300 relative border-b border-white/[0.03] last:border-0 ${
                activeTab === category.id
                  ? "text-[#39ef73] bg-white/[0.04]"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.01]"
              }`}
            >
              {activeTab === category.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#39ef73] shadow-[0_0_10px_rgba(57,239,115,0.8)]" />
              )}
              {category.title}
            </button>
          ))}
        </div>

        <div className="w-[60%] p-12 overflow-y-auto flex flex-col justify-center">
          {servicesData.map((category) => {
            if (category.id !== activeTab) return null;
            return (
              <div
                key={category.id}
                className="flex flex-wrap gap-4 animate-[fadeInRight_0.4s_ease-out]"
              >
                {category.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.1] hover:border-[#39ef73]/40 hover:-translate-y-1 cursor-default group"
                  >
                    <span className="text-base filter drop-shadow-[0_2px_8px_rgba(250,250,250,0.2)] group-hover:scale-110 transition-transform duration-300">
                      {tag.icon}
                    </span>
                    <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                      {tag.name}
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