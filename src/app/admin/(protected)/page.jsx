import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { requirePageRole } from "../../../lib/requirePageRole";
import {
  FileText,
  CalendarDays,
  Building2,
  ScrollText,
  ExternalLink,
  Plus,
  Shield,
  MapPin,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await requirePageRole(["ADMIN", "SUPERUSER"]);
  const isDosen = session.role === "SUPERUSER";

  const [
    publikasiCount,
    kegiatanCount,
    kegiatanLombaCount,
    kegiatanInternalCount,
    upcomingKegiatan,
    recentPublikasi,
    recentAuditLogs,
  ] = await Promise.all([
    prisma.publikasi.count(),
    prisma.kegiatan.count(),
    prisma.kegiatan.count({ where: { type: "LOMBA" } }),
    prisma.kegiatan.count({ where: { type: "INTERNAL" } }),
    prisma.kegiatan.findMany({
      take: 4,
      orderBy: [{ date: "asc" }, { id: "asc" }],
    }),
    prisma.publikasi.findMany({
      take: 4,
      orderBy: [{ publishedAt: "desc" }, { id: "desc" }],
    }),
    prisma.auditLog.findMany({
      take: 5,
      include: { user: { select: { name: true, role: true } } },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    }),
  ]);

  // Contextual Greeting
  const currentHour = new Date().getHours();
  let greetingTime = "Selamat Datang";
  if (currentHour >= 4 && currentHour < 11) greetingTime = "Selamat Pagi";
  else if (currentHour >= 11 && currentHour < 15)
    greetingTime = "Selamat Siang";
  else if (currentHour >= 15 && currentHour < 18) greetingTime = "Selamat Sore";
  else greetingTime = "Selamat Malam";

  return (
    <div className="space-y-7 pb-10">
      {/* 1. Executive Briefing Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#521526]/90 via-[#1a0a13] to-[#0e0409] border border-[#6d2031] p-6 md:p-8 backdrop-blur-xl shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3a0d18] border border-[#e3bbb9]/30 text-xs text-brand-neon font-semibold font-mono-lib">
              <LayoutDashboard size={13} aria-hidden="true" />
              <span>
                Portal Tata Kelola &amp; Administrasi Organisasi Mahasiswa
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#f8f1e7]">
              {greetingTime},{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f8f1e7] via-rose-100 to-brand-neon">
                {session.name}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[#d4c0bd] leading-relaxed">
              {isDosen
                ? "Panel Khusus Dosen Pembina Kemahasiswaan & Pengarah BEM FH UNAND. Memantau kepatuhan program fungsi, persiapan agenda lomba, dan transparansi rekam jejak sistem."
                : "Pusat Kendali Pengurus BEM FH UNAND. Kelola publikasi informasi, koordinasi agenda kegiatan & lomba, serta kelola profil dan program fungsi departemen."}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-[#d4c0bd]">
              <span className="flex items-center gap-1.5">
                <Shield
                  size={13}
                  className="text-brand-neon"
                  aria-hidden="true"
                />
                <span>
                  Otentikasi:{" "}
                  <strong className="text-[#f8f1e7]">{session.role}</strong>
                </span>
              </span>
              <span className="text-[#6d2031]">|</span>
              <span>Tahun Kepengurusan 2026/2027</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            {isDosen ? (
              <>
                <Link
                  href="/admin/audit-log"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#9e1c38] hover:bg-[#ba2243] text-[#f8f1e7] border border-[#ba2243] text-xs font-bold transition-all shadow-sm"
                >
                  <ScrollText size={15} aria-hidden="true" />
                  <span>Inspeksi Audit Trail</span>
                </Link>
                <Link
                  href="/admin/departemen"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1f151a] hover:bg-[#2c1d24] text-[#f8f1e7] border border-[#6d2031] text-xs font-medium transition-all"
                >
                  <Building2
                    size={15}
                    className="text-brand-neon"
                    aria-hidden="true"
                  />
                  <span>Lihat Departemen</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/admin/news"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#9e1c38] hover:bg-[#ba2243] text-[#f8f1e7] border border-[#ba2243] text-xs font-bold transition-all shadow-sm"
                >
                  <Plus size={15} aria-hidden="true" />
                  <span>Tulis Publikasi Baru</span>
                </Link>
                <Link
                  href="/admin/kegiatan"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1f151a] hover:bg-[#2c1d24] text-[#f8f1e7] border border-[#6d2031] text-xs font-medium transition-all"
                >
                  <CalendarDays
                    size={15}
                    className="text-brand-neon"
                    aria-hidden="true"
                  />
                  <span>Tambah Agenda Kegiatan</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 2. Primary KPI Executive Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* KPI 1: Kegiatan & Prestasi */}
        <div className="rounded-2xl bg-[#1a1517]/90 border border-[#6d2031]/60 p-5 backdrop-blur-md hover:border-[#9e1c38] transition-all duration-200 flex flex-col justify-between space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-[#d4c0bd]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#d4c0bd]">
              Kegiatan
            </span>
            <div className="p-2 rounded-xl bg-[#3a0d18] text-rose-200 border border-[#6d2031]">
              <CalendarDays size={16} aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 justify-between">
            <span className="text-3xl font-extrabold text-[#f8f1e7]">
              {kegiatanCount}
            </span>
            <span className="text-xs font-medium text-brand-neon bg-[#3a0d18] px-2.5 py-0.5 rounded-full border border-[#6d2031]">
              {kegiatanLombaCount} Lomba
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-[#6d2031]/40 text-[11px] text-center">
            <div className="bg-[#12060b] p-2 rounded-xl border border-[#6d2031]/40">
              <span className="font-bold text-rose-200 block text-lg">
                {kegiatanLombaCount}
              </span>
              <span className="text-[#d4c0bd]/80 text-[10px]">
                Kompetisi Mahasiswa
              </span>
            </div>
            <div className="bg-[#12060b] p-2 rounded-xl border border-[#6d2031]/40">
              <span className="font-bold text-gray-200 block text-lg">
                {kegiatanInternalCount}
              </span>
              <span className="text-[#d4c0bd]/80 text-[10px]">
                Internal BEM
              </span>
            </div>
          </div>
        </div>

        {/* KPI 2: Publikasi */}
        <div className="rounded-2xl bg-[#1a1517]/90 border border-[#6d2031]/60 p-5 backdrop-blur-md hover:border-[#9e1c38] transition-all duration-200 flex flex-col justify-between space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-[#d4c0bd]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#d4c0bd]">
              Publikasi &amp; Berita
            </span>
            <div className="p-2 rounded-xl bg-[#3a0d18] text-brand-neon border border-[#6d2031]">
              <FileText size={16} aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 justify-between">
            <span className="text-3xl font-extrabold text-[#f8f1e7]">
              {publikasiCount}
            </span>
            <span className="text-xs font-medium text-brand-neon bg-[#3a0d18] px-2.5 py-0.5 rounded-full border border-[#6d2031]">
              Tayang Publik
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 pt-2 border-t border-[#6d2031]/40 text-[11px] text-center">
            <div className="p-2.5 rounded-xl bg-[#12060b] border border-[#6d2031]/40 text-[11px] text-gray-300">
              <span className="font-bold text-gray-200 block text-lg">
                {publikasiCount}
              </span>
              <span className="text-[#d4c0bd]/80 text-[10px]">
                Artikel &amp; Kajian Hukum
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Agenda & Kompetisi Mendatang */}
      <section className="rounded-3xl bg-[#1a1517]/90 border border-[#6d2031]/60 p-5 md:p-6 backdrop-blur-md space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#6d2031]/50 pb-3">
          <div>
            <h2 className="text-base font-bold text-[#f8f1e7] flex items-center gap-2">
              <CalendarDays
                size={16}
                className="text-brand-neon"
                aria-hidden="true"
              />
              <span>Agenda Kegi Terdekat</span>
            </h2>
            <p className="text-xs text-[#d4c0bd] mt-0.5">
              Monitoring jadwal kegiatan kemahasiswaan mendatang
            </p>
          </div>

          <Link
            href="/admin/kegiatan"
            className="text-xs text-brand-neon hover:text-[#f8f1e7] font-medium hover:underline flex items-center gap-1"
          >
            <span>Semua Agenda</span>
            <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>

        {upcomingKegiatan.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#d4c0bd] space-y-1.5">
            <p>Belum ada agenda kegiatan yang terdaftar.</p>
            {!isDosen && (
              <Link
                href="/admin/kegiatan"
                className="text-brand-neon hover:underline"
              >
                Tambah agenda pertama
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {upcomingKegiatan.map((item) => {
              const itemDate = new Date(item.date);
              const isLomba = item.type === "LOMBA";

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#12060b] border border-[#6d2031]/60 hover:border-[#9e1c38] transition-all space-y-2 group shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        isLomba
                          ? "bg-[#3a0d18] text-rose-200 border-[#6d2031]"
                          : "bg-[#1f151a] text-[#d4c0bd] border-[#6d2031]/60"
                      }`}
                    >
                      {isLomba ? "Lomba Mahasiswa" : "Internal BEM"}
                    </span>

                    <span className="text-[11px] font-mono text-[#d4c0bd]">
                      {itemDate.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-xs font-semibold text-[#f8f1e7] group-hover:text-brand-neon transition-colors line-clamp-1">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-[#d4c0bd] pt-1.5 border-t border-[#6d2031]/30">
                    <span className="flex items-center gap-1 truncate max-w-[140px]">
                      <MapPin
                        size={11}
                        className="text-brand-neon shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.location}</span>
                    </span>
                    <span className="text-[#d4c0bd]/80 truncate max-w-[110px]">
                      {item.organizer}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Two-Column Activity Stream */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Stream 1: Publikasi Terkini */}
        <div className="rounded-3xl bg-[#1a1517]/90 border border-[#6d2031]/60 p-5 md:p-6 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#6d2031]/50 pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#f8f1e7] flex items-center gap-2">
                  <FileText
                    size={16}
                    className="text-brand-neon"
                    aria-hidden="true"
                  />
                  <span>Publikasi Terkini</span>
                </h3>
                <p className="text-xs text-[#d4c0bd] mt-0.5">
                  Artikel dan rilis pers BEM yang tayang di portal publik
                </p>
              </div>
              <Link
                href="/admin/news"
                className="text-xs text-brand-neon hover:text-[#f8f1e7] hover:underline flex items-center gap-1"
              >
                <span>Kelola</span>
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>

            {recentPublikasi.length === 0 ? (
              <p className="text-xs text-[#d4c0bd] py-6 text-center">
                Belum ada artikel publikasi.
              </p>
            ) : (
              <div className="space-y-2.5">
                {recentPublikasi.map((pub) => (
                  <div
                    key={pub.id}
                    className="p-3.5 rounded-2xl bg-[#12060b] border border-[#6d2031]/60 hover:border-[#9e1c38] transition-all space-y-1.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#3a0d18] text-brand-neon border border-[#6d2031]">
                        {pub.category}
                      </span>
                      <span className="text-[10px] text-[#d4c0bd] font-mono">
                        {pub.publishedAt
                          ? new Date(pub.publishedAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                              },
                            )
                          : "-"}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-[#f8f1e7] line-clamp-2 leading-snug">
                      {pub.title}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] text-[#d4c0bd] pt-1.5 border-t border-[#6d2031]/30">
                      <span className="truncate">Oleh: {pub.author}</span>
                      {pub.slug && (
                        <Link
                          href={`/publikasi/${pub.slug}`}
                          target="_blank"
                          className="text-brand-neon hover:text-[#f8f1e7] flex items-center gap-1 font-medium"
                        >
                          <span>Baca</span>
                          <ExternalLink size={10} aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-[#6d2031]/50">
            <Link
              href="/admin/news"
              className="w-full py-2.5 rounded-xl bg-[#1f151a] hover:bg-[#2c1d24] text-center text-xs text-[#f8f1e7] font-medium block border border-[#6d2031] transition-colors"
            >
              Semua Publikasi
            </Link>
          </div>
        </div>

        {/* Stream 2: Audit Trail Log */}
        <div className="rounded-3xl bg-[#1a1517]/90 border border-[#6d2031]/60 p-5 md:p-6 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#6d2031]/50 pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#f8f1e7] flex items-center gap-2">
                  <ScrollText
                    size={16}
                    className="text-brand-neon"
                    aria-hidden="true"
                  />
                  <span>Audit Trail Sistem</span>
                </h3>
                <p className="text-xs text-[#d4c0bd] mt-0.5">
                  Catatan mutasi data sistem dan riwayat aksi pengurus
                </p>
              </div>
              <Link
                href="/admin/audit-log"
                className="text-xs text-brand-neon hover:text-[#f8f1e7] hover:underline flex items-center gap-1"
              >
                <span>Semua</span>
                <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>

            {recentAuditLogs.length === 0 ? (
              <p className="text-xs text-[#d4c0bd] py-6 text-center">
                Belum ada catatan aktivitas audit.
              </p>
            ) : (
              <div className="space-y-2">
                {recentAuditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-2xl bg-[#12060b] border border-[#6d2031]/60 text-xs space-y-1 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-1.5 text-[11px]">
                      <span className="font-semibold text-[#f8f1e7] truncate max-w-[130px]">
                        {log.user?.name || "Admin"}
                      </span>
                      <span className="text-[10px] text-[#d4c0bd] font-mono shrink-0">
                        {new Date(log.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>

                    <p className="text-[#d4c0bd] text-[11px] line-clamp-1">
                      {log.summary}
                    </p>

                    <div className="flex items-center gap-1.5 text-[9px] text-[#d4c0bd] pt-0.5">
                      <span
                        className={`font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          log.action === "CREATE"
                            ? "text-emerald-300 bg-emerald-950/60 border-emerald-600/40"
                            : log.action === "DELETE"
                              ? "text-rose-200 bg-[#3a0d18] border-[#9e1c38]"
                              : "text-brand-neon bg-[#1f151a] border-[#6d2031]"
                        }`}
                      >
                        {log.action}
                      </span>
                      <span>·</span>
                      <span>{log.entityType}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-[#6d2031]/50">
            <Link
              href="/admin/audit-log"
              className="w-full py-2.5 rounded-xl bg-[#1f151a] hover:bg-[#2c1d24] text-center text-xs text-[#f8f1e7] font-medium block border border-[#6d2031] transition-colors"
            >
              Log Lengkap
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
