import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/backend";


// Upserts a User row for this Clerk account, reconciling the case where
// the email is already attached to a different clerkId in Neon. That
// happens when an account is deleted and re-created in Clerk with the
// same email (new clerkId) — Clerk retries the old event, or the row
// from the old account is still sitting there, and email is @unique.
async function syncUserFromClerk(user: {
  id: string;
  email_addresses: { email_address: string }[];
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
}) {

  const email = user.email_addresses[0]?.email_address;

  if (!email) return;

  const name = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
  const username = user.username ?? null;

  const existingByEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingByEmail && existingByEmail.clerkId !== user.id) {
    // Same email, different (newer) Clerk account — the old row is stale.
    // Re-point it at the current clerkId instead of failing on the
    // email unique constraint.
    await prisma.user.update({
      where: { email },
      data: { clerkId: user.id, name, username },
    });
    return;
  }

  await prisma.user.upsert({
    where: { clerkId: user.id },
    update: { email, name, username },
    create: { clerkId: user.id, email, name, username },
  });
}


export async function POST(req: Request) {

  const body = await req.text();

  if (!body) {
    // Clerk's dashboard "Send test event" and some retries can send an
    // empty body — req.json() would throw SyntaxError on this. Just
    // acknowledge it; there's nothing to process.
    return new Response("Empty body", { status: 400 });
  }

  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");


  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing headers", {
      status: 400,
    });
  }


  const wh = new Webhook(
    process.env.CLERK_WEBHOOK_SECRET!
  );


  let event: WebhookEvent;


  try {

    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;


  } catch(err) {

    return new Response(
      "Invalid signature",
      {
        status:400
      }
    );

  }


  if(event.type === "user.created") {

    await syncUserFromClerk(event.data);

  }


  if(event.type === "user.updated") {

    await syncUserFromClerk(event.data);

  }


  if(event.type === "user.deleted") {

    const user = event.data;

    if (user.id) {

      // deleteMany instead of delete: won't throw if the row is already
      // gone (e.g. this event is retried, or it was never created).
      await prisma.user.deleteMany({

        where: { clerkId: user.id },

      });

    }

  }


  return new Response("Webhook received");
}