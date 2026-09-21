import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import SalesShell from "@/app/components/sales/salesShell";

export default async function SalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // User is not signed in
  if (!userId) {
    redirect("/sign-in?redirect_url=/sales");
  }

  // Get the current user from the database
  const user = await getCurrentUser();

  // User exists in Clerk but not in our database
  if (!user) {
    redirect("/account");
  }

  // Admin users belong in the Admin Portal
  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  // Sales dashboard
  return <SalesShell>{children}</SalesShell>;
}