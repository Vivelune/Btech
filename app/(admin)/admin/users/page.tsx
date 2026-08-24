import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import UserRoleForm from "../UserRoleForm";

export default async function AdminUsersPage() {
  const admin = await getCurrentUser();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#65FFAD]">Admin</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F5F1E8]">
            Users ({users.length})
          </h1>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-white/[0.04] text-[11px] uppercase tracking-wide text-white/40">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
                <th className="px-4 py-3 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 font-medium text-[#F5F1E8]">
                    {user.username ?? user.name?.trim() ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-white/60">{user.email}</td>
                  <td className="px-4 py-3 text-white/40">
                    {user.createdAt.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <UserRoleForm
                      userId={user.id}
                      role={user.role}
                      isSelf={admin?.id === user.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}