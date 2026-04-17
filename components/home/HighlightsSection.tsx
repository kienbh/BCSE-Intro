'use client';

import { stats } from '@/data/stats';
import ScrollReveal from '@/components/shared/ScrollReveal';
import StatCounter from '@/components/ui/StatCounter';

export default function HighlightsSection() {
  return (
    <section className="section-padding">
      <div className="container-max">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, i) => (
              <StatCounter key={i} value={stat.value} suffix={stat.suffix} label={stat.label} icon={stat.icon} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
