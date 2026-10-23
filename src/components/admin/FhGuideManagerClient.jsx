"use client";

import { useState } from "react";
import {
  Link as LinkIcon,
  HelpCircle,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  X,
} from "lucide-react";

const empty = {
  link: { category: "", title: "", url: "" },
  faq: { question: "", answer: "" },
};
const labels = {
  category: "Kategori Dokumen",
  title: "Judul Dokumen / Panduan",
  url: "URL Dokumen / Google Drive",
  question: "Pertanyaan",
  answer: "Jawaban Lengkap",
};

function Editor({ kind, initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState(empty[kind]);
  const [editing, setEditing] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const isLink = kind === "link";
  const title = isLink ? "Link Dokumen" : "FAQ (Pertanyaan Umum)";

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(
        editing ? `/api/fh-guide/${kind}/${editing}` : "/api/fh-guide",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, kind }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan.");
      setItems((old) =>
        editing
          ? old.map((i) => (i.id === editing ? data : i))
          : [...old, data],
      );
      setForm(empty[kind]);
      setEditing("");
      setMessage(`${title} berhasil disimpan.`);
    } catch (e) {
      setError(e.message || "Terjadi kesalahan jaringan.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(item) {
    if (!window.confirm(`Hapus ${item.title || item.question}?`)) return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch(`/api/fh-guide/${kind}/${item.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus.");
      setItems((old) => old.filter((i) => i.id !== item.id));
      if (editing === item.id) {
        setEditing("");
        setForm(empty[kind]);
      }
      setMessage(`${title} berhasil dihapus.`);
    } catch (e) {
      setError(e.message || "Terjadi kesalahan jaringan.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="bg-[#1a1517]/85 backdrop-blur-sm border border-[#6d2031] rounded-none p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#6d2031]/50">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-none bg-[#3a0d18] text-brand-neon border border-[#6d2031]">
            {isLink ? <LinkIcon size={18} /> : <HelpCircle size={18} />}
          </div>
          <div>
            <h2 className="font-bold text-base text-[#f8f1e7]">
              {isLink
                ? "Direktori Dokumen & Link"
                : "Daftar Pertanyaan Umum (FAQ)"}
            </h2>
            <p className="text-xs text-[#d4c0bd]">
              {isLink
                ? "Kumpulan tautan berkas panduan akademik/kemahasiswaan"
                : "Pertanyaan dan jawaban penting seputar FH UNAND"}
            </p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-none bg-[#1f151a] border border-[#6d2031] text-[#d4c0bd] font-mono">
          {items.length} item
        </span>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 p-3 rounded-none bg-[#3a0d18] border border-[#9e1c38] text-rose-200 text-xs"
        >
          <AlertCircle size={15} className="shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}
      {message && (
        <div
          role="status"
          className="flex items-center gap-2 p-3 rounded-none bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 text-xs"
        >
          <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {/* Editor Form */}
      <form
        onSubmit={submit}
        className="p-4 rounded-none bg-[#12060b] border border-[#6d2031]/60 space-y-3.5"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-brand-neon uppercase tracking-wider font-mono-lib">
            {editing ? `Edit ${title}` : `Tambah ${title} Baru`}
          </span>
          {editing && (
            <button
              disabled={busy}
              type="button"
              onClick={() => {
                setEditing("");
                setForm(empty[kind]);
              }}
              className="text-xs text-[#d4c0bd] hover:text-white flex items-center gap-1"
            >
              <X size={13} />
              <span>Batal</span>
            </button>
          )}
        </div>

        {Object.keys(empty[kind]).map((key) => (
          <label
            key={key}
            className="block text-xs font-semibold uppercase tracking-wider text-[#d4c0bd]"
          >
            {labels[key]}
            {key === "answer" ? (
              <textarea
                required
                maxLength={10000}
                rows={4}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder="Tuliskan jawaban yang lengkap dan jelas..."
                className="mt-1.5 block w-full rounded-none bg-[#14080e] border border-[#6d2031] p-3 text-sm text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            ) : (
              <input
                required
                type={key === "url" ? "url" : "text"}
                maxLength={
                  key === "url"
                    ? 2000
                    : key === "category"
                      ? 100
                      : key === "question"
                        ? 500
                        : 250
                }
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={
                  key === "url"
                    ? "https://drive.google.com/..."
                    : `Ketik ${labels[key].toLowerCase()}...`
                }
                className="mt-1.5 block w-full rounded-none bg-[#14080e] border border-[#6d2031] px-3.5 py-2.5 text-sm text-[#f8f1e7] placeholder-[#d4c0bd]/40 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
              />
            )}
          </label>
        ))}

        {isLink && (
          <p className="text-[11px] text-[#d4c0bd]/80">
            💡 Gunakan tautan dokumen atau folder Google Drive/Docs yang sudah
            disetel ke akses &quot;Siapa saja yang memiliki tautan&quot;.
          </p>
        )}

        <button
          disabled={busy}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#9e1c38] hover:bg-[#ba2243] text-[#f8f1e7] border border-[#ba2243] font-bold text-xs shadow transition-all disabled:opacity-50"
        >
          {busy ? (
            <Loader2 size={14} className="animate-spin" />
          ) : editing ? (
            <Save size={14} />
          ) : (
            <Plus size={14} />
          )}
          <span>
            {busy
              ? "Menyimpan..."
              : editing
                ? `Simpan Perubahan ${title}`
                : `Tambah ${title}`}
          </span>
        </button>
      </form>

      {/* Item List */}
      <div className="space-y-2.5">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#12060b] border border-[#6d2031]/50 rounded-none p-3.5 hover:border-[#9e1c38] transition-all group"
          >
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2">
                {item.category && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none bg-[#3a0d18] text-brand-neon border border-[#6d2031] font-mono-lib">
                    {item.category}
                  </span>
                )}
                <p className="font-semibold text-sm text-[#f8f1e7]">
                  {item.title || item.question}
                </p>
              </div>
              {item.answer && (
                <p className="text-xs text-[#d4c0bd] whitespace-pre-wrap line-clamp-2 leading-relaxed">
                  {item.answer}
                </p>
              )}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-brand-neon hover:underline break-all mt-0.5"
                >
                  <span>{item.url}</span>
                  <ExternalLink size={11} />
                </a>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
              <button
                disabled={busy}
                onClick={() => {
                  setEditing(item.id);
                  setForm(
                    Object.fromEntries(
                      Object.keys(empty[kind]).map((key) => [key, item[key]]),
                    ),
                  );
                  setMessage("");
                  setError("");
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-none bg-[#1f151a] hover:bg-[#2c1d24] text-[#f8f1e7] text-xs border border-[#6d2031] transition-colors"
                aria-label={`Edit ${item.title || item.question}`}
              >
                <Pencil size={12} className="text-brand-neon" />
                <span>Edit</span>
              </button>
              <button
                disabled={busy}
                onClick={() => remove(item)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-none bg-[#3a0d18] hover:bg-[#521526] text-rose-200 text-xs border border-[#9e1c38]/60 transition-colors disabled:opacity-50"
                aria-label={`Hapus ${item.title || item.question}`}
              >
                <Trash2 size={12} />
                <span>Hapus</span>
              </button>
            </div>
          </article>
        ))}

        {!items.length && (
          <p className="text-center py-8 text-xs text-[#d4c0bd]/60">
            Belum ada {title.toLowerCase()} terdaftar.
          </p>
        )}
      </div>
    </section>
  );
}

export default function FhGuideManagerClient({ initialLinks, initialFaqs }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <Editor kind="link" initialItems={initialLinks} />
      <Editor kind="faq" initialItems={initialFaqs} />
    </div>
  );
}
