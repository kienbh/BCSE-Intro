'use client';

import { useState } from 'react';
import Link from 'next/link';
import { nckhProjects, lambdaLab } from '@/data/research';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionTitle from '@/components/shared/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import { Users, ArrowRight, ExternalLink } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const tagColors: Record<string, string> = {
  Robotics:    'bg-rose-500/10 text-rose-300 border-rose-500/20',
  CV:          'bg-sky-500/10 text-sky-300 border-sky-500/20',
  EEG:         'bg-purple-500/10 text-purple-300 border-purple-500/20',
  'Sensory AI':'bg-amber-500/10 text-amber-300 border-amber-500/20',
  '3D Printing':'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  Drone:       'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
};

const allTags = ['all', 'Robotics', 'EEG', 'Sensory AI', 'CV', '3D Printing', 'Drone'];

export default function StudentProjectsSection() {
  const [active, setActive] = useState<string>('all');
  const { t } = useLang();

  const filtered = active === 'all'
    ? nckhProjects
    : nckhProjects.filter((p) => p.tags.includes(active));

  return (
    <section className="section-padding bg-slate-900/50">
      <div className="container-max">
        <SectionTitle
          title={t('section.projects')}
          subtitle=""
        />

        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                className={`px-4 py-1.5 text-xs rounded-full transition-all ${
                  active === tag
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-500 hover:text-slate-300 border border-white/5 hover:border-white/15'
                }`}
              >
                {tag === 'all' ? 'All' : tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <GlassCard key={p.id}>
                <div className="flex items-start gap-2 mb-3">
                  <Users className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-bold text-white leading-tight">{p.title}</h3>
                </div>
                <p className="text-xs text-slate-300 mb-1"><span className="text-slate-500">SV:</span> {p.students}</p>
                <p className="text-xs text-slate-300 mb-3"><span className="text-slate-500">HD:</span> {p.supervisors}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{p.summary}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${tagColors[t] || 'bg-white/5 text-slate-400 border-white/10'}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              href="/research"
              className="inline-flex items-center justify-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
            >
              Xem tất cả dự án nghiên cứu <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={lambdaLab.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Khám phá {lambdaLab.name} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
