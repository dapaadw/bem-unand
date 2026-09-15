'use client';

import { useState } from 'react';

const STATUS_COLORS = {
  BARU: 'bg-yellow-500/20 text-yellow-300',
  DIPROSES: 'bg-blue-500/20 text-blue-300',
  SELESAI: 'bg-green-500/20 text-green-300',
};

export default function AspirasiManagerClient({ initialItems }) {
  const [items, setItems] = useState(initialItems);

  async function updateStatus(id, status) {
    const res = await fetch(`/api/aspirasi/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: updated.status } : i)));
    }
  }

  if (items.length === 0) return <p className="text-gray-400">Belum ada aspirasi masuk.</p>;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <div>
              <p className="font-semibold">
                {item.isAnonymous ? 'Anonim' : (item.nama || '-')} &rarr; {item.pihakDituju}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(item.createdAt).toLocaleString('id-ID')}
                {!item.isAnonymous && item.nim ? ` · NIM ${item.nim}` : ''}
                {!item.isAnonymous && item.email ? ` · ${item.email}` : ''}
              </p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full ${STATUS_COLORS[item.status]}`}>{item.status}</span>
          </div>
          <p className="mt-3 text-gray-200">{item.deskripsi}</p>
          {item.harapan && <p className="mt-2 text-sm text-gray-400">Harapan: {item.harapan}</p>}
          {item.buktiUrl && (
            <a href={item.buktiUrl} target="_blank" rel="noreferrer" className="inline-block mt-2 text-brand-neon text-sm underline">Lihat bukti</a>
          )}
          <div className="mt-4 flex gap-2">
            {['BARU', 'DIPROSES', 'SELESAI'].map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(item.id, s)}
                disabled={item.status === s}
                className="text-xs px-3 py-1.5 rounded-lg bg-white/10 disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
