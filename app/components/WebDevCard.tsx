// This component has a lot of white space and it is very basic


"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

const features = ["Custom Websites", "E-commerce", "Web Applications", "SEO Optimization"];

export default function WebDevCard() {
  const sectionRef = useRef<HTMLElement>(null);

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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes staggerItem {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-section { animation: fadeInUp 0.8s ease-out; }
        .content-left { animation: slideInLeft 0.8s ease-out 0.2s both; }
        .content-right { animation: slideInRight 0.8s ease-out 0.2s both; }
        .feature-item { animation: staggerItem 0.6s ease-out forwards; }
        .feature-item:nth-child(1) { animation-delay: 0.4s; }
        .feature-item:nth-child(2) { animation-delay: 0.5s; }
        .feature-item:nth-child(3) { animation-delay: 0.6s; }
        .feature-item:nth-child(4) { animation-delay: 0.7s; }
        .btn-link { animation: fadeInUp 0.8s ease-out 0.8s both; }
      `}</style>

      <section
        ref={sectionRef}
        className="fade-in-section flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:gap-14 lg:px-16 lg:py-16 xl:px-24 scroll-section"
        style={{
          background: "#f0faf3",
          fontFamily: "'DM Sans', sans-serif",
          minHeight: "min(100vh, 100dvh)",
        }}
      >
        <div className="flex w-full flex-col gap-5 lg:flex-1 content-left">
          <h2
            className="m-0 font-extrabold leading-tight tracking-tight"
            style={{
              fontSize: "clamp(28px,5vw,48px)",
              color: "#0d2318",
              fontFamily: "'geometric', sans-serif",
            }}
          >
            Web Development
          </h2>

          <p
            className="m-0 leading-relaxed"
            style={{ fontSize: "clamp(14px,1.8vw,17px)", color: "#2e4d38" }}
          >
            Create stunning websites that drive results. From responsive designs
            to powerful web applications, we build fast, secure, and scalable
            solutions that convert visitors into customers.
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {features.map((item) => (
              <div
                key={item}
            className="feature-item flex items-center gap-2.5 font-medium"
                style={{ fontSize: "clamp(13px,1.6vw,15px)", color: "#1a3a24" }}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: "#3a9e5f" }}
                />
                {item}
              </div>
            ))}
          </div>

          <Link
            href="#"
            className="btn-link mt-1 inline-flex items-center gap-1.5 font-semibold no-underline transition-[gap] duration-200 hover:gap-3"
            style={{ fontSize: "clamp(13px,1.6vw,15px)", color: "#3a9e5f" }}
          >
            Explore services in menu <span>→</span>
          </Link>
        </div>

        <div className="content-right relative w-full lg:flex-1">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{
              height: "clamp(200px,38vw,360px)",
              boxShadow: "0 16px 48px rgba(0,60,20,.12)",
            }}
          >
            <Image
              src="/webdev.avif"
              alt="Web Development Dashboard"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}