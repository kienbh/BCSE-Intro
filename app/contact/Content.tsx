'use client';

import { contactInfo, admissionInfo } from '@/data/contact';
import SectionTitle from '@/components/shared/SectionTitle';
import { Mail, MapPin, Globe, Phone, GraduationCap } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function ContactContent() {
  const { t } = useLang();
  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-max">
          <SectionTitle
            title={t('contact.title')}
            subtitle={contactInfo.university}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/[0.06]">
                <h3 className="text-base font-bold text-white mb-4">{t('contact.info')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Phone className="w-5 h-5 text-sky-400" />
                    <div>
                      <p className="text-white text-xs font-medium">{t('contact.switchboard')}</p>
                      <p>{contactInfo.phones.main}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Phone className="w-5 h-5 text-sky-400" />
                    <div>
                      <p className="text-white text-xs font-medium">{t('label.hotline')}</p>
                      <p>{contactInfo.phones.hotline1} (Zalo) &bull; {contactInfo.phones.hotline2}</p>
                    </div>
                  </div>
                  <a href={`mailto:${contactInfo.emails.admission}`} className="flex items-center gap-3 text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    <Mail className="w-5 h-5 text-sky-400" />
                    <div>
                      <p className="text-white text-xs font-medium">{t('contact.emailAdm')}</p>
                      <p>{contactInfo.emails.admission}</p>
                    </div>
                  </a>
                  <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    <Globe className="w-5 h-5 text-sky-400" />
                    {t('contact.websiteLink')}
                  </a>
                </div>
              </div>

              {contactInfo.campuses.map((campus) => (
                <div key={campus.name} className="p-6 rounded-2xl bg-slate-800/40 border border-white/[0.06]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-sky-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{campus.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{campus.address}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{campus.rooms}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-sky-600/20 to-indigo-600/20 border border-sky-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-6 h-6 text-amber-400" />
                  <h3 className="text-2xl font-bold text-white">{t('contact.admission')} {admissionInfo.year}</h3>
                </div>
                <p className="text-slate-400 mb-2">
                  {t('contact.schoolCode')}: <span className="text-white font-mono">{contactInfo.schoolCode}</span> &bull; {t('contact.programCode')}: <span className="text-white font-mono">{contactInfo.programCode}</span>
                </p>
                <p className="text-slate-400 mb-6">
                  {t('contact.quota')}: <span className="text-white font-bold">{admissionInfo.quota} {t('contact.students')}</span> &bull; {admissionInfo.scholarshipNote}
                </p>

                <h4 className="text-sm font-semibold text-white mb-3">{t('contact.combinations')}</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {admissionInfo.subjectCombinations.map((c) => (
                    <span key={c.code} className="px-3 py-1.5 text-xs rounded-lg bg-white/10 text-slate-300 border border-white/[0.06]">
                      <span className="font-mono text-sky-400">{c.code}</span> — {c.subjects}
                    </span>
                  ))}
                </div>

                <h4 className="text-sm font-semibold text-white mb-3">{t('contact.methods')}</h4>
                <ul className="space-y-2 mb-6">
                  {admissionInfo.admissionMethods.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>

                <a
                  href={contactInfo.admissionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl transition-colors"
                >
                  {t('contact.viewMore')} {admissionInfo.year}
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/[0.06]">
                <h4 className="text-sm font-semibold text-white mb-3">{t('contact.highlights')}</h4>
                <ul className="space-y-2">
                  {[
                    `${contactInfo.programEN}`,
                    '152 tín chỉ, 4 năm đào tạo',
                    '5 định hướng: AI, Software, IC Design, IoT, Fintech',
                    'Giảng viên có trình độ cao, tốt nghiệp tiến sĩ tại các nước phát triển (Nhật Bản, Đài Loan, Singapore)',
                    `Hợp tác với ${admissionInfo.partnerUniversities}`,
                    'Tốt nghiệp đạt B2/Bậc 4 tiếng Anh',
                    'NCKH từ năm nhất, cơ sở vật chất hiện đại',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
