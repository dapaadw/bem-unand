'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable, silently ignore
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-sm text-gray-300 hover:border-brand-neon hover:text-brand-neon transition-colors"
    >
      {copied ? <Check size={16} /> : <Link2 size={16} />}
      {copied ? 'Link disalin' : 'Salin link'}
    </button>
  );
}
