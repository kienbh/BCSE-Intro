'use client';

import { useLang, Lang } from '@/lib/i18n';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'vi', label: 'VI', flag: '🇻🇳' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ja', label: 'JA', flag: '🇯🇵' },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  const current = LANGS.find((l) => l.code === lang) || LANGS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Language"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{current.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 min-w-[110px] rounded-lg bg-slate-900/95 backdrop-blur-xl border border-white/[0.08] shadow-xl py-1 z-50">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors ${
                l.code === lang ? 'text-sky-400 bg-sky-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{l.flag}</span>
              <span className="font-semibold">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
