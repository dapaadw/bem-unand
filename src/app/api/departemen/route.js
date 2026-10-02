import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../lib/prisma";
import { requireRole, slugify } from "../../../lib/requireRole";
import { logAction } from "../../../lib/audit";
import { departmentProfile } from "../../../lib/departemen";

export async function GET() {
  return NextResponse.json({
    items: await prisma.departemen.findMany({ orderBy: { name: "asc" } }),
  });
}

export async function POST(request) {
  const { session, error } = await requireRole(["ADMIN"]);
  if (error) return error;
  const validated = departmentProfile(await request.json().catch(() => null));
  if (validated.error)
    return NextResponse.json({ error: validated.error }, { status: 400 });
  const item = await prisma.departemen.create({
    data: {
      ...validated.data,
      slug: `${slugify(validated.data.name) || "departemen"}-${randomUUID().slice(0, 8)}`,
    },
    include: { staff: true, proker: true, contact: true },
  });
  await logAction({
    userId: session.userId,
    action: "CREATE",
    entityType: "Departemen",
    entityId: item.id,
    summary: `Membuat departemen "${item.name}"`,
  });
  revalidatePath("/departemen");
  return NextResponse.json(item, { status: 201 });
}
