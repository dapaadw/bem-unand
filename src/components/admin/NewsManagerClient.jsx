"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  FileText,
  Calendar,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ImageUpload from "./ImageUpload";

const emptyForm = {
  title: "",
  publishedAt: "",
  author: "BEM FH UNAND",
  category: "Publikasi",
  body: "",
  attachmentUrl: "",
  imageUrl: "",
};

export default function NewsManagerClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id: string, title: string } | null
  const [message, setMessage] = useState("");
  const sortItems = (list) =>
    [...list].sort(
      (a, b) =>
        new Date(b.publishedAt) - new Date(a.publishedAt) ||
        b.id.localeCompare(a.id),
    );

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setIsUploadingImage(false);
    setFormOpen(true);
    setError("");
    setMessage("");
  }

  function openEdit(item) {
    setForm({
      title: item.title,
      publishedAt: item.publishedAt.slice(0, 10),
      author: item.author || "BEM FH UNAND",
      category: item.category || "Publikasi",
      body: item.body,
      attachmentUrl: item.attachmentUrl || "",
      imageUrl: item.imageUrl || "",
    });
    setEditingId(item.id);
    setIsUploadingImage(false);
    setFormOpen(true);
    setError("");
    setMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = editingId ? `/api/publikasi/${editingId}` : "/api/publikasi";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      let data = null;
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        setError(
          data?.error || `Gagal menyimpan publikasi (Status ${res.status}).`,
        );
        return;
      }

      if (editingId) {
        setItems((prev) =>
          sortItems(prev.map((i) => (i.id === editingId ? data : i))),
        );
      } else {
        setItems((prev) => sortItems([data, ...prev]));
      }
      setFormOpen(false);
      setMessage(
        editingId
          ? "Publikasi berhasil diperbarui."
          : "Publikasi baru berhasil diterbitkan.",
      );
    } catch (err) {
      console.error("Submit error:", err);
      setError(
        err?.message && err.message !== "Failed to fetch"
          ? err.message
          : "Terjadi kesalahan jaringan.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const { id } = deleteTarget;
    setDeletingId(id);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/publikasi/${id}`, { method: "DELETE" });
      let data = null;
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        setError(
          data?.error || `Gagal menghapus publikasi (Status ${res.status}).`,
        );
        return;
      }
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (editingId === id) setFormOpen(false);
      setMessage("Publikasi berhasil dihapus.");
      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError(
        err?.message && err.message !== "Failed to fetch"
          ? err.message
          : "Terjadi kesalahan jaringan.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#9e1c38] hover:bg-[#ba2243] text-[#f8f1e7] border border-[#ba2243] font-bold text-sm shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus size={16} />
          <span>Tambah Publikasi Baru</span>
        </button>

        {items.length > 0 && (
          <p className="text-xs text-[#d4c0bd] self-center">
            Menampilkan{" "}
            <span className="text-brand-neon font-semibold">
              {items.length}
            </span>{" "}
            artikel terpublikasi
          </p>
        )}
      </div>

      {message && (
        <div
          role="status"
          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 text-sm animate-in fade-in"
        >
          <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#3a0d18] border border-[#9e1c38] text-rose-200 text-sm animate-in fade-in"
        >
          <AlertCircle size={18} className="shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Slide-in or Collapsible Create/Edit Form */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1517]/95 backdrop-blur-md border border-[#6d2031] rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4"
        >
          <div className="flex justify-between items-center pb-4 border-b border-[#6d2031]/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#3a0d18] text-brand-neon border border-[#6d2031]">
                <FileText size={18} />
              </div>
              <h2 className="font-bold text-base text-[#f8f1e7]">
                {editingId ? "Edit Publikasi" : "Tulis Publikasi Baru"}
              </h2>
            </div>
            <button
              aria-label="Tutup form publikasi"
              type="button"
              onClick={() => setFormOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#23121b] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4c0bd] md:col-span-2">
              Judul Artikel / Publikasi
              <input
                required
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ketik judul artikel publikasi..."
                className="mt-1.5 block w-full rounded-xl bg-[#14080e] border border-[#6d2031] px-4 py-2.5 text-sm text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4c0bd]">
              Tanggal Publikasi
              <input
                required
                type="date"
                value={form.publishedAt || ""}
                onChange={(e) =>
                  setForm({ ...form, publishedAt: e.target.value })
                }
                className="mt-1.5 block w-full rounded-xl bg-[#14080e] border border-[#6d2031] px-4 py-2.5 text-sm text-[#f8f1e7] focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-wider text-[#d4c0bd]">
              Penulis / Redaksi
              <input
                value={form.author || ""}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="Contoh: BEM FH UNAND / Biro Pers"
                className="mt-1.5 block w-full rounded-xl bg-[#14080e] border border-[#6d2031] px-4 py-2.5 text-sm text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            </label>

            <ImageUpload
              value={form.imageUrl || ""}
              onChange={(url) =>
                setForm((prev) => ({ ...prev, imageUrl: url }))
              }
              onUploadingChange={setIsUploadingImage}
              folder="publikasi"
              label="Foto / Thumbnail Publikasi"
              hint="Format didukung: PNG, JPG, JPEG, WEBP (Maksimal 5MB). Rasio horizontal 16:9 disarankan untuk thumbnail berita & kajian."
              disabled={saving}
            />
          </div>

          <label className="block text-xs font-semibold uppercase tracking-wider text-[#d4c0bd]">
            Isi Naskah / Konten Publikasi
            <textarea
              required
              rows={8}
              value={form.body || ""}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              placeholder="Tuliskan naskah lengkap artikel berita atau kajian hukum di sini..."
              className="mt-1.5 block w-full rounded-xl bg-[#14080e] border border-[#6d2031] px-4 py-3 text-sm text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all leading-relaxed"
            />
          </label>

          <div className="flex items-center gap-3 pt-2">
            <button
              disabled={saving || isUploadingImage}
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#9e1c38] hover:bg-[#ba2243] text-[#f8f1e7] border border-[#ba2243] font-bold text-sm shadow transition-all disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : null}
              <span>
                {saving
                  ? "Menyimpan..."
                  : isUploadingImage
                    ? "Mengunggah Foto..."
                    : editingId
                      ? "Perbarui Publikasi"
                      : "Terbitkan Sekarang"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-[#1f151a] hover:bg-[#2c1d24] text-[#d4c0bd] hover:text-[#f8f1e7] text-sm font-medium border border-[#6d2031] transition-colors cursor-pointer"
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* List of Publications */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1a1517]/80 backdrop-blur-sm border border-[#6d2031]/60 rounded-2xl p-5 hover:border-[#9e1c38] transition-all group shadow-sm"
          >
            <div className="flex items-start gap-4 min-w-0 flex-1">
              {item.imageUrl && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-black/60 border border-[#6d2031] shrink-0 hidden xs:block">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-[#d4c0bd] flex items-center gap-1 font-mono-lib">
                    <Calendar size={12} className="text-[#e3bbb9]" />
                    {item.publishedAt.slice(0, 10)}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#f8f1e7] group-hover:text-brand-neon transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#d4c0bd] line-clamp-2 leading-relaxed">
                  {item.body}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0 border-[#6d2031]/30 w-full sm:w-auto justify-end">
              {item.attachmentUrl && (
                <a
                  href={item.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-[#d4c0bd] hover:text-white hover:bg-[#23121b] transition-colors border border-transparent hover:border-[#6d2031]"
                  title="Buka lampiran"
                >
                  <ExternalLink size={15} />
                </a>
              )}
              <button
                aria-label={`Edit ${item.title}`}
                disabled={saving || deletingId !== null}
                onClick={() => openEdit(item)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1f151a] hover:bg-[#2c1d24] text-[#f8f1e7] text-xs font-medium border border-[#6d2031] transition-colors cursor-pointer"
              >
                <Pencil size={13} className="text-brand-neon" />
                <span>Edit</span>
              </button>
              <button
                aria-label={`Hapus ${item.title}`}
                disabled={saving || deletingId !== null}
                onClick={() =>
                  setDeleteTarget({ id: item.id, title: item.title })
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#3a0d18] hover:bg-[#521526] text-rose-200 text-xs font-medium border border-[#9e1c38]/60 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Trash2 size={13} />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-16 rounded-3xl bg-[#1a1517]/40 border border-[#6d2031]/50 p-6 shadow-sm">
            <FileText size={40} className="mx-auto text-gray-500 mb-3" />
            <p className="text-[#d4c0bd] text-sm">
              Belum ada publikasi atau berita terbit.
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => {
          if (deletingId === null) setDeleteTarget(null);
        }}
        onConfirm={confirmDelete}
        title="Hapus Artikel Publikasi"
        itemName={deleteTarget?.title}
        itemType="artikel publikasi"
        isDeleting={deletingId !== null}
      />
    </div>
  );
}
