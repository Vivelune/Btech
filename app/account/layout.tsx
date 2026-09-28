import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import AccountShell from "../components/AccountShell";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/account");
  }

  const user = await getCurrentUser();

  // Deliberately NOT redirecting to sign-in when `user` is null.
  // getCurrentUser() self-heals (creates the row from Clerk's own data)
  // for a genuinely signed-in person, and page.tsx already shows a
  // graceful "Setting up your account…" screen for the rare moment
  // it's still null. Redirecting to sign-in here bounced real,
  // authenticated users right back where they started.
  if (user?.role === "ADMIN") {
    redirect("/admin");
  }

  if (user?.role === "SALES_REP") {
    redirect("/sales");
  }

  return <AccountShell>{children}</AccountShell>;
}