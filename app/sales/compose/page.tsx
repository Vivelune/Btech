import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import EmailCompose from "@/app/components/sales/email-compose";

export default async function ComposePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const leads = await prisma.lead.findMany({
    where: {
      assignedToId: user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      service: true,
      status: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  const normalizedLeads = leads.map((lead) => ({
    ...lead,
    service: lead.service ?? "",
  }));

  return (
    <section className="min-h-screen bg-[#061A13]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#65FFAD]">
            Sales Workspace
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#F5F1E8]">
            Compose Email
          </h1>

          <p className="mt-2 text-sm text-white/50">
            Create personalized outreach with the help of AI.
          </p>
        </div>

        <EmailCompose
          leads={normalizedLeads}
        />
      </div>
    </section>
  );
}