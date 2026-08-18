<<<<<<< Updated upstream
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/leads — create a new lead from the contact form
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, service, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
=======
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, service, message } = body;

    if (!name || !email || !service || !message) {
      return Response.json(
        { error: "All fields are required." },
>>>>>>> Stashed changes
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
<<<<<<< Updated upstream
      data: { name, email, service, message },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (err) {
    console.error("Lead creation failed:", err);
    return NextResponse.json(
      { error: "Failed to submit form" },
=======
      data: {
        name,
        email,
        service,
        message,
      },
    });

    return Response.json(
      {
        message: "Lead created successfully.",
        lead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);

    return Response.json(
      { error: "Failed to create lead." },
>>>>>>> Stashed changes
      { status: 500 }
    );
  }
}
<<<<<<< Updated upstream

// GET /api/leads — list all leads, newest first (used by the admin dashboard)
export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { submittedAt: "desc" },
    });
    return NextResponse.json({ leads }, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch leads:", err);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
=======
>>>>>>> Stashed changes
