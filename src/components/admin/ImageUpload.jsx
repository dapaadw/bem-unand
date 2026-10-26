"use client";

import { useState, useRef } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";

export default function ImageUpload({
  value = "",
  onChange,
  onUploadingChange,
  folder = "kegiatan",
  label = "Poster / Banner Kegiatan",
  hint = "Format didukung: PNG, JPG, JPEG, WEBP (Maksimal 5MB). Rasio vertikal (4:5) atau horizontal (16:9).",
  disabled = false,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState("");
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  const setUploadState = (isUp) => {
    setUploading(isUp);
    if (onUploadingChange) onUploadingChange(isUp);
  };

  async function handleUploadFile(file) {
    if (!file) return;

    // Validate type
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",

    ];
    if (!validTypes.includes(file.type)) {
      setError(
        "Format file tidak didukung. Harap pilih gambar bertipe PNG, JPG, JPEG, atau WEBP.",
      );
      return;
    }

    // Validate size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setError(`Ukuran file (${sizeMB} MB) melebihi batas maksimal 5MB.`);
      return;
    }

    setError("");
    setUploadState(true);
    setUploadProgressText(`Mengunggah "${file.name}"...`);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error || `Gagal mengunggah gambar (Status ${res.status}).`,
        );
      }

      if (data?.url) {
        onChange(data.url);
      } else {
        throw new Error("Respon server tidak memuat URL gambar.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.message || "Gagal mengunggah file. Silakan coba kembali.");
    } finally {
      setUploadState(false);
      setUploadProgressText("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (file) {
      handleUploadFile(file);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !uploading) {
      setIsDragging(true);
    }
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled || uploading) return;

    const file = e.dataTransfer?.files?.[0];
    if (file) {
      handleUploadFile(file);
    }
  }

  function handleRemove() {
    onChange("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const hasImage = Boolean(value && value.trim());

  return (
    <div className="space-y-2 md:col-span-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#d4c0bd] flex items-center gap-1.5">
          <ImageIcon size={14} className="text-brand-neon" />
          <span>{label}</span>
          <span className="text-[#6d2031] font-normal normal-case text-[11px]">
            (Opsional)
          </span>
        </label>

        {/* Subtle toggle for advanced manual URL */}
        <button
          type="button"
          onClick={() => setShowUrlInput((prev) => !prev)}
          className="text-[11px] text-[#d4c0bd]/70 hover:text-brand-neon underline underline-offset-2 transition-colors cursor-pointer"
        >
          {showUrlInput ? "Sembunyikan Input URL" : "Input URL Manual"}
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
        aria-label="Pilih berkas poster kegiatan"
      />

      {/* Optional Manual URL Input */}
      {showUrlInput && (
        <div className="p-3 rounded-xl bg-[#14080e] border border-[#6d2031] space-y-1.5 animate-in fade-in duration-200">
          <label className="text-[11px] text-[#d4c0bd] block">
            Tautan URL Poster / Gambar Luar
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://... atau /uploads/kegiatan/..."
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled || uploading}
              className="flex-1 rounded-lg bg-[#1a1517] border border-[#6d2031] px-3 py-1.5 text-xs text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon transition-all"
            />
            {value && (
              <button
                type="button"
                onClick={handleRemove}
                className="px-2.5 py-1.5 rounded-lg bg-[#3a0d18] text-rose-200 hover:text-white text-xs border border-[#9e1c38]/60 transition-colors cursor-pointer"
                title="Hapus URL"
              >
                Hapus
              </button>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-[#3a0d18]/90 border border-rose-500/60 text-rose-200 text-xs">
          <AlertCircle size={16} className="shrink-0 text-rose-400" />
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => setError("")}
            className="text-rose-300 hover:text-white p-0.5 rounded cursor-pointer"
            aria-label="Tutup pesan error"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Drag-and-Drop Area & Preview */}
      {hasImage ? (
        /* Image Preview State */
        <div className="relative rounded-2xl bg-[#14080e] border border-[#6d2031] p-3 overflow-hidden shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Thumbnail Preview */}
            <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-black/60 border border-[#6d2031]/80 shrink-0 flex items-center justify-center group">
              <img
                src={value}
                alt="Pratinjau poster kegiatan"
                className="w-full h-full object-cover object-center transition-transform group-hover:scale-105 duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback =
                    e.currentTarget.parentElement?.querySelector(
                      ".img-fallback",
                    );
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="img-fallback hidden text-center p-2 text-xs text-rose-300">
                Gambar tidak dapat dimuat
              </div>
            </div>

            {/* Details & Controls */}
            <div className="flex-1 min-w-0 space-y-3 w-full">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                    <CheckCircle2 size={12} />
                    Poster Siap Dipakai
                  </span>
                </div>
                <p
                  className="text-xs text-[#f8f1e7] font-mono-lib truncate"
                  title={value}
                >
                  {value}
                </p>
                <p className="text-[11px] text-[#d4c0bd]/80">
                  Poster ini akan ditampilkan pada halaman detail dan kartu
                  kegiatan.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={disabled || uploading}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1f151a] hover:bg-[#2c1d24] text-[#f8f1e7] text-xs font-semibold border border-[#6d2031] hover:border-brand-neon transition-all cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw size={13} className="text-brand-neon" />
                  <span>Ganti File Gambar</span>
                </button>

                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#14080e] hover:bg-[#1f151a] text-[#d4c0bd] hover:text-[#f8f1e7] text-xs font-medium border border-[#6d2031]/80 transition-colors"
                  title="Buka poster di tab baru"
                >
                  <ExternalLink size={13} />
                  <span>Lihat Penuh</span>
                </a>

                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={disabled || uploading}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#3a0d18] hover:bg-[#521526] text-rose-200 text-xs font-medium border border-[#9e1c38]/60 transition-colors cursor-pointer disabled:opacity-50 ml-auto"
                >
                  <Trash2 size={13} />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Dropzone State */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            if (!disabled && !uploading) {
              fileInputRef.current?.click();
            }
          }}
          onKeyDown={(e) => {
            if (
              (e.key === "Enter" || e.key === " ") &&
              !disabled &&
              !uploading
            ) {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Klik atau seret file gambar ke sini untuk mengunggah poster kegiatan"
          className={`relative rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-neon ${
            isDragging
              ? "border-brand-neon bg-[#9e1c38]/20 scale-[1.01] shadow-lg shadow-[#9e1c38]/10"
              : "border-[#6d2031] hover:border-[#9e1c38] bg-[#14080e]/70 hover:bg-[#14080e]"
          } ${disabled || uploading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center py-4 space-y-3">
              <Loader2 size={36} className="text-brand-neon animate-spin" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#f8f1e7]">
                  {uploadProgressText || "Sedang mengunggah berkas gambar..."}
                </p>
                <p className="text-xs text-[#d4c0bd]">
                  Mohon tunggu sebentar, file sedang disimpan ke server.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3">
              <div
                className={`p-3.5 rounded-2xl border transition-all ${
                  isDragging
                    ? "bg-[#9e1c38] text-white border-brand-neon"
                    : "bg-[#23121b] text-brand-neon border-[#6d2031]"
                }`}
              >
                <UploadCloud size={28} />
              </div>

              <div className="space-y-1 max-w-md">
                <p className="text-sm font-bold text-[#f8f1e7]">
                  {isDragging
                    ? "Lepaskan file sekarang untuk mengunggah"
                    : "Tarik & lepas poster / banner di sini"}
                </p>
                <p className="text-xs text-[#d4c0bd]">
                  atau gunakan tombol di bawah untuk memilih file dari perangkat
                  Anda
                </p>
              </div>

              {/* Tombol menambahkan */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                disabled={disabled || uploading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9e1c38] hover:bg-[#ba2243] text-[#f8f1e7] border border-[#ba2243] font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Plus size={15} />
                <span>Pilih & Unggah File Poster</span>
              </button>

              <p className="text-[11px] text-[#d4c0bd]/60 pt-1">{hint}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
