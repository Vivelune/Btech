import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import ProfileForm from "./ProfileForm";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30",

  CONTACTED:
    "bg-amber-400/10 text-amber-300 border-amber-400/30",

  CONVERTED:
    "bg-[#3a9e5f]/20 text-[#65FFAD] border-[#3a9e5f]/40",

  ARCHIVED:
    "bg-white/[0.06] text-white/40 border-white/10",
};

export default async function AccountPage() {
  const { userId } = await auth();

  /*
    ==========================================
    AUTHENTICATION CHECK
    ==========================================
  */

  if (!userId) {
    redirect("/sign-in?redirect_url=/account");
  }

  /*
    ==========================================
    GET USER INFORMATION
    ==========================================
  */

  const dbUser = await getCurrentUser();

  const clerkUser = await currentUser();

  /*
    ==========================================
    ACCOUNT STILL SYNCING
    ==========================================

    The user has successfully signed up with Clerk,
    but the database account may still be syncing
    through the webhook.
  */

  if (!dbUser) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[#061A13] pt-32 pb-16">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-100px] top-[100px] h-[300px] w-[300px] rounded-full bg-[#3a9e5f]/10 blur-[120px]" />

          <div className="absolute bottom-[-100px] right-[-100px] h-[350px] w-[350px] rounded-full bg-[#4ade80]/10 blur-[150px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-[#0A241B]/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3a9e5f]/20">
              <div className="h-5 w-5 animate-pulse rounded-full bg-[#65FFAD]" />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#65FFAD]">
              BTech Account
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#F5F1E8]">
              Setting up your account...
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
              Your BTech account has been created successfully. We are
              currently syncing your account information with our database.
            </p>

            <div className="mt-6 rounded-2xl border border-[#3a9e5f]/20 bg-[#3a9e5f]/10 p-4">
              <p className="text-sm text-[#65FFAD]">
                Please wait a few seconds and refresh the page.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/account"
                className="rounded-full bg-[#3a9e5f] px-5 py-2.5 text-sm font-bold text-[#04140b] transition hover:bg-[#65FFAD]"
              >
                Refresh Account
              </Link>

              <Link
                href="/"
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/[0.08]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
    ==========================================
    ADMIN CHECK
    ==========================================

    Admin users should never remain on /account.
    They are automatically redirected to /admin.
  */

  if (dbUser.role === "ADMIN") {
    redirect("/admin");
  }

  /*
    ==========================================
    DISPLAY NAME
    ==========================================
  */

  const displayName =
    dbUser.username ||
    dbUser.name?.trim() ||
    clerkUser?.firstName ||
    dbUser.email.split("@")[0];

  /*
    ==========================================
    GET USER LEADS
    ==========================================
  */

  const leads = await prisma.lead.findMany({
    where: {
      email: dbUser.email,
    },

    orderBy: {
      submittedAt: "desc",
    },
  });

  /*
    ==========================================
    ACCOUNT PAGE
    ==========================================
  */

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#061A13] pt-32 pb-16">
      
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-150px] top-[150px] h-[350px] w-[350px] rounded-full bg-[#3a9e5f]/10 blur-[150px]" />

        <div className="absolute bottom-[-150px] right-[-150px] h-[400px] w-[400px] rounded-full bg-[#4ade80]/5 blur-[160px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:45px_45px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* =====================================
            HEADER
        ====================================== */}

        <div className="mb-10 flex flex-wrap items-start justify-between gap-4">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#65FFAD]">
              My Account
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#F5F1E8] sm:text-4xl">
              Welcome, {displayName}
            </h1>

            <p className="mt-3 text-sm text-white/50">
              Manage your BTech account and submitted inquiries.
            </p>
          </div>

          {/* Account badge */}

          <div className="rounded-full border border-[#3a9e5f]/30 bg-[#3a9e5f]/10 px-4 py-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[#65FFAD]">
              BTech Member
            </span>
          </div>

        </div>


        {/* =====================================
            ACCOUNT STATUS
        ====================================== */}

        <div className="mb-10 rounded-3xl border border-white/10 bg-[#0A241B]/70 p-6 shadow-xl backdrop-blur-xl">

          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
            Account Status
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">

            <span className="rounded-full border border-[#3a9e5f]/40 bg-[#3a9e5f]/10 px-4 py-1.5 text-[13px] font-bold text-[#65FFAD]">
              Active User
            </span>

            <span className="text-sm text-white/50">
              {dbUser.email}
            </span>

          </div>

        </div>


        {/* =====================================
            PROFILE SETTINGS
        ====================================== */}

        <div className="mb-10 rounded-3xl border border-white/10 bg-[#0A241B]/70 p-6 shadow-xl backdrop-blur-xl">

          <div className="mb-6">

            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              Profile Settings
            </p>

            <p className="mt-2 text-sm text-white/50">
              Update your personal information and username.
            </p>

          </div>

          <ProfileForm
            name={dbUser.name ?? ""}
            username={dbUser.username ?? ""}
          />

        </div>


        {/* =====================================
            SUBMITTED LEADS
        ====================================== */}

        <div>

          <div className="mb-5">

            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
              My Inquiries
            </p>

            <h2 className="mt-2 text-xl font-bold text-[#F5F1E8]">
              Your submitted leads
            </h2>

          </div>


          {/* NO LEADS */}

          {leads.length === 0 ? (

            <div className="rounded-3xl border border-white/10 bg-[#0A241B]/70 p-8 text-center shadow-xl backdrop-blur-xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3a9e5f]/10">
                <span className="text-xl text-[#65FFAD]">
                  +
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#F5F1E8]">
                No inquiries yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/50">
                You haven't submitted any inquiries yet. Contact the BTech
                team to discuss your next project.
              </p>

              <Link
                href="/contactform"
                className="mt-6 inline-flex rounded-full bg-[#3a9e5f] px-5 py-2.5 text-sm font-bold text-[#04140b] transition hover:bg-[#65FFAD]"
              >
                Get in Touch
              </Link>

            </div>

          ) : (

            <div className="flex flex-col gap-4">

              {leads.map((lead) => (

                <div
                  key={lead.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-[#0A241B]/70 p-6 shadow-xl backdrop-blur-xl"
                >

                  <div>

                    <p className="text-[15px] font-bold text-[#F5F1E8]">
                      {lead.service}
                    </p>

                    <p className="mt-2 text-[13px] text-white/50">
                      Submitted{" "}

                      {lead.submittedAt.toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}

                    </p>

                  </div>


                  {/* Lead Status */}

                  <span
                    className={`rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide ${
                      STATUS_STYLES[lead.status] ??
                      STATUS_STYLES.NEW
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