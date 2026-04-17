'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';

export default function HeroSection() {
  const { t } = useLang();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.06),transparent_60%)]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1] drop-shadow-[0_4px_24px_rgba(14,165,233,0.25)]">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-400">
            {t('hero.title1')}
          </span>
          <span className="block text-white">{t('hero.title2')}</span>
          <span className="block pb-3 md:pb-5 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">
            {t('hero.title3')}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-4 font-light">
          {t('hero.tagline')}
        </p>

        <p className="text-sm text-slate-500 mb-10">
          {t('hero.bullets')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#philosophy"
            className="px-8 py-3.5 text-sm font-semibold bg-sky-500 hover:bg-sky-400 text-white rounded-xl transition-colors"
          >
            {t('hero.ctaPrimary')}
          </a>
          <Link
            href="/contact"
            className="px-8 py-3.5 text-sm font-medium border border-white/20 hover:bg-white/10 text-white rounded-xl transition-colors"
          >
            {t('hero.ctaSecondary')}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <ChevronDown className="w-6 h-6 text-slate-500" />
      </div>
    </section>
  );
}
