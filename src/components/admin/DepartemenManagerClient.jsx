"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  Briefcase,
  PhoneCall,
  Save,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  UserPlus,
  FolderPlus,
  ShieldCheck,
} from "lucide-react";

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder = "",
}) {
  const props = {
    value: value || "",
    onChange: (event) => onChange(event.target.value),
    placeholder,
    className:
      "mt-1.5 block w-full min-w-0 rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all",
  };
  return (
    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300">
      {label}
      {multiline ? <textarea {...props} rows={3} /> : <input {...props} />}
    </label>
  );
}

export default function DepartemenManagerClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(initialItems[0]?.id || null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const selected = items.find((item) => item.id === selectedId);

  function update(patch) {
    setItems((previous) =>
      previous.map((item) =>
        item.id === selectedId ? { ...item, ...patch } : item,
      ),
    );
  }

  function updateRow(list, index, field, value) {
    update({
      [list]: selected[list].map((row, position) =>
        position === index ? { ...row, [field]: value } : row,
      ),
    });
  }

  async function perform(method, body) {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch(`/api/departemen/${selectedId}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Gagal menyimpan perubahan.");
        return;
      }
      setItems((previous) =>
        previous
          .map((item) =>
            item.id === selectedId ? { ...item, ...data } : item,
          )
          .sort((a, b) => a.name.localeCompare(b.name)),
      );
      setMessage(
        method === "PUT"
          ? "Profil departemen tersimpan."
          : "Staff, program kerja, dan kontak berhasil diperbarui.",
      );
    } catch {
      setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">

      {/* Status Banners */}
      {message && (
        <div
          role="status"
          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm animate-in fade-in"
        >
          <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm animate-in fade-in"
        >
          <AlertCircle size={18} className="shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {!selected ? (
        <div className="text-center py-16 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
          <Building2 size={40} className="mx-auto text-gray-500 mb-3" />
          <p className="text-gray-400 text-sm">
            Belum ada departemen yang terdaftar.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* Department List Sidebar */}
          <div className="md:col-span-1 space-y-1.5 md:sticky md:top-4 max-h-[75vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
            <div className="px-2 py-1 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Pilih Departemen ({items.length})
              </span>
            </div>
            {items.map((item) => {
              const isActive = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  disabled={saving}
                  aria-pressed={isActive}
                  onClick={() => {
                    setSelectedId(item.id);
                    setMessage("");
                    setError("");
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-xs transition-all duration-150 flex flex-col gap-1 border ${
                    isActive
                      ? "bg-gradient-to-r from-brand-red/60 to-brand-neon/15 border-brand-neon/40 text-white font-semibold shadow-sm"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="truncate block font-medium text-[13px]">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                    <span>{item.staff?.length || 0} Staf</span>
                    <span>•</span>
                    <span>{item.proker?.length || 0} Proker</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Department Detail Editor */}
          <fieldset
            disabled={saving}
            className="md:col-span-3 space-y-8 min-w-0"
          >
            {/* Section 1: Profil */}
            <section className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-brand-neon/10 text-brand-neon">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-white">
                      Profil Departemen
                    </h2>
                    <p className="text-xs text-gray-400">
                      Nama, foto, dan penjelasan ringkas fungsi departemen
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-400">
                  ID: {selected.id}
                </span>
              </div>

              <div className="space-y-4">
                <Field
                  label="Nama Departemen"
                  value={selected.name}
                  onChange={(name) => update({ name })}
                  placeholder="Contoh: Departemen Kastrat"
                />
                <Field
                  label="URL Foto Departemen / Path Lokal"
                  value={selected.photoUrl}
                  onChange={(photoUrl) => update({ photoUrl })}
                  placeholder="Contoh: /images/departemen/kastrat.jpg"
                />
                <Field
                  label="Deskripsi Singkat"
                  multiline
                  value={selected.description}
                  onChange={(description) => update({ description })}
                  placeholder="Jelaskan peran, visi, atau fokus kerja departemen..."
                />
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    perform("PUT", {
                      name: selected.name,
                      photoUrl: selected.photoUrl,
                      description: selected.description,
                    })
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs shadow hover:bg-rose-200 transition-all"
                >
                  <Save size={14} />
                  <span>Simpan Profil</span>
                </button>

                <div className="inline-flex items-center gap-1.5 text-xs text-[#e3bbb9]/70 bg-white/[0.04] border border-[#e3bbb9]/20 rounded-xl px-3.5 py-2 font-mono-lib">
                  <ShieldCheck size={14} className="text-[#e3bbb9]" />
                  <span>Struktur Tetap (Hardcoded)</span>
                </div>
              </div>
            </section>

            {/* Section 2: Staff / BPH */}
            <section className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-brand-neon/10 text-brand-neon">
                    <Users size={18} />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-white">
                      Staf / Jajaran Pengurus
                    </h2>
                    <p className="text-xs text-gray-400">
                      Gunakan jabatan Kepala Departemen / Ketua untuk posisi
                      pimpinan.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    update({
                      staff: [
                        ...selected.staff,
                        {
                          name: "",
                          role: "",
                          photoUrl: "",
                          identity: "",
                          achievements: "",
                        },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors self-start sm:self-auto"
                >
                  <UserPlus size={14} className="text-brand-neon" />
                  <span>Tambah Staf</span>
                </button>
              </div>

              {selected.staff.length === 0 ? (
                <div className="text-center py-8 rounded-xl border border-dashed border-white/10">
                  <p className="text-xs text-gray-400">
                    Belum ada staf ditambahkan untuk departemen ini.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selected.staff.map((staff, index) => (
                    <div
                      key={staff.id || index}
                      className="border border-white/10 rounded-xl p-4 bg-black/20 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <span className="text-xs font-bold text-brand-neon">
                          Staf #{index + 1}
                        </span>
                        <button
                          type="button"
                          aria-label={`Hapus staf ${index + 1}`}
                          onClick={() =>
                            update({
                              staff: selected.staff.filter(
                                (_, position) => position !== index,
                              ),
                            })
                          }
                          className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                        >
                          <Trash2 size={13} />
                          <span>Hapus</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          ["name", "Nama Staf", "Nama lengkap mahasiswa"],
                          [
                            "role",
                            "Jabatan",
                            "Contoh: Kepala Departemen / Staf Ahli",
                          ],
                          [
                            "photoUrl",
                            "URL Foto / Path",
                            "Contoh: /images/staff/nama.jpg",
                          ],
                          [
                            "identity",
                            "Identitas / Jurusan",
                            "Contoh: Ilmu Hukum 2023",
                          ],
                          [
                            "achievements",
                            "Prestasi / Keterangan",
                            "Penghargaan atau peran khusus",
                          ],
                        ].map(([field, label, placeholder]) => (
                          <div
                            key={field}
                            className={
                              field === "achievements" ? "sm:col-span-2" : ""
                            }
                          >
                            <Field
                              label={label}
                              value={staff[field]}
                              onChange={(value) =>
                                updateRow("staff", index, field, value)
                              }
                              multiline={field === "achievements"}
                              placeholder={placeholder}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Section 3: Program Kerja */}
            <section className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-brand-neon/10 text-brand-neon">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-white">
                      Program Kerja (Proker)
                    </h2>
                    <p className="text-xs text-gray-400">
                      Daftar agenda & program utama departemen
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    update({
                      proker: [
                        ...selected.proker,
                        { name: "", description: "" },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors self-start sm:self-auto"
                >
                  <FolderPlus size={14} className="text-brand-neon" />
                  <span>Tambah Proker</span>
                </button>
              </div>

              {selected.proker.length === 0 ? (
                <div className="text-center py-8 rounded-xl border border-dashed border-white/10">
                  <p className="text-xs text-gray-400">
                    Belum ada program kerja yang didaftarkan.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selected.proker.map((program, index) => (
                    <div
                      key={program.id || index}
                      className="border border-white/10 rounded-xl p-4 bg-black/20 space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <span className="text-xs font-bold text-brand-neon">
                          Program #{index + 1}
                        </span>
                        <button
                          type="button"
                          aria-label={`Hapus program kerja ${index + 1}`}
                          onClick={() =>
                            update({
                              proker: selected.proker.filter(
                                (_, position) => position !== index,
                              ),
                            })
                          }
                          className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                        >
                          <Trash2 size={13} />
                          <span>Hapus</span>
                        </button>
                      </div>

                      <Field
                        label="Nama Program Kerja"
                        value={program.name}
                        onChange={(value) =>
                          updateRow("proker", index, "name", value)
                        }
                        placeholder="Contoh: Diskusi Publik Nasional 2026"
                      />
                      <Field
                        label="Deskripsi Program Kerja"
                        multiline
                        value={program.description}
                        onChange={(value) =>
                          updateRow("proker", index, "description", value)
                        }
                        placeholder="Jelaskan tujuan, output, dan sasaran dari program kerja ini..."
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Section 4: Kontak Departemen */}
            <section className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-5 shadow-sm">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <div className="p-2 rounded-xl bg-brand-neon/10 text-brand-neon">
                  <PhoneCall size={18} />
                </div>
                <div>
                  <h2 className="font-bold text-base text-white">
                    Kontak Resmi Departemen
                  </h2>
                  <p className="text-xs text-gray-400">
                    Tautan saluran komunikasi mahasiswa ke departemen
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="WhatsApp Departemen"
                  value={selected.contact?.whatsappUrl}
                  onChange={(whatsappUrl) =>
                    update({ contact: { ...selected.contact, whatsappUrl } })
                  }
                  placeholder="https://wa.me/6281234567890"
                />
                <Field
                  label="Instagram Departemen"
                  value={selected.contact?.instagramUrl}
                  onChange={(instagramUrl) =>
                    update({ contact: { ...selected.contact, instagramUrl } })
                  }
                  placeholder="https://instagram.com/bemfhunand_kastrat"
                />
              </div>
            </section>

            {/* Action Bar (Static / Inline per UI/UX guidelines) */}
            <div className="p-5 rounded-2xl bg-black/[0.4] backdrop-blur-sm border border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-gray-300 text-center sm:text-left">
                <span className="h-2 w-2 rounded-full bg-brand-neon shrink-0 animate-pulse" />
                <span>
                  Perubahan staf, proker, dan kontak akan diterapkan setelah
                  menekan tombol simpan detail.
                </span>
              </div>

              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  perform("PATCH", {
                    staff: selected.staff,
                    proker: selected.proker,
                    contact: selected.contact,
                  })
                }
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-neon to-rose-200 text-brand-dark font-bold text-sm shadow-md hover:shadow-brand-neon/20 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-neon"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Menyimpan Perubahan...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Simpan Staff, Proker &amp; Kontak</span>
                  </>
                )}
              </button>
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
}
