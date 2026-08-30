'use client';

import { rooms, equipmentCategories } from '@/data/facilities';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionTitle from '@/components/shared/SectionTitle';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Link from 'next/link';
import { ArrowRight, Monitor, Wrench, Server, CircuitBoard } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  manufacture: Wrench,
  servers: Server,
  robotics: CircuitBoard,
  'iot-lab': CircuitBoard,
};

export default function FacilitiesPreview() {
  const { t } = useLang();
  return (
    <section className="section-padding bg-surface/50">
      <div className="container-max">
        <SectionTitle
          title={t('section.facilities')}
          subtitle={t('facilities.subtitle')}
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {rooms.map((room) => (
              <div key={room.id} className="group relative rounded-2xl overflow-hidden border border-line/[0.06] bg-surface-2/40">
                <div className="flex h-48 items-center justify-center bg-bg/55 p-3">
                  <ImagePlaceholder
                    src={room.image}
                    alt={room.name}
                    iconName="Monitor"
                    className="max-h-full w-full rounded-xl object-contain"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-ink">{room.name}</h3>
                  <p className="text-xs text-sky-400 mb-2">{[room.location, room.building].filter(Boolean).join(' — ')}</p>
                  <p className="text-xs text-ink-5">{room.description}</p>
                  {room.computerCount && (
                    <div className="flex items-center gap-1 mt-2">
                      <Monitor className="w-3 h-3 text-ink-6" />
                      <span className="text-xs text-ink-6">{room.computerCount} PCs</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {equipmentCategories.map((cat) => {
              const Icon = iconMap[cat.id] || Wrench;
              return (
                <div key={cat.id} className="p-4 rounded-xl bg-fill/[0.02] border border-line/[0.04]">
                  <Icon className="w-5 h-5 text-sky-400 mb-2" />
                  <h4 className="text-xs font-semibold text-ink mb-1">{cat.name}</h4>
                  <ul className="space-y-0.5">
                    {cat.items.slice(0, 3).map((item, i) => (
                      <li key={i} className="text-[11px] text-ink-5">
                        {item.name}{item.count ? ` (${item.count})` : ''}
                      </li>
                    ))}
                    {cat.items.length > 3 && (
                      <li className="text-[11px] text-ink-6">+{cat.items.length - 3} more</li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="mt-10 flex justify-center">
          <Link
            href="/facilities"
            className="live-cta group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-orange-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_14px_40px_rgba(245,158,11,0.24)] transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_18px_55px_rgba(245,158,11,0.34)]"
          >
            Khám phá cơ sở vật chất
            <svg width="0" height="0" aria-hidden="true" focusable="false">
              <linearGradient id="facilities-arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0f172a">
                  <animate attributeName="stop-color" values="#0f172a;#0369a1;#0f172a" dur="2.2s" repeatCount="indefinite" />
                </stop>
                <stop offset="50%" stopColor="#0284c7">
                  <animate attributeName="stop-color" values="#0284c7;#fef3c7;#0284c7" dur="2.2s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#0f172a">
                  <animate attributeName="stop-color" values="#0f172a;#f59e0b;#0f172a" dur="2.2s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </svg>
            <ArrowRight className="live-cta-arrow w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
