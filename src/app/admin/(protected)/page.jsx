import Link from 'next/link';
import { prisma } from '../../../lib/prisma';
import { getSession } from '../../../lib/session';
import {
  FileText,
  CalendarDays,
  MessageSquareWarning,
  ScrollText,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Plus,
  Users,
  Trophy,
  ArrowRight,
  ExternalLink,
  LayoutDashboard,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getSession();

  const [
    publikasiCount,
    kegiatanTotal,
    kegiatanLomba,
    kegiatanInternal,
    departemenCount,
    staffCount,
    aspirasiTotal,
    aspirasiBaru,
    aspirasiDiproses,
    aspirasiSelesai,
    recentAspirasi,
    recentPublikasi,
    recentAuditLogs,
  ] = await Promise.all([
    prisma.publikasi.count().catch(() => 0),
    prisma.kegiatan.count().catch(() => 0),
    prisma.kegiatan.count({ where: { type: 'LOMBA' } }).catch(() => 0),
    prisma.kegiatan.count({ where: { type: 'INTERNAL' } }).catch(() => 0),
    prisma.departemen.count().catch(() => 0),
    prisma.departemenStaff.count().catch(() => 0),
    prisma.aspirasi.count().catch(() => 0),
    prisma.aspirasi.count({ where: { status: 'BARU' } }).catch(() => 0),
    prisma.aspirasi.count({ where: { status: 'DIPROSES' } }).catch(() => 0),
    prisma.aspirasi.count({ where: { status: 'SELESAI' } }).catch(() => 0),
    prisma.aspirasi.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
    }).catch(() => []),
    prisma.publikasi.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 4,
    }).catch(() => []),
    prisma.auditLog.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }).catch(() => []),
  ]);

  // Compute percentages for aspirasi
  const baruPct = aspirasiTotal > 0 ? Math.round((aspirasiBaru / aspirasiTotal) * 100) : 0;
  const diprosesPct = aspirasiTotal > 0 ? Math.round((aspirasiDiproses / aspirasiTotal) * 100) : 0;
  const selesaiPct = aspirasiTotal > 0 ? Math.round((aspirasiSelesai / aspirasiTotal) * 100) : 0;

  const stats = [
    {
      title: 'Aspirasi Mahasiswa',
      value: aspirasiTotal,
      subtext: `${aspirasiBaru} Perlu Tindak Lanjut`,
      badge: aspirasiBaru > 0 ? `${aspirasiBaru} BARU` : 'Tuntas',
      badgeColor: aspirasiBaru > 0 ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      icon: MessageSquareWarning,
      href: '/admin/aspirasi',
      glow: 'group-hover:border-amber-500/40',
    },
    {
      title: 'Publikasi & Artikel',
      value: publikasiCount,
      subtext: 'Rilis, kajian, berita & opini',
      badge: `${publikasiCount} Artikel`,
      badgeColor: 'bg-brand-neon/20 text-brand-neon border-brand-neon/30',
      icon: FileText,
      href: '/admin/news',
      glow: 'group-hover:border-brand-neon/40',
    },
    {
      title: 'Agenda & Kompetisi',
      value: kegiatanTotal,
      subtext: `${kegiatanLomba} Lomba · ${kegiatanInternal} Internal`,
      badge: `${kegiatanLomba} Lomba Aktif`,
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      icon: Trophy,
      href: '/admin/kegiatan',
      glow: 'group-hover:border-blue-500/40',
    },
    {
      title: 'Struktur Organisasi',
      value: departemenCount,
      subtext: `${staffCount} Anggota & Pengurus`,
      badge: `${staffCount} Personel`,
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      icon: Users,
      href: '/admin/departemen',
      glow: 'group-hover:border-purple-500/40',
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner & Quick Action Center */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-red/60 via-brand-dark/90 to-black border border-brand-neon/20 p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-brand-neon/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-brand-neon">
              <LayoutDashboard size={13} />
              <span>Pusat Kendali Administrasi</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Selamat datang, <span className="text-brand-neon">{session.name}</span>
            </h1>
            <p className="text-zinc-300 text-xs md:text-sm max-w-xl leading-relaxed">
              Pantau masukan mahasiswa, kelola artikel publikasi, dan atur seluruh data operasional BEM Fakultas Hukum Universitas Andalas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/news"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white transition-all shadow-[0_0_15px_rgba(254,174,174,0.3)]"
            >
              <Plus size={16} />
              <span>Tulis Publikasi</span>
            </Link>

            <Link
              href="/admin/kegiatan"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              <CalendarDays size={16} className="text-brand-neon" />
              <span>Tambah Kegiatan</span>
            </Link>

            <Link
              href="/admin/aspirasi"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-red/50 hover:bg-brand-red/80 text-white font-semibold text-xs border border-brand-neon/30 transition-all"
            >
              <MessageSquareWarning size={16} className="text-amber-300" />
              <span>Tinjau Aspirasi</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`group relative rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 ${item.glow} p-5 transition-all duration-300 backdrop-blur-md flex flex-col justify-between shadow-lg hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-brand-neon group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-3xl font-extrabold tracking-tight text-white group-hover:text-brand-neon transition-colors">
                    {item.value}
                  </p>
                  <p className="text-xs font-semibold text-zinc-300 mt-1">{item.title}</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{item.subtext}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 group-hover:text-brand-neon">
                <span>Kelola Data</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Visual Data Breakdown: Aspirasi Distribution Bar */}
      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquareWarning size={18} className="text-brand-neon" />
              <span>Status Distribusi Aspirasi Mahasiswa</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Rasio tindak lanjut aspirasi yang masuk melalui platform publik ({aspirasiTotal} total)
            </p>
          </div>

          <Link
            href="/admin/aspirasi"
            className="text-xs text-brand-neon hover:underline flex items-center gap-1 font-medium"
          >
            <span>Buka Seluruh Aspirasi</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {aspirasiTotal === 0 ? (
          <div className="py-6 text-center text-xs text-zinc-400 bg-white/[0.02] rounded-xl border border-dashed border-white/10">
            Belum ada aspirasi mahasiswa yang tercatat di database.
          </div>
        ) : (
          <div className="space-y-4">
            {/* Visual Multi-Segment Bar */}
            <div className="w-full h-4 rounded-full bg-black/40 overflow-hidden flex p-0.5 border border-white/10">
              {baruPct > 0 && (
                <div
                  style={{ width: `${baruPct}%` }}
                  title={`Baru: ${aspirasiBaru} (${baruPct}%)`}
                  className="h-full bg-amber-400 rounded-l-full transition-all duration-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                />
              )}
              {diprosesPct > 0 && (
                <div
                  style={{ width: `${diprosesPct}%` }}
                  title={`Diproses: ${aspirasiDiproses} (${diprosesPct}%)`}
                  className="h-full bg-sky-400 transition-all duration-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                />
              )}
              {selesaiPct > 0 && (
                <div
                  style={{ width: `${selesaiPct}%` }}
                  title={`Selesai: ${aspirasiSelesai} (${selesaiPct}%)`}
                  className="h-full bg-emerald-400 rounded-r-full transition-all duration-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                />
              )}
            </div>

            {/* Metrics Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                  <span className="text-xs font-medium text-amber-200">Menunggu Tindakan (Baru)</span>
                </div>
                <span className="text-xs font-bold text-amber-300 font-mono">
                  {aspirasiBaru} ({baruPct}%)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                  <span className="text-xs font-medium text-sky-200">Sedang Diproses</span>
                </div>
                <span className="text-xs font-bold text-sky-300 font-mono">
                  {aspirasiDiproses} ({diprosesPct}%)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  <span className="text-xs font-medium text-emerald-200">Selesai Ditindak</span>
                </div>
                <span className="text-xs font-bold text-emerald-300 font-mono">
                  {aspirasiSelesai} ({selesaiPct}%)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Three Columns: Recent Aspirasi, Recent Publications, Recent Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Aspirasi Stream */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 md:p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <AlertCircle size={16} className="text-amber-400" />
                  <span>Aspirasi Terbaru</span>
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">Prioritas respon mahasiswa</p>
              </div>
              <Link
                href="/admin/aspirasi"
                className="text-xs text-brand-neon hover:underline font-medium"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="space-y-3">
              {recentAspirasi.length === 0 ? (
                <p className="text-xs text-zinc-400 py-6 text-center">Belum ada aspirasi tercatat.</p>
              ) : (
                recentAspirasi.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-zinc-200 truncate">
                        {item.isAnonymous ? 'Anonim' : (item.nama || 'Mahasiswa')} &rarr; {item.pihakDituju}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full shrink-0 ${
                          item.status === 'BARU'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : item.status === 'DIPROSES'
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-300 line-clamp-2 leading-relaxed">
                      {item.deskripsi}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-0.5">
                      <span>
                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      <Link
                        href="/admin/aspirasi"
                        className="text-brand-neon hover:underline font-medium"
                      >
                        Respon &rarr;
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5">
            <Link
              href="/admin/aspirasi"
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-center text-xs text-zinc-300 hover:text-white font-medium block transition-colors border border-white/5"
            >
              Buka Pengelola Aspirasi
            </Link>
          </div>
        </div>

        {/* Recent Publikasi Stream */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 md:p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <FileText size={16} className="text-brand-neon" />
                  <span>Publikasi Terkini</span>
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">Artikel & rilis yang sudah tayang</p>
              </div>
              <Link
                href="/admin/news"
                className="text-xs text-brand-neon hover:underline font-medium"
              >
                Kelola
              </Link>
            </div>

            <div className="space-y-3">
              {recentPublikasi.length === 0 ? (
                <p className="text-xs text-zinc-400 py-6 text-center">Belum ada publikasi terbit.</p>
              ) : (
                recentPublikasi.map((pub) => (
                  <div
                    key={pub.id}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.2 rounded bg-brand-neon/15 text-brand-neon border border-brand-neon/30">
                        {pub.category}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {pub.publishedAt ? pub.publishedAt.toISOString().slice(0, 10) : '-'}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-white line-clamp-1">
                      {pub.title}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-0.5">
                      <span>Oleh {pub.author}</span>
                      {pub.slug && (
                        <Link
                          href={`/publikasi/${pub.slug}`}
                          target="_blank"
                          className="text-brand-neon hover:underline flex items-center gap-1 font-medium"
                        >
                          <span>Baca</span>
                          <ExternalLink size={10} />
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5">
            <Link
              href="/admin/news"
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-center text-xs text-zinc-300 hover:text-white font-medium block transition-colors border border-white/5"
            >
              Buka Semua Publikasi
            </Link>
          </div>
        </div>

        {/* Audit Log / Activity Trail */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 md:p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <ScrollText size={16} className="text-brand-neon" />
                  <span>Aktivitas Sistem</span>
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">Audit log modifikasi data</p>
              </div>
              <Link
                href="/admin/audit-log"
                className="text-xs text-brand-neon hover:underline font-medium"
              >
                Semua
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentAuditLogs.length === 0 ? (
                <p className="text-xs text-zinc-400 py-6 text-center">Belum ada aktivitas audit log.</p>
              ) : (
                recentAuditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs"
                  >
                    <div
                      className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                        log.action === 'CREATE'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : log.action === 'DELETE'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      <CheckCircle2 size={12} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-zinc-200 truncate text-[11px]">
                          {log.user?.name || 'Admin'}
                        </span>
                        <span className="text-[9px] text-zinc-400 font-mono shrink-0">
                          {new Date(log.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                      <p className="text-zinc-300 text-[11px] mt-0.5 truncate">
                        {log.summary}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-[9px] text-zinc-400">
                        <span className="font-semibold uppercase tracking-wider text-brand-neon">
                          {log.action}
                        </span>
                        <span>·</span>
                        <span>{log.entityType}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5">
            <Link
              href="/admin/audit-log"
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-center text-xs text-zinc-300 hover:text-white font-medium block transition-colors border border-white/5"
            >
              Lihat Rekam Jejak
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
