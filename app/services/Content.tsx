'use client';

import { services } from '@/data/services';
import SectionTitle from '@/components/shared/SectionTitle';
import { ExternalLink } from 'lucide-react';
import { getIcon } from '@/lib/utils';
import { useLang } from '@/lib/i18n';

export default function ServicesContent() {
  const { t } = useLang();
  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-max">
          <SectionTitle
            title={t('services.pageTitle')}
            subtitle={t('services.pageSubtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = getIcon(service.icon);
              const isActive = service.status === 'active';

              return (
                <div key={service.id} id={service.id} className="scroll-mt-24 p-6 rounded-2xl bg-slate-800/40 border border-white/[0.06] hover:border-sky-500/20 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 flex-shrink-0">
                      <Icon className="w-6 h-6 text-sky-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-white">{service.name}</h3>
                        {isActive && (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {t('label.active')}
                          </span>
                        )}
                        {service.status === 'coming-soon' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400">{t('label.comingSoon')}</span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mt-2 mb-3">{service.description}</p>
                      <ul className="space-y-1.5 mb-4">
                        {service.features.map((f) => (
                          <li key={f} className="text-xs text-slate-500 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-sky-500/40" /> {f}
                          </li>
                        ))}
                      </ul>
                      {isActive && (
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 rounded-lg transition-colors"
                        >
                          {t('label.access')} <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
