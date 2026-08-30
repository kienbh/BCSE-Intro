'use client';

import { coreFaculty, japaneseFaculty, affiliatedFaculty, FacultyMember } from '@/data/faculty';
import SectionTitle from '@/components/shared/SectionTitle';
import { Mail, Building, Star } from 'lucide-react';
import { useLang } from '@/lib/i18n';

function FacultyCard({ member, badgeJP }: { member: FacultyMember; badgeJP: string }) {
  const initials = member.name.split(' ').map(w => w[0]).join('').slice(-2).toUpperCase();
  return (
    <div className="p-5 rounded-xl bg-surface-2/40 border border-line/[0.06] hover:border-line/[0.12] transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="on-media w-11 h-11 rounded-full bg-gradient-to-br from-sky-600 to-indigo-600 flex items-center justify-center text-ink text-xs font-bold flex-shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-ink">{member.title} {member.name}</h3>
          <p className="text-xs text-sky-400 leading-snug">{member.position}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {member.founderRole && (
          <span className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Star className="w-2.5 h-2.5" /> {member.founderRole === 'founder' ? 'Founder' : 'Co-founder'}
          </span>
        )}
        {member.isJapanese && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
            {badgeJP}
          </span>
        )}
      </div>

      {member.affiliation && (
        <p className="flex items-center gap-1 text-[10px] text-ink-5 mb-2">
          <Building className="w-3 h-3" /> {member.affiliation}
        </p>
      )}

      {member.specialization.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {member.specialization.map((s) => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-fill/5 text-ink-5">{s}</span>
          ))}
        </div>
      )}

      {member.email && (
        <a href={`mailto:${member.email}`} className="flex items-center gap-1 text-xs text-ink-5 hover:text-sky-400 transition-colors">
          <Mail className="w-3 h-3" /> {member.email}
        </a>
      )}
    </div>
  );
}

function FacultyMatrixCell({ member }: { member: FacultyMember }) {
  return (
    <div className="p-3 rounded-lg bg-surface-2/30 border border-line/[0.04] hover:border-line/[0.12] hover:bg-surface-2/50 transition-colors">
      <p className="text-xs text-ink font-medium leading-tight mb-0.5">
        {member.title} {member.name}
      </p>
      {member.affiliation && (
        <p className="text-[10px] text-ink-5 leading-snug">{member.affiliation}</p>
      )}
    </div>
  );
}

export default function FacultyContent() {
  const { t } = useLang();
  const badgeJP = t('faculty.badgeJP');
  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-max">
          <SectionTitle
            title={t('section.faculty')}
            subtitle={t('faculty.subtitle')}
          />

          <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            {t('faculty.core')} ({coreFaculty.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {coreFaculty.map((m) => <FacultyCard key={m.id} member={m} badgeJP={badgeJP} />)}
          </div>

          <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            {t('faculty.japanese')} ({japaneseFaculty.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {japaneseFaculty.map((m) => <FacultyCard key={m.id} member={m} badgeJP={badgeJP} />)}
          </div>

          <h3 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            {t('faculty.affiliated')} ({affiliatedFaculty.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
            {affiliatedFaculty.map((m) => <FacultyMatrixCell key={m.id} member={m} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
