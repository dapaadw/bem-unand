import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { requireRole } from "../../../lib/requireRole";
import { logAction } from "../../../lib/audit";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_MIME_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

const FOLDER_ROLES = {
  kegiatan: ["ADMIN", "SUPERUSER"],
  publikasi: ["ADMIN", "SUPERUSER"],
  profile: ["SUPERUSER"],
  departemen: ["SUPERUSER"],
};

function detectImageExtension(buffer) {
  if (!buffer || buffer.length < 12) return null;
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return ".png";
  }
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return ".jpg";
  }
  // GIF: "GIF87a" or "GIF89a"
  if (
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38 &&
    (buffer[4] === 0x37 || buffer[4] === 0x39) &&
    buffer[5] === 0x61
  ) {
    return ".gif";
  }
  // WEBP: "RIFF" .... "WEBP"
  if (
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return ".webp";
  }
  return null;
}

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

    // Check MIME type (raster images only; SVG disabled to prevent Stored XSS)
    const mimeType = (file.type || "").toLowerCase();
    const extensionFromMime = ALLOWED_MIME_TYPES.get(mimeType);

    if (!extensionFromMime) {
      return NextResponse.json(
        {
          error:
            "Format file tidak didukung. Gunakan PNG, JPG, JPEG, WEBP, atau GIF.",
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

    // Folder selection, path-traversal safety & folder-level RBAC
    const requestedFolder = String(formData.get("folder") || "kegiatan")
      .toLowerCase()
      .trim();
    const safeFolder = Object.hasOwn(FOLDER_ROLES, requestedFolder)
      ? requestedFolder
      : "kegiatan";

    if (!FOLDER_ROLES[safeFolder].includes(session.role)) {
      return NextResponse.json(
        { error: "Tidak memiliki akses untuk mengunggah ke direktori ini." },
        { status: 403 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Verify binary magic bytes match declared raster image type
    const detectedExt = detectImageExtension(buffer);
    if (!detectedExt || detectedExt !== extensionFromMime) {
      return NextResponse.json(
        {
          error:
            "Isi biner file tidak valid atau tidak sesuai dengan tipe gambar.",
        },
        { status: 400 },
      );
    }

    const originalName = file.name || "image";

    // Generate safe, unique filename using canonical detected extension
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

    const filename = `${safeFolder}-${timestamp}-${safeBaseName}-${randomHex}${detectedExt}`;

    // Target directory: public/uploads/<safeFolder>
    const uploadDir = path.join(process.cwd(), "public", "uploads", safeFolder);
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
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
        error: "Terjadi kesalahan saat memproses unggahan file.",
      },
      { status: 500 },
    );
  }
}
