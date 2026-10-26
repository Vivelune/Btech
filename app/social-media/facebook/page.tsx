import Link from "next/link";
import { ArrowLeft, Globe2 } from "lucide-react";
import SocialPostComposer from "@/app/components/social-media/socialpostcomposer";

export const metadata = {
  title: "Facebook Posts | BTech Digital Solutions",
  description:
    "Create, preview, and prepare Facebook Page posts using the BTech Social Media Hub.",
};

export default function FacebookPostsPage() {
  return (
    <main className="min-h-screen bg-[#061A13] px-4 py-8 text-[#F5F1E8] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Navigation */}
        <Link
          href="/social-media"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-[#65FFAD]"
        >
          <ArrowLeft size={18} />
          Back to Social Media Hub
        </Link>

        {/* Page Header */}
        <header className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#65FFAD]/20 bg-[#65FFAD]/10 text-[#65FFAD]">
            <Globe2 size={28} />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#65FFAD]">
            BTech Social Media Hub
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Facebook Pages
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
            Prepare Facebook Page captions, select media, save drafts, and
            organize content for your business audience.
          </p>
        </header>

        {/* Development Notice */}
        <div className="mb-8 rounded-2xl border border-amber-300/20 bg-amber-300/5 p-5">
          <p className="text-sm font-semibold text-amber-200">
            Development Mode
          </p>

          <p className="mt-2 text-sm leading-6 text-white/50">
            The Facebook Page and publishing API have not been connected yet.
            You can prepare content using this frontend, but publishing and
            scheduling are not connected to Facebook.
          </p>
        </div>

        {/* Post Composer */}
        <section className="rounded-3xl border border-white/10 bg-[#0A2119] p-4 sm:p-6 lg:p-8">
          <SocialPostComposer platform="facebook" />
        </section>

        {/* Footer */}
        <footer className="mt-8 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/35">
            BTech Digital Solutions · Facebook Publishing Workspace
          </p>
        </footer>
      </div>
    </main>
  );
}