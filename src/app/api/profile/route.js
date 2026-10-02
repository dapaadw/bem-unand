import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../lib/prisma";
import { requireRole } from "../../../lib/requireRole";
import { logAction } from "../../../lib/audit";
import { isWebOrLocalUrl, youtubeEmbedUrl } from "../../../lib/homeMedia";

export async function GET() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });
  return NextResponse.json(profile);
}

export async function PUT(request) {
  const { session, error } = await requireRole(["ADMIN"]);
  if (error) return error;

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body))
    return NextResponse.json(
      { error: "Payload tidak valid." },
      { status: 400 },
    );
  if (
    body.backgroundColor != null &&
    body.backgroundColor !== "" &&
    !/^#[0-9a-fA-F]{6}$/.test(body.backgroundColor)
  )
    return NextResponse.json(
      { error: "Warna latar harus berupa kode hex enam digit." },
      { status: 400 },
    );
  for (const field of [
    "title",
    "subtitle",
    "heroImageUrl",
    "heroImageAlt",
    "videoUrl",
    "ctaText",
    "ctaLink",
    "visiMisi",
    "logoPhilosophy",
  ]) {
    if (body[field] != null && typeof body[field] !== "string")
      return NextResponse.json(
        { error: "Isian profil tidak valid." },
        { status: 400 },
      );
  }

  if (body.videoUrl && !youtubeEmbedUrl(body.videoUrl)) {
    return NextResponse.json(
      { error: "Gunakan URL video YouTube HTTPS yang valid." },
      { status: 400 },
    );
  }
  if (
    [body.heroImageUrl, body.ctaLink].some(
      (value) => value && !isWebOrLocalUrl(value),
    )
  ) {
    return NextResponse.json(
      {
        error: "Foto dan CTA harus menggunakan URL http/https atau path lokal.",
      },
      { status: 400 },
    );
  }

  const data = {
    title: body.title ?? "",
    subtitle: body.subtitle ?? "",
    heroImageUrl: body.heroImageUrl || null,
    heroImageAlt: body.heroImageAlt || null,
    videoUrl: body.videoUrl || null,
    ctaText: body.ctaText || null,
    ctaLink: body.ctaLink || null,
    visiMisi: body.visiMisi || null,
    logoPhilosophy: body.logoPhilosophy || null,
    ...(body.backgroundColor !== undefined
      ? { backgroundColor: body.backgroundColor || null }
      : {}),
  };

  const updated = await prisma.profile.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });

  await logAction({
    userId: session.userId,
    action: "UPDATE",
    entityType: "Profile",
    entityId: "PRF",
    summary: "Memperbarui profil Home (hero/visi-misi/logo)",
  });

  revalidatePath("/");
  revalidatePath("/", "layout");

  return NextResponse.json(updated);
}
