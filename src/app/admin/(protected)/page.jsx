import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/session";
import {
  FileText,
  CalendarDays,
  Building2,
  ScrollText,
  ExternalLink,
  Plus,
  Users,
  Shield,
  MapPin,
  Tag,
  LayoutDashboard,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getSession();
  const isDosen = session.role === "SUPERUSER";

  // Fetch real data from database in parallel
  const [
    publikasiCount,
    kegiatanCount,
    kegiatanLombaCount,
    kegiatanInternalCount,
    departemenCount,
    staffCount,
    prokerCount,
    upcomingKegiatan,
    recentPublikasi,
    recentAuditLogs,
    departemenHighlights,
  ] = await Promise.all([
    prisma.publikasi.count(),
    prisma.kegiatan.count(),
    prisma.kegiatan.count({ where: { type: "LOMBA" } }),
    prisma.kegiatan.count({ where: { type: "INTERNAL" } }),
    prisma.departemen.count(),
    prisma.departemenStaff.count(),
    prisma.programKerja.count(),
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
    prisma.departemen.findMany({
      take: 4,
      include: {
        _count: {
          select: { staff: true, proker: true },
        },
      },
      orderBy: { name: "asc" },
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
    <div className="space-y-6 pb-8">
      {/* 1. Executive Briefing Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-red/35 via-brand-dark/95 to-black/90 border border-white/10 p-6 md:p-8 backdrop-blur-xl shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/30 text-xs text-brand-neon font-semibold">
              <LayoutDashboard size={13} aria-hidden="true" />
              <span>
                Portal Tata Kelola &amp; Administrasi Organisasi Mahasiswa
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {greetingTime},{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-brand-neon">
                {session.name}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {isDosen
                ? "Panel Khusus Dosen Pembina Kemahasiswaan & Pengarah BEM FH UNAND. Memantau kepatuhan program kerja, persiapan agenda lomba, dan transparansi rekam jejak sistem."
                : "Pusat Kendali Pengurus BEM FH UNAND. Kelola publikasi informasi, koordinasi agenda kegiatan & lomba, serta kelola profil dan program kerja departemen."}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-gray-400">
              <span className="flex items-center gap-1.5">
                <Shield
                  size={13}
                  className="text-brand-neon"
                  aria-hidden="true"
                />
                <span>
                  Otentikasi:{" "}
                  <strong className="text-white">{session.role}</strong>
                </span>
              </span>
              <span className="text-gray-600">|</span>
              <span>Tahun Kepengurusan 2026/2027</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            {isDosen ? (
              <>
                <Link
                  href="/admin/audit-log"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-neon text-brand-dark hover:brightness-105 text-xs font-bold transition-all shadow-sm"
                >
                  <ScrollText
                    size={15}
                    aria-hidden="true"
                  />
                  <span>Inspeksi Audit Trail</span>
                </Link>
                <Link
                  href="/admin/departemen"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/10 text-xs font-medium transition-all"
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
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-neon text-brand-dark hover:brightness-105 text-xs font-bold transition-all shadow-sm"
                >
                  <Plus size={15} aria-hidden="true" />
                  <span>Tulis Publikasi Baru</span>
                </Link>
                <Link
                  href="/admin/kegiatan"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/10 text-xs font-medium transition-all"
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
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* KPI 2: Kegiatan & Prestasi */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-md hover:border-brand-neon/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Agenda &amp; Prestasi
            </span>
            <div className="p-2 rounded-xl bg-brand-red/30 text-rose-300 border border-brand-neon/30">
              <CalendarDays size={16} aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 justify-between">
            <span className="text-3xl font-extrabold text-white">
              {kegiatanCount}
            </span>
            <span className="text-xs font-medium text-brand-neon bg-brand-neon/10 px-2 py-0.5 rounded-full border border-brand-neon/20">
              {kegiatanLombaCount} Lomba
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-white/5 text-[11px] text-center">
            <div className="bg-black/30 p-1.5 rounded-lg border border-white/5">
              <span className="font-bold text-rose-200 block">
                {kegiatanLombaCount}
              </span>
              <span className="text-gray-400 text-[10px]">
                Kompetisi Mahasiswa
              </span>
            </div>
            <div className="bg-black/30 p-1.5 rounded-lg border border-white/5">
              <span className="font-bold text-gray-200 block">
                {kegiatanInternalCount}
              </span>
              <span className="text-gray-400 text-[10px]">Internal BEM</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Publikasi */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-md hover:border-brand-neon/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Publikasi &amp; Berita
            </span>
            <div className="p-2 rounded-xl bg-brand-neon/15 text-brand-neon border border-brand-neon/30">
              <FileText size={16} aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 justify-between">
            <span className="text-3xl font-extrabold text-white">
              {publikasiCount}
            </span>
            <span className="text-xs font-medium text-brand-neon bg-brand-neon/10 px-2 py-0.5 rounded-full border border-brand-neon/20">
              Tayang Publik
            </span>
          </div>
          <div className="grid grid-cols-1 gap-1.5 pt-2 border-t border-white/5 text-[11px] text-center">
            <div className="p-3.5 rounded-lg bg-black/30 border border-white/5 text-[11px] text-gray-300 flex items-center justify-between">
              <span className="font-bold text-gray-200 block">
                {publikasiCount}
              </span>
              <span className="text-gray-400 text-[10px]">
                Artikel & Berita{" "}
              </span>
            </div>
          </div>
        </div>

        {/* KPI 4: Departemen */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur-md hover:border-brand-neon/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Departemen &amp; BPH
            </span>
            <div className="p-2 rounded-xl bg-brand-red/30 text-rose-300 border border-brand-neon/30">
              <Building2 size={16} aria-hidden="true" />
            </div>
          </div>

          <div className="flex items-baseline gap-2 justify-between">
            <span className="text-3xl font-extrabold text-white">
              {departemenCount}
            </span>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {staffCount} Staff Aktif
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-white/5 text-[11px] text-center">
            <div className="bg-black/30 p-1.5 rounded-lg border border-white/5">
              <span className="font-bold text-rose-200 block">
                {staffCount}
              </span>
              <span className="text-gray-400 text-[10px]">
                Pengurus / Staff
              </span>
            </div>
            <div className="bg-black/30 p-1.5 rounded-lg border border-white/5">
              <span className="font-bold text-gray-200 block">
                {prokerCount}
              </span>
              <span className="text-gray-400 text-[10px]">Program Kerja</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Agenda & Kompetisi Mendatang */}
      <section className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 md:p-6 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CalendarDays
                size={16}
                className="text-brand-neon"
                aria-hidden="true"
              />
              <span>Agenda &amp; Lomba Terdekat</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Monitoring kegiatan kemahasiswaan
            </p>
          </div>

          <Link
            href="/admin/kegiatan"
            className="text-xs text-brand-neon hover:text-white font-medium hover:underline"
          >
            Semua Agenda
          </Link>
        </div>

        {upcomingKegiatan.length === 0 ? (
          <div className="py-8 text-center text-xs text-gray-400 space-y-1.5">
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
                  className="p-3.5 rounded-xl bg-black/30 border border-white/5 hover:border-brand-neon/30 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        isLomba
                          ? "bg-brand-red/30 text-rose-200 border-brand-neon/30"
                          : "bg-white/10 text-gray-300 border-white/10"
                      }`}
                    >
                      {isLomba ? "Lomba Mahasiswa" : "Internal BEM"}
                    </span>

                    <span className="text-[11px] font-mono text-gray-400">
                      {itemDate.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-xs font-semibold text-white group-hover:text-brand-neon transition-colors line-clamp-1">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-white/5">
                    <span className="flex items-center gap-1 truncate max-w-[140px]">
                      <MapPin
                        size={11}
                        className="text-brand-neon shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.location}</span>
                    </span>
                    <span className="text-gray-400 truncate max-w-[110px]">
                      {item.organizer}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Two-Column Activity Stream */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Stream 2: Publikasi Terkini */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 md:p-6 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <FileText
                    size={16}
                    className="text-brand-neon"
                    aria-hidden="true"
                  />
                  <span>Publikasi Terkini</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Artikel dan rilis pers BEM
                </p>
              </div>
              <Link
                href="/admin/news"
                className="text-xs text-brand-neon hover:text-white hover:underline"
              >
                Kelola
              </Link>
            </div>

            {recentPublikasi.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">
                Belum ada artikel publikasi.
              </p>
            ) : (
              <div className="space-y-2.5">
                {recentPublikasi.map((pub) => (
                  <div
                    key={pub.id}
                    className="p-3 rounded-xl bg-black/30 border border-white/5 hover:border-brand-neon/20 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-neon/15 text-brand-neon border border-brand-neon/30">
                        {pub.category}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
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

                    <h4 className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                      {pub.title}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                      <span className="truncate">Oleh: {pub.author}</span>
                      {pub.slug && (
                        <Link
                          href={`/publikasi/${pub.slug}`}
                          target="_blank"
                          className="text-brand-neon hover:text-white flex items-center gap-1 font-medium"
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

          <div className="pt-2 border-t border-white/10">
            <Link
              href="/admin/news"
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-center text-xs text-gray-300 hover:text-white font-medium block border border-white/5 transition-colors"
            >
              Semua Publikasi
            </Link>
          </div>
        </div>

        {/* Stream 3: Audit Trail Log */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 md:p-6 backdrop-blur-md flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <ScrollText
                    size={16}
                    className="text-brand-neon"
                    aria-hidden="true"
                  />
                  <span>Audit Trail Sistem</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Catatan mutasi data sistem
                </p>
              </div>
              <Link
                href="/admin/audit-log"
                className="text-xs text-brand-neon hover:text-white hover:underline"
              >
                Semua
              </Link>
            </div>

            {recentAuditLogs.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">
                Belum ada catatan aktivitas audit.
              </p>
            ) : (
              <div className="space-y-2">
                {recentAuditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl bg-black/30 border border-white/5 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between gap-1.5 text-[11px]">
                      <span className="font-semibold text-white truncate max-w-[130px]">
                        {log.user?.name || "Admin"}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono shrink-0">
                        {new Date(log.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>

                    <p className="text-gray-300 text-[11px] line-clamp-1">
                      {log.summary}
                    </p>

                    <div className="flex items-center gap-1.5 text-[9px] text-gray-400 pt-0.5">
                      <span
                        className={`font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                          log.action === "CREATE"
                            ? "text-emerald-400 bg-emerald-500/10"
                            : log.action === "DELETE"
                              ? "text-rose-400 bg-rose-500/10"
                              : "text-blue-400 bg-blue-500/10"
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

          <div className="pt-2 border-t border-white/10">
            <Link
              href="/admin/audit-log"
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-center text-xs text-gray-300 hover:text-white font-medium block border border-white/5 transition-colors"
            >
              Log Lengkap
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Departemen & Program Kerja Status */}
      <section className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 md:p-6 backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2
                size={16}
                className="text-brand-neon"
                aria-hidden="true"
              />
              <span>Departemen &amp; Program Kerja Kabinet</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Pemantauan struktur pengurus dan program kerja yang diawasi dosen
              pembina
            </p>
          </div>
          <Link
            href="/admin/departemen"
            className="text-xs text-brand-neon hover:text-white hover:underline"
          >
            Lihat 16 Departemen
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {departemenHighlights.map((dept) => (
            <div
              key={dept.id}
              className="p-3.5 rounded-xl bg-black/30 border border-white/5 hover:border-brand-neon/30 transition-all space-y-1.5 group"
            >
              <h4 className="font-semibold text-xs text-white group-hover:text-brand-neon transition-colors line-clamp-1">
                {dept.name}
              </h4>
              <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                {dept.description ||
                  "Deskripsi departemen belum dikonfigurasi."}
              </p>
              <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1.5 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <Users
                    size={11}
                    className="text-brand-neon"
                    aria-hidden="true"
                  />
                  <span>{dept._count.staff} Staff</span>
                </span>
                <span className="flex items-center gap-1">
                  <Tag size={11} className="text-rose-300" aria-hidden="true" />
                  <span>{dept._count.proker} Proker</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
