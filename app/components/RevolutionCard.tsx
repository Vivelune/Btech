"use client";

import { useRef, useEffect } from "react";

export default function RevolutionCard() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;700&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-section { animation: fadeInUp 0.8s ease-out; }
        .card-container { animation: scaleIn 0.8s ease-out 0.2s both; }
        .revolution-icon { animation: scaleIn 0.6s ease-out 0.4s both; }
        .revolution-title { animation: slideUp 0.8s ease-out 0.5s both; }
        .revolution-desc { animation: slideUp 0.8s ease-out 0.6s both; }
      `}</style>

      <div
        ref={sectionRef}
        className="fade-in-section flex min-h-screen w-full items-center justify-center p-4 sm:p-6 scroll-section"
        style={{
          background: "#0d1f15",
          fontFamily: "'DM Sans', sans-serif",
          minHeight: "min(100vh, 100dvh)",
        }}
      >
        <div
          className="card-container relative w-full overflow-hidden rounded-2xl sm:rounded-[28px]"
          style={{
            maxWidth: "min(440px,100%)",
            padding: "clamp(44px,8vw,60px) clamp(24px,6vw,40px) clamp(52px,9vw,68px)",
            boxShadow: "0 32px 80px rgba(0,0,0,.5)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg,#1a4030 0%,#0f2a1e 40%,#0a1f14 100%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at 30% 110%,rgba(34,197,94,.18) 0%,transparent 65%)" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-7 text-center">
            <div
              className="revolution-icon flex shrink-0 items-center justify-center rounded-full"
              style={{
                width: "clamp(60px,13vw,72px)",
                height: "clamp(60px,13vw,72px)",
                background: "linear-gradient(135deg,#22c55e,#16a34a)",
                boxShadow: "0 8px 32px rgba(34,197,94,.35)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h2
              className="revolution-title m-0 font-extrabold text-white"
              style={{
                fontFamily: "'geometric', sans-serif",
                fontSize: "clamp(26px,5.5vw,42px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              💡 The Digital Revolution Waits for No One
            </h2>

            <p
              className="revolution-desc m-0"
              style={{
                fontSize: "clamp(15px,3vw,19px)",
                lineHeight: 1.72,
                fontWeight: 400,
                color: "rgba(255,255,255,.68)",
              }}
            >
              While you&apos;re reading this, your competitors are innovating.
              The question isn&apos;t whether to go digital—it&apos;s{" "}
              <strong
                style={{
                  fontWeight: 700,
                  color: "#4ade80",
                  letterSpacing: "0.01em",
                }}
              >
                how fast you can move
              </strong>{" "}
              and{" "}
              <strong
                style={{
                  fontWeight: 700,
                  color: "#4ade80",
                  letterSpacing: "0.01em",
                }}
              >
                how bold you can be
              </strong>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}