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

  if (!userId) {
    redirect("/sign-in?redirect_url=/sales");
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect("/account");
  }

  if (user.role === "ADMIN") {
    redirect("/admin");
  }

  if (user.role !== "SALES_REP") {
    redirect("/account");
  }

  return <SalesShell>{children}</SalesShell>;
}