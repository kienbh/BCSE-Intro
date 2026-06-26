import type { Localized } from '@/lib/localized';

export type ServiceCategory = 'lab' | 'learning' | 'admin' | 'research' | 'career' | 'community' | 'compete';

/** Optional per-card accent — overrides CATEGORY_META visuals. */
export interface ServiceAccent {
  bg: string;          // icon container background tint
  ring: string;        // icon container ring
  text: string;        // icon color
  bar: string;         // (optional use) section bar
  hoverBorder: string; // card hover border
  bullet: string;      // feature bullet color
  titleClass?: string; // optional title text-color override (default white)
}

export interface ServiceItem {
  id: string;
  name: Localized<string>;
  description: Localized<string>;
  features: Localized<string[]>;
  url: string;
  icon: string;
  status: 'active' | 'coming-soon' | 'internal';
  category: ServiceCategory;
  /** Per-card accent override (e.g. for flagship lab cards). */
  accent?: ServiceAccent;
}

type CategoryMeta = {
  vi: string;
  en: string;
  ja: string;
  /** Soft icon background (10% alpha) */
  bg: string;
  /** Icon ring */
  ring: string;
  /** Title / icon text color */
  text: string;
  /** Solid bar accent (100% color, used for category section divider) */
  bar: string;
  /** Card hover border */
  hoverBorder: string;
  /** Chip when active (filter selected) */
  chipActive: string;
  /** Feature bullet (60% alpha) */
  bullet: string;
};

export const CATEGORY_META: Record<ServiceCategory, CategoryMeta> = {
  lab: {
    vi: 'Phòng Lab & Thiết bị', en: 'Lab & Hardware', ja: 'ラボ・機材',
    bg: 'bg-sky-500/10', ring: 'ring-sky-500/30', text: 'text-sky-300',
    bar: 'bg-sky-500', hoverBorder: 'hover:border-sky-500/40',
    chipActive: 'bg-sky-500 border-sky-500', bullet: 'bg-sky-500/60',
  },
  learning: {
    vi: 'Học tập & AI', en: 'Learning & AI', ja: '学習・AI',
    bg: 'bg-emerald-500/10', ring: 'ring-emerald-500/30', text: 'text-emerald-300',
    bar: 'bg-emerald-500', hoverBorder: 'hover:border-emerald-500/40',
    chipActive: 'bg-emerald-500 border-emerald-500', bullet: 'bg-emerald-500/60',
  },
  admin: {
    vi: 'Hành chính & Quản lý', en: 'Admin & Operations', ja: '行政・運営',
    bg: 'bg-amber-500/10', ring: 'ring-amber-500/30', text: 'text-amber-300',
    bar: 'bg-amber-500', hoverBorder: 'hover:border-amber-500/40',
    chipActive: 'bg-amber-500 border-amber-500', bullet: 'bg-amber-500/60',
  },
  research: {
    vi: 'Nghiên cứu', en: 'Research', ja: '研究',
    bg: 'bg-violet-500/10', ring: 'ring-violet-500/30', text: 'text-violet-300',
    bar: 'bg-violet-500', hoverBorder: 'hover:border-violet-500/40',
    chipActive: 'bg-violet-500 border-violet-500', bullet: 'bg-violet-500/60',
  },
  career: {
    vi: 'Thực tập / Khóa luận & Nghề nghiệp', en: 'Internship, Thesis & Career', ja: 'インターン・卒論・キャリア',
    bg: 'bg-cyan-500/10', ring: 'ring-cyan-500/30', text: 'text-cyan-300',
    bar: 'bg-cyan-500', hoverBorder: 'hover:border-cyan-500/40',
    chipActive: 'bg-cyan-500 border-cyan-500', bullet: 'bg-cyan-500/60',
  },
  community: {
    vi: 'Cộng đồng & Sức khỏe', en: 'Community & Wellbeing', ja: 'コミュニティ・ウェルビーイング',
    bg: 'bg-rose-500/10', ring: 'ring-rose-500/30', text: 'text-rose-300',
    bar: 'bg-rose-500', hoverBorder: 'hover:border-rose-500/40',
    chipActive: 'bg-rose-500 border-rose-500', bullet: 'bg-rose-500/60',
  },
  compete: {
    vi: 'Thử thách & Cuộc thi', en: 'Challenges & Competitions', ja: 'チャレンジ・コンテスト',
    bg: 'bg-orange-500/10', ring: 'ring-orange-500/30', text: 'text-orange-300',
    bar: 'bg-orange-500', hoverBorder: 'hover:border-orange-500/40',
    chipActive: 'bg-orange-500 border-orange-500', bullet: 'bg-orange-500/60',
  },
};

export const services: ServiceItem[] = [
  {
    id: 'lab-booking',
    name: {
      vi: 'Đặt lịch phòng Lab & In 3D',
      en: 'Lab & 3D Print Booking',
      ja: 'ラボ・3D プリンタ予約',
    },
    description: {
      vi: 'Đặt lịch sử dụng máy in 3D, máy cắt laser. Theo dõi trạng thái job, quản lý vật liệu in.',
      en: 'Book 3D printers and laser cutters. Track job status and manage printing materials.',
      ja: '3D プリンタやレーザーカッターを予約。ジョブ進行状況の確認と材料管理が可能です。',
    },
    features: {
      vi: ['Booking wizard 5 bước', 'Xem trước file 3D (STL/3MF)', 'Theo dõi trạng thái realtime', 'Miễn phí cho sinh viên BCSE'],
      en: ['5-step booking wizard', '3D file preview (STL/3MF)', 'Real-time job status', 'Free for BCSE students'],
      ja: ['5 ステップの予約ウィザード', '3D ファイルプレビュー (STL/3MF)', 'リアルタイム進行状況', 'BCSE 学生は無料'],
    },
    url: 'https://sv10.bcse-vju.com',
    icon: 'Printer',
    status: 'active',
    category: 'lab',
  },
  {
    id: 'hardware-lab-portal',
    name: {
      vi: 'VJU Hardware Lab — FPGA · Jetson · RPi',
      en: 'VJU Hardware Lab — FPGA · Jetson · RPi',
      ja: 'VJU ハードウェアラボ — FPGA・Jetson・RPi',
    },
    description: {
      vi: 'Đặt lịch và sử dụng từ xa các bộ kit phần cứng tại lab Hòa Lạc qua trình duyệt — không cần VPN.',
      en: 'Book and remotely use FPGA / Jetson / RPi kits at the Hòa Lạc lab via your browser — no VPN required.',
      ja: 'Hòa Lạc ラボの FPGA・Jetson・RPi キットを、VPN 不要でブラウザから予約・遠隔利用。',
    },
    features: {
      vi: [
        'Đăng nhập 1 lần qua BCSE Identity (SSO)',
        'FPGA Kria KV260 · Jetson Orin · Raspberry Pi 5',
        'Phân quyền theo lớp + special access cho khóa luận',
        'Web terminal SSH ngay trên trình duyệt',
        'Smart-plug power-cycle khi kit treo',
      ],
      en: [
        'Single sign-on via BCSE Identity',
        'FPGA Kria KV260 · Jetson Orin · Raspberry Pi 5',
        'Class-based access + special access for thesis',
        'Browser-based SSH terminal',
        'Smart-plug power-cycle when a kit hangs',
      ],
      ja: [
        'BCSE Identity で 1 度の SSO ログイン',
        'FPGA Kria KV260・Jetson Orin・Raspberry Pi 5',
        'クラス単位の権限付与 + 卒研向け特別アクセス',
        'ブラウザ上の SSH ターミナル',
        'スマートプラグによる電源リセット',
      ],
    },
    url: 'https://sv14.bcse-vju.com',
    icon: 'Cpu',
    status: 'active',
    category: 'lab',
  },
  {
    id: 'ai-advisor',
    name: {
      vi: 'Tư vấn AI — BCSE Advisor',
      en: 'BCSE Advisor — AI Tutor',
      ja: 'BCSE アドバイザー — 学習 AI',
    },
    description: {
      vi: 'Chatbot AI tư vấn học vụ, lộ trình học tập. RAG với knowledge base nội bộ.',
      en: 'AI chatbot for academic guidance and learning roadmaps, powered by retrieval over our internal knowledge base.',
      ja: '学業相談と学習ロードマップを支援する AI チャットボット。内部ナレッジベースを RAG で活用。',
    },
    features: {
      vi: ['Chatbot AI tiếng Việt', 'RAG tài liệu chương trình', 'Lộ trình cá nhân hóa', 'Thư viện tài liệu'],
      en: ['Vietnamese AI chatbot', 'RAG over program documents', 'Personalised learning paths', 'Document library'],
      ja: ['ベトナム語 AI チャット', 'プログラム資料の RAG 検索', '個別学習ロードマップ', '資料ライブラリ'],
    },
    url: 'https://sv02.bcse-vju.com',
    icon: 'Bot',
    status: 'active',
    category: 'learning',
  },
  {
    id: 'lambda-lab',
    name: {
      vi: 'λ Lab — Lambda Lab · AIoT',
      en: 'λ Lab — Lambda Lab · AIoT',
      ja: 'λ Lab — Lambda Lab · AIoT',
    },
    description: {
      vi: 'Cổng thông tin nghiên cứu khoa học BCSE. Đề tài, publications, cơ hội tham gia NCKH.',
      en: 'BCSE research portal. Projects, publications, and opportunities to join student research.',
      ja: 'BCSE の研究ポータル。研究テーマ、論文、学生研究 (NCKH) への参加機会を提供。',
    },
    features: {
      vi: ['Nhóm nghiên cứu & đề tài', 'Publications', 'Đăng ký NCKH', 'Tài liệu & datasets'],
      en: ['Research groups & projects', 'Publications', 'Apply for student research', 'Documents & datasets'],
      ja: ['研究グループ・テーマ', '論文', '学生研究の応募', '資料・データセット'],
    },
    url: 'https://sv03.bcse-vju.com',
    icon: 'FlaskConical',
    status: 'active',
    category: 'research',
    // λ Lab flagship accent — tím than (dark purple) supporting; title giữ trắng
    accent: {
      bg: 'bg-violet-900/30',
      ring: 'ring-violet-700/45',
      text: 'text-violet-300',
      bar: 'bg-violet-700',
      hoverBorder: 'hover:border-violet-600/55',
      bullet: 'bg-violet-400/70',
    },
  },
  {
    id: 'e-service',
    name: {
      vi: 'Dịch vụ hành chính số',
      en: 'Digital Administrative Services',
      ja: 'デジタル行政サービス',
    },
    description: {
      vi: 'Cổng nộp hồ sơ, đơn từ trực tuyến. AI sơ duyệt hồ sơ, theo dõi tiến trình.',
      en: 'Online portal for submitting applications and forms, with AI pre-screening and progress tracking.',
      ja: '申請書類のオンライン提出ポータル。AI による事前審査と進捗追跡を提供します。',
    },
    features: {
      vi: ['Nộp hồ sơ online', 'AI sơ duyệt', 'Theo dõi tiến trình', 'Thông báo email'],
      en: ['Online submission', 'AI pre-screening', 'Progress tracking', 'Email notifications'],
      ja: ['オンライン提出', 'AI 事前審査', '進捗追跡', 'メール通知'],
    },
    url: 'https://sv04.bcse-vju.com',
    icon: 'FileCheck',
    status: 'active',
    category: 'admin',
  },
  {
    id: 'lab-management',
    name: {
      vi: 'Quản lý phòng Lab',
      en: 'Lab Operations Dashboard',
      ja: 'ラボ運営ダッシュボード',
    },
    description: {
      vi: 'Giám sát realtime phòng máy tính, thiết bị, camera, mượn trả thiết bị.',
      en: 'Real-time monitoring of computer rooms, equipment, cameras, and device lending.',
      ja: 'PC ルーム、機器、カメラ、機材貸出のリアルタイム監視。',
    },
    features: {
      vi: ['63 PC realtime', 'Camera 4 khu vực', 'Mượn/trả thiết bị', 'Thống kê sử dụng'],
      en: ['63 PCs in real time', 'Cameras across 4 zones', 'Equipment lending & return', 'Usage statistics'],
      ja: ['PC 63 台のリアルタイム表示', '4 エリアのカメラ', '機器の貸出・返却', '利用統計'],
    },
    url: 'https://sv05.bcse-vju.com',
    icon: 'LayoutDashboard',
    status: 'active',
    category: 'lab',
  },
  {
    id: 'wellbeing-chat',
    name: {
      vi: 'Kokoro — Sức khỏe tinh thần & Đồng hành',
      en: 'Kokoro — Wellbeing & Companion AI',
      ja: 'Kokoro — メンタルウェルビーイング AI',
    },
    description: {
      vi: 'Người bạn AI đồng hành tinh thần (心 — kokoro). Trò chuyện với 4 persona, bài tập thở có visualizer, ambient sound mixer, lobby cộng đồng realtime.',
      en: 'A companion AI for mental wellbeing (心 — kokoro). Chat with 4 personas, breathing exercises with visualizer, ambient sound mixer, and a real-time community lobby.',
      ja: 'メンタルウェルビーイングを支える AI コンパニオン（心 — kokoro）。4 つのペルソナとの会話、ビジュアライザー付き呼吸エクササイズ、環境音ミキサー、リアルタイムのコミュニティロビーを搭載。',
    },
    features: {
      vi: [
        '4 persona AI (tâm lý / thư giãn / game / nhảm)',
        'Breathing visualizer 5 mode + 6 theme',
        'Ambient sound mixer (Web Audio API)',
        'Community lobby realtime',
      ],
      en: [
        '4 AI personas (counsellor / relaxation / play / casual)',
        'Breathing visualiser, 5 modes × 6 themes',
        'Ambient sound mixer (Web Audio API)',
        'Real-time community lobby',
      ],
      ja: [
        '4 つの AI ペルソナ（カウンセラー／リラクゼーション／ゲーム／雑談）',
        '呼吸ビジュアライザー (5 モード × 6 テーマ)',
        '環境音ミキサー (Web Audio API)',
        'リアルタイムのコミュニティロビー',
      ],
    },
    url: 'https://sv06.bcse-vju.com',
    icon: 'Heart',
    status: 'active',
    category: 'community',
  },
  {
    id: 'self-learning',
    name: {
      vi: 'Cổng đăng ký dịch vụ tự học',
      en: 'Self-Study Services Portal',
      ja: '自学自習サービスポータル',
    },
    description: {
      vi: 'Đăng ký sử dụng thư viện, khu vực tự học, máy tính khu vực tự học và truy cập học liệu điện tử (Udemy + tài liệu nội bộ BCSE).',
      en: 'Reserve library access, self-study spaces, self-study computers, and digital learning materials (Udemy + internal BCSE resources).',
      ja: '図書館、自習スペース、自習用 PC の予約、ならびに電子学習教材（Udemy + BCSE 内部資料）へのアクセスを申請。',
    },
    features: {
      vi: [
        'Sử dụng thư viện',
        'Sử dụng các khu vực tự học',
        'Đăng ký quyền sử dụng máy tính khu vực tự học',
        'Truy cập học liệu điện tử, khóa học Udemy, tài liệu nội bộ BCSE',
      ],
      en: [
        'Library access',
        'Self-study area usage',
        'Reserve self-study computer access',
        'Access digital materials, Udemy courses and BCSE internal resources',
      ],
      ja: [
        '図書館の利用',
        '自習スペースの利用',
        '自習エリア PC の利用申請',
        '電子教材・Udemy・BCSE 内部資料へのアクセス',
      ],
    },
    url: '#',
    icon: 'BookOpen',
    status: 'coming-soon',
    category: 'learning',
  },
  {
    id: 'bcse-tracker',
    name: {
      vi: 'BCSE Tracker',
      en: 'BCSE Tracker',
      ja: 'BCSE トラッカー',
    },
    description: {
      vi: 'Cổng theo dõi học tập của cố vấn BCSE — rà soát 152 TC theo CTĐT, cảnh báo nguy cơ tốt nghiệp muộn, dự đoán định hướng chuyên sâu, tư vấn đăng ký kỳ tới và xuất phiếu cố vấn PDF.',
      en: "BCSE advisor dashboard — track 152-credit graduation requirements, flag at-risk students, predict specialisation tracks, recommend next-semester courses, and export PDF advising reports.",
      ja: 'BCSE 学習指導員向けダッシュボード — 152単位の卒業要件を可視化し、リスク学生を検出、専攻適性を予測、次学期の履修提案と PDF 指導報告書を出力。',
    },
    features: {
      vi: ['Rà soát tích lũy 152 TC', 'Cảnh báo rủi ro tốt nghiệp', 'Dự đoán định hướng chuyên sâu', 'Xuất phiếu cố vấn PDF'],
      en: ['152-credit graduation audit', 'Graduation risk radar', 'Specialisation track predictor', 'PDF advising reports'],
      ja: ['152単位修得監査', '卒業リスク検出', '専攻適性予測', 'PDF 指導報告書'],
    },
    url: 'https://sv18.bcse-vju.com/',
    icon: 'LineChart',
    status: 'active',
    category: 'learning',
  },
  {
    id: 'bcse-club',
    name: {
      vi: 'BCSE Club',
      en: 'BCSE Club',
      ja: 'BCSE クラブ',
    },
    description: {
      vi: 'Kết nối cộng đồng sinh viên BCSE các khóa. Tổ chức hoạt động chuyên môn, trao đổi kinh nghiệm học tập và nghiên cứu. Cựu sinh viên chia sẻ cơ hội việc làm.',
      en: 'Connect BCSE students across cohorts. Run technical activities, share study and research experiences, and tap alumni job opportunities.',
      ja: '各期の BCSE 学生をつなぐコミュニティ。専門活動の運営、学習・研究の経験共有、卒業生による求人共有。',
    },
    features: {
      vi: ['Kết nối sinh viên các khóa', 'Hoạt động chuyên môn', 'Cựu SV chia sẻ cơ hội', 'Giới thiệu việc làm'],
      en: ['Cross-cohort networking', 'Technical activities', 'Alumni sharing opportunities', 'Job referrals'],
      ja: ['期をまたぐ学生交流', '専門イベント', '卒業生による情報提供', '就職紹介'],
    },
    url: '#',
    icon: 'Users',
    status: 'coming-soon',
    category: 'community',
  },
  {
    id: 'career-portal',
    name: {
      vi: 'Cổng Thực tập & Nghề nghiệp',
      en: 'Internship & Career Portal',
      ja: 'インターン・キャリアポータル',
    },
    description: {
      vi: 'Kết nối doanh nghiệp và sinh viên — sắp xếp đăng ký thực tập, chia sẻ thông tin tuyển dụng thực tập sinh và nhân sự.',
      en: 'Connecting companies and students — coordinating internship sign-ups and sharing intern/full-time job openings.',
      ja: '企業と学生をつなぐポータル — インターンシップ応募、インターン生・正社員の求人情報。',
    },
    features: {
      vi: [
        '11 doanh nghiệp đối tác đa lĩnh vực',
        'Apply thực tập qua CV + email',
        'Bảng tin việc làm & sự kiện hướng nghiệp',
        'Theo dõi hành trình HD 483 / CSE4001',
      ],
      en: [
        '11 partner companies across industries',
        'Apply for internships via CV + email',
        'Job board & career events',
        'Track HD 483 / CSE4001 progress',
      ],
      ja: [
        '多分野で 11 社の提携企業',
        'CV + メールでインターン応募',
        '求人掲示板・キャリアイベント',
        'HD 483 / CSE4001 の進捗追跡',
      ],
    },
    url: 'https://sv09.bcse-vju.com',
    icon: 'Briefcase',
    status: 'active',
    category: 'career',
  },
  {
    id: 'e-office',
    name: {
      vi: 'Cổng E-Office BCSE',
      en: 'BCSE E-Office',
      ja: 'BCSE E-オフィス',
    },
    description: {
      vi: 'Quản lý giảng viên cơ hữu, giảng viên thỉnh giảng, hợp tác đào tạo nghiên cứu, lập kế hoạch, phân công công việc.',
      en: 'Manage core and adjunct faculty, training & research collaborations, planning and task assignment.',
      ja: '専任・非常勤教員、教育研究連携、計画策定、業務分担の管理を行います。',
    },
    features: {
      vi: ['Quản lý giảng viên', 'Hợp tác đào tạo & nghiên cứu', 'Lập kế hoạch', 'Phân công công việc'],
      en: ['Faculty management', 'Education & research collaboration', 'Planning', 'Task assignment'],
      ja: ['教員管理', '教育・研究連携', '計画立案', '業務分担'],
    },
    url: '#',
    icon: 'Building',
    status: 'coming-soon',
    category: 'admin',
  },
  {
    id: 'thesis-review',
    name: {
      vi: 'Cổng đánh giá góp ý Khóa luận BCSE',
      en: 'BCSE Thesis Review Portal',
      ja: 'BCSE 卒業論文評価ポータル',
    },
    description: {
      vi: 'Quản lý tiến độ KLTN, phiên báo cáo nội bộ, lập hội đồng bảo vệ, đánh giá chất lượng đề tài & báo cáo. Tích hợp xuất .xlsx xin quyết định theo QĐ 1534.',
      en: 'Manage thesis progress, internal review sessions, defence committees, and quality grading for topics & reports. Exports .xlsx for QĐ 1534 administrative approval.',
      ja: '卒業論文の進捗管理、内部報告セッション、審査委員会の編成、テーマ・報告書の品質評価。QĐ 1534 用の .xlsx エクスポートに対応。',
    },
    features: {
      vi: [
        'Theo dõi tiến độ GVHD ↔ sinh viên',
        'Lịch báo cáo phiên nội bộ',
        'Lập hội đồng & lịch bảo vệ',
        '5-mức đánh giá chất lượng',
      ],
      en: [
        'Supervisor ↔ student progress tracking',
        'Internal review schedule',
        'Committees & defence schedule',
        '5-level quality grading',
      ],
      ja: [
        '指導教員⇔学生の進捗追跡',
        '内部報告セッションスケジュール',
        '審査委員会・口頭試問日程',
        '5 段階の品質評価',
      ],
    },
    url: 'https://sv13.bcse-vju.com',
    icon: 'GraduationCap',
    status: 'active',
    category: 'career',
  },
  {
    id: 'code-arena',
    name: {
      vi: 'BCSE Code Arena — Chấm bài & Luyện thuật toán',
      en: 'BCSE Code Arena — Auto-grading & Algorithm Practice',
      ja: 'BCSE Code Arena — 自動採点・アルゴリズム演習',
    },
    description: {
      vi: 'Nền tảng chấm bài thực hành OOP và luyện thuật toán cho sinh viên BCSE. Hỗ trợ Python, C++, Java. Chấm tự động, bảng xếp hạng, đề thi & contest nội bộ.',
      en: 'OOP and algorithm-practice grading platform for BCSE students. Supports Python, C++, Java with auto-grading, leaderboards, and internal contests.',
      ja: 'BCSE 学生向けの OOP・アルゴリズム演習採点プラットフォーム。Python, C++, Java 対応。自動採点、ランキング、内部コンテストを備えます。',
    },
    features: {
      vi: [
        'Chấm tự động Python / C++ / Java',
        'Bộ đề thực hành OOP theo tuần',
        'Bảng xếp hạng & contest nội bộ',
        'Sandbox Docker an toàn',
      ],
      en: [
        'Auto-grade Python / C++ / Java',
        'Weekly OOP practice sets',
        'Leaderboards & internal contests',
        'Safe Docker sandbox',
      ],
      ja: [
        'Python / C++ / Java の自動採点',
        '週次の OOP 演習セット',
        'ランキング・内部コンテスト',
        '安全な Docker サンドボックス',
      ],
    },
    url: 'https://sv12.bcse-vju.com',
    icon: 'Code2',
    status: 'active',
    category: 'learning',
  },
  {
    id: 'bcse-guild',
    name: {
      vi: 'BCSE Guild — Cổng cộng tác sinh viên',
      en: 'BCSE Guild — Internal Talent Marketplace',
      ja: 'BCSE Guild — 学内タレントマーケットプレイス',
    },
    description: {
      vi: 'Sinh viên ứng tuyển công việc trong trường (TA, RA, lab assistant, dự án nội bộ). Hoàn thành quest tích XP, lên rank D→S; giúp đỡ đàn em mới mở khoá rank cao.',
      en: 'Internal jobs marketplace for BCSE students (TA, RA, lab assistant, internal projects). Complete quests to earn XP and rank up D→S; helping juniors is required to unlock higher ranks.',
      ja: '学生が学内業務（TA・RA・ラボ補助・内部プロジェクト）に応募できる学内マーケットプレイス。クエスト完了で XP を獲得しランクアップ（D→S）。後輩支援が高ランク解放の条件。',
    },
    features: {
      vi: [
        'Quest board theo rank D→S, lọc theo Học vụ / Dịch vụ / Hợp tác / Help Request',
        'XP & rank gating: quest cao cần helping quota',
        'Reflection bắt buộc cho quest rank ≥ B',
        'Help Request peer-to-peer: cả helper & người được giúp đều viết paragraph',
      ],
      en: [
        'Quest board by rank D→S, filtered by Academic / Service / Collab / Help Request',
        'XP & rank gating: high-rank quests require helping quota',
        'Reflection required for rank ≥ B quests',
        'Peer-to-peer help requests with two-side paragraph reflection',
      ],
      ja: [
        'ランク別 D→S のクエストボード、学業／サービス／協働／ヘルプリクエストで絞り込み',
        'XP・ランクゲート：上位クエストには支援実績が必要',
        'ランク B 以上は reflection 必須',
        'ピアヘルプ：両当事者がパラグラフを記述',
      ],
    },
    url: 'https://sv15.bcse-vju.com',
    icon: 'Swords',
    status: 'active',
    category: 'compete',
  },
  {
    id: 'japan-talent-showcase',
    name: {
      vi: 'BCSE Talent Showcase — Thực tập & Việc làm tại Nhật Bản',
      en: 'BCSE Talent Showcase — Internships & Jobs in Japan',
      ja: 'BCSE タレントショーケース — 日本でのインターン・就職',
    },
    description: {
      vi: 'Quảng cáo bản thân, doanh nghiệp đặt hàng bạn. Hồ sơ năng lực sinh viên BCSE: GPA, IELTS, JLPT, CV, GitHub/LinkedIn — minh chứng đầy đủ, doanh nghiệp Nhật trực tiếp tuyển dụng.',
      en: 'Showcase yourself; companies reach out to you. BCSE student profiles with GPA, IELTS, JLPT, CV, GitHub/LinkedIn — verifiable proofs included, direct hiring by Japanese companies.',
      ja: '自分を発信し、企業からスカウトを受け取れます。BCSE 学生のプロファイル（GPA、IELTS、JLPT、CV、GitHub/LinkedIn）を、証明資料付きで掲載。日本企業による直接採用が可能です。',
    },
    features: {
      vi: [
        'Hồ sơ theo khóa, có minh chứng (file scan, link)',
        'GPA, IELTS, JLPT, chứng chỉ chuyên môn',
        'Đa lĩnh vực: CSE, KHMT, KTMT, CAD-3D, Semiconductor, Fintech',
        'Doanh nghiệp Nhật chủ động tìm ứng viên',
      ],
      en: [
        'Cohort profiles with proof (scans, links)',
        'GPA, IELTS, JLPT, professional certificates',
        'Domains: CSE, CS, CE, CAD-3D, Semiconductor, Fintech',
        'Japanese employers proactively reach candidates',
      ],
      ja: [
        '期ごとのプロファイル（スキャン・リンクで証明）',
        'GPA、IELTS、JLPT、専門資格',
        '分野：CSE、CS、CE、CAD-3D、半導体、Fintech',
        '日本企業からの能動的なスカウト',
      ],
    },
    url: '#',
    icon: 'Sparkles',
    status: 'coming-soon',
    category: 'community',
  },
  {
    id: 'agri-robotics-lab',
    name: {
      vi: 'Δ Lab — Delta Lab · Agri-Robotics',
      en: 'Δ Lab — Delta Lab · Agri-Robotics',
      ja: 'Δ Lab — Delta Lab · Agri-Robotics',
    },
    description: {
      vi: 'Phòng thí nghiệm Agri-Robotics tích hợp Smart Agriculture × Robotics × AIoT — nhà kính thông minh, robot canh tác, drone NDVI, computer vision và nền tảng dữ liệu cho nông nghiệp Việt Nam.',
      en: 'Integrated Agri-Robotics laboratory bringing Smart Agriculture × Robotics × AIoT together — smart greenhouses, field robots, NDVI drones, computer vision and a data platform for Vietnamese agriculture.',
      ja: 'スマート農業 × ロボティクス × AIoT を統合する Agri-Robotics 研究室 — スマート温室、フィールドロボット、NDVI ドローン、コンピュータビジョン、農業データプラットフォーム。',
    },
    features: {
      vi: [
        'Smart Greenhouse & CEA — nhà kính 200m² research facility',
        'Agricultural Robotics — Delta-X phân loại, robot diệt cỏ laser',
        'UAV/UGV & AgriVision — drone NDVI, phát hiện sâu bệnh edge AI',
        'Data Platform & DSS — dashboard cloud, app cho nông hộ',
      ],
      en: [
        'Smart Greenhouse & CEA — 200 m² research facility',
        'Agricultural Robotics — Delta-X sorting, laser weeding robots',
        'UAV/UGV & AgriVision — NDVI drones, edge-AI pest detection',
        'Data Platform & DSS — cloud dashboard, farmer mobile app',
      ],
      ja: [
        'スマート温室 & CEA — 200 m² の研究施設',
        '農業ロボティクス — Delta-X 選別、レーザー除草ロボット',
        'UAV/UGV と AgriVision — NDVI ドローン、エッジ AI 病害虫検出',
        'データプラットフォーム & DSS — クラウドダッシュボードと農家向けアプリ',
      ],
    },
    url: 'https://sv17.bcse-vju.com',
    icon: 'Sprout',
    status: 'active',
    category: 'research',
    // Δ Lab flagship accent — xanh lá cây (forest green) supporting; title giữ trắng
    accent: {
      bg: 'bg-emerald-700/25',
      ring: 'ring-emerald-500/45',
      text: 'text-emerald-300',
      bar: 'bg-emerald-500',
      hoverBorder: 'hover:border-emerald-500/55',
      bullet: 'bg-emerald-400/70',
    },
  },
  {
    id: 'hygieia-lab',
    name: {
      vi: 'Υ Lab — Hygieia Lab · BCSE-FTH',
      en: 'Υ Lab — Hygieia Lab · BCSE-FTH',
      ja: 'Υ Lab — Hygieia Lab · BCSE-FTH',
    },
    description: {
      vi: 'Phòng thí nghiệm liên ngành Công nghệ Thực phẩm × Sức khỏe × Wellbeing số — mắt xích thứ ba khép chuỗi "farm-to-fork-to-health" cùng λ Lab và Δ Lab. Đặt theo Hygieia, nữ thần Sức khỏe Hy Lạp.',
      en: 'Interdisciplinary lab for Food Technology × Health × Digital Wellbeing — the third link completing the "farm-to-fork-to-health" chain with λ Lab and Δ Lab. Named after Hygieia, Greek goddess of health.',
      ja: '食品技術 × 健康 × デジタルウェルビーイングの学際研究室 — λ Lab・Δ Lab とともに「farm-to-fork-to-health」の連鎖を完成させる第三の環。健康の女神ヒュギエイアにちなむ。',
    },
    features: {
      vi: [
        'Food Technology & Smart Nutrition — dinh dưỡng cá nhân hóa',
        'Digital Food Analytics — e-nose/e-tongue, CV chấm chất lượng',
        'Health Informatics & Digital Biomarkers — wearable, tín hiệu sinh học (EEG)',
        'Biomedical Devices · Mental Wellbeing · Bio-Cyber liên ngành',
      ],
      en: [
        'Food Technology & Smart Nutrition — precision nutrition',
        'Digital Food Analytics — e-nose/e-tongue, CV quality grading',
        'Health Informatics & Digital Biomarkers — wearables, biosignals (EEG)',
        'Biomedical Devices · Mental Wellbeing · Bio-Cyber interdisciplinary',
      ],
      ja: [
        '食品技術・スマート栄養 — 個別化栄養',
        'デジタル食品分析 — e-nose/e-tongue、CV 品質評価',
        'ヘルスインフォマティクス・デジタルバイオマーカー — ウェアラブル、生体信号 (EEG)',
        '医用機器・メンタルウェルビーイング・バイオサイバー学際',
      ],
    },
    url: 'https://sv19.bcse-vju.com',
    icon: 'HeartPulse',
    status: 'active',
    category: 'research',
    // Υ Lab flagship accent — coral (Hygieia signature) supporting; title giữ trắng
    accent: {
      bg: 'bg-rose-900/25',
      ring: 'ring-rose-600/45',
      text: 'text-rose-300',
      bar: 'bg-rose-500',
      hoverBorder: 'hover:border-rose-500/55',
      bullet: 'bg-rose-400/70',
    },
  },
  {
    id: 'lambda-codex',
    name: {
      vi: 'Lambda Codex — Tri thức mở & Dự án nội bộ',
      en: 'Lambda Codex — Open Knowledge & Internal Projects',
      ja: 'Lambda Codex — オープン知識・内部プロジェクト',
    },
    description: {
      vi: 'Kho tri thức mở của Lambda Lab: lưu trữ & chia sẻ các khóa học chuyên môn (lập trình, xử lý tín hiệu, nhúng, in 3D, Drone, EEG, Nông nghiệp…), giới thiệu dự án nội bộ và hướng dẫn academic writing để sinh viên tự học và cùng phát triển.',
      en: 'Lambda Lab\'s open knowledge base: curated courses (programming, signal processing, embedded, 3D printing, drones, EEG, agriculture…), internal project showcases, and academic writing guides for student self-study and community growth.',
      ja: 'Lambda Lab のオープンナレッジハブ：専門コース（プログラミング、信号処理、組込み、3D プリント、ドローン、EEG、農業など）、内部プロジェクト紹介、アカデミックライティング指南をまとめ、学生の自学と相互成長を支援。',
    },
    features: {
      vi: [
        'Khóa học chuyên môn nội bộ theo chủ đề',
        'Showcase dự án & code mẫu của lab',
        'Hướng dẫn academic writing & paper review',
        'Cộng đồng tự học và chia sẻ kiến thức',
      ],
      en: [
        'Internal courses organised by topic',
        'Project showcases & sample code from the lab',
        'Academic writing & paper review guides',
        'Self-study and knowledge-sharing community',
      ],
      ja: [
        'テーマ別の内部コース',
        'ラボのプロジェクト・サンプルコード公開',
        'アカデミックライティング・論文レビュー指南',
        '自学・知識共有のコミュニティ',
      ],
    },
    url: 'https://sv16.bcse-vju.com',
    icon: 'Library',
    status: 'active',
    category: 'research',
  },
  {
    id: 'bcse-competition-hub',
    name: {
      vi: 'BCSE Competition Hub — Điểm hẹn cuộc thi',
      en: 'BCSE Competition Hub — Student Competitions',
      ja: 'BCSE Competition Hub — 学生コンテスト・ハブ',
    },
    description: {
      vi: 'Cổng tổng hợp và kết nối các cuộc thi dành cho sinh viên BCSE — từ cấp khoa, cấp trường đến cấp quốc gia và quốc tế. Một nơi duy nhất để khám phá cuộc thi, đọc thể lệ, tìm đồng đội và ghi dấu thành tích.',
      en: 'A unified hub aggregating competitions for BCSE students — from department, university, national to international level. Discover contests, read rules, find teammates and showcase achievements in one place.',
      ja: 'BCSE 学生向けコンテストを学科・学内・全国・国際レベルまで一元化するハブ。コンテストの発見、規定の確認、チーム結成、実績の記録を一カ所で。',
    },
    features: {
      vi: [
        'Khám phá cuộc thi theo lĩnh vực & cấp độ',
        'Trang chuẩn hóa: thể lệ · mốc thời gian · giải thưởng',
        'Tìm đồng đội theo kỹ năng',
        'Ghi dấu thành tích vào hồ sơ cá nhân',
      ],
      en: [
        'Discover competitions by field & level',
        'Standardised page: rules · timeline · prizes',
        'Find teammates by skill',
        'Track achievements in your profile',
      ],
      ja: [
        '分野・レベル別にコンテストを探索',
        '規定・日程・賞金を統一フォーマットで表示',
        'スキル別にチームメンバーを検索',
        '個人プロフィールに実績を記録',
      ],
    },
    url: '#',
    icon: 'Trophy',
    status: 'coming-soon',
    category: 'compete',
  },
  {
    id: 'koe-listening',
    name: {
      vi: 'Koe (声) — Cổng lắng nghe ẩn danh BCSE',
      en: 'Koe (声) — BCSE Anonymous Feedback Portal',
      ja: 'Koe (声) — BCSE 匿名フィードバックポータル',
    },
    description: {
      vi: 'Cổng tiếp thu ý kiến của sinh viên và giảng viên BCSE theo dạng confession — đăng nhập bằng email VJU nhưng ẩn danh tính. Tiếp nhận góp ý về học vụ, dịch vụ, môi trường, chương trình; tổng hợp hàng năm để cải tiến BCSE.',
      en: 'A confession-style feedback portal for BCSE students and faculty — sign in with your VJU email, but your identity stays hidden. Collects feedback on academics, services, environment and curriculum; aggregated annually to improve BCSE.',
      ja: 'BCSE 学生・教員向けの匿名フィードバックポータル（コンフェッション形式）。VJU メールでログインしますが、氏名は非公開。学業・サービス・環境・カリキュラムへの意見を収集し、毎年集計して BCSE を改善します。',
    },
    features: {
      vi: [
        'Đăng nhập bằng email VJU — ẩn danh tính',
        'Góp ý đa chủ đề: học vụ · dịch vụ · môi trường · chương trình',
        'Không công khai — chỉ ban quản trị tiếp nhận',
        'Tổng hợp thống kê hàng năm để cải tiến',
      ],
      en: [
        'Sign in with VJU email — identity stays hidden',
        'Multi-topic feedback: academics · services · environment · curriculum',
        'Private — read only by the administration',
        'Annual statistical roll-up to drive improvements',
      ],
      ja: [
        'VJU メールでログイン — 氏名は非公開',
        '多分野の意見：学業・サービス・環境・カリキュラム',
        '非公開：管理部のみが閲覧',
        '年次統計として集計し改善に活用',
      ],
    },
    url: 'https://sv20.bcse-vju.com',
    icon: 'Ear',
    status: 'coming-soon',
    category: 'learning',
  },
];
