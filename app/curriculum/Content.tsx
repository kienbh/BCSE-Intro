'use client';

import { yearBlocks, programStructure, teachingMethods, internshipPartners } from '@/data/curriculum';
import { specializations } from '@/data/specializations';
import SectionTitle from '@/components/shared/SectionTitle';
import { Briefcase, GraduationCap, BookOpen, Star } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const colorClasses: Record<string, { border: string; accent: string; bg: string }> = {
  sky: { border: 'border-sky-500/30', accent: 'text-sky-400', bg: 'bg-sky-500/10' },
  indigo: { border: 'border-indigo-500/30', accent: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  purple: { border: 'border-purple-500/30', accent: 'text-purple-400', bg: 'bg-purple-500/10' },
  amber: { border: 'border-amber-500/30', accent: 'text-amber-400', bg: 'bg-amber-500/10' },
};

export default function CurriculumContent() {
  const { t } = useLang();
  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-max">
          <SectionTitle
            title={t('curriculum.title')}
            subtitle={`${programStructure.degreeTitleEN} — ${t('curriculum.subtitle')}`}
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {programStructure.creditBlocks.map((block) => (
              <div key={block.code} className="p-4 rounded-xl bg-slate-800/60 border border-white/[0.06] text-center">
                <span className="text-xs font-mono text-sky-400">{block.code}</span>
                <p className="text-2xl font-display font-bold text-white mt-1">{block.credits}</p>
                <p className="text-[11px] text-slate-500 mt-1">{block.name}</p>
                <p className="text-[9px] text-slate-600 mt-0.5">{block.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 text-center mb-16">{programStructure.partnerNote} · {programStructure.englishLevel}</p>

          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" /> {t('curriculum.path')}
          </h3>

          <div className="space-y-8 mb-16">
            {yearBlocks.map((block) => {
              const c = colorClasses[block.color] || colorClasses.sky;
              return (
                <div key={block.year} className={`rounded-2xl border ${c.border} bg-slate-800/30 overflow-hidden`}>
                  <div className="p-5 border-b border-white/[0.04] flex items-center gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center`}>
                      <span className={`text-xl font-display font-bold ${c.accent}`}>{block.year}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{t('curriculum.year')} {block.year} — {block.title}</h4>
                      <p className="text-xs text-slate-500">{block.titleEN} · {block.theme}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.04]">
                    {block.semesters.map((sem) => (
                      <div key={sem.semester} className="p-5">
                        <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-lg ${c.bg} flex items-center justify-center text-xs ${c.accent} font-mono`}>
                            {sem.semester}
                          </span>
                          {t('curriculum.semester')} {sem.semester}
                        </h5>

                        {sem.note && (
                          <p className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-2 py-1 mb-3 flex items-center gap-1">
                            <Star className="w-3 h-3" /> {sem.note}
                          </p>
                        )}

                        {sem.required.length > 0 && (
                          <div className="mb-3">
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">{t('curriculum.required')}</p>
                            <ul className="space-y-1">
                              {sem.required.map((s, i) => (
                                <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                                  <span className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {sem.elective.length > 0 && (
                          <div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">{t('curriculum.elective')}</p>
                            <ul className="space-y-1">
                              {sem.elective.map((s, i) => (
                                <li key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
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

          <h3 className="text-xl font-bold text-white mb-2">{t('curriculum.specializationsTitle')}</h3>
          <p className="text-xs text-slate-500 mb-4">{t('curriculum.specializationsNote')}</p>
          <div className="flex flex-wrap gap-3 mb-6 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> {t('curriculum.required')}
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> {t('curriculum.elective')}
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> {t('curriculum.legendPractice')}
            </span>
            <span className="text-slate-500">{t('curriculum.legendStar')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {specializations.map((spec) => {
              const dotColor = { required: 'bg-purple-400', elective: 'bg-emerald-400', practice: 'bg-rose-400' } as const;
              const textColor = { required: 'text-slate-200', elective: 'text-slate-300', practice: 'text-slate-300' } as const;
              return (
                <div key={spec.id} className="p-5 rounded-xl bg-slate-800/40 border border-white/[0.06]">
                  <h4 className="text-sm font-bold text-white mb-1">{spec.name}</h4>
                  <p className="text-xs text-sky-400 font-mono mb-2">{spec.nameEN}</p>
                  <p className="text-xs text-slate-500 mb-3">{spec.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {spec.careers.map((c) => (
                      <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-500">{c}</span>
                    ))}
                  </div>
                  <ul className="space-y-1 border-t border-white/[0.04] pt-3">
                    {spec.courses.map((course, i) => (
                      <li key={i} className="text-[11px] flex items-start gap-1.5 leading-snug">
                        <span className={`w-1 h-1 rounded-full ${dotColor[course.type]} mt-1.5 flex-shrink-0`} />
                        <span className={`flex-1 ${textColor[course.type]}`}>
                          {course.name}
                          {course.star && <span className="text-amber-400"> *</span>}
                          {course.semester && <span className="text-slate-600"> · {course.semester}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <h3 className="text-xl font-bold text-white mb-6">{t('curriculum.teachingMethods')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {teachingMethods.map((m) => (
              <div key={m.title} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <GraduationCap className="w-6 h-6 text-sky-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{m.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{m.description}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-sky-400" /> {t('curriculum.internshipPartners')}
          </h3>
          <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/[0.06]">
            <p className="text-sm text-slate-400 mb-4">{internshipPartners.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {internshipPartners.partners.map((p) => (
                <span key={p} className="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-slate-400 border border-white/[0.06]">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
