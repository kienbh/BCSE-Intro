'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, Search, X, ChevronDown } from 'lucide-react';

import { CATEGORY_META, type ServiceCategory, services } from '@/data/services';
import SectionTitle from '@/components/shared/SectionTitle';
import { getIcon } from '@/lib/utils';
import { useLang } from '@/lib/i18n';
import { pickLocalized } from '@/lib/localized';

type StatusFilter = 'all' | 'active' | 'coming-soon';
type CategoryFilter = ServiceCategory | 'all';

export default function ServicesContent() {
  const { t, lang } = useLang();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Counts per category and status (for filter chip badges)
  const counts = useMemo(() => {
    const cat: Record<string, number> = { all: services.length };
    const stat: Record<string, number> = { all: services.length, active: 0, 'coming-soon': 0 };
    for (const s of services) {
      cat[s.category] = (cat[s.category] ?? 0) + 1;
      stat[s.status] = (stat[s.status] ?? 0) + 1;
    }
    return { cat, stat };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;
      if (q.length === 0) return true;
      const hay = [
        pickLocalized(s.name, lang),
        pickLocalized(s.description, lang),
        ...pickLocalized(s.features, lang),
        s.id,
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, statusFilter, categoryFilter, lang]);

  // Group by category for display when "all" is selected, otherwise show flat grid
  const grouped: { key: ServiceCategory; items: typeof services }[] = useMemo(() => {
    if (categoryFilter !== 'all') {
      return [{ key: categoryFilter as ServiceCategory, items: filtered }];
    }
    const order: ServiceCategory[] = ['lab', 'learning', 'research', 'admin', 'community'];
    return order
      .map((k) => ({ key: k, items: filtered.filter((s) => s.category === k) }))
      .filter((g) => g.items.length > 0);
  }, [filtered, categoryFilter]);

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-max">
          <SectionTitle
            title={t('services.pageTitle')}
            subtitle={t('services.pageSubtitle')}
          />

          {/* Toolbar: search + status filter */}
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === 'vi' ? 'Tìm dịch vụ…' : lang === 'ja' ? 'サービス検索…' : 'Search services…'}
                className="w-full rounded-lg border border-white/10 bg-slate-900/60 py-2 pl-9 pr-9 text-sm text-white placeholder:text-slate-500 focus:border-sky-500/40 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500 hover:text-slate-300"
                  aria-label="clear"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="inline-flex rounded-lg border border-white/10 bg-slate-900/60 p-0.5 text-xs">
              {(['all', 'active', 'coming-soon'] as StatusFilter[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-md px-3 py-1.5 font-semibold transition ${
                    statusFilter === s
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s === 'all'
                    ? lang === 'vi' ? 'Tất cả' : lang === 'ja' ? 'すべて' : 'All'
                    : s === 'active'
                      ? t('label.active')
                      : t('label.comingSoon')}
                  <span className="ml-1 opacity-60">({counts.stat[s] ?? 0})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category chip row */}
          <div className="mb-8 flex flex-wrap gap-2">
            <CategoryChip
              active={categoryFilter === 'all'}
              onClick={() => setCategoryFilter('all')}
              label={lang === 'vi' ? 'Tất cả nhóm' : lang === 'ja' ? '全グループ' : 'All groups'}
              count={counts.cat.all}
              activeClass="bg-slate-200 text-slate-900 border-slate-200"
            />
            {(Object.keys(CATEGORY_META) as ServiceCategory[]).map((c) => (
              <CategoryChip
                key={c}
                active={categoryFilter === c}
                onClick={() => setCategoryFilter(c)}
                label={CATEGORY_META[c][lang]}
                count={counts.cat[c] ?? 0}
                activeClass={`${CATEGORY_META[c].chipActive} text-white`}
              />
            ))}
          </div>

          {/* Result counter */}
          <p className="mb-4 text-xs text-slate-500">
            {filtered.length === 0
              ? lang === 'vi' ? 'Không tìm thấy dịch vụ phù hợp.' : lang === 'ja' ? '該当するサービスがありません。' : 'No services found.'
              : lang === 'vi'
                ? `Hiển thị ${filtered.length} / ${services.length} dịch vụ`
                : lang === 'ja'
                  ? `${filtered.length} / ${services.length} 件を表示`
                  : `Showing ${filtered.length} / ${services.length} services`}
          </p>

          {/* Grouped grid */}
          <div className="space-y-10">
            {grouped.map((group) => {
              const meta = CATEGORY_META[group.key];
              return (
                <div key={group.key}>
                  {categoryFilter === 'all' && (
                    <div className="mb-3 flex items-center gap-2">
                      <span className={`h-1 w-8 rounded-full ${meta.bar}`} />
                      <h2 className={`text-sm font-bold uppercase tracking-wider ${meta.text}`}>
                        {meta[lang]}
                      </h2>
                      <span className="text-xs text-slate-500">({group.items.length})</span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {group.items.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        expanded={expandedId === service.id}
                        onToggleExpand={() =>
                          setExpandedId((id) => (id === service.id ? null : service.id))
                        }
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryChip({
  active, onClick, label, count, activeClass,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  activeClass: string;
}) {
  const base = active
    ? activeClass
    : 'bg-slate-900/40 text-slate-300 border-white/10 hover:border-white/20';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${base}`}
    >
      {label}
      <span className="rounded-full bg-black/20 px-1.5 py-0.5 text-[10px] font-mono">
        {count}
      </span>
    </button>
  );
}

function ServiceCard({
  service, expanded, onToggleExpand,
}: {
  service: typeof services[number];
  expanded: boolean;
  onToggleExpand: () => void;
}) {
  const { t, lang } = useLang();
  const Icon = getIcon(service.icon);
  const isActive = service.status === 'active';
  const meta = CATEGORY_META[service.category];
  const name = pickLocalized(service.name, lang);
  const description = pickLocalized(service.description, lang);
  const features = pickLocalized(service.features, lang);

  return (
    <div
      id={service.id}
      className={`scroll-mt-24 group relative flex flex-col rounded-xl border border-white/[0.06] bg-slate-800/40 p-4 transition-all ${meta.hoverBorder} ${
        !isActive ? 'opacity-70' : ''
      }`}
    >
      {/* Header row: icon + status corner */}
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 rounded-lg p-2 ${meta.bg} ring-1 ${meta.ring}`}>
          <Icon className={`h-5 w-5 ${meta.text}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold leading-tight text-white" title={name}>
            {name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5">
            {isActive ? (
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t('label.active')}
              </span>
            ) : (
              <span className="rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[10px] text-amber-400">
                {t('label.comingSoon')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description — clamped to 2 lines */}
      <p
        className="mt-3 text-xs leading-snug text-slate-400"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description}
      </p>

      {/* Expandable features */}
      {expanded && (
        <ul className="mt-3 space-y-1 border-t border-white/5 pt-3">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[11px] leading-snug text-slate-500">
              <span className={`mt-1 h-1 w-1 flex-shrink-0 rounded-full ${meta.bullet}`} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Action row */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onToggleExpand}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-300"
        >
          <ChevronDown className={`h-3 w-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          {expanded
            ? lang === 'vi' ? 'Thu gọn' : lang === 'ja' ? '閉じる' : 'Less'
            : lang === 'vi' ? 'Chi tiết' : lang === 'ja' ? '詳細' : 'Details'}
        </button>
        {isActive ? (
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 rounded-md ${meta.bg} px-2.5 py-1 text-[11px] font-semibold ${meta.text} ring-1 ${meta.ring} transition hover:brightness-125`}
          >
            {t('label.access')}
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <span className="text-[11px] text-slate-600">—</span>
        )}
      </div>
    </div>
  );
}
