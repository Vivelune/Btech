import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  CalendarDays,
  Clock3,
  FileText,
  Megaphone,
  X,
} from "lucide-react";

export const metadata = {
  title: "Social Media Hub | BTech Digital Solutions",
  description:
    "Manage and prepare social media content with BTech Social Hub.",
};

const platforms = [
  {
    name: "X (Twitter)",
    description:
      "Create short posts, prepare content, and plan your publishing schedule.",
    href: "/social-media/x",
    status: "Frontend ready",
    icon: X,
  },
  {
    name: "Facebook Pages",
    description:
      "Prepare Facebook Page posts, captions, images, and videos.",
    href: "/social-media/facebook",
    status: "Frontend ready",
    icon: Globe2,
  },
];

const features = [
  {
    title: "Content Calendar",
    description:
      "A central place to plan upcoming posts and review your publishing schedule.",
    icon: CalendarDays,
  },
  {
    title: "Draft Management",
    description:
      "Prepare content before publishing and keep unfinished ideas organized.",
    icon: FileText,
  },
  {
    title: "Publishing Workflow",
    description:
      "Prepare posts for immediate publication or scheduled release.",
    icon: Clock3,
  },
];

export default function SocialMediaHubPage() {
  return (
    <main className="min-h-screen bg-[#061A13] text-[#F5F1E8]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#65FFAD]/20 bg-[#65FFAD]/10 px-3 py-2 text-xs font-medium text-[#65FFAD]">
            <Megaphone size={15} />
            BTech Digital Solutions
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#65FFAD]">
                MARKETING WORKSPACE
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Social Media Hub
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
                Prepare social media content, organize your ideas,
                and get your posts ready for publication from one
                workspace.
              </p>
            </div>

            <div className="w-fit rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3">
              <p className="text-xs font-semibold text-amber-200">
                DEVELOPMENT MODE
              </p>

              <p className="mt-1 text-xs text-white/50">
                Social accounts are not connected yet.
              </p>
            </div>
          </div>
        </header>

        {/* Summary cards */}
        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0A2119] p-5">
            <p className="text-sm text-white/45">Assigned platforms</p>

            <p className="mt-3 text-3xl font-bold text-[#65FFAD]">
              02
            </p>

            <p className="mt-2 text-xs text-white/35">
              X and Facebook
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0A2119] p-5">
            <p className="text-sm text-white/45">Post creation</p>

            <p className="mt-3 text-3xl font-bold text-[#65FFAD]">
              Ready
            </p>

            <p className="mt-2 text-xs text-white/35">
              Frontend prototype
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0A2119] p-5">
            <p className="text-sm text-white/45">Live publishing</p>

            <p className="mt-3 text-3xl font-bold text-amber-200">
              Pending
            </p>

            <p className="mt-2 text-xs text-white/35">
              Requires account and API integration
            </p>
          </div>
        </section>

        {/* Platform cards */}
        <section className="mb-12">
          <div className="mb-5">
            <p className="text-sm font-medium text-[#65FFAD]">
              YOUR ASSIGNED TASKS
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Choose a platform
            </h2>

            <p className="mt-2 text-sm text-white/45">
              Open either workspace to create and preview a post.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {platforms.map((platform) => {
              const Icon = platform.icon;

              return (
                <Link
                  key={platform.href}
                  href={platform.href}
                  className="group rounded-3xl border border-white/10 bg-[#0A2119] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#65FFAD]/40 hover:bg-[#0D281E] sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#65FFAD]/20 bg-[#65FFAD]/10 text-[#65FFAD]">
                      <Icon size={27} />
                    </div>

                    <span className="rounded-full border border-[#65FFAD]/20 bg-[#65FFAD]/10 px-3 py-1.5 text-xs font-medium text-[#65FFAD]">
                      {platform.status}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {platform.name}
                  </h3>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-white/45">
                    {platform.description}
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#65FFAD]">
                    Open workspace
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Planned features */}
        <section>
          <div className="mb-5">
            <p className="text-sm font-medium text-[#65FFAD]">
              WORKSPACE FEATURES
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Built for your marketing workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-[#0A2119] p-5"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#65FFAD]/10 text-[#65FFAD]">
                    <Icon size={20} />
                  </div>

                  <h3 className="font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/45">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/35">
            BTech Digital Solutions · Social Media Scheduler
          </p>
        </footer>
      </div>
    </main>
  );
}