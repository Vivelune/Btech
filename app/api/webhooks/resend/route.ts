import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { logActivity } from "@/lib/activity";

type ResendEvent = {
  type: string;
  data: {
    email_id: string;
    [key: string]: unknown;
  };
};

export async function POST(req: Request) {
  const body = await req.text();

  if (!body) {
    return new Response("Empty body", { status: 400 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing headers", { status: 400 });
  }

  const wh = new Webhook(process.env.RESEND_WEBHOOK_SECRET!);

  let event: ResendEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ResendEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  const providerId = event.data.email_id;

  const email = await prisma.email.findUnique({ where: { providerId } });

  if (!email) {
    // Nothing to correlate this to (e.g. a Resend test event fired from
    // the dashboard) — acknowledge rather than error.
    return new Response("No matching email", { status: 200 });
  }

  const now = new Date();

  switch (event.type) {
    case "email.delivered":
      await prisma.email.update({
        where: { id: email.id },
        data: { status: "DELIVERED", deliveredAt: now },
      });
      await logActivity({ leadId: email.leadId, type: "email_delivered" });
      break;

    case "email.opened":
      await prisma.email.update({
        where: { id: email.id },
        data: { status: "OPENED", openedAt: email.openedAt ?? now },
      });
      await logActivity({ leadId: email.leadId, type: "email_opened" });
      break;

    case "email.bounced":
      await prisma.email.update({
        where: { id: email.id },
        data: { status: "BOUNCED", bouncedAt: now },
      });
      await logActivity({ leadId: email.leadId, type: "email_bounced" });
      break;

    default:
      // email.sent, email.clicked, email.complained, etc. — not tracked
      // in EmailStatus yet; acknowledge and ignore.
      break;
  }

  return new Response("Webhook received");
}