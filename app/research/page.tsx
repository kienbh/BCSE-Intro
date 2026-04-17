'use client';

import { useState } from 'react';
import { researchAreas, publications, blogPosts, nckhProjects, pubFilterTabs, blogFilterTabs, lambdaLab } from '@/data/research';
import SectionTitle from '@/components/shared/SectionTitle';
import ResearchInfographic from '@/components/ui/ResearchInfographic';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { ExternalLink, Users, Pin } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function ResearchPage() {
  const [pubTab, setPubTab] = useState<string>('all');
  const [blogTab, setBlogTab] = useState<string>('all');
  const { t } = useLang();

  const filteredPubs = publications.filter((p) => {
    if (pubTab === 'all') return true;
    if (pubTab === 'journal' || pubTab === 'conference') return p.type === pubTab;
    return p.tags.includes(pubTab);
  });

  const filteredBlogs = blogTab === 'all'
    ? blogPosts
    : blogPosts.filter((b) => b.tags.includes(blogTab));

  return (
    <div className="pt-20">
      {/* Research directions */}
      <section className="section-padding">
        <div className="container-max">
          <SectionTitle
            title={t('research.pageTitle')}
            subtitle={t('research.subtitle')}
          />

          <a
            href={lambdaLab.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 mb-10 p-5 rounded-2xl bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-colors group"
          >
            <ImagePlaceholder
              src={lambdaLab.logo}
              alt="Lambda Lab"
              iconName="FlaskConical"
              className="w-12 h-12 rounded-xl object-contain flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-white">
                {lambdaLab.name} <span className="text-sm font-normal text-slate-500">— {lambdaLab.fullName}</span>
              </h3>
              <p className="text-sm text-slate-400 truncate">{lambdaLab.tagline}</p>
            </div>
            <ExternalLink className="w-5 h-5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </a>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {researchAreas.map((area) => (
              <div key={area.id} className="p-5 rounded-2xl bg-slate-800/40 border border-white/[0.06]">
                <ResearchInfographic
                  icon={area.icon}
                  color={area.color}
                  pattern={area.pattern}
                  topicCount={area.topics.length}
                  className="w-full h-32 rounded-xl mb-4"
                />
                <h3 className="text-sm font-bold text-white mb-1">{area.name}</h3>
                <p className="text-xs text-sky-400 mb-2">{area.supervisors.join(', ')}</p>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">{area.description}</p>
                <div className="flex flex-wrap gap-1">
                  {area.topics.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="section-padding bg-slate-900/50">
        <div className="container-max">
          <SectionTitle title={t('research.pubs')} subtitle={t('research.pubsSubtitle')} />

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {pubFilterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setPubTab(tab.key)}
                className={`px-4 py-1.5 text-xs rounded-full transition-all ${
                  pubTab === tab.key
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-500 hover:text-slate-300 border border-white/5 hover:border-white/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredPubs.map((pub) => (
              <div key={pub.id} className="grid grid-cols-[60px_1fr_auto] gap-4 items-start p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-colors">
                <div className="text-lg font-mono font-bold text-sky-400">{pub.year}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${pub.type === 'journal' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'}`}>
                      {pub.type}
                    </span>
                    {pub.tags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded font-mono uppercase bg-white/5 text-slate-500 border border-white/10">{t}</span>
                    ))}
                  </div>
                  <p className="text-sm text-white font-medium mb-1">{pub.title}</p>
                  <p className="text-xs text-slate-500">{pub.authors}</p>
                  <p className="text-xs text-sky-500 mt-0.5">{pub.venue}</p>
                  {pub.keywords && <p className="text-[11px] text-slate-600 mt-1">Keywords: {pub.keywords}</p>}
                </div>
                <div>
                  {pub.doi ? (
                    <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 whitespace-nowrap">
                      DOI <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-700">No DOI</span>
                  )}
                </div>
              </div>
            ))}
            {filteredPubs.length === 0 && (
              <p className="text-center text-sm text-slate-500 py-10">{t('research.noResults')}</p>
            )}
          </div>

          <div className="text-center mt-8">
            <a href={lambdaLab.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1">
              {t('research.viewAll')} {lambdaLab.name} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* News & Blog */}
      <section className="section-padding">
        <div className="container-max">
          <SectionTitle title={t('research.blog')} subtitle={t('research.blogSubtitle')} />

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {blogFilterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setBlogTab(tab.key)}
                className={`px-4 py-1.5 text-xs rounded-full transition-all ${
                  blogTab === tab.key
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-500 hover:text-slate-300 border border-white/5 hover:border-white/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBlogs.map((b) => (
              <div
                key={b.id}
                className={`p-6 rounded-2xl border transition-colors ${b.pinned ? 'md:col-span-2 bg-amber-500/[0.04] border-amber-500/20' : 'bg-slate-800/40 border-white/[0.06] hover:border-white/15'}`}
              >
                {b.pinned && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-amber-400 mb-2">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
                <p className="text-xs text-slate-500 mb-2">{b.date} · {b.author}</p>
                <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-slate-400 mb-3 leading-relaxed">{b.summary}</p>
                <div className="flex flex-wrap gap-1">
                  {b.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">{t}</span>
                  ))}
                </div>
              </div>
            ))}
            {filteredBlogs.length === 0 && (
              <p className="col-span-full text-center text-sm text-slate-500 py-10">{t('research.noPosts')}</p>
            )}
          </div>

          <div className="text-center mt-8">
            <a href={lambdaLab.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1">
              {t('research.viewAll')} {lambdaLab.name} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* NCKH-SV projects */}
      <section className="section-padding bg-slate-900/50">
        <div className="container-max">
          <SectionTitle title={t('research.sProjects')} subtitle={t('research.sProjectsSubtitle')} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nckhProjects.map((p) => (
              <div key={p.id} className="p-5 rounded-2xl bg-slate-800/40 border border-white/[0.06] hover:border-white/15 transition-colors">
                <div className="flex items-start gap-2 mb-3">
                  <Users className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-bold text-white">{p.title}</h3>
                </div>
                <p className="text-xs text-slate-300 mb-1"><span className="text-slate-500">{t('research.studentsLabel')}:</span> {p.students}</p>
                <p className="text-xs text-slate-300 mb-3"><span className="text-slate-500">{t('research.supervisorLabel')}:</span> {p.supervisors}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{p.summary}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
