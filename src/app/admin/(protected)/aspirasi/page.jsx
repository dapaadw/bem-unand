import { prisma } from '../../../../lib/prisma';
import { requirePageRole } from '../../../../lib/requirePageRole';
import { aspirasiWhere, JENIS_PENGAJUAN, STATUS_LABEL } from '../../../../lib/aspirasi';
import AspirasiManagerClient from '../../../../components/admin/AspirasiManagerClient';
import {
  MessageSquareWarning,
  Download,
  Filter,
  RotateCcw,
} from 'lucide-react';

export default async function AspirasiManagerPage({ searchParams }) {
  await requirePageRole(['ADMIN']);
  const sp = await searchParams;
  let where, error;
  try { where = aspirasiWhere(sp); } catch (e) { error = e.message; }
  const items = error ? [] : await prisma.aspirasi.findMany({ where, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] });
  const query = new URLSearchParams(Object.entries(sp || {}).filter(([, v]) => typeof v === 'string')).toString();
  const fieldClass = 'mt-1 w-full min-w-0 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-neon/60 transition-all';

  return (
    <div className='space-y-6'>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <MessageSquareWarning size={22} className="text-brand-neon" />
            <span>Aspirasi Mahasiswa</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Pantau seluruh aktivitas aspirasi dari para mahasiswa-mahasiswi Fakultas Hukum Universitas Andalas.
          </p>
        </div>
      </div>

      {/* Filter Form */}
      <form method="get" className="bg-white/[0.04] border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={14} className="text-zinc-400" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Filter Aspirasi</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <label className="text-[11px] font-semibold text-zinc-300">Tanggal awal (WIB)<input className={fieldClass} name="from" type="date" defaultValue={sp?.from || ''} /></label>
          <label className="text-[11px] font-semibold text-zinc-300">Tanggal akhir (WIB)<input className={fieldClass} name="to" type="date" defaultValue={sp?.to || ''} /></label>
          <label className="text-[11px] font-semibold text-zinc-300">Jenis pengajuan
            <select className={fieldClass} name="jenis" defaultValue={sp?.jenis || ''}>
              <option value="">Semua jenis</option>
              {JENIS_PENGAJUAN.map((v) => <option key={v}>{v}</option>)}
            </select>
          </label>
          <label className="text-[11px] font-semibold text-zinc-300">Status
            <select className={fieldClass} name="status" defaultValue={sp?.status || ''}>
              <option value="">Semua status</option>
              {Object.entries(STATUS_LABEL).map(([v, label]) => <option value={v} key={v}>{label}</option>)}
            </select>
          </label>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <button className="px-4 py-2.5 rounded-xl bg-brand-neon text-brand-dark font-bold text-xs hover:bg-white transition-all shadow-[0_0_12px_rgba(254,174,174,0.3)]">Terapkan filter</button>
          <a href="/admin/aspirasi" className="text-xs text-brand-neon hover:underline flex items-center gap-1">
            <RotateCcw size={12} /> Reset
          </a>
        </div>
      </form>

      {error ? (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
          <p role="alert">{error}</p>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-5 text-xs text-zinc-400 px-1">
          <p><span className="font-semibold text-white">{items.length}</span> aspirasi ditemukan</p>
          <a className="inline-flex items-center gap-1.5 text-brand-neon hover:underline" href={'/api/aspirasi/export?' + query}>
            <Download size={12} />
            <span>Unduh rekap CSV sesuai filter</span>
          </a>
        </div>
      )}

      <AspirasiManagerClient initialItems={items.map((i) => ({ ...i, createdAt: i.createdAt.toISOString() }))} />
    </div>
  );
}
