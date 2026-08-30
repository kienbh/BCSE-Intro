'use client';

import { useState } from 'react';
import {
  yearBlocks152,
  yearBlocks135,
  programStructure152,
  programStructure135,
  coreRequired135,
  modules135,
  projects135,
  graduation135,
  teachingMethods,
  internshipPartners,
  type YearBlock,
} from '@/data/curriculum';
import { specializations } from '@/data/specializations';
import SectionTitle from '@/components/shared/SectionTitle';
import { Briefcase, GraduationCap, BookOpen, Star, KeyRound } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { pickLocalized } from '@/lib/localized';

const colorClasses: Record<string, { border: string; accent: string; bg: string }> = {
  sky: { border: 'border-sky-500/30', accent: 'text-sky-400', bg: 'bg-sky-500/10' },
  indigo: { border: 'border-indigo-500/30', accent: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  purple: { border: 'border-purple-500/30', accent: 'text-purple-400', bg: 'bg-purple-500/10' },
  amber: { border: 'border-amber-500/30', accent: 'text-amber-400', bg: 'bg-amber-500/10' },
};

type Framework = '152' | '135';

export default function CurriculumContent() {
  const { t, lang } = useLang();
  const [fw, setFw] = useState<Framework>('152');
  const ps = fw === '135' ? programStructure135 : programStructure152;

  const renderYearBoard = (blocks: YearBlock[]) => (
    <div className="space-y-8 mb-16">
      {blocks.map((block) => {
        const c = colorClasses[block.color] || colorClasses.sky;
        return (
          <div key={block.year} className={`rounded-2xl border ${c.border} bg-surface-2/30 overflow-hidden`}>
            <div className="p-5 border-b border-line/[0.04] flex items-center gap-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
                <span className={`text-xl font-display font-bold ${c.accent}`}>{block.year}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-ink">{t('curriculum.year')} {block.year} — {block.title}</h4>
                <p className="text-xs text-ink-5">{block.titleEN} · {block.theme}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.04]">
              {block.semesters.map((sem) => (
                <div key={sem.semester} className="p-5">
                  <h5 className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-lg ${c.bg} flex items-center justify-center text-xs ${c.accent} font-mono`}>
                      {sem.semester}
                    </span>
                    {t('curriculum.semester')} {sem.semester}
                    {sem.credits != null && <span className="text-[10px] text-ink-5 font-normal">· {sem.credits} TC</span>}
                  </h5>

                  {sem.note && (
                    <p className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2 py-1 mb-3 flex items-center gap-1">
                      <Star className="w-3 h-3" /> {sem.note}
                    </p>
                  )}

                  {sem.required.length > 0 && (
                    <div className="mb-3">
                      <p className="text-[10px] text-ink-5 uppercase tracking-wider mb-1.5">{t('curriculum.required')}</p>
                      <ul className="space-y-1">
                        {sem.required.map((s, i) => (
                          <li key={i} className="text-xs text-ink-3 flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sem.elective.length > 0 && (
                    <div>
                      <p className="text-[10px] text-ink-5 uppercase tracking-wider mb-1.5">{t('curriculum.elective')}</p>
                      <ul className="space-y-1">
                        {sem.elective.map((s, i) => (
                          <li key={i} className="text-xs text-ink-5 flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

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

          <div className={`grid grid-cols-2 ${ps.creditBlocks.length > 5 ? 'md:grid-cols-4 xl:grid-cols-7' : 'md:grid-cols-5'} gap-3 mb-6`}>
            {ps.creditBlocks.map((block) => (
              <div key={block.code} className="p-4 rounded-xl bg-surface-2/60 border border-line/[0.06] text-center">
                <span className="text-xs font-mono text-sky-400">{block.code}</span>
                <p className="text-2xl font-display font-bold text-ink mt-1">{block.credits}</p>
                <p className="text-[11px] text-ink-5 mt-1">{block.name}</p>
                <p className="text-[9px] text-ink-6 mt-0.5">{block.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-6 text-center mb-16">{ps.partnerNote} · {ps.englishLevel}</p>

          {fw === '135' ? (
            <>
              <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-400" /> {t('curriculum.plan135')}
              </h3>
              {renderYearBoard(yearBlocks135)}

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
              {renderYearBoard(yearBlocks152)}

              <h3 className="text-xl font-bold text-ink mb-2">{t('curriculum.specializationsTitle')}</h3>
              <p className="text-xs text-ink-5 mb-4">{t('curriculum.specializationsNote')}</p>
              <div className="flex flex-wrap gap-3 mb-6 text-[11px]">
                <span className="inline-flex items-center gap-1.5 text-ink-4">
                  <span className="w-2 h-2 rounded-full bg-purple-400" /> {t('curriculum.required')}
                </span>
                <span className="inline-flex items-center gap-1.5 text-ink-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> {t('curriculum.elective')}
                </span>
                <span className="inline-flex items-center gap-1.5 text-ink-4">
                  <span className="w-2 h-2 rounded-full bg-rose-400" /> {t('curriculum.legendPractice')}
                </span>
                <span className="text-ink-5">{t('curriculum.legendStar')}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                {specializations.map((spec) => {
                  const dotColor = { required: 'bg-purple-400', elective: 'bg-emerald-400', practice: 'bg-rose-400' } as const;
                  const textColor = { required: 'text-ink-2', elective: 'text-ink-3', practice: 'text-ink-3' } as const;
                  return (
                    <div key={spec.id} className="p-5 rounded-xl bg-surface-2/40 border border-line/[0.06]">
                      <h4 className="text-sm font-bold text-ink mb-1">{pickLocalized(spec.name, lang)}</h4>
                      <p className="text-xs text-sky-400 font-mono mb-2">{spec.nameEN}</p>
                      <p className="text-xs text-ink-5 mb-3">{pickLocalized(spec.description, lang)}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {spec.careers.map((c) => (
                          <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-fill/5 text-ink-5">{c}</span>
                        ))}
                      </div>
                      <ul className="space-y-1 border-t border-line/[0.04] pt-3">
                        {spec.courses.map((course, i) => (
                          <li key={i} className="text-[11px] flex items-start gap-1.5 leading-snug">
                            <span className={`w-1 h-1 rounded-full ${dotColor[course.type]} mt-1.5 flex-shrink-0`} />
                            <span className={`flex-1 ${textColor[course.type]}`}>
                              {course.name}
                              {course.star && <span className="text-amber-400"> *</span>}
                              {course.semester && <span className="text-ink-6"> · {course.semester}</span>}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
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
