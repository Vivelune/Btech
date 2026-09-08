
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/backend";

// -----------------------------------------------------------------------------
// Sync Clerk user → Prisma/Neon
// -----------------------------------------------------------------------------
// This function handles both:
// 1. Creating a new Prisma User when a Clerk account is created.
// 2. Updating an existing Prisma User when the Clerk account changes.
//
// It also handles the situation where the email already exists in Neon but
// belongs to an old Clerk account.
// -----------------------------------------------------------------------------

async function syncUserFromClerk(user: {
  id: string;
  email_addresses: {
    email_address: string;
  }[];
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
}) {
  const email = user.email_addresses[0]?.email_address;

  // A user without an email cannot be stored because our Prisma
  // User.email field is required.
  if (!email) {
    return;
  }

  const name =
    `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();

  const username = user.username ?? null;

  // ---------------------------------------------------------------------------
  // Check whether this email already exists in Neon
  // ---------------------------------------------------------------------------

  const existingByEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // ---------------------------------------------------------------------------
  // Same email but different Clerk ID
  // ---------------------------------------------------------------------------
  // This can happen when an old Clerk account was deleted and another account
  // was later created with the same email address.
  //
  // Because email is @unique in Prisma, we update the existing row instead of
  // trying to create another row with the same email.
  // ---------------------------------------------------------------------------

  if (existingByEmail && existingByEmail.clerkId !== user.id) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        clerkId: user.id,
        name,
        username,
      },
    });

    return;
  }

  // ---------------------------------------------------------------------------
  // Create or update the user
  // ---------------------------------------------------------------------------
  // upsert means:
  //
  // If clerkId exists → UPDATE the existing user.
  // If clerkId does not exist → CREATE a new user.
  //
  // The Prisma schema will automatically give the user the default role:
  // USER
  // unless a different role is specifically assigned.
  // ---------------------------------------------------------------------------

  await prisma.user.upsert({
    where: {
      clerkId: user.id,
    },

    update: {
      email,
      name,
      username,
    },

    create: {
      clerkId: user.id,
      email,
      name,
      username,
    },
  });
}

// -----------------------------------------------------------------------------
// POST /api/webhook/clerk
// -----------------------------------------------------------------------------

export async function POST(req: Request) {
  // IMPORTANT:
  // Use req.text() instead of req.json().
  //
  // Svix/Clerk signature verification must use the original request body.
  const body = await req.text();

  if (!body) {
    return new Response("Empty body", {
      status: 400,
    });
  }

  // ---------------------------------------------------------------------------
  // Get Svix webhook headers
  // ---------------------------------------------------------------------------

  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  // ---------------------------------------------------------------------------
  // Make sure Clerk/Svix sent all required signature headers
  // ---------------------------------------------------------------------------

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing headers", {
      status: 400,
    });
  }

  // ---------------------------------------------------------------------------
  // Verify webhook signature
  // ---------------------------------------------------------------------------

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error(
      "CLERK_WEBHOOK_SECRET is missing from environment variables."
    );

    return new Response("Webhook secret is not configured", {
      status: 500,
    });
  }

  const wh = new Webhook(webhookSecret);

  let event: WebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Clerk webhook signature verification failed:", error);

    return new Response("Invalid signature", {
      status: 400,
    });
  }

  // ---------------------------------------------------------------------------
  // USER CREATED
  // ---------------------------------------------------------------------------

  if (event.type === "user.created") {
    try {
      await syncUserFromClerk(event.data);

      console.log(
        `Clerk user created and synced to Neon: ${event.data.id}`
      );
    } catch (error) {
      console.error(
        "Failed to create Clerk user in Prisma/Neon:",
        error
      );

      return new Response("Failed to sync user", {
        status: 500,
      });
    }
  }

  // ---------------------------------------------------------------------------
  // USER UPDATED
  // ---------------------------------------------------------------------------

  if (event.type === "user.updated") {
    try {
      await syncUserFromClerk(event.data);

      console.log(
        `Clerk user updated and synced to Neon: ${event.data.id}`
      );
    } catch (error) {
      console.error(
        "Failed to update Clerk user in Prisma/Neon:",
        error
      );

      return new Response("Failed to sync user", {
        status: 500,
      });
    }
  }

  // ---------------------------------------------------------------------------
  // USER DELETED
  // ---------------------------------------------------------------------------

  if (event.type === "user.deleted") {
    const user = event.data;

    if (user.id) {
      try {
        await prisma.user.deleteMany({
          where: {
            clerkId: user.id,
          },
        });

        console.log(
          `Clerk user deleted from Neon: ${user.id}`
        );
      } catch (error) {
        console.error(
          "Failed to delete Clerk user from Prisma/Neon:",
          error
        );

        return new Response("Failed to delete user", {
          status: 500,
        });
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Webhook successfully processed
  // ---------------------------------------------------------------------------

  return new Response("Webhook received", {
    status: 200,
  });
}
``
