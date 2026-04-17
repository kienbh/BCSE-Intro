'use client';

import { services } from '@/data/services';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionTitle from '@/components/shared/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import { ExternalLink } from 'lucide-react';
import { getIcon } from '@/lib/utils';
import { useLang } from '@/lib/i18n';

export default function ServicesPortal() {
  const { t } = useLang();
  return (
    <section className="section-padding">
      <div className="container-max">
        <SectionTitle
          title={t('section.services')}
          subtitle={t('services.subtitle')}
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const Icon = getIcon(service.icon);
              const isActive = service.status === 'active';
              const isComingSoon = service.status === 'coming-soon';

              return (
                <GlassCard key={service.id} hover={isActive}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20">
                      <Icon className="w-5 h-5 text-sky-400" />
                    </div>
                    {isActive && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {t('label.active')}
                      </span>
                    )}
                    {isComingSoon && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {t('label.comingSoon')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{service.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{service.description}</p>
                  <ul className="space-y-1 mb-4">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-sky-500/40" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {isActive && (
                    <a
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      {t('label.access')} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
