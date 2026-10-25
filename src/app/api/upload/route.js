import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { requireRole } from "../../../lib/requireRole";
import { logAction } from "../../../lib/audit";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5 MB

const ALLOWED_MIME_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/svg+xml", ".svg"],
]);

const ALLOWED_FOLDERS = new Set([
  "kegiatan",
  "publikasi",
  "profile",
  "departemen",
]);

export async function POST(request) {
  try {
    const { session, error } = await requireRole(["ADMIN", "SUPERUSER"]);
    if (error) return error;

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: "Tidak ada file yang diunggah." },
        { status: 400 },
      );
    }

    // Check MIME type
    const mimeType = (file.type || "").toLowerCase();
    const extensionFromMime = ALLOWED_MIME_TYPES.get(mimeType);

    if (!extensionFromMime) {
      return NextResponse.json(
        {
          error:
            "Format file tidak didukung. Gunakan PNG, JPG, JPEG, WEBP, GIF, atau SVG.",
        },
        { status: 400 },
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return NextResponse.json(
        { error: `Ukuran file (${sizeMB}MB) melebihi batas maksimal 5MB.` },
        { status: 400 },
      );
    }

    // Folder selection & path-traversal safety
    const requestedFolder = String(formData.get("folder") || "kegiatan")
      .toLowerCase()
      .trim();
    const safeFolder = ALLOWED_FOLDERS.has(requestedFolder)
      ? requestedFolder
      : "kegiatan";

    // Safe extension
    const originalName = file.name || "image";
    const rawExt = path.extname(originalName).toLowerCase();
    const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"].includes(
      rawExt,
    )
      ? rawExt === ".jpeg"
        ? ".jpg"
        : rawExt
      : extensionFromMime;

    // Generate safe, unique filename
    const timestamp = Date.now();
    const randomHex = crypto.randomBytes(4).toString("hex");
    const safeBaseName =
      originalName
        .replace(path.extname(originalName), "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 30)
        .replace(/^-|-$/g, "") || "upload";

    const filename = `${safeFolder}-${timestamp}-${safeBaseName}-${randomHex}${safeExt}`;

    // Target directory: public/uploads/<safeFolder>
    const uploadDir = path.join(process.cwd(), "public", "uploads", safeFolder);
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(filePath, buffer);

    const fileUrl = `/uploads/${safeFolder}/${filename}`;

    await logAction({
      userId: session.userId,
      action: "CREATE",
      entityType: "Media",
      entityId: filename,
      summary: `Mengunggah berkas ${safeFolder} "${originalName}" -> ${fileUrl}`,
    });

    return NextResponse.json(
      {
        success: true,
        url: fileUrl,
        filename,
        originalName,
        size: file.size,
        mimeType,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("SERVER ERROR IN POST /api/upload:", err);
    return NextResponse.json(
      {
        error: err.message || "Terjadi kesalahan saat memproses unggahan file.",
      },
      { status: 500 },
    );
  }
}
