'use client';

import { philosophy, distinctFeatures } from '@/data/philosophy';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionTitle from '@/components/shared/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import { getIcon } from '@/lib/utils';
import { useLang, type DictKey } from '@/lib/i18n';

const pillarKeys = ['p1', 'p2', 'p3'] as const;

export default function PhilosophySection() {
  const { t, lang } = useLang();
  return (
    <section id="philosophy" className="section-padding bg-slate-900/50">
      <div className="container-max">
        <SectionTitle title={t('philosophy.title')} />

        {/* 3 Pillars */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {philosophy.pillars.map((pillar, i) => {
              const Icon = getIcon(pillar.icon);
              const key = pillarKeys[i];
              const title = t(`philosophy.${key}.title` as DictKey);
              const desc = t(`philosophy.${key}.desc` as DictKey);
              return (
                <GlassCard key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-5">
                    <Icon className="w-8 h-8 text-sky-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                  {lang !== 'en' && (
                    <p className="text-xs text-sky-400 font-mono mb-3">{pillar.titleEN}</p>
                  )}
                  <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                </GlassCard>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <figure className="mb-16 max-w-3xl mx-auto px-6">
            <blockquote className="relative text-center">
              <span className="absolute -top-6 left-0 text-6xl leading-none text-sky-500/20 font-serif select-none">&ldquo;</span>
              <p className="text-base md:text-lg text-slate-300 italic leading-relaxed relative z-10">
                &ldquo;{t('philosophy.quote')}&rdquo;
              </p>
              <span className="absolute -bottom-8 right-0 text-6xl leading-none text-sky-500/20 font-serif select-none">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="h-px w-8 bg-sky-500/40" />
              <span className="text-sky-400 font-semibold">{t('philosophy.quoteAuthor')}</span>
              <span className="text-slate-500">— {t('philosophy.quoteTitle')}</span>
              <span className="h-px w-8 bg-sky-500/40" />
            </figcaption>
          </figure>
        </ScrollReveal>

        {/* Distinct Features */}
        <ScrollReveal delay={0.2}>
          <h3 className="text-center text-xl font-semibold text-white mb-8">{t('philosophy.distinct')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {distinctFeatures.map((feature, i) => {
              const Icon = getIcon(feature.icon);
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-sky-500/20 transition-colors"
                >
                  <Icon className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
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
