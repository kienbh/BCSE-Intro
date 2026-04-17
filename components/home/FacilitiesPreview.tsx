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
    <section className="section-padding bg-slate-900/50">
      <div className="container-max">
        <SectionTitle
          title={t('section.facilities')}
          subtitle={t('facilities.subtitle')}
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {rooms.map((room) => (
              <div key={room.id} className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-slate-800/40">
                <ImagePlaceholder
                  src={room.image}
                  alt={room.name}
                  iconName="Monitor"
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-sm font-bold text-white">{room.name}</h3>
                  <p className="text-xs text-sky-400 mb-2">{[room.location, room.building].filter(Boolean).join(' — ')}</p>
                  <p className="text-xs text-slate-500">{room.description}</p>
                  {room.computerCount && (
                    <div className="flex items-center gap-1 mt-2">
                      <Monitor className="w-3 h-3 text-slate-600" />
                      <span className="text-xs text-slate-600">{room.computerCount} PCs</span>
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
                <div key={cat.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <Icon className="w-5 h-5 text-sky-400 mb-2" />
                  <h4 className="text-xs font-semibold text-white mb-1">{cat.name}</h4>
                  <ul className="space-y-0.5">
                    {cat.items.slice(0, 3).map((item, i) => (
                      <li key={i} className="text-[11px] text-slate-500">
                        {item.name}{item.count ? ` (${item.count})` : ''}
                      </li>
                    ))}
                    {cat.items.length > 3 && (
                      <li className="text-[11px] text-slate-600">+{cat.items.length - 3} more</li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="text-center mt-10">
          <Link href="/facilities" className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors">
            Khám phá cơ sở vật chất <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
