import prisma from "@/lib/prisma";
import AccountCreationForm from "./AccountCreationForm";
import { cancelPendingAccount } from "./actions";

const ROLE_BADGE_STYLES: Record<string, string> = {
  ADMIN: "border-[#65FFAD]/30 bg-[#65FFAD]/10 text-[#65FFAD]",
  SALES_REP: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  USER: "border-white/10 bg-white/[0.05] text-white/50",
};

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "ADMIN",
  SALES_REP: "SALES REP",
  USER: "USER",
};

export default async function AccountManagementPage() {
  const [users, pending] = await Promise.all([
    prisma.user.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.pendingRoleAssignment.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#65FFAD]">
            Account Management
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1E8]">
            Manage Accounts
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-white/50">
            Pre-register a role for someone who hasn't signed up yet — it
            applies automatically the moment they create their own account
            through the normal sign-up page.
          </p>
        </div>

        {/* Pre-register */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-bold text-[#F5F1E8]">
            Pre-register a Role
          </h2>

          <p className="mt-1 mb-6 text-sm text-white/40">
            This doesn't create an account by itself — they still sign up
            themselves.
          </p>

          <AccountCreationForm />
        </div>

        {/* Pending pre-registrations */}
        {pending.length > 0 && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="border-b border-white/10 p-6">
              <h2 className="text-lg font-bold text-[#F5F1E8]">
                Pending ({pending.length})
              </h2>
              <p className="mt-1 text-sm text-white/40">
                Not signed up yet — role applies automatically on signup.
              </p>
            </div>

            <div className="divide-y divide-white/10">
              {pending.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-4 p-5"
                >
                  <div>
                    <p className="font-semibold text-[#F5F1E8]">{p.email}</p>
                    <p className="mt-1 text-xs text-white/30">
                      Pre-registered{" "}
                      {p.createdAt.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${ROLE_BADGE_STYLES[p.role]}`}
                    >
                      {ROLE_LABELS[p.role]}
                    </span>

                    <form action={cancelPendingAccount}>
                      <input type="hidden" name="email" value={p.email} />
                      <button
                        type="submit"
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 transition hover:border-red-400/40 hover:text-red-300"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Existing accounts */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 p-6">
            <h2 className="text-lg font-bold text-[#F5F1E8]">
              Existing Accounts
            </h2>
          </div>

          <div className="divide-y divide-white/10">
            {users.length === 0 ? (
              <div className="p-6 text-sm text-white/50">
                No accounts found.
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-wrap items-center justify-between gap-4 p-5"
                >
                  <div>
                    <p className="font-semibold text-[#F5F1E8]">
                      {user.name || "Unnamed User"}
                    </p>

                    <p className="mt-1 text-sm text-white/40">
                      {user.email}
                    </p>

                    {user.username && (
                      <p className="mt-1 text-xs text-white/30">
                        @{user.username}
                      </p>
                    )}
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${ROLE_BADGE_STYLES[user.role]}`}
                  >
                    {ROLE_LABELS[user.role]}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}