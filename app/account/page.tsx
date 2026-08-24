import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import ProfileForm from "./ProfileForm";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30",
  CONTACTED: "bg-amber-400/10 text-amber-300 border-amber-400/30",
  CONVERTED: "bg-[#3a9e5f]/20 text-[#65FFAD] border-[#3a9e5f]/40",
  ARCHIVED: "bg-white/[0.06] text-white/40 border-white/10",
};

export default async function AccountPage() {
  const { userId } = await auth();

  // Resource-based auth check: proxy.ts no longer gates routes by path
  // (Clerk deprecated createRouteMatcher-based protection), so every
  // protected page checks auth() itself.
  if (!userId) {
    redirect("/sign-in?redirect_url=/account");
  }

  const dbUser = await getCurrentUser();
  const clerkUser = await currentUser();

  // Signed in with Clerk, but the webhook that creates the Prisma row
  // hasn't landed yet (or failed). Don't show a broken panel.
  if (!dbUser) {
    return (
      <section className="min-h-screen bg-[#061A13] pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-[#F5F1E8]">
            Setting up your account…
          </h1>
          <p className="mt-2 text-sm text-white/50">
            This can take a few seconds after signing up. Refresh the page shortly.
          </p>
        </div>
      </section>
    );
  }

  // Admins live in /admin, not here — send them straight there.
  if (dbUser.role === "ADMIN") {
    redirect("/admin");
  }

  const displayName =
    dbUser.username ??
    dbUser.name?.trim() ??
    clerkUser?.firstName ??
    dbUser.email.split("@")[0];

  const leads = await prisma.lead.findMany({
    where: { email: dbUser.email },
    orderBy: { submittedAt: "desc" },
  });

  return (
    <section className="min-h-screen bg-[#061A13] pt-32 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#65FFAD]">My Account</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1E8]">
              Welcome, {displayName}
            </h1>
          </div>
        </div>

        {/* Status card */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
            Account status
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#3a9e5f]/40 bg-[#3a9e5f]/10 px-3 py-1 text-[13px] font-bold text-[#65FFAD]">
              Active User
            </span>
            <span className="text-sm text-white/50">{dbUser.email}</span>
          </div>
        </div>

        {/* Profile settings */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-white/40">
            Profile settings
          </p>
          <ProfileForm
            name={dbUser.name ?? ""}
            username={dbUser.username ?? ""}
          />
        </div>

        {/* Leads */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-[#F5F1E8]">
            Your submitted leads
          </h2>

          {leads.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/50">
              You haven't submitted any inquiries yet.{" "}
              <Link href="/contactform" className="text-[#4ade80] hover:underline">
                Get in touch
              </Link>
              .
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div>
                    <p className="text-[14.5px] font-bold text-[#F5F1E8]">
                      {lead.service}
                    </p>
                    <p className="mt-1 text-[13px] text-white/50">
                      Submitted{" "}
                      {lead.submittedAt.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-[12px] font-bold uppercase tracking-wide ${
                      STATUS_STYLES[lead.status] ?? STATUS_STYLES.NEW
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}