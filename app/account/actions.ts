"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ProfileFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const { userId } = await auth();

  if (!userId) {
    return { status: "error", message: "You must be signed in." };
  }

  const name = formData.get("name");
  const username = formData.get("username");

  if (typeof name !== "string" || typeof username !== "string") {
    return { status: "error", message: "Invalid form submission." };
  }

  const trimmedName = name.trim();
  const trimmedUsername = username.trim();

  if (
    trimmedUsername &&
    !/^[a-zA-Z0-9_]{4,64}$/.test(trimmedUsername)
  ) {
    return {
      status: "error",
      message:
        "Username must be 4-64 characters: letters, numbers, underscores only.",
    };
  }

  try {
    // Update Neon first.
    await prisma.user.update({
      where: { clerkId: userId },
      data: {
        name: trimmedName || null,
        username: trimmedUsername || null,
      },
    });

    // Then Clerk, so the navbar's useUser()-based greeting reflects the
    // change right away instead of waiting on a user.updated webhook.
    const [firstName, ...rest] = trimmedName.split(" ").filter(Boolean);
    const client = await clerkClient();

    await client.users.updateUser(userId, {
      firstName: firstName || undefined,
      lastName: rest.join(" ") || undefined,
      ...(trimmedUsername ? { username: trimmedUsername } : {}),
    });
  } catch (err) {
    return {
      status: "error",
      message:
        err instanceof Error
          ? err.message
          : "Something went wrong updating your profile.",
    };
  }

  revalidatePath("/account");

  return { status: "success", message: "Profile updated." };
}