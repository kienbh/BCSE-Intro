'use client';

import { specializations } from '@/data/specializations';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionTitle from '@/components/shared/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import { useLang } from '@/lib/i18n';
import { pickLocalized } from '@/lib/localized';
import { getIcon } from '@/lib/utils';

const colorMap: Record<string, { icon: string; bg: string; border: string; shadow: string }> = {
  sky: {
    icon: 'text-sky-300',
    bg: 'bg-sky-500/18',
    border: 'border-sky-400/45',
    shadow: 'shadow-[0_0_28px_rgba(56,189,248,0.22)]',
  },
  purple: {
    icon: 'text-violet-300',
    bg: 'bg-violet-500/18',
    border: 'border-violet-400/45',
    shadow: 'shadow-[0_0_28px_rgba(167,139,250,0.22)]',
  },
  red: {
    icon: 'text-rose-300',
    bg: 'bg-rose-500/18',
    border: 'border-rose-400/45',
    shadow: 'shadow-[0_0_28px_rgba(251,113,133,0.20)]',
  },
  emerald: {
    icon: 'text-emerald-300',
    bg: 'bg-emerald-500/18',
    border: 'border-emerald-400/45',
    shadow: 'shadow-[0_0_28px_rgba(52,211,153,0.22)]',
  },
  amber: {
    icon: 'text-amber-300',
    bg: 'bg-amber-500/18',
    border: 'border-amber-400/45',
    shadow: 'shadow-[0_0_28px_rgba(251,191,36,0.22)]',
  },
};

export default function SpecializationsSection() {
  const { t, lang } = useLang();
  return (
    <section className="section-padding bg-slate-900/50">
      <div className="container-max">
        <SectionTitle
          title={t('specializations.title')}
          subtitle={t('specializations.subtitle')}
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {specializations.map((spec) => {
              const colors = colorMap[spec.color] || colorMap.sky;
              const Icon = getIcon(spec.icon);

              const specName = pickLocalized(spec.name, lang);
              return (
                <GlassCard key={spec.id} className="text-center group">
                  <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border ${colors.bg} ${colors.border} ${colors.shadow} transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105`}>
                    <Icon className={`h-8 w-8 ${colors.icon}`} strokeWidth={2.35} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{specName}</h3>
                  <p className="text-xs text-slate-500 font-mono mb-3">{spec.nameEN}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{pickLocalized(spec.description, lang)}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {spec.careers.slice(0, 2).map((c) => (
                      <span key={c} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-500">
                        {c}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
