import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/backend";


export async function POST(req: Request) {

  const payload = await req.json();

  const body = JSON.stringify(payload);

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

    const user = event.data;


    await prisma.user.create({

      data:{

        clerkId:user.id,

        email:
          user.email_addresses[0]
          .email_address,

        name:
          `${user.first_name ?? ""} ${user.last_name ?? ""}`,

        username:
          user.username ?? null,

      }

    });

  }


  return new Response("Webhook received");
}