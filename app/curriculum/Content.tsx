'use client';

import { useState } from 'react';
import {
  programStructure152,
  programStructure135,
  coreRequired135,
  modules135,
  projects135,
  graduation135,
  teachingMethods,
  internshipPartners,
} from '@/data/curriculum';
import { specializations } from '@/data/specializations';
import type { Flow152Color } from '@/data/curriculum-152';
import CurriculumFlow from '@/components/curriculum/CurriculumFlow';
import CurriculumFlow152 from '@/components/curriculum/CurriculumFlow152';

// Ánh xạ định hướng SV08 → màu rổ (khớp bảng màu 135 tái dùng ở CurriculumFlow152)
const SPEC_COLOR: Record<string, Flow152Color> = {
  'software-engineering': 'se',
  'data-science-ai': 'ai',
  'embedded-iot': 'iot',
  'integrated-circuit': 'ic',
  'financial-technology': 'ft',
};
import SectionTitle from '@/components/shared/SectionTitle';
import { Briefcase, GraduationCap, BookOpen, KeyRound } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { pickLocalized } from '@/lib/localized';

type Framework = '152' | '135';

export default function CurriculumContent() {
  const { t, lang } = useLang();
  const [fw, setFw] = useState<Framework>('152');
  const ps = fw === '135' ? programStructure135 : programStructure152;

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-max">
          <SectionTitle
            title={t('curriculum.title')}
            subtitle={`${ps.degreeTitleEN} — ${t('curriculum.subtitle')}`}
          />

          <div className="flex justify-center gap-2 mb-3">
            {(['152', '135'] as Framework[]).map((key) => (
              <button
                key={key}
                onClick={() => setFw(key)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                  fw === key
                    ? 'bg-sky-500/15 border-sky-500/40 text-sky-300'
                    : 'bg-surface-2/40 border-line/[0.06] text-ink-5 hover:text-ink-3'
                }`}
              >
                {key === '135' ? t('curriculum.fwNew') : t('curriculum.fwOld')}
              </button>
            ))}
          </div>
          <p className="text-xs text-ink-5 text-center mb-8">
            {fw === '135' ? t('curriculum.fwNewNote') : t('curriculum.fwOldNote')}
          </p>

          <p className="text-xs text-ink-6 text-center mb-12">{ps.partnerNote} · {ps.englishLevel}</p>

          {fw === '135' ? (
            <>
              <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-400" /> {t('curriculum.plan135')}
              </h3>
              <div className="mb-16">
                <CurriculumFlow
                  creditBlocks={programStructure135.creditBlocks}
                  totalCredits={programStructure135.totalCredits}
                />
              </div>

              <h3 className="text-xl font-bold text-ink mb-2">{t('curriculum.core135')}</h3>
              <div className="flex flex-wrap gap-2 mb-16">
                {coreRequired135.map((c) => (
                  <span key={c.code} className="px-3 py-1.5 text-xs rounded-lg bg-surface-2/60 border border-line/[0.06] text-ink-3">
                    <span className="font-mono text-sky-400 mr-1.5">{c.code}</span>
                    {c.name}
                    <span className="text-ink-5"> · {c.credits} TC</span>
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold text-ink mb-2">{t('curriculum.modules135')}</h3>
              <p className="text-xs text-ink-5 mb-4">{t('curriculum.modules135Note')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                {modules135.map((m) => (
                  <div key={m.id} className="p-5 rounded-xl bg-surface-2/40 border border-line/[0.06]">
                    <h4 className="text-sm font-bold text-ink mb-1">{m.name}</h4>
                    <p className="text-xs text-sky-400 font-mono mb-2">{m.nameEN}</p>
                    <p className="text-xs text-ink-5 mb-3">{m.desc}</p>
                    <ul className="space-y-1 border-t border-line/[0.04] pt-3">
                      {m.courses.map((course) => {
                        const isGate = m.gateway === course.code;
                        return (
                          <li key={course.code} className="text-[11px] flex items-start gap-1.5 leading-snug">
                            <span className={`w-1 h-1 rounded-full ${isGate ? 'bg-amber-400' : 'bg-emerald-400'} mt-1.5 flex-shrink-0`} />
                            <span className={`flex-1 ${isGate ? 'text-amber-300' : 'text-ink-3'}`}>
                              <span className="font-mono text-ink-5">{course.code}</span> {course.name}
                              {isGate && (
                                <span className="inline-flex items-center gap-0.5 text-[9px] text-amber-400 ml-1">
                                  <KeyRound className="w-2.5 h-2.5" /> {t('curriculum.gateway')}
                                </span>
                              )}
                              <span className="text-ink-6"> · {course.credits} TC</span>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-ink mb-6">{t('curriculum.projects135')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                {projects135.map((p) => (
                  <div key={p.code} className="p-5 rounded-xl bg-surface-2/40 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-ink">{p.title}</span>
                      <span className="text-[11px] font-mono text-purple-400">{p.sem}</span>
                    </div>
                    <p className="text-xs text-ink-5">{p.desc}</p>
                    <p className="text-[10px] font-mono text-ink-6 mt-2">{p.code}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-ink mb-6">{t('curriculum.grad135')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                {graduation135.map((g) => (
                  <div key={g.code} className="p-5 rounded-xl bg-surface-2/40 border border-emerald-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-ink">{g.title}</span>
                      <span className="text-[11px] font-mono text-emerald-400">{g.credits}</span>
                    </div>
                    <p className="text-xs text-ink-5">{g.condition}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-400" /> {t('curriculum.path')}
              </h3>
              <div className="mb-16">
                <CurriculumFlow152
                  creditBlocks={programStructure152.creditBlocks}
                  totalCredits={programStructure152.totalCredits}
                  directions={specializations.map((s) => ({
                    group: pickLocalized(s.name, lang),
                    nameEN: s.nameEN,
                    careers: s.careers,
                    color: SPEC_COLOR[s.id],
                    items: s.courses.map((c) => ({
                      name: c.name,
                      semester: c.semester,
                      star: c.star,
                      type: c.type,
                    })),
                  }))}
                />
              </div>
            </>
          )}

          <h3 className="text-xl font-bold text-ink mb-6">{t('curriculum.teachingMethods')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {teachingMethods.map((m) => (
              <div key={m.title} className="flex gap-4 p-4 rounded-xl bg-fill/[0.02] border border-line/[0.04]">
                <GraduationCap className="w-6 h-6 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-ink">{m.title}</h4>
                  <p className="text-xs text-ink-5 mt-1">{m.description}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-sky-400" /> {t('curriculum.internshipPartners')}
          </h3>
          <div className="p-6 rounded-2xl bg-surface-2/40 border border-line/[0.06]">
            <p className="text-sm text-ink-4 mb-4">{internshipPartners.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {internshipPartners.partners.map((p) => (
                <span key={p} className="px-3 py-1.5 text-xs rounded-lg bg-fill/5 text-ink-4 border border-line/[0.06]">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
