'use client';

import { specializations } from '@/data/specializations';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionTitle from '@/components/shared/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { useLang } from '@/lib/i18n';

const colorMap: Record<string, string> = {
  sky: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  red: 'text-red-400 bg-red-500/10 border-red-500/20',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

export default function SpecializationsSection() {
  const { t } = useLang();
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
              const [, bgColor, borderColor] = colors.split(' ');

              return (
                <GlassCard key={spec.id} className="text-center group">
                  {/* Logo — nếu có ảnh dùng ảnh, nếu không dùng icon fallback */}
                  <ImagePlaceholder
                    src={spec.logo}
                    alt={spec.name}
                    iconName={spec.icon}
                    fallback="icon"
                    className={`w-16 h-16 rounded-2xl mx-auto mb-4 ${bgColor} border ${borderColor}`}
                    width={64}
                    height={64}
                  />
                  <h3 className="text-sm font-bold text-white mb-1">{spec.name}</h3>
                  <p className="text-xs text-slate-500 font-mono mb-3">{spec.nameEN}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{spec.description}</p>
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
