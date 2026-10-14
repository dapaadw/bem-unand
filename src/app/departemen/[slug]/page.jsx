import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';
import { isWebOrLocalUrl } from '../../../lib/homeMedia';
import { isDepartmentHead, departmentContactUrl } from '../../../lib/departemen';
 

export const revalidate = 3600;

export default async function DepartemenDetailPage({ params }) {
  const { slug } = await params;
  const item = await prisma.departemen.findUnique({
    where: { slug },
    include: { staff: true, proker: true, contact: true },
  });

  if (!item) notFound();

  const heads = item.staff.filter((s) => isDepartmentHead(s.role));
  const others = item.staff.filter((s) => !isDepartmentHead(s.role));

  return (
    <div className="min-h-screen relative overflow-hidden">
      <article className="px-6 pt-32 pb-16 container mx-auto max-w-3xl relative z-10">
        <Link href="/departemen" className="block mb-6 text-sm text-brand-neon hover:underline">← Kembali ke Departemen</Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 break-words">{item.name}</h1>
      {item.photoUrl && isWebOrLocalUrl(item.photoUrl) && <img src={item.photoUrl} alt={item.name} className="w-40 h-40 object-cover rounded-xl mb-6" />}
      {item.description && <p className="text-gray-300 mb-8 whitespace-pre-wrap break-words">{item.description}</p>}

      {heads.map((kepala) => (
        <div key={kepala.id} className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8 break-words">
          <h2 className="text-sm text-brand-neon uppercase tracking-wide mb-2">Kepala Departemen</h2>
          <p className="font-semibold text-lg">{kepala.name}</p>
          <p className="text-sm text-gray-400 mb-3">{kepala.role}</p>
          {kepala.photoUrl && isWebOrLocalUrl(kepala.photoUrl) && <img src={kepala.photoUrl} alt={kepala.name} loading="lazy" className="w-24 h-24 object-cover rounded-xl mb-3" />}
          {kepala.identity && <p className="text-sm text-gray-400 whitespace-pre-wrap">Identitas: {kepala.identity}</p>}
          {kepala.achievements && <p className="text-sm text-gray-400 mt-1 whitespace-pre-wrap">Prestasi: {kepala.achievements}</p>}
        </div>
      ))}
      {!item.staff.length && <p className="text-gray-400 mb-8">Jajaran departemen belum tersedia.</p>}

      {others.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm text-brand-neon uppercase tracking-wide mb-3">Staff / BPH</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-300">
            {others.map((s) => (
              <li key={s.id} className="bg-white/5 rounded-lg px-3 py-3 min-w-0 break-words">
                {s.photoUrl && isWebOrLocalUrl(s.photoUrl) && <img src={s.photoUrl} alt={s.name} loading="lazy" className="w-16 h-16 rounded-full object-cover mb-3" />}
                <p className="font-semibold">{s.name}</p><p>{s.role}</p>
                {s.identity && <p className="text-gray-400 mt-2 whitespace-pre-wrap">{s.identity}</p>}
                {s.achievements && <p className="text-gray-400 mt-2 whitespace-pre-wrap">{s.achievements}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.proker.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm text-brand-neon uppercase tracking-wide mb-3">Program Kerja &amp; Kegiatan</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {item.proker.map((p) => (
              <li key={p.id} className="break-words whitespace-pre-wrap">
                {p.name}
                {p.description && <span className="text-gray-500"> — {p.description}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {!item.proker.length && <p className="text-gray-400 mb-8">Program kerja dan kegiatan belum tersedia.</p>}

      {item.contact && (item.contact.whatsappUrl || item.contact.instagramUrl) && (
        <div className="flex flex-wrap gap-4">
          {item.contact.whatsappUrl && departmentContactUrl(item.contact.whatsappUrl, 'whatsapp') && (
            <a href={item.contact.whatsappUrl} target="_blank" rel="noreferrer" className="text-brand-neon underline">WhatsApp</a>
          )}
          {item.contact.instagramUrl && departmentContactUrl(item.contact.instagramUrl, 'instagram') && (
            <a href={item.contact.instagramUrl} target="_blank" rel="noreferrer" className="text-brand-neon underline">Instagram</a>
          )}
        </div>
      )}
      </article>
    </div>
  );
}
