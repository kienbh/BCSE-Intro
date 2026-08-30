'use client';

import Link from 'next/link';
import { contactInfo } from '@/data/contact';
import { navItems } from '@/data/navigation';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { pickLocalized } from '@/lib/localized';

export default function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="bg-surface border-t border-line/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <span className="font-display font-bold text-xl text-sky-400">BCSE</span>
            <p className="text-sm text-ink-4 mt-3 leading-relaxed">
              {pickLocalized(contactInfo.program, lang)}
            </p>
            <p className="text-sm text-ink-5 mt-2">{pickLocalized(contactInfo.university, lang)}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink mb-4">{t('footer.program')}</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-ink-4 hover:text-ink transition-colors">
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink mb-4">{t('footer.campus')}</h3>
            {contactInfo.campuses.map((campus, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-ink">{pickLocalized(campus.name, lang)}</p>
                    <p className="text-xs text-ink-5">{pickLocalized(campus.address, lang)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-ink-4">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>{contactInfo.phones.hotline1} <span className="text-ink-6 text-xs">(Zalo)</span></span>
              </div>
              <a href={`mailto:${contactInfo.emails.admission}`} className="flex items-center gap-2 text-sm text-ink-4 hover:text-ink transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{contactInfo.emails.admission}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line/[0.06] text-center text-xs text-ink-6">
          &copy; {new Date().getFullYear()} BCSE — {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
