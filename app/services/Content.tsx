'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, Search, X, ChevronDown } from 'lucide-react';

import {
  CATEGORY_META,
  JOURNEY_INTRO,
  JOURNEY_META,
  type JourneyStage,
  type ServiceCategory,
  services,
} from '@/data/services';
import SectionTitle from '@/components/shared/SectionTitle';
import { getIcon } from '@/lib/utils';
import { useLang } from '@/lib/i18n';
import { pickLocalized } from '@/lib/localized';

type StatusFilter = 'all' | 'active' | 'coming-soon';
type CategoryFilter = ServiceCategory | 'all';
type RoleFilter = 'all' | 'student' | 'faculty' | 'admin';
type ViewMode = 'journey' | 'category';

/** Màu accent riêng cho tiêu đề từng chặng hành trình (bar + text). */
const JOURNEY_ACCENT: Record<JourneyStage, { bar: string; text: string }> = {
  y1: { bar: 'bg-emerald-500', text: 'text-emerald-300' },
  y2: { bar: 'bg-sky-500', text: 'text-sky-300' },
  y3: { bar: 'bg-violet-500', text: 'text-violet-300' },
  final: { bar: 'bg-cyan-500', text: 'text-cyan-300' },
  all: { bar: 'bg-amber-500', text: 'text-amber-300' },
};

const JOURNEY_ORDER: JourneyStage[] = (Object.keys(JOURNEY_META) as JourneyStage[]).sort(
  (a, b) => JOURNEY_META[a].order - JOURNEY_META[b].order,
);

const ROLE_LABELS: Record<RoleFilter, { vi: string; en: string; ja: string }> = {
  all: { vi: 'Tất cả vai trò', en: 'All roles', ja: 'すべてのロール' },
  student: { vi: 'Sinh viên', en: 'Students', ja: '学生' },
  faculty: { vi: 'Giảng viên', en: 'Faculty', ja: '教員' },
  admin: { vi: 'Admin / CBQL', en: 'Admin / Staff', ja: '管理者・職員' },
};

const STUDENT_CATEGORIES = new Set<ServiceCategory>(['lab', 'learning', 'research', 'career', 'compete', 'community']);
const FACULTY_CATEGORIES = new Set<ServiceCategory>(['lab', 'research', 'career', 'admin', 'community']);
const ADMIN_CATEGORIES = new Set<ServiceCategory>(['lab', 'admin', 'career', 'community']);

function serviceMatchesRole(service: typeof services[number], role: RoleFilter) {
  if (role === 'all') return true;
  if (role === 'student') return STUDENT_CATEGORIES.has(service.category);
  if (role === 'faculty') return FACULTY_CATEGORIES.has(service.category);
  return ADMIN_CATEGORIES.has(service.category);
}

export default function ServicesContent() {
  const { t, lang } = useLang();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('journey');

  // Counts per category and status (for filter chip badges)
  const counts = useMemo(() => {
    const visibleForRole = services.filter((s) => serviceMatchesRole(s, roleFilter));
    const cat: Record<string, number> = { all: visibleForRole.length };
    const stat: Record<string, number> = { all: visibleForRole.length, active: 0, 'coming-soon': 0 };
    for (const s of visibleForRole) {
      cat[s.category] = (cat[s.category] ?? 0) + 1;
      if (s.status === 'active' || s.status === 'coming-soon') {
        stat[s.status] = (stat[s.status] ?? 0) + 1;
      }
    }
    return { cat, stat };
  }, [roleFilter]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      if (!serviceMatchesRole(s, roleFilter)) return false;
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
  }, [query, statusFilter, categoryFilter, roleFilter, lang]);

  // Group by category for display when "all" is selected, otherwise show flat grid
  const grouped: { key: ServiceCategory; items: typeof services }[] = useMemo(() => {
    if (categoryFilter !== 'all') {
      return [{ key: categoryFilter as ServiceCategory, items: filtered }];
    }
    const order: ServiceCategory[] = ['lab', 'learning', 'research', 'career', 'compete', 'community', 'admin'];
    return order
      .map((k) => ({ key: k, items: filtered.filter((s) => s.category === k) }))
      .filter((g) => g.items.length > 0);
  }, [filtered, categoryFilter]);

  // Chế độ Hành trình (N1): app active xếp theo 5 chặng (1 app có thể xuất hiện
  // ở nhiều chặng); app coming-soon gom về mục "Sắp ra mắt" cuối trang.
  const journeyGroups = useMemo(() => {
    const active = filtered.filter((s) => s.status === 'active');
    return JOURNEY_ORDER
      .map((stage) => ({ stage, items: active.filter((s) => s.journey.includes(stage)) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);
  const comingSoon = useMemo(() => filtered.filter((s) => s.status === 'coming-soon'), [filtered]);
  // DOM id (anchor #service-id) chỉ gắn ở lần xuất hiện đầu tiên của mỗi card.
  const anchorSeen = new Set<string>();

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-max">
          <SectionTitle
            title={t('services.pageTitle')}
            subtitle={t('services.pageSubtitle')}
          />

          {/* Role switcher: student / faculty / admin views */}
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {(Object.keys(ROLE_LABELS) as RoleFilter[]).map((role) => {
              const active = roleFilter === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setRoleFilter(role)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    active
                      ? 'border-amber-400 bg-amber-400 text-slate-950'
                      : 'border-white/10 bg-slate-900/50 text-slate-300 hover:border-amber-400/40 hover:text-amber-200'
                  }`}
                >
                  {ROLE_LABELS[role][lang]}
                </button>
              );
            })}
          </div>

          {/* View mode: journey (default) / category */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex rounded-lg border border-white/10 bg-slate-900/60 p-0.5 text-xs">
              {(['journey', 'category'] as ViewMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setViewMode(m)}
                  className={`rounded-md px-4 py-1.5 font-semibold transition ${
                    viewMode === m ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m === 'journey'
                    ? lang === 'vi' ? '🗺 Hành trình 4 năm' : lang === 'ja' ? '🗺 4年間の歩み' : '🗺 4-year journey'
                    : lang === 'vi' ? 'Theo nhóm' : lang === 'ja' ? 'グループ別' : 'By group'}
                </button>
              ))}
            </div>
          </div>

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
                ? `Hiển thị ${filtered.length} / ${counts.cat.all} dịch vụ`
                : lang === 'ja'
                  ? `${filtered.length} / ${counts.cat.all} 件を表示`
                  : `Showing ${filtered.length} / ${counts.cat.all} services`}
          </p>

          {/* Journey view (default) — 5 chặng hành trình + mục Sắp ra mắt */}
          {viewMode === 'journey' ? (
            <div className="space-y-12">
              {journeyGroups.map((group) => {
                const jm = JOURNEY_META[group.stage];
                const accent = JOURNEY_ACCENT[group.stage];
                return (
                  <div key={group.stage}>
                    <div className="mb-1 flex items-center gap-2">
                      <span className={`h-1.5 w-10 rounded-full ${accent.bar}`} />
                      <h2 className={`text-base font-bold tracking-wide ${accent.text}`}>
                        {jm[lang]}
                      </h2>
                      <span className="text-xs text-slate-500">({group.items.length})</span>
                    </div>
                    <p className="mb-4 ml-12 text-sm italic text-slate-400">
                      {JOURNEY_INTRO[group.stage][lang]}
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {group.items.map((service) => {
                        const first = !anchorSeen.has(service.id);
                        anchorSeen.add(service.id);
                        return (
                          <ServiceCard
                            key={`${group.stage}-${service.id}`}
                            service={service}
                            anchorId={first ? service.id : undefined}
                            expanded={expandedId === service.id}
                            onToggleExpand={() =>
                              setExpandedId((id) => (id === service.id ? null : service.id))
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {comingSoon.length > 0 && statusFilter !== 'active' && (
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="h-1.5 w-10 rounded-full bg-slate-600" />
                    <h2 className="text-base font-bold tracking-wide text-slate-400">
                      {lang === 'vi' ? 'Sắp ra mắt & sắp trở lại' : lang === 'ja' ? '近日公開・再開予定' : 'Coming soon & returning'}
                    </h2>
                    <span className="text-xs text-slate-500">({comingSoon.length})</span>
                  </div>
                  <p className="mb-4 ml-12 text-sm italic text-slate-500">
                    {lang === 'vi'
                      ? 'Những dịch vụ đang ấp ủ — sẽ mở khi có đúng người vận hành và đúng thời điểm.'
                      : lang === 'ja'
                        ? '準備中のサービス — 適切な運営体制とタイミングが整い次第公開します。'
                        : 'Services in the making — opening when the right operators and timing are in place.'}
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {comingSoon.map((service) => (
                      <ServiceCard
                        key={`soon-${service.id}`}
                        service={service}
                        anchorId={service.id}
                        expanded={expandedId === service.id}
                        onToggleExpand={() =>
                          setExpandedId((id) => (id === service.id ? null : service.id))
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
          /* Category view (legacy) */
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
                        anchorId={service.id}
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
          )}
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
  service, expanded, onToggleExpand, anchorId,
}: {
  service: typeof services[number];
  expanded: boolean;
  onToggleExpand: () => void;
  /** DOM id cho anchor #id — chỉ gắn ở lần render đầu (journey view có thể lặp card). */
  anchorId?: string;
}) {
  const { t, lang } = useLang();
  const Icon = getIcon(service.icon);
  const isActive = service.status === 'active';
  const meta = CATEGORY_META[service.category];
  // Per-card accent overrides category visuals when present (e.g. λ Lab, Δ Lab flagship cards).
  const accent = service.accent;
  const iconBg = accent?.bg ?? meta.bg;
  const iconRing = accent?.ring ?? meta.ring;
  const iconText = accent?.text ?? meta.text;
  const hoverBorder = accent?.hoverBorder ?? meta.hoverBorder;
  const bullet = accent?.bullet ?? meta.bullet;
  const titleClass = accent?.titleClass ?? 'text-white';
  const name = pickLocalized(service.name, lang);
  const description = pickLocalized(service.description, lang);
  const features = pickLocalized(service.features, lang);

  return (
    <div
      id={anchorId}
      className={`scroll-mt-24 group relative flex flex-col rounded-xl border border-white/[0.06] bg-slate-800/40 p-4 transition-all ${hoverBorder} ${
        !isActive ? 'opacity-70' : ''
      }`}
    >
      {/* Header row: icon + status corner */}
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 rounded-lg p-2 ${iconBg} ring-1 ${iconRing}`}>
          <Icon className={`h-5 w-5 ${iconText}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`truncate text-sm font-bold leading-tight ${titleClass}`} title={name}>
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
              <span className={`mt-1 h-1 w-1 flex-shrink-0 rounded-full ${bullet}`} />
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
            className={`inline-flex items-center gap-1 rounded-md ${iconBg} px-2.5 py-1 text-[11px] font-semibold ${iconText} ring-1 ${iconRing} transition hover:brightness-125`}
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
