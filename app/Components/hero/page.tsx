"use client";

import Link from "next/link";

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
      { icon: "📣", label: "Social Media" },
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

export default function HeroSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
        @keyframes scrollPills {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scroll-track { animation: scrollPills 22s linear infinite; }
        .scroll-track:hover { animation-play-state: paused; }
      `}</style>

      <section
        className="relative w-full overflow-hidden flex min-h-0 flex-col lg:flex-row"
        style={{
          background: "#0a1f14",
          fontFamily: "'DM Sans', sans-serif",
          minHeight: "min(100vh, 100dvh)",
          height: "min(100vh, 100dvh)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute rounded-full"
            style={{
              left: "50%", top: "50%",
              transform: "translate(-50%,-50%)",
              width: "min(900px,150vw)", height: "min(900px,150vw)",
              background: "radial-gradient(ellipse at center,rgba(0,100,40,.18) 0%,rgba(0,60,20,.08) 45%,transparent 75%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(0,200,80,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,80,.04) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              bottom: -120, left: "10%", width: 500, height: 500,
              background: "radial-gradient(circle,rgba(0,230,80,.12) 0%,transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center gap-7 px-6 pt-20 pb-12 sm:px-10 lg:flex-1 lg:px-16 lg:py-24 xl:px-20">
          <span
            className="flex w-fit items-center gap-2 rounded-full px-4 py-[7px] font-medium tracking-wide backdrop-blur-md"
            style={{
              fontSize: "clamp(11px,1.2vw,13px)",
              letterSpacing: "0.05em",
              border: "1px solid rgba(255,255,255,.2)",
              background: "rgba(255,255,255,.04)",
              color: "rgba(255,255,255,.8)",
            }}
          >
            <span style={{ color: "#f97316", fontSize: 14 }}>✦</span>
            Future of Digital
          </span>

          <h1
            className="m-0"
            style={{ fontFamily: "'geometric', sans-serif", lineHeight: 1.04, letterSpacing: "-0.02em" }}
          >
            <span
              className="block font-extrabold text-white"
              style={{ fontSize: "clamp(40px,7vw,80px)" }}
            >
              Build the
            </span>
            <span
              className="block font-bold"
              style={{
                fontSize: "clamp(44px,8.5vw,96px)",
                background: "linear-gradient(90deg,#4ade80,#a3e635)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              impossible
            </span>
          </h1>

          <p
            className="m-0 max-w-[400px]"
            style={{
              fontSize: "clamp(14px,1.8vw,17px)",
              lineHeight: 1.7,
              color: "rgba(255,255,255,.6)",
              fontWeight: 400,
            }}
          >
            Transform your vision into reality with our comprehensive suite of digital services.
          </p>

          <Link
            href="#"
            className="flex w-fit items-center gap-2.5 rounded-full font-bold no-underline transition-all duration-200 hover:-translate-y-0.5"
            style={{
              fontSize: "clamp(14px,1.6vw,16px)",
              letterSpacing: "0.01em",
              padding: "clamp(13px,1.8vw,16px) clamp(26px,3.5vw,34px)",
              background: "linear-gradient(135deg,#22c55e,#4ade80)",
              color: "#0a1f14",
              boxShadow: "0 0 32px rgba(74,222,128,.3)",
            }}
          >
            Get Started <span style={{ fontSize: "1.1em" }}>→</span>
          </Link>
        </div>

        <div
          className="relative z-10 flex flex-col justify-center overflow-hidden lg:flex-1 min-h-0"
          style={{
            borderTop: "1px solid rgba(255,255,255,.07)",
            maxHeight: "min(100vh, 100dvh)",
          }}
        >
          {services.map((row, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 sm:flex-row sm:items-center"
              style={{
                minHeight: "clamp(56px,8vw,72px)",
                borderBottom: "1px solid rgba(255,255,255,.07)",
                borderTop: i === 0 ? "1px solid rgba(255,255,255,.07)" : undefined,
              }}
            >
              <div
                className="shrink-0 hidden sm:block font-bold uppercase"
                style={{
                  width: "clamp(120px,15vw,190px)",
                  padding: "0 clamp(12px,1.5vw,24px)",
                  fontSize: "clamp(9px,0.9vw,11px)",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,.65)",
                }}
              >
                {row.category}
              </div>
              <div
                className="flex-1 overflow-hidden py-3"
                style={{ borderLeft: "1px solid rgba(255,255,255,.07)" }}
              >
                <div
                  className="flex gap-2 min-w-full sm:w-max scroll-track"
                  style={{ animationDelay: `${i * -3}s` }}
                >
                  {[...row.items, ...row.items].map((item, j) => (
                    <div
                      key={j}
                      className="inline-flex items-center gap-1.5 rounded-full whitespace-nowrap cursor-default transition-all duration-200 hover:text-green-400"
                      style={{
                        padding: "6px 14px",
                        fontSize: "clamp(11px,1.1vw,13px)",
                        fontWeight: 500,
                        letterSpacing: "0.01em",
                        border: "1px solid rgba(255,255,255,.14)",
                        background: "rgba(255,255,255,.04)",
                        color: "rgba(255,255,255,.78)",
                      }}
                    >
                      <span style={{ fontSize: "clamp(10px,1.1vw,12px)" }}>{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}