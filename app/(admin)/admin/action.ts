"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { revalidatePath } from "next/cache";

const VALID_STATUSES = ["NEW", "CONTACTED", "CONVERTED", "ARCHIVED"] as const;
const VALID_ROLES = ["USER", "ADMIN"] as const;

async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }

  return user;
}

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin();

  const leadId = formData.get("leadId");
  const status = formData.get("status");

  if (typeof leadId !== "string" || typeof status !== "string") return;
  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) return;

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: status as (typeof VALID_STATUSES)[number] },
  });

  revalidatePath("/admin");
}

export async function updateUserRole(formData: FormData) {
  const admin = await requireAdmin();

  const userId = formData.get("userId");
  const role = formData.get("role");

  if (typeof userId !== "string" || typeof role !== "string") return;
  if (!VALID_ROLES.includes(role as (typeof VALID_ROLES)[number])) return;

  const targetId = Number(userId);
  if (Number.isNaN(targetId)) return;

  // Don't let an admin strip their own admin access and get locked out.
  if (targetId === admin.id && role !== "ADMIN") {
    throw new Error("You can't remove your own admin access.");
  }

  await prisma.user.update({
    where: { id: targetId },
    data: { role: role as (typeof VALID_ROLES)[number] },
  });

  revalidatePath("/admin");
}