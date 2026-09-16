import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/marketing");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/account");
  }

  if (user.role !== "SALES_REP" && user.role !== "ADMIN") {
    redirect("/account");
  }

  return <>{children}</>;
}