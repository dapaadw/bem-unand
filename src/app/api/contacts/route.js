import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../lib/prisma";
import { requireRole } from "../../../lib/requireRole";
import { logAction } from "../../../lib/audit";

const WA_REGEX = /^https:\/\/wa\.me\/62\d{6,15}$/;
const IG_REGEX = /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/;

export async function GET() {
  const contacts = await prisma.contacts.findUnique({ where: { id: 1 } });
  return NextResponse.json(
    contacts || { whatsappUrl: null, instagramUrl: null, email: null },
  );
}

export async function PUT(request) {
  const { session, error } = await requireRole(["ADMIN"]);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body)
    return NextResponse.json(
      { error: "Payload tidak valid." },
      { status: 400 },
    );

  if (body.whatsappUrl && !WA_REGEX.test(body.whatsappUrl)) {
    return NextResponse.json(
      { error: "Format WhatsApp URL harus https://wa.me/62..." },
      { status: 400 },
    );
  }
  if (body.instagramUrl && !IG_REGEX.test(body.instagramUrl)) {
    return NextResponse.json(
      { error: "Format Instagram URL harus https://instagram.com/..." },
      { status: 400 },
    );
  }

  const updated = await prisma.contacts.upsert({
    where: { id: 1 },
    update: {
      whatsappUrl: body.whatsappUrl || null,
      instagramUrl: body.instagramUrl || null,
      email: body.email || null,
    },
    create: {
      id: 1,
      whatsappUrl: body.whatsappUrl || null,
      instagramUrl: body.instagramUrl || null,
      email: body.email || null,
    },
  });

  await logAction({
    userId: session.userId,
    action: "UPDATE",
    entityType: "Contacts",
    entityId: "CTS",
    summary: "Memperbarui kontak resmi (WA/IG/email)",
  });

  revalidatePath("/");

  return NextResponse.json(updated);
}
