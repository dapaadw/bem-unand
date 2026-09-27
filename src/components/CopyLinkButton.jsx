'use client';

import { useState, useRef, useEffect } from 'react';
import { Link2, Check } from 'lucide-react';

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const [manualLink, setManualLink] = useState('');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}`);
      setManualLink('');
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setManualLink(`${window.location.origin}${window.location.pathname}`);
    }
  }

  return (
    <div>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm text-gray-300 hover:border-brand-neon hover:text-brand-neon transition-colors"
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
        {copied ? 'Link disalin' : 'Salin link'}
      </button>
      <p role="status" className="sr-only">{copied ? 'Link publikasi berhasil disalin.' : ''}</p>
      {manualLink && <label className="block mt-3 text-sm text-gray-300">Penyalinan otomatis gagal. Pilih dan salin link berikut:
        <input aria-label="Link publikasi untuk disalin manual" readOnly value={manualLink} onFocus={(event) => event.target.select()} className="block mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2" />
      </label>}
    </div>
  );
}
