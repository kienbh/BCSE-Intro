'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { contactInfo, admissionInfo } from '@/data/contact';
import { useLang } from '@/lib/i18n';
import { pickLocalized } from '@/lib/localized';

export default function CTASection() {
  const { t, lang } = useLang();
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-600/20 to-indigo-600/20" />
      <div className="absolute inset-0 bg-slate-950/80" />

      <div className="relative z-10 max-w-6xl mx-auto animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-slate-400 mb-2">
            {t('cta.subtitle')}
          </p>
          <p className="text-sm text-slate-500">
            {t('contact.schoolCode')} <span className="text-white font-mono">{contactInfo.schoolCode}</span> &bull;
            {' '}{t('contact.programCode')} <span className="text-white font-mono">{contactInfo.programCode}</span> &bull;
            {' '}{t('contact.quota')} {admissionInfo.quota} {t('contact.students')} ({admissionInfo.year})
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href={contactInfo.admissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl transition-colors inline-flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" /> {t('cta.register')} {admissionInfo.year}
            </a>
            <Link
              href="/contact"
              className="px-8 py-3.5 text-sm font-medium border border-white/20 hover:bg-white/10 text-white rounded-xl transition-colors inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" /> {t('cta.contact')}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-semibold text-white uppercase tracking-wide">{t('label.hotline')}</h3>
            </div>
            <p className="text-sm text-slate-300">{contactInfo.phones.hotline1} <span className="text-slate-500 text-xs">(Zalo)</span></p>
            <p className="text-sm text-slate-300">{contactInfo.phones.hotline2}</p>
            <p className="text-xs text-slate-500 mt-2">{t('contact.switchboard')}: {contactInfo.phones.main}</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/40 border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-semibold text-white uppercase tracking-wide">{t('label.email')}</h3>
            </div>
            <a href={`mailto:${contactInfo.emails.admission}`} className="block text-sm text-slate-300 hover:text-sky-400 transition-colors truncate">
              {contactInfo.emails.admission}
            </a>
            <p className="text-[10px] text-slate-500 mt-2 truncate">{t('contact.emailAdm')}</p>
          </div>

          {contactInfo.campuses.map((campus, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-800/40 border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-semibold text-white uppercase tracking-wide">{pickLocalized(campus.name, lang)}</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{pickLocalized(campus.address, lang)}</p>
              <p className="text-xs text-slate-500 mt-2">{pickLocalized(campus.rooms, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
