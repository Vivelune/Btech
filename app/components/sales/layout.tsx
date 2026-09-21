import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import SalesShell from "./salesShell";

export default async function SalesLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/sales");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/account");
  }

  // Current Prisma schema has ADMIN and USER.
  // USER is temporarily treated as the Sales Rep role.
  if (user.role !== "USER" && user.role !== "ADMIN") {
    redirect("/account");
  }

  return <SalesShell>{children}</SalesShell>;
}