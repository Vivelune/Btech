"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  Menu as MenuIcon,
  X,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------------------------
// Data — swap hrefs/copy for your real routes/content
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  {
    label: "Services",
    links: [
      { title: "Digital Solutions", desc: "Custom Next.js builds", href: "/#digital-marketing-section" },
      { title: "Web Development", desc: "Product & UI systems", href: "/#web-development-section"},
      { title: "App Development", desc: "Search visibility & growth", href: "/#mobile-app-section" },
      { title: "Digital Marketing", desc: "Identity & design systems", href: "/#digital-marketing-section" },
    ],
  },
  {
    label: "Work",
    featured: [
      {
        title: "AgriMarket SL",
        desc: "Farmer-to-market platform for Sierra Leone",
        href: "/work/agrimarket-sl",
      },
      {
        title: "Client Projects",
        desc: "Selected engagements & case studies",
        href: "/work",
      },
    ],
  },
  {
    label: "Pricing",
    links: [
      { title: "Hobby", href: "/hobby" },
      { title: "Individual", href: "/individual" },
      { title: "Team", href: "/team" },
      { title: "Enterprise", href: "/enterprise" },
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// Search index — flattened from NAV_ITEMS so search stays in sync with the
// menu. Add extra keywords per entry to widen what a search term can match.
// ---------------------------------------------------------------------------

type SearchEntry = {
  title: string;
  desc?: string;
  href: string;
  category: string;
  keywords?: string[];
};

const EXTRA_KEYWORDS: Record<string, string[]> = {
  "Digital Solutions": ["nextjs", "next.js", "custom software", "build"],
  "Web Development": ["website", "frontend", "product", "ui", "ux"],
  "App Development": ["mobile app", "ios", "android", "seo"],
  "Digital Marketing": ["branding", "identity", "design system", "marketing"],
  "AgriMarket SL": ["agriculture", "marketplace", "sierra leone", "case study"],
  "Client Projects": ["portfolio", "case studies", "work"],
  Hobby: ["free", "personal", "student", "pricing"],
  Individual: ["freelancer", "solo", "founder", "pricing"],
  Team: ["business", "company", "pricing"],
  Enterprise: ["custom", "large organization", "pricing"],
};

const SEARCH_INDEX: SearchEntry[] = NAV_ITEMS.flatMap((item) => {
  const entries = "links" in item ? item.links : item.featured;
  return entries.map((entry) => ({
    title: entry.title,
    desc: "desc" in entry ? entry.desc : undefined,
    href: entry.href,
    category: item.label,
    keywords: EXTRA_KEYWORDS[entry.title] ?? [],
  }));
});

function searchEntries(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCH_INDEX.filter((entry) => {
    const haystack = [
      entry.title,
      entry.desc ?? "",
      entry.category,
      ...(entry.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  }).slice(0, 6);
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------

export default function Navbar({ className }: { className?: string }) {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchWrapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchEntries(query), [query]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the search dropdown on outside click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        searchWrapRef.current &&
        !searchWrapRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Reset the highlighted result whenever the result set changes.
  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 150);
  };

  const goToEntry = (entry: SearchEntry) => {
    router.push(entry.href);
    setSearchOpen(false);
    setQuery("");
    setMobileOpen(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchOpen(false);
      searchInputRef.current?.blur();
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => (h - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      goToEntry(results[highlighted]);
    }
  };

  const toggleSearch = () => {
    setSearchOpen((v) => {
      const next = !v;
      if (next) {
        requestAnimationFrame(() => searchInputRef.current?.focus());
      } else {
        setQuery("");
      }
      return next;
    });
  };

  return (
    <>
      {/* Full-width bar, stacked flush at the top of the page */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full transition-all duration-500",
          className
        )}
      >
        <nav
          onMouseLeave={scheduleClose}
          className={cn(
            "relative mx-auto flex w-full max-w-7xl items-center justify-between gap-2 border-b transition-all duration-500 ease-out",
            "border-white/[0.08] bg-[#0a1f14]/85 backdrop-blur-xl backdrop-saturate-150",
            "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_8px_30px_-8px_rgba(0,0,0,0.5)]",
            scrolled ? "px-5 py-3 md:px-8" : "px-5 py-4 md:px-10"
          )}
          style={{ fontFamily: "var(--font-dm-sans, ui-sans-serif)" }}
        >
          {/* Logo */}
          <a
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-full px-2 py-1.5 text-[16px] font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-syne, ui-sans-serif)" }}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3a9e5f] text-[11px] font-bold text-[#04140b]">
              B
            </span>
            BTech
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} onMouseEnter={() => openMenu(item.label)}>
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[14px] font-semibold transition-colors duration-200",
                    active === item.label
                      ? "bg-[#3a9e5f] text-[#04140b]"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    strokeWidth={2.75}
                    className={cn(
                      "transition-transform duration-200",
                      active === item.label ? "rotate-180 opacity-100" : "opacity-50"
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Search (desktop) */}
          <div
            ref={searchWrapRef}
            className="relative hidden shrink-0 items-center md:flex"
          >
            <div
              className={cn(
                "flex items-center gap-1.5 overflow-hidden rounded-full border transition-all duration-300 ease-out",
                searchOpen
                  ? "w-52 border-white/10 bg-white/[0.06] px-3 py-1.5"
                  : "w-9 border-transparent px-0 py-1.5"
              )}
            >
              <button
                onClick={toggleSearch}
                aria-label={searchOpen ? "Close search" : "Search services"}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
              >
                {searchOpen ? <X size={15} strokeWidth={2.3} /> : <Search size={16} strokeWidth={2.3} />}
              </button>
              <input
                ref={searchInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search services…"
                className={cn(
                  "w-full bg-transparent text-[13.5px] font-medium text-white placeholder:text-white/40 focus:outline-none",
                  searchOpen ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              />
            </div>

            {/* Results dropdown */}
            {searchOpen && query.trim() && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#0f2818]/95 p-1.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                {results.length ? (
                  results.map((entry, i) => (
                    <button
                      key={entry.href + entry.title}
                      onMouseEnter={() => setHighlighted(i)}
                      onClick={() => goToEntry(entry)}
                      className={cn(
                        "flex w-full flex-col items-start rounded-xl px-3 py-2 text-left transition-colors duration-150",
                        i === highlighted ? "bg-white/[0.08]" : "hover:bg-white/[0.06]"
                      )}
                    >
                      <span className="flex w-full items-center justify-between">
                        <span className="text-[13.5px] font-bold text-white">
                          {entry.title}
                        </span>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-[#4ade80]">
                          {entry.category}
                        </span>
                      </span>
                      {entry.desc && (
                        <span className="mt-0.5 text-[12px] font-medium text-white/50">
                          {entry.desc}
                        </span>
                      )}
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-3 text-[13px] font-medium text-white/40">
                    No services matched “{query}”.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* CTA */}
          <Link
            href="/contactform"
            className="hidden shrink-0 items-center gap-1.5 rounded-full bg-[#3a9e5f] px-4 py-2 text-[13.5px] font-bold text-[#04140b] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg md:inline-flex">
            Let's talk
            <ArrowUpRight size={15} strokeWidth={2.5} />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={19} strokeWidth={2.3} /> : <MenuIcon size={19} strokeWidth={2.3} />}
          </button>

          {/* Dropdown panel (desktop) */}
          <div
            onMouseEnter={() => active && openMenu(active)}
            className={cn(
              "absolute left-1/2 top-[calc(100%+10px)] w-[min(560px,92vw)] -translate-x-1/2 transition-all duration-200 ease-out",
              active
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0"
            )}
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f2818]/95 p-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-150">
              {NAV_ITEMS.map((item) => {
                if (item.label !== active) return null;

                if ("featured" in item) {
                  return (
                    <div key={item.label} className="grid grid-cols-2 gap-1 p-1">
                      {item.featured.map((f) => (
                        <a
                          key={f.title}
                          href={f.href}
                          className="group rounded-xl p-3 transition-colors duration-150 hover:bg-white/[0.06]"
                        >
                          <p className="text-[14.5px] font-bold text-white">{f.title}</p>
                          <p className="mt-0.5 text-[13px] font-medium leading-snug text-white/55">
                            {f.desc}
                          </p>
                          <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-white/45 transition-colors group-hover:text-[#4ade80]">
                            View <ArrowUpRight size={11} />
                          </span>
                        </a>
                      ))}
                    </div>
                  );
                }

                return (
                  <div key={item.label} className="flex flex-col p-1">
                    {item.links.map((l) => (
                      <a
                        key={l.title}
                        href={l.href}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[14px] text-white/75 transition-colors duration-150 hover:bg-white/[0.06] hover:text-white"
                      >
                        <span className="font-semibold">{l.title}</span>
                        {"desc" in l && l.desc && (
                          <span className="text-[12px] font-medium text-white/40">{l.desc}</span>
                        )}
                      </a>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-x-4 top-[76px] z-40 origin-top transition-all duration-300 ease-out md:hidden",
          mobileOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        )}
      >
        <div className="max-h-[70vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0a1f14]/95 p-3 shadow-2xl backdrop-blur-xl">
          {/* Mobile search */}
          <div className="mb-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-2.5">
            <Search size={16} strokeWidth={2.3} className="shrink-0 text-white/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services…"
              className="w-full bg-transparent text-[14px] font-medium text-white placeholder:text-white/40 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="shrink-0 text-white/40"
              >
                <X size={15} strokeWidth={2.3} />
              </button>
            )}
          </div>

          {query.trim() ? (
            <div className="flex flex-col py-1">
              {results.length ? (
                results.map((entry) => (
                  <a
                    key={entry.href + entry.title}
                    href={entry.href}
                    onClick={() => {
                      setMobileOpen(false);
                      setQuery("");
                    }}
                    className="flex flex-col rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                  >
                    <span className="flex items-center justify-between">
                      <span className="text-[14.5px] font-bold text-white">
                        {entry.title}
                      </span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-[#4ade80]">
                        {entry.category}
                      </span>
                    </span>
                    {entry.desc && (
                      <span className="mt-0.5 text-[12.5px] font-medium text-white/55">
                        {entry.desc}
                      </span>
                    )}
                  </a>
                ))
              ) : (
                <p className="px-3 py-4 text-center text-[13.5px] font-medium text-white/40">
                  No services matched “{query}”.
                </p>
              )}
            </div>
          ) : (
            NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-white/[0.06] py-2 last:border-none">
                <p className="px-2 py-1.5 text-[12px] font-bold uppercase tracking-wide text-white/40">
                  {item.label}
                </p>
                <div className="flex flex-col">
                  {("links" in item ? item.links : item.featured).map((l: any) => (
                    <a
                      key={l.title}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-2 py-2.5 text-[15px] font-semibold text-white/85 transition-colors hover:bg-white/[0.06]"
                    >
                      {l.title}
                    </a>
                  ))}
                </div>
              </div>
            ))
          )}

          <a
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#3a9e5f] px-4 py-3 text-[14px] font-semibold text-[#04140b]"
          >
            Let's talk
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </>
  );
}
