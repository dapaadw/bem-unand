import { prisma } from '../../../../lib/prisma';
import { requirePageRole } from '../../../../lib/requirePageRole';
import { aspirasiWhere, JENIS_PENGAJUAN, STATUS_LABEL } from '../../../../lib/aspirasi';
import AspirasiManagerClient from '../../../../components/admin/AspirasiManagerClient';
export default async function AspirasiManagerPage({ searchParams }) {
  await requirePageRole(['ADMIN']);
  const sp = await searchParams;
  let where, error;
  try { where = aspirasiWhere(sp); } catch (e) { error = e.message; }
  const items = error ? [] : await prisma.aspirasi.findMany({ where, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] });
  const query = new URLSearchParams(Object.entries(sp || {}).filter(([, v]) => typeof v === 'string')).toString();
  const fieldClass = 'mt-1 w-full min-w-0 rounded-lg bg-brand-dark border border-white/20 p-2';
  return <div>
    <h1 className="text-2xl font-bold mb-6">Aspirasi Mahasiswa</h1>
    <form method="get" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
      <label>Tanggal awal (WIB)<input className={fieldClass} name="from" type="date" defaultValue={sp?.from || ''} /></label>
      <label>Tanggal akhir (WIB)<input className={fieldClass} name="to" type="date" defaultValue={sp?.to || ''} /></label>
      <label>Jenis pengajuan<select className={fieldClass} name="jenis" defaultValue={sp?.jenis || ''}><option value="">Semua jenis</option>{JENIS_PENGAJUAN.map((v) => <option key={v}>{v}</option>)}</select></label>
      <label>Status<select className={fieldClass} name="status" defaultValue={sp?.status || ''}><option value="">Semua status</option>{Object.entries(STATUS_LABEL).map(([v, label]) => <option value={v} key={v}>{label}</option>)}</select></label>
      <div className="flex gap-4 items-center"><button className="bg-brand-neon text-brand-dark px-4 py-2 rounded-lg">Terapkan filter</button><a href="/admin/aspirasi" className="underline">Reset</a></div>
    </form>
    {error ? <p role="alert" className="text-red-400 mb-4">{error}</p> : <div className="mb-5 flex flex-wrap items-center gap-5"><p>{items.length} aspirasi</p><a className="text-brand-neon underline" href={'/api/aspirasi/export?' + query}>Unduh rekap CSV sesuai filter</a></div>}
    <AspirasiManagerClient initialItems={items.map((i) => ({ ...i, createdAt: i.createdAt.toISOString() }))} />
  </div>;
}
