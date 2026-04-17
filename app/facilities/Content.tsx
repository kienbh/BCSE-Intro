'use client';

import { rooms, equipmentCategories } from '@/data/facilities';
import SectionTitle from '@/components/shared/SectionTitle';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { useLang } from '@/lib/i18n';

export default function FacilitiesContent() {
  const { t } = useLang();
  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-max">
          <SectionTitle
            title={t('section.facilities')}
            subtitle={t('facilities.subtitle')}
          />

          <div className="space-y-8 mb-16">
            {rooms.map((room) => (
              <div key={room.id} className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-slate-800/40 border border-white/[0.06]">
                <ImagePlaceholder src={room.image} alt={room.name} iconName="Monitor" className="w-full md:w-64 h-48 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{room.name}</h3>
                  <p className="text-sm text-sky-400 mb-2">
                    {[room.location, room.building].filter(Boolean).join(' — ')}
                  </p>
                  <p className="text-sm text-slate-400 mb-4">{room.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {room.specs.map((s) => (
                      <span key={s} className="text-xs px-3 py-1 rounded-lg bg-white/5 text-slate-400">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold text-white mb-6">{t('facilities.equipment')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {equipmentCategories.map((cat) => (
              <div key={cat.id} className="p-6 rounded-2xl bg-slate-800/40 border border-white/[0.06]">
                <div className="relative w-full aspect-[16/10] rounded-xl mb-4 overflow-hidden bg-slate-900/60">
                  <ImagePlaceholder
                    src={cat.image}
                    alt={cat.name}
                    iconName="Wrench"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
                <h4 className="text-base font-bold text-white mb-1">{cat.name}</h4>
                <p className="text-xs text-slate-400 mb-3">{cat.description}</p>
                <ul className="space-y-1.5">
                  {cat.items.map((item, i) => (
                    <li key={i} className="text-xs text-slate-500 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-sky-500/40" />
                      {item.name}{item.count ? ` (${item.count})` : ''}{item.specs ? ` — ${item.specs}` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
