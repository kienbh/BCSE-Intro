'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { navItems, ctaButton } from '@/data/navigation';
import { useLang } from '@/lib/i18n';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/[0.06] shadow-lg'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/logos/vju.jpg"
              alt="VJU"
              className="h-14 w-14 rounded-full object-cover ring-2 ring-sky-400/30"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-2xl text-sky-400">BCSE</span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">Vietnam Japan University — ĐHQGHN</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/10">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <a
              href={ctaButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-4 py-2 text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl transition-colors"
            >
              {t('nav.cta')}
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
            <button
              className="p-2 text-slate-300 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-white/[0.06]">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <a
              href={ctaButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block mx-4 mt-3 px-4 py-3 text-center font-semibold bg-amber-500 text-slate-900 rounded-xl"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.cta')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
