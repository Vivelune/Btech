import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import AdminShell from "../../components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // Resource-based auth check: proxy.ts no longer gates routes by path
  // (Clerk deprecated createRouteMatcher-based protection), so every
  // protected page/layout checks auth() itself.
  if (!userId) {
    redirect("/sign-in?redirect_url=/admin");
  }

  const user = await getCurrentUser();

  // Signed in via Clerk but no matching Prisma row yet (webhook lag) —
  // send them somewhere safe rather than letting them through.
  if (!user) {
    redirect("/account");
  }

  if (user.role !== "ADMIN") {
    redirect("/account");
  }

  return <AdminShell>{children}</AdminShell>;
}