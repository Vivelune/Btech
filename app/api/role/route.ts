
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json(
      { role: null },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      role: true,
    },
  });

  if (!user) {
    return Response.json(
      { role: null },
      { status: 404 }
    );
  }

  return Response.json({
    role: user.role,
  });
}
