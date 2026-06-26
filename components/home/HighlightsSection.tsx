'use client';

import { stats } from '@/data/stats';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StatCounter from '@/components/ui/StatCounter';
import { useLang } from '@/lib/i18n';
import { pickLocalized } from '@/lib/localized';

export default function HighlightsSection() {
  const { lang } = useLang();
  return (
    <section className="section-padding">
      <div className="container-max">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, i) => (
              <StatCounter
                key={i}
                value={stat.value}
                suffix={stat.suffix}
                label={pickLocalized(stat.label, lang)}
                icon={stat.icon}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
