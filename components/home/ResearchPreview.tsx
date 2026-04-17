'use client';

import { researchAreas, publications, lambdaLab } from '@/data/research';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionTitle from '@/components/shared/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import ResearchInfographic from '@/components/ui/ResearchInfographic';
import { ArrowRight, FileText, ExternalLink } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function ResearchPreview() {
  const { t } = useLang();
  return (
    <section className="section-padding">
      <div className="container-max">
        <SectionTitle
          title={t('section.research')}
          subtitle={t('research.subtitle')}
        />

        {/* Lambda Lab banner */}
        <ScrollReveal>
          <a
            href={lambdaLab.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-10 p-6 rounded-2xl bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ImagePlaceholder
                  src={lambdaLab.logo}
                  alt="Lambda Lab"
                  iconName="FlaskConical"
                  className="w-12 h-12 rounded-xl object-contain"
                />
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {lambdaLab.name}
                    <span className="text-sm font-normal text-slate-500">— {lambdaLab.fullName}</span>
                  </h3>
                  <p className="text-sm text-slate-400">{lambdaLab.tagline}</p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>
        </ScrollReveal>

        {/* 6 Research areas */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {researchAreas.map((area) => (
              <GlassCard key={area.id}>
                <ResearchInfographic
                  icon={area.icon}
                  color={area.color}
                  pattern={area.pattern}
                  topicCount={area.topics.length}
                  className="w-full h-32 rounded-xl mb-4"
                />
                <h3 className="text-sm font-bold text-white mb-1">{area.name}</h3>
                <p className="text-xs text-sky-400 mb-2">{area.supervisors.join(', ')}</p>
                <p className="text-xs text-slate-500 mb-3">{area.description}</p>
                <div className="flex flex-wrap gap-1">
                  {area.topics.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-500">{t}</span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>

        {/* Recent Publications */}
        <ScrollReveal>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                <h3 className="text-sm font-semibold text-white">Recent Publications</h3>
              </div>
              <a
                href={lambdaLab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
              >
                Xem tất cả trên {lambdaLab.name} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-3">
              {publications.map((pub, i) => (
                <div key={i} className="text-xs">
                  <p className="text-slate-300">{pub.title}</p>
                  <p className="text-slate-500">{pub.authors} — <span className="text-sky-500">{pub.venue}</span> ({pub.year})</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="text-center mt-10">
          <a
            href={lambdaLab.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Khám phá thêm tại {lambdaLab.name} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
