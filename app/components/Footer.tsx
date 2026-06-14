"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
  { label: "Digital Solutions", href: "#" },
  { label: "Logo Design", href: "#" },
  { label: "App Development", href: "#" },
  { label: "Web Development", href: "#" },
  { label: "Digital Marketing", href: "#" },
];

const company = [
  { label: "About Us", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Knowledge Base", href: "#" },
  { label: "Feedback", href: "#" },
];

const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>

      <footer style={{ background: "#0f1923", fontFamily: "'DM Sans', sans-serif" }}>
        <div
          className="mx-auto w-full px-4 sm:px-6 lg:px-10 xl:px-16"
          style={{ maxWidth: 1280, borderBottom: "1px solid rgba(255,255,255,.08)" }}
        >
          <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-extrabold text-white"
                  style={{
                    background: "linear-gradient(135deg,#22c55e,#16a34a)",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 16,
                    boxShadow: "0 4px 16px rgba(34,197,94,.3)",
                  }}
                >
                  B
                </div>
                <div>
                  <p
                    className="m-0 font-bold leading-tight text-white"
                    style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(15px,1.8vw,17px)" }}
                  >
                    BTech Solutions
                  </p>
                  <p
                    className="m-0"
                    style={{ fontSize: "clamp(11px,1.1vw,12px)", color: "rgba(255,255,255,.45)", letterSpacing: "0.04em" }}
                  >
                    Digital Innovation
                  </p>
                </div>
              </div>

              <p
                className="m-0 leading-[1.72]"
                style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "rgba(255,255,255,.55)", fontWeight: 400 }}
              >
                Leading technology solutions provider specializing in digital
                transformation, custom development, and innovative business
                growth strategies.
              </p>

              <div className="flex items-center gap-2">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
                </svg>
                <span
                  style={{ fontSize: "clamp(12px,1.2vw,13px)", color: "rgba(255,255,255,.55)", fontWeight: 500 }}
                >
                  10+ Years of Excellence
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      border: "1px solid rgba(255,255,255,.1)",
                      background: "rgba(255,255,255,.04)",
                      color: "rgba(255,255,255,.55)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,128,.4)";
                      (e.currentTarget as HTMLElement).style.color = "#4ade80";
                      (e.currentTarget as HTMLElement).style.background = "rgba(74,222,128,.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.1)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.55)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.04)";
                    }}
                  >
                    {s.icon}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3
                className="m-0 font-bold text-white"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(15px,1.6vw,17px)",
                  letterSpacing: "-0.01em",
                }}
              >
                Services
              </h3>
              <nav className="flex flex-col gap-3">
                {services.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="w-fit no-underline transition-all duration-150 hover:translate-x-0.5"
                    style={{
                      fontSize: "clamp(13px,1.4vw,15px)",
                      fontWeight: 400,
                      color: "rgba(255,255,255,.52)",
                      lineHeight: 1.5,
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4ade80")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.52)")}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-5">
              <h3
                className="m-0 font-bold text-white"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(15px,1.6vw,17px)",
                  letterSpacing: "-0.01em",
                }}
              >
                Company
              </h3>
              <nav className="flex flex-col gap-3">
                {company.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="w-fit no-underline transition-all duration-150 hover:translate-x-0.5"
                    style={{
                      fontSize: "clamp(13px,1.4vw,15px)",
                      fontWeight: 400,
                      color: "rgba(255,255,255,.52)",
                      lineHeight: 1.5,
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4ade80")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.52)")}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-2 flex flex-col gap-3">
                <p
                  className="m-0 font-semibold text-white"
                  style={{ fontSize: "clamp(13px,1.4vw,15px)", letterSpacing: "0.01em" }}
                >
                  Get in Touch
                </p>
                <a
                  href="tel:+12158637222"
                  className="flex items-center gap-2 no-underline transition-colors duration-150"
                  style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "rgba(255,255,255,.52)", fontWeight: 400 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4ade80")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.52)")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.44 2 2 0 0 1 3.57 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
                  </svg>
                  +1 215 863 7222
                </a>
                <a
                  href="mailto:info@btech.com"
                  className="flex items-center gap-2 no-underline transition-colors duration-150"
                  style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "rgba(255,255,255,.52)", fontWeight: 400 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4ade80")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.52)")}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  info@btech.com
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3
                className="m-0 font-bold text-white"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(15px,1.6vw,17px)",
                  letterSpacing: "-0.01em",
                }}
              >
                Stay Updated
              </h3>
              <p
                className="m-0 leading-[1.7]"
                style={{ fontSize: "clamp(13px,1.4vw,15px)", color: "rgba(255,255,255,.52)", fontWeight: 400 }}
              >
                Subscribe to our newsletter for the latest updates, insights, and technology trends.
              </p>

              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg px-4 outline-none transition-all duration-200"
                  style={{
                    height: "clamp(42px,5vw,48px)",
                    fontSize: "clamp(13px,1.4vw,15px)",
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.1)",
                    color: "rgba(255,255,255,.85)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(74,222,128,.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,.1)")}
                />
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-0"
                  style={{
                    height: "clamp(42px,5vw,48px)",
                    fontSize: "clamp(13px,1.4vw,15px)",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.01em",
                    background: "linear-gradient(135deg,#22c55e,#16a34a)",
                    boxShadow: "0 4px 20px rgba(34,197,94,.25)",
                  }}
                >
                  Subscribe
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span style={{ fontSize: "clamp(11px,1.1vw,13px)", color: "rgba(255,255,255,.35)", fontWeight: 400 }}>
                  We respect your privacy
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mx-auto w-full px-4 sm:px-6 lg:px-10 xl:px-16"
          style={{ maxWidth: 1280 }}
        >
          <div className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between">
            <p
              className="m-0 text-center sm:text-left"
              style={{ fontSize: "clamp(12px,1.2vw,13px)", color: "rgba(255,255,255,.35)", fontWeight: 400 }}
            >
              © 2026 BTech Solutions. All rights reserved.
            </p>

            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {bottomLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="no-underline transition-colors duration-150"
                  style={{ fontSize: "clamp(12px,1.2vw,13px)", color: "rgba(255,255,255,.35)", fontWeight: 400 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4ade80")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,.35)")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <p
              className="m-0 hidden items-center gap-1 lg:flex"
              style={{ fontSize: "clamp(12px,1.2vw,13px)", color: "rgba(255,255,255,.35)", fontWeight: 400 }}
            >
              Made with{" "}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#4ade80" stroke="#4ade80" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>{" "}
              for innovators
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 pb-5">
            <span className="h-2 w-2 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
            <span style={{ fontSize: "clamp(11px,1.1vw,12px)", color: "rgba(255,255,255,.35)", letterSpacing: "0.03em" }}>
              All systems operational
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}