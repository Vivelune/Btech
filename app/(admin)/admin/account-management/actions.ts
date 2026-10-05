"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { revalidatePath } from "next/cache";
import type { Role } from "@/app/generated/prisma/client";

const VALID_ROLES: Role[] = ["USER", "SALES_REP", "ADMIN"];

export type CreateAccountFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function createPendingAccount(
  _prevState: CreateAccountFormState,
  formData: FormData
): Promise<CreateAccountFormState> {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    return { status: "error", message: "Not authorized." };
  }

  const email = formData.get("email");
  const role = formData.get("role");

  if (typeof email !== "string" || !email.trim()) {
    return { status: "error", message: "Email is required." };
  }

  if (typeof role !== "string" || !VALID_ROLES.includes(role as Role)) {
    return { status: "error", message: "Invalid role." };
  }

  const trimmedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email: trimmedEmail },
  });

  if (existingUser) {
    return {
      status: "error",
      message:
        "This email already has an account — change their role from Users instead.",
    };
  }

  try {
    await prisma.pendingRoleAssignment.upsert({
      where: { email: trimmedEmail },
      update: { role: role as Role },
      create: { email: trimmedEmail, role: role as Role },
    });
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Something went wrong.",
    };
  }

  revalidatePath("/admin/account-management");

  return {
    status: "success",
    message: `${trimmedEmail} will be assigned the ${role} role when they sign up.`,
  };
}

export async function cancelPendingAccount(formData: FormData) {
  const admin = await getCurrentUser();

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Not authorized");
  }

  const email = formData.get("email");
  if (typeof email !== "string") return;

  await prisma.pendingRoleAssignment.deleteMany({ where: { email } });

  revalidatePath("/admin/account-management");
}