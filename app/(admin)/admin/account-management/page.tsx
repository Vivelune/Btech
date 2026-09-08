import prisma from "@/lib/prisma";
import AccountCreationForm from "./AccountCreationForm";

export default async function AccountManagementPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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
            Create and manage BTECH team member and administrator accounts.
          </p>
        </div>

        {/* Create account */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-lg font-bold text-[#F5F1E8]">
            Create Account
          </h2>

          <p className="mt-1 mb-6 text-sm text-white/40">
            Create a new team member or administrator.
          </p>

          <AccountCreationForm />
        </div>

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
                    className={`
                      rounded-full border px-3 py-1 text-xs font-bold
                      ${
                        user.role === "ADMIN"
                          ? "border-[#65FFAD]/30 bg-[#65FFAD]/10 text-[#65FFAD]"
                          : "border-white/10 bg-white/[0.05] text-white/50"
                      }
                    `}
                  >
                    {user.role === "ADMIN"
                      ? "ADMIN"
                      : "TEAM MEMBER"}
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