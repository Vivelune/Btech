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

  if (!user) {
    redirect("/sign-in?redirect_url=/account");
  }

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  return <AccountShell>{children}</AccountShell>;
}