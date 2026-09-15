import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/prisma';

export const revalidate = 3600;

export default async function DepartemenDetailPage({ params }) {
  const { slug } = await params;
  const item = await prisma.departemen.findUnique({
    where: { slug },
    include: { staff: true, proker: true, contact: true },
  });

  if (!item) notFound();

  const kepala = item.staff.find((s) => s.role.toLowerCase().includes('kepala') || s.role.toLowerCase().includes('ketua'));
  const others = item.staff.filter((s) => s.id !== kepala?.id);

  return (
    <article className="min-h-screen px-6 pt-32 pb-16 container mx-auto max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{item.name}</h1>
      {item.description && <p className="text-gray-300 mb-8">{item.description}</p>}

      {kepala && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
          <h2 className="text-sm text-brand-neon uppercase tracking-wide mb-2">Kepala Departemen</h2>
          <p className="font-semibold">{kepala.name}</p>
          {kepala.identity && <p className="text-sm text-gray-400">{kepala.identity}</p>}
          {kepala.achievements && <p className="text-sm text-gray-400 mt-1">{kepala.achievements}</p>}
        </div>
      )}

      {others.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm text-brand-neon uppercase tracking-wide mb-3">Staff / BPH</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-300">
            {others.map((s) => (
              <li key={s.id} className="bg-white/5 rounded-lg px-3 py-2">{s.name} &middot; {s.role}</li>
            ))}
          </ul>
        </div>
      )}

      {item.proker.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm text-brand-neon uppercase tracking-wide mb-3">Program Kerja</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {item.proker.map((p) => (
              <li key={p.id}>
                {p.name}
                {p.description && <span className="text-gray-500"> — {p.description}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.contact && (item.contact.whatsappUrl || item.contact.instagramUrl) && (
        <div className="flex gap-4">
          {item.contact.whatsappUrl && (
            <a href={item.contact.whatsappUrl} target="_blank" rel="noreferrer" className="text-brand-neon underline">WhatsApp</a>
          )}
          {item.contact.instagramUrl && (
            <a href={item.contact.instagramUrl} target="_blank" rel="noreferrer" className="text-brand-neon underline">Instagram</a>
          )}
        </div>
      )}
    </article>
  );
}
