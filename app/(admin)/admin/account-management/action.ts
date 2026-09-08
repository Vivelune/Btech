"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function createManagedAccount(
  formData: FormData
) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      message: "You must be signed in.",
    };
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    return {
      success: false,
      message: "You are not authorized to create accounts.",
    };
  }

  const name = String(formData.get("name") || "").trim();
  const username = String(formData.get("username") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");
  const role = String(formData.get("role") || "USER");

  if (!name || !email || !password) {
    return {
      success: false,
      message: "Please complete all required fields.",
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters.",
    };
  }

  if (role !== "ADMIN" && role !== "USER") {
    return {
      success: false,
      message: "Invalid account role.",
    };
  }

  try {
    const client = await clerkClient();

    const clerkUser = await client.users.createUser({
      emailAddress: [email],
      password,
      firstName: name,
      ...(username ? { username } : {}),
    });

    await prisma.user.upsert({
      where: {
        clerkId: clerkUser.id,
      },
      update: {
        email,
        name,
        username: username || null,
        role: role as "ADMIN" | "USER",
      },
      create: {
        clerkId: clerkUser.id,
        email,
        name,
        username: username || null,
        role: role as "ADMIN" | "USER",
      },
    });

    return {
      success: true,
      message: `${
        role === "ADMIN"
          ? "Administrator"
          : "Team member"
      } account created successfully.`,
    };
  } catch (error) {
    console.error("ACCOUNT CREATION ERROR:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create account.",
    };
  }
}