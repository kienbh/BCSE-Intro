'use client';

import { yearBlocks } from '@/data/curriculum';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionTitle from '@/components/shared/SectionTitle';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const colorClasses: Record<string, { border: string; accent: string; bg: string }> = {
  sky: { border: 'border-sky-500/30', accent: 'text-sky-400', bg: 'bg-sky-500/10' },
  indigo: { border: 'border-indigo-500/30', accent: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  purple: { border: 'border-purple-500/30', accent: 'text-purple-400', bg: 'bg-purple-500/10' },
  amber: { border: 'border-amber-500/30', accent: 'text-amber-400', bg: 'bg-amber-500/10' },
};

export default function CurriculumPreview() {
  const { t } = useLang();
  return (
    <section className="section-padding">
      <div className="container-max">
        <SectionTitle
          title={t('section.curriculum')}
          subtitle={t('curriculum.subtitle')}
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {yearBlocks.map((block) => {
              const c = colorClasses[block.color] || colorClasses.sky;
              // Show first semester required subjects as preview
              const previewSubjects = block.semesters[0]?.required.slice(0, 4) || [];
              return (
                <div
                  key={block.year}
                  className={`rounded-2xl border ${c.border} bg-slate-800/40 p-6 hover:bg-slate-800/60 transition-colors`}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${c.bg} mb-4`}>
                    <span className={`font-display font-bold ${c.accent}`}>{block.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-0.5">{block.title}</h3>
                  <p className="text-xs text-slate-500 font-mono mb-3">{block.titleEN}</p>
                  <p className="text-xs text-slate-400 mb-4">{block.theme}</p>
                  <ul className="space-y-1.5">
                    {previewSubjects.map((h, i) => (
                      <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                        <span className={`w-1 h-1 rounded-full ${c.bg} mt-1.5 flex-shrink-0`} />
                        {h}
                      </li>
                    ))}
                    {block.semesters[0]?.required.length > 4 && (
                      <li className="text-xs text-slate-600">+{block.semesters[0].required.length - 4} môn khác...</li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="text-center mt-10">
            <Link href="/curriculum" className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors">
              {t('cta.exploreFull')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
