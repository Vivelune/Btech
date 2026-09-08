"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { revalidatePath } from "next/cache";

const VALID_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL_SENT",
  "NEGOTIATING",
  "WON",
  "LOST",
] as const;
const VALID_PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;
const VALID_TAGS = [
  "Web Development",
  "SEO",
  "E-commerce",
  "Maintenance",
] as const;
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

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function updateLead(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  try {
    await requireAdmin();
  } catch {
    return { status: "error", message: "Not authorized." };
  }

  const leadId = formData.get("leadId");
  if (typeof leadId !== "string" || !leadId) {
    return { status: "error", message: "Missing lead." };
  }

  const priority = formData.get("priority");
  const notes = formData.get("notes");
  const followUpDate = formData.get("followUpDate");
  const assignedToId = formData.get("assignedToId");
  const estimatedValue = formData.get("estimatedValue");
  const tags = formData
    .getAll("tags")
    .filter(
      (t): t is string =>
        typeof t === "string" &&
        VALID_TAGS.includes(t as (typeof VALID_TAGS)[number])
    );

  const data: {
    priority?: (typeof VALID_PRIORITIES)[number];
    notes?: string | null;
    followUpDate?: Date | null;
    assignedToId?: number | null;
    estimatedValue?: number | null;
    tags?: string[];
  } = { tags };

  if (
    typeof priority === "string" &&
    VALID_PRIORITIES.includes(priority as (typeof VALID_PRIORITIES)[number])
  ) {
    data.priority = priority as (typeof VALID_PRIORITIES)[number];
  }

  if (typeof notes === "string") {
    data.notes = notes.trim() || null;
  }

  if (typeof followUpDate === "string") {
    data.followUpDate = followUpDate ? new Date(followUpDate) : null;
  }

  if (typeof assignedToId === "string") {
    data.assignedToId = assignedToId ? Number(assignedToId) : null;
    if (data.assignedToId !== null && Number.isNaN(data.assignedToId)) {
      return { status: "error", message: "Invalid assignee." };
    }
  }

  if (typeof estimatedValue === "string") {
    if (!estimatedValue) {
      data.estimatedValue = null;
    } else {
      const parsed = Number(estimatedValue);
      if (Number.isNaN(parsed) || parsed < 0) {
        return { status: "error", message: "Invalid estimated value." };
      }
      data.estimatedValue = parsed;
    }
  }

  try {
    await prisma.lead.update({ where: { id: leadId }, data });
  } catch {
    return {
      status: "error",
      message: "Couldn't save changes. Please try again.",
    };
  }

  revalidatePath("/admin/leads");

  return { status: "success", message: "Lead updated." };
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