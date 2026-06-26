'use client';

import { philosophy, distinctFeatures } from '@/data/philosophy';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionTitle from '@/components/shared/SectionTitle';
import { getIcon } from '@/lib/utils';
import { useLang, type DictKey } from '@/lib/i18n';
import { pickLocalized } from '@/lib/localized';

const pillarKeys = ['p1', 'p2', 'p3'] as const;

// Mỗi pillar có màu riêng — phá vỡ monotone sky-blue-everywhere
const PILLAR_COLORS = [
  { icon: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { icon: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
] as const;

export default function PhilosophySection() {
  const { t, lang } = useLang();
  return (
    <section id="philosophy" className="section-padding bg-slate-900/50">
      <div className="container-max">
        <SectionTitle
          title={t('philosophy.title')}
          subtitle={t('philosophy.motto')}
          eyebrow="TRIẾT LÝ ĐÀO TẠO"
        />

        {/* 3 Pillars — mỗi cái một màu, không còn tất cả sky-blue */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {philosophy.pillars.map((pillar, i) => {
              const Icon = getIcon(pillar.icon);
              const key = pillarKeys[i];
              const c = PILLAR_COLORS[i];
              const title = t(`philosophy.${key}.title` as DictKey);
              const desc = t(`philosophy.${key}.desc` as DictKey);
              return (
                <div
                  key={i}
                  className="group p-6 rounded-2xl bg-slate-800/40 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 text-center"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl border mb-5 ${c.bg} ${c.border}`}>
                    <Icon className={`w-7 h-7 ${c.icon}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                  {lang !== 'en' && (
                    <p className={`text-xs font-mono mb-3 ${c.icon}`}>{pillar.titleEN}</p>
                  )}
                  <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Quote — Fraunces italic, amber accent */}
        <ScrollReveal delay={0.1}>
          <figure className="mb-16 max-w-3xl mx-auto">
            <div className="relative pl-6 border-l-2 border-amber-500/40 py-2">
              <p className="font-serif text-base md:text-lg text-slate-300 italic leading-relaxed">
                &ldquo;{t('philosophy.quote')}&rdquo;
              </p>
            </div>
            <figcaption className="mt-6 flex flex-wrap items-center gap-3 pl-6 text-sm">
              <span className="text-amber-400 font-semibold">{t('philosophy.quoteAuthor')}</span>
              <span className="text-slate-600">—</span>
              <span className="text-slate-500">{t('philosophy.quoteTitle')}</span>
            </figcaption>
          </figure>
        </ScrollReveal>

        {/* Distinct Features */}
        <ScrollReveal delay={0.2}>
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate-500 mb-6 text-center">
            {t('philosophy.distinct')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {distinctFeatures.map((feature, i) => {
              const Icon = getIcon(feature.icon);
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/15 hover:bg-amber-500/[0.02] transition-colors"
                >
                  <Icon className="w-4 h-4 text-amber-400/70 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{pickLocalized(feature.title, lang)}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{pickLocalized(feature.description, lang)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
