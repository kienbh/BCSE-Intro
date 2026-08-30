'use client';

import { useState } from 'react';
import {
  researchAreas, publications, blogPosts, nckhProjects,
  pubFilterTabs, blogFilterTabs,
  lambdaLab, allLabs,
} from '@/data/research';
import SectionTitle from '@/components/shared/SectionTitle';
import ResearchInfographic from '@/components/ui/ResearchInfographic';
import { ExternalLink, Users, Pin, ArrowUpRight } from 'lucide-react';
import { useLang } from '@/lib/i18n';

type ResearchLang = 'vi' | 'en' | 'ja';

const UI_COPY = {
  vi: {
    labsEyebrow: 'Research Labs — 3 phòng lab đang hoạt động',
    active: 'Active',
    access: 'Truy cập',
    areasEyebrow: 'Hướng nghiên cứu chính — λ Lambda Lab',
    keywords: 'Từ khóa',
    noDoi: 'Chưa có DOI',
  },
  en: {
    labsEyebrow: 'Research Labs — 3 active laboratories',
    active: 'Active',
    access: 'Visit',
    areasEyebrow: 'Main research directions — λ Lambda Lab',
    keywords: 'Keywords',
    noDoi: 'No DOI',
  },
  ja: {
    labsEyebrow: '研究ラボ — 3 つの稼働中ラボ',
    active: 'Active',
    access: 'アクセス',
    areasEyebrow: '主な研究分野 — λ Lambda Lab',
    keywords: 'キーワード',
    noDoi: 'DOI なし',
  },
} as const;

const EYEBROWS = {
  vi: {
    page: 'NGHIÊN CỨU · 研究',
    pubs: 'CÔNG BỐ KHOA HỌC',
    blog: 'TIN TỨC LAB',
    projects: 'NCKH SINH VIÊN',
  },
  en: {
    page: 'RESEARCH · 研究',
    pubs: 'PUBLICATIONS',
    blog: 'LAB NEWS',
    projects: 'STUDENT RESEARCH',
  },
  ja: {
    page: '研究 · RESEARCH',
    pubs: '研究業績',
    blog: 'ラボニュース',
    projects: '学生研究',
  },
} as const;

const LAB_COPY = {
  'Lambda Lab': {
    en: 'A place where interdisciplinary ideas connect, overlap, and turn into research prototypes.',
    ja: '分野横断のアイデアがつながり、重なり合い、研究プロトタイプへ発展する場です。',
  },
  'Demeter Lab': {
    en: 'Smart agriculture, food quality, agri-robotics, and environmental sensing powered by AI.',
    ja: 'AI を活用したスマート農業、食品品質、農業ロボティクス、環境センシングの研究室です。',
  },
  'Hygieia Lab': {
    en: 'Health technology, wellbeing monitoring, and biosignal analytics for human-centered systems.',
    ja: '人間中心システムに向けた医療技術、ウェルビーイング計測、生体信号解析の研究室です。',
  },
} as const;

const AREA_COPY = {
  'cv-robotics': {
    en: {
      name: 'Computer Vision, Robotics & Multimodal AI',
      description: 'YOLO, vision-language-action models, humanoid robots, and interdisciplinary applications in smart agriculture.',
      topics: ['Laser weeding robot', 'Fish behavior detection', 'Durian maturity measurement', 'Humanoid Robot (GR00T N1)', 'Multimodal sensory AI'],
    },
    ja: {
      name: 'コンピュータビジョン・ロボティクス・マルチモーダル AI',
      description: 'YOLO、VLA モデル、ヒューマノイドロボット、スマート農業への学際応用。',
      topics: ['レーザー除草ロボット', '魚行動検出', 'ドリアン成熟度測定', 'ヒューマノイドロボット (GR00T N1)', 'マルチモーダル感覚 AI'],
    },
  },
  'eeg-signal': {
    en: {
      name: 'EEG Signal Processing & Brain-Computer Interface',
      description: 'EEG signal processing, mobile EEG devices, brain-computer interfaces, and brain activity analysis.',
      topics: ['EEG signal denoising', 'Source localization', 'Mobile EEG devices', 'Brain activity during language learning'],
    },
    ja: {
      name: 'EEG 信号処理・ブレインコンピュータインターフェース',
      description: 'EEG 信号処理、モバイル EEG デバイス、BCI、脳活動解析。',
      topics: ['EEG ノイズ除去', '信号源推定', 'モバイル EEG デバイス', '語学学習中の脳活動'],
    },
  },
  'sensory-ai': {
    en: {
      name: 'Multimodal Sensory AI',
      description: 'Combining EEG, ECG, computer vision, speech, and LLMs for automated coffee sensory evaluation.',
      topics: ['Coffee taste evaluation', 'Video + Audio + EEG fusion', 'WhisperX, DeepFace, ViT', 'PhoBERT, GPT-4, Claude fusion'],
    },
    ja: {
      name: 'マルチモーダル感覚 AI',
      description: 'EEG、ECG、CV、音声、LLM を組み合わせたコーヒー官能評価の自動化。',
      topics: ['コーヒー味覚評価', '映像 + 音声 + EEG 融合', 'WhisperX, DeepFace, ViT', 'PhoBERT, GPT-4, Claude 融合'],
    },
  },
  'cloud-microservices': {
    en: {
      name: 'Cloud Computing & Microservices',
      description: 'Cloud-native microservice architecture, AI model optimization, and LLMOps.',
      topics: ['Microservices on Cloud', 'AI Model Optimization', 'LLMOps'],
    },
    ja: {
      name: 'クラウドコンピューティング・マイクロサービス',
      description: 'クラウドネイティブなマイクロサービス、AI モデル最適化、LLMOps。',
      topics: ['クラウド上のマイクロサービス', 'AI モデル最適化', 'LLMOps'],
    },
  },
  'ai-education': {
    en: {
      name: 'AI in Education & E-Learning',
      description: 'AI-powered e-learning, learning analytics, AR/VR training, and interactive lessons.',
      topics: ['Cheating detection', 'AI interactive lessons', 'VR Campus Tour', 'Timetable scheduling'],
    },
    ja: {
      name: '教育・E ラーニングにおける AI',
      description: 'AI 活用型 E ラーニング、学習分析、AR/VR 教育、インタラクティブ教材。',
      topics: ['不正検出', 'AI インタラクティブ教材', 'VR キャンパスツアー', '時間割最適化'],
    },
  },
  'ic-embedded': {
    en: {
      name: 'IC Design & Embedded Systems',
      description: 'SoC design, FPGA, embedded systems, and IoT applications.',
      topics: ['SoC Design', 'FPGA Development', 'Embedded IoT', 'Xilinx Kria KV260'],
    },
    ja: {
      name: 'IC 設計・組込みシステム',
      description: 'SoC 設計、FPGA、組込みシステム、IoT アプリケーション。',
      topics: ['SoC 設計', 'FPGA 開発', '組込み IoT', 'Xilinx Kria KV260'],
    },
  },
} as const;

const BLOG_COPY = {
  b05: {
    en: {
      title: 'SPISE 6/2026 sensory conference: 4 research directions',
      summary: 'The lab is preparing four research directions for the international SPISE sensory conference in June 2026: wireless sensory devices, micro-expression detection, EEG taste classification, and EEG olfactory discrimination.',
    },
    ja: {
      title: 'SPISE 2026 年 6 月官能評価会議: 4 つの研究方向',
      summary: '2026 年 6 月の国際 SPISE 官能評価会議に向け、ワイヤレス官能デバイス、微表情検出、EEG 味覚分類、EEG 嗅覚識別の 4 方向を準備しています。',
    },
  },
  b01: {
    en: {
      title: 'Student research: Delta X robot removing burnt coffee beans',
      summary: 'A Delta X robot integrates camera and deep learning to automatically detect and remove burnt coffee beans.',
    },
    ja: {
      title: '学生研究: 焦げたコーヒー豆を除去する Delta X ロボット',
      summary: 'Delta X ロボットがカメラと深層学習を統合し、焦げたコーヒー豆を自動検出・除去します。',
    },
  },
  b02: {
    en: {
      title: 'Student research: 3D-printed 6-DOF robot arm',
      summary: 'Design, 3D printing, and servo control for a six-degree-of-freedom robotic arm.',
    },
    ja: {
      title: '学生研究: 3D プリント 6 自由度ロボットアーム',
      summary: '6 自由度ロボットアームの設計、3D プリント、サーボ制御。',
    },
  },
  b03: {
    en: {
      title: 'Student research: Drone and soft robot prototype',
      summary: 'A prototype combining UAV drone and soft robotics for sampling in complex environments.',
    },
    ja: {
      title: '学生研究: ドローン・ソフトロボット試作',
      summary: '複雑環境でのサンプリングに向け、UAV ドローンとソフトロボティクスを組み合わせた試作。',
    },
  },
  b04: {
    en: {
      title: 'Student research: Coffee aroma discrimination using EEG',
      summary: 'Collecting and analyzing EEG signals while participants smell different coffees, using deep learning to classify olfactory features.',
    },
    ja: {
      title: '学生研究: EEG によるコーヒー香り識別',
      summary: '異なるコーヒーの香りを嗅ぐ際の EEG を収集・解析し、深層学習で嗅覚特徴を分類します。',
    },
  },
} as const;

const PROJECT_COPY = {
  n1: {
    en: {
      title: 'Delta X robot removing burnt coffee beans',
      summary: 'Delta robot + computer vision + deep learning to detect and remove defective coffee beans on a production line.',
    },
    ja: {
      title: '焦げたコーヒー豆を除去する Delta X ロボット',
      summary: 'Delta ロボット、コンピュータビジョン、深層学習を組み合わせ、生産ライン上の欠陥豆を検出・除去します。',
    },
  },
  n2: {
    en: {
      title: '3D-printed 6-DOF robot arm',
      summary: 'CAD design, 3D printing, and servo control for a six-degree-of-freedom robotic arm.',
    },
    ja: {
      title: '3D プリント 6 自由度ロボットアーム',
      summary: '6 自由度ロボットアームの CAD 設計、3D プリント、サーボ制御。',
    },
  },
  n3: {
    en: {
      title: 'Drone and soft robot prototype',
      summary: 'Combining UAVs with soft robotics for sampling and manipulation in complex environments.',
    },
    ja: {
      title: 'ドローン・ソフトロボット試作',
      summary: '複雑環境でのサンプリングや操作に向け、UAV とソフトロボティクスを組み合わせます。',
    },
  },
  n4: {
    en: {
      title: 'Coffee aroma discrimination using EEG',
      summary: 'Using EEG and deep learning to classify olfactory features across different coffee types.',
    },
    ja: {
      title: 'EEG によるコーヒー香り識別',
      summary: 'EEG と深層学習を用いて、異なるコーヒーの嗅覚特徴を分類します。',
    },
  },
  n5: {
    en: {
      title: 'Wireless sensory data collection device',
      summary: 'A wireless device for remote sensory-data collection in coffee evaluation experiments.',
    },
    ja: {
      title: 'ワイヤレス官能データ収集デバイス',
      summary: 'コーヒー評価実験における遠隔官能データ収集のためのワイヤレスデバイス。',
    },
  },
  n6: {
    en: {
      title: 'Micro-expression detection during coffee tasting',
      summary: 'Computer vision for detecting micro-expressions during coffee tasting sessions.',
    },
    ja: {
      title: 'コーヒーテイスティング中の微表情検出',
      summary: 'コーヒーテイスティング中の微表情を検出するコンピュータビジョン研究。',
    },
  },
  n7: {
    en: {
      title: 'EEG classification of four basic tastes',
      summary: 'Analyzing EEG signals to classify sour, spicy, salty, and sweet taste responses.',
    },
    ja: {
      title: 'EEG による 4 基本味の分類',
      summary: 'EEG 信号を解析し、酸味・辛味・塩味・甘味の反応を分類します。',
    },
  },
} as const;

const LAB_COLORS = {
  indigo: {
    bg: 'bg-gradient-to-br from-indigo-600/10 to-violet-600/10',
    border: 'border-indigo-500/25 hover:border-indigo-500/45',
    letter: 'text-indigo-300',
    letterBg: 'bg-indigo-500/15',
    pill: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/25',
    dot: 'bg-indigo-400',
    icon: 'text-indigo-400',
  },
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-600/10 to-teal-600/10',
    border: 'border-emerald-500/25 hover:border-emerald-500/45',
    letter: 'text-emerald-300',
    letterBg: 'bg-emerald-500/15',
    pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    dot: 'bg-emerald-400',
    icon: 'text-emerald-400',
  },
  rose: {
    bg: 'bg-gradient-to-br from-rose-600/10 to-pink-600/10',
    border: 'border-rose-500/25 hover:border-rose-500/45',
    letter: 'text-rose-300',
    letterBg: 'bg-rose-500/15',
    pill: 'bg-rose-500/10 text-rose-300 border-rose-500/25',
    dot: 'bg-rose-400',
    icon: 'text-rose-400',
  },
} as const;

export default function ResearchPage() {
  const [pubTab, setPubTab] = useState<string>('all');
  const [blogTab, setBlogTab] = useState<string>('all');
  const { t, lang } = useLang();
  const copy = UI_COPY[lang as ResearchLang];
  const eyebrows = EYEBROWS[lang as ResearchLang];

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

      {/* Research directions + Labs */}
      <section className="section-padding">
        <div className="container-max">
          <SectionTitle
            title={t('research.pageTitle')}
            subtitle={t('research.subtitle')}
            eyebrow={eyebrows.page}
          />

          {/* 3-Lab Grid */}
          <div className="mb-14">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-5 mb-4 text-center">
              {copy.labsEyebrow}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allLabs.map((lab) => {
                const c = LAB_COLORS[lab.color];
                return (
                  <a
                    key={lab.name}
                    href={lab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`research-lab-card group flex flex-col p-6 rounded-2xl border transition-all duration-300 ${c.bg} ${c.border}`}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${c.letterBg}`}>
                        <span className={`font-display text-2xl font-bold leading-none ${c.letter}`}>{lab.letter}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-ink leading-tight">
                          {lab.name}
                        </h3>
                        <p className="text-xs text-ink-5 mt-0.5">{lab.fullName}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${c.dot}`} />
                          <span className="text-[10px] font-mono text-ink-5 uppercase tracking-wide">{copy.active}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs text-ink-4 leading-relaxed mb-4 flex-1">
                      {lang === 'vi' ? lab.tagline : LAB_COPY[lab.fullName as keyof typeof LAB_COPY]?.[lang as 'en' | 'ja'] ?? lab.tagline}
                    </p>

                    {/* Focus tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {lab.focus.map((f) => (
                        <span key={f} className={`text-[10px] px-2 py-0.5 rounded-full border ${c.pill}`}>{f}</span>
                      ))}
                    </div>

                    {/* Hover link */}
                    <div className={`flex items-center gap-1 text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 ${c.icon}`}>
                      <span>{copy.access} {lab.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Research Areas */}
          <div className="mb-2">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-5 mb-4">
              {copy.areasEyebrow}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {researchAreas.map((area) => {
              const areaCopy = lang === 'vi' ? null : AREA_COPY[area.id as keyof typeof AREA_COPY]?.[lang as 'en' | 'ja'];
              const areaName = areaCopy?.name ?? area.name;
              const areaDescription = areaCopy?.description ?? area.description;
              const areaTopics = areaCopy?.topics ?? area.topics;
              return (
              <div key={area.id} className="research-card p-5 rounded-2xl bg-surface-2/40 border border-line/[0.06] hover:border-indigo-500/20 transition-colors">
                <ResearchInfographic
                  icon={area.icon}
                  color={area.color}
                  pattern={area.pattern}
                  topicCount={area.topics.length}
                  className="research-visual w-full h-32 rounded-xl mb-4"
                />
                <h3 className="text-sm font-bold text-ink mb-1">{areaName}</h3>
                <p className="text-xs text-sky-400 mb-2">{area.supervisors.join(', ')}</p>
                <p className="text-xs text-ink-5 mb-3 leading-relaxed">{areaDescription}</p>
                <div className="flex flex-wrap gap-1">
                  {areaTopics.map((topic) => (
                    <span key={topic} className="text-[10px] px-2 py-0.5 rounded-full bg-fill/5 text-ink-4">{topic}</span>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="section-padding bg-surface/50">
        <div className="container-max">
          <SectionTitle
            title={t('research.pubs')}
            subtitle={t('research.pubsSubtitle')}
            eyebrow={eyebrows.pubs}
          />

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {pubFilterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setPubTab(tab.key)}
                className={`px-4 py-1.5 text-xs rounded-full transition-all ${
                  pubTab === tab.key
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-ink-5 hover:text-ink-3 border border-line/5 hover:border-line/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredPubs.map((pub) => (
              <div key={pub.id} className="grid grid-cols-[60px_1fr_auto] gap-4 items-start p-5 rounded-xl bg-fill/[0.02] border border-line/[0.04] hover:border-line/10 transition-colors">
                <div className="text-lg font-mono font-bold text-sky-400">{pub.year}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${pub.type === 'journal' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'}`}>
                      {pub.type}
                    </span>
                    {pub.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded font-mono uppercase bg-fill/5 text-ink-5 border border-line/10">{tag}</span>
                    ))}
                  </div>
                  <p className="text-sm text-ink font-medium mb-1">{pub.title}</p>
                  <p className="text-xs text-ink-5">{pub.authors}</p>
                  <p className="text-xs text-sky-500 mt-0.5">{pub.venue}</p>
                  {pub.keywords && <p className="text-[11px] text-ink-6 mt-1">{copy.keywords}: {pub.keywords}</p>}
                </div>
                <div>
                  {pub.doi ? (
                    <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 whitespace-nowrap">
                      DOI <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-ink-7">{copy.noDoi}</span>
                  )}
                </div>
              </div>
            ))}
            {filteredPubs.length === 0 && (
              <p className="text-center text-sm text-ink-5 py-10">{t('research.noResults')}</p>
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
          <SectionTitle
            title={t('research.blog')}
            subtitle={t('research.blogSubtitle')}
            eyebrow={eyebrows.blog}
          />

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {blogFilterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setBlogTab(tab.key)}
                className={`px-4 py-1.5 text-xs rounded-full transition-all ${
                  blogTab === tab.key
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-ink-5 hover:text-ink-3 border border-line/5 hover:border-line/15'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBlogs.map((b) => {
              const bCopy = lang === 'vi' ? null : BLOG_COPY[b.id as keyof typeof BLOG_COPY]?.[lang as 'en' | 'ja'];
              return (
              <div
                key={b.id}
                className={`p-6 rounded-2xl border transition-colors ${b.pinned ? 'md:col-span-2 bg-amber-500/[0.04] border-amber-500/20' : 'bg-surface-2/40 border-line/[0.06] hover:border-line/15'}`}
              >
                {b.pinned && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-amber-400 mb-2">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
                <p className="text-xs text-ink-5 mb-2">{b.date} · {b.author}</p>
                <h3 className="text-base font-bold text-ink mb-2">{bCopy?.title ?? b.title}</h3>
                <p className="text-sm text-ink-4 mb-3 leading-relaxed">{bCopy?.summary ?? b.summary}</p>
                <div className="flex flex-wrap gap-1">
                  {b.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-fill/5 text-ink-4 border border-line/10">{tag}</span>
                  ))}
                </div>
              </div>
              );
            })}
            {filteredBlogs.length === 0 && (
              <p className="col-span-full text-center text-sm text-ink-5 py-10">{t('research.noPosts')}</p>
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
      <section className="section-padding bg-surface/50">
        <div className="container-max">
          <SectionTitle
            title={t('research.sProjects')}
            subtitle={t('research.sProjectsSubtitle')}
            eyebrow={eyebrows.projects}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nckhProjects.map((p) => {
              const pCopy = lang === 'vi' ? null : PROJECT_COPY[p.id as keyof typeof PROJECT_COPY]?.[lang as 'en' | 'ja'];
              return (
              <div key={p.id} className="p-5 rounded-2xl bg-surface-2/40 border border-line/[0.06] hover:border-line/15 transition-colors">
                <div className="flex items-start gap-2 mb-3">
                  <Users className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-bold text-ink">{pCopy?.title ?? p.title}</h3>
                </div>
                <p className="text-xs text-ink-3 mb-1"><span className="text-ink-5">{t('research.studentsLabel')}:</span> {p.students}</p>
                <p className="text-xs text-ink-3 mb-3"><span className="text-ink-5">{t('research.supervisorLabel')}:</span> {p.supervisors}</p>
                <p className="text-xs text-ink-4 leading-relaxed mb-3">{pCopy?.summary ?? p.summary}</p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-fill/5 text-ink-4 border border-line/10">{tag}</span>
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

