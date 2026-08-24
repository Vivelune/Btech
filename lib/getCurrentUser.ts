import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

/**
 * Returns the current signed-in user's row from the database (including role),
 * or null if signed out. Safe to call from Server Components, Server Actions,
 * and Route Handlers (Node.js runtime only — this uses Prisma).
 */
export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  return user;
}