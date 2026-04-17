'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionTitle from '@/components/shared/SectionTitle';
import { trackCareers, integratedDirections, careerStats } from '@/data/careers';
import { getIcon } from '@/lib/utils';
import { ArrowRight, Briefcase, TrendingUp, Users, Building2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  sky:     { bg: 'bg-sky-500/10',     text: 'text-sky-400',     border: 'border-sky-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  purple:  { bg: 'bg-purple-500/10',  text: 'text-purple-400',  border: 'border-purple-500/20' },
  red:     { bg: 'bg-red-500/10',     text: 'text-red-400',     border: 'border-red-500/20' },
  rose:    { bg: 'bg-rose-500/10',    text: 'text-rose-400',    border: 'border-rose-500/20' },
  amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/20' },
};

export default function CareerOpportunitiesSection() {
  const { t } = useLang();
  return (
    <section id="careers" className="section-padding">
      <div className="container-max">
        <SectionTitle
          title={t('careers.title')}
          subtitle={t('careers.subtitle')}
        />

        {/* Stats strip */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {[
              { icon: TrendingUp, label: t('careers.stat.salary'),       value: careerStats.avgStartingSalary },
              { icon: Briefcase,  label: t('careers.stat.internship'),   value: careerStats.internshipRate },
              { icon: Users,      label: t('careers.stat.employment'),   value: careerStats.postGradEmployment },
              { icon: Building2,  label: t('careers.stat.partners'),     value: careerStats.partnerCompanies },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-800/40 border border-white/[0.06] text-center">
                <s.icon className="w-5 h-5 text-sky-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-white mb-0.5">{s.value}</p>
                <p className="text-[10px] text-slate-500 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Careers per track */}
        <ScrollReveal delay={0.05}>
          <h3 className="text-lg font-bold text-white mb-2">{t('careers.byTrack')}</h3>
          <p className="text-xs text-slate-500 mb-6">{t('careers.byTrackNote')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {trackCareers.map((tr) => (
              <div key={tr.specId} className="p-5 rounded-xl bg-slate-800/40 border border-white/[0.06] hover:border-sky-500/20 transition-colors">
                <h4 className="text-sm font-bold text-white mb-3">{tr.name}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {tr.roles.map((r) => (
                    <span key={r} className="text-[11px] px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Integrated directions */}
        <ScrollReveal delay={0.1}>
          <h3 className="text-lg font-bold text-white mb-2">{t('careers.integrated')}</h3>
          <p className="text-xs text-slate-500 mb-6 max-w-3xl">{t('careers.integratedNote')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {integratedDirections.map((dir) => {
              const Icon = getIcon(dir.icon);
              const c = colorMap[dir.color] || colorMap.sky;
              return (
                <div key={dir.id} className={`p-5 rounded-xl bg-slate-800/40 border ${c.border} hover:bg-slate-800/60 transition-colors`}>
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${c.bg} mb-3`}>
                    <Icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-0.5">{dir.name}</h4>
                  <p className={`text-[11px] font-mono ${c.text} mb-2`}>{dir.nameEN}</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{dir.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {dir.roles.map((r) => (
                      <span key={r} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400">{r}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* CTA — Career Portal */}
        <ScrollReveal delay={0.15}>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-sky-600/15 to-indigo-600/15 border border-sky-500/20">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-sky-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-white mb-1">{t('careers.portalTitle')}</h4>
                <p className="text-sm text-slate-400">{t('careers.portalDesc')}</p>
              </div>
              <Link
                href="/services#career-portal"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-sky-500 hover:bg-sky-400 text-white rounded-xl transition-colors whitespace-nowrap"
              >
                {t('careers.portalBtn')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
