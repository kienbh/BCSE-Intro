'use client';

import { coreFaculty } from '@/data/faculty';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionTitle from '@/components/shared/SectionTitle';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function FacultyPreview() {
  const { t } = useLang();
  return (
    <section className="section-padding bg-slate-900/50">
      <div className="container-max">
        <SectionTitle
          title={t('section.faculty')}
          subtitle={t('faculty.subtitle')}
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreFaculty.map((member) => {
              const initials = member.name.split(' ').map(w => w[0]).join('').slice(-2).toUpperCase();
              return (
                <div key={member.id} className="p-4 rounded-xl bg-slate-800/40 border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-white truncate">{member.title} {member.name}</h3>
                      <p className="text-[10px] text-sky-400 truncate">{member.position}</p>
                    </div>
                  </div>
                  {member.founderRole && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Star className="w-2.5 h-2.5" /> {member.founderRole === 'founder' ? 'Founder' : 'Co-founder'}
                    </span>
                  )}
                  {member.isJapanese && (
                    <span className="inline-block text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                      JP
                    </span>
                  )}
                  {member.specialization.length > 0 && (
                    <p className="text-[10px] text-slate-600 mt-1.5 line-clamp-1">{member.specialization.join(', ')}</p>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="text-center mt-10">
          <Link href="/faculty" className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors">
            Xem đội ngũ đầy đủ ({coreFaculty.length} cơ hữu + 30+ thỉnh giảng) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
