/**
 * Sơ đồ tiến trình BCSE 135 — dữ liệu chuyển thể VERBATIM từ
 * "Ke_hoach_hoc_tap_BCSE_135TC.html" (bản Nộp QA 22 Aug).
 *
 * Toàn bộ mã học phần, tên, tín chỉ (TC), tiên quyết, nhãn nhóm và văn bản ghi
 * chú được giữ nguyên character-for-character (kể cả dấu tiếng Việt).
 * Component CurriculumFlow.tsx render toàn bộ trang từ các export dưới đây.
 */

// ────────────────────────────────────────────────────────────────────────────
// KIND — bảng màu theo loại khối. Mỗi entry = [biến màu chữ, biến màu nền, nhãn]
// ────────────────────────────────────────────────────────────────────────────
export type KindKey =
  | 'dc'
  | 'toan'
  | 'cs'
  | 'nen'
  | 'se'
  | 'ai'
  | 'iot'
  | 'ic'
  | 'ft'
  | 'tn';

/** [màu chữ (var), màu nền (var), nhãn] */
export type KindTuple = readonly [string, string, string];

export const KIND: Record<KindKey, KindTuple> = {
  dc: ['var(--c-daicuong)', 'var(--c-daicuong-bg)', 'Đại cương'],
  toan: ['var(--c-toan)', 'var(--c-toan-bg)', 'Toán & KHCB'],
  cs: ['var(--c-coso)', 'var(--c-coso-bg)', 'Cơ sở ngành'],
  nen: ['var(--c-nen)', 'var(--c-nen-bg)', 'Cốt lõi BB'],
  se: ['var(--c-se)', 'var(--c-se-bg)', 'SE'],
  ai: ['var(--c-ai)', 'var(--c-ai-bg)', 'DS/AI'],
  iot: ['var(--c-iot)', 'var(--c-iot-bg)', 'AIoT'],
  ic: ['var(--c-ic)', 'var(--c-ic-bg)', 'Vi mạch'],
  ft: ['var(--c-fintech)', 'var(--c-fintech-bg)', 'Fintech'],
  tn: ['var(--c-totnghiep)', 'var(--c-totnghiep-bg)', 'Tốt nghiệp'],
};

// ────────────────────────────────────────────────────────────────────────────
// TERMS — 8 học kỳ (mỗi học kỳ = 1 cột)
// ────────────────────────────────────────────────────────────────────────────

/** tc có thể là số hoặc chuỗi 'ĐK' (điều kiện) */
export type TC = number | 'ĐK';

export interface ReqCourse {
  code: string;
  name: string;
  tc: TC;
  /** khối màu (chỉ ở học phần bắt buộc) */
  k?: KindKey;
  /** tiên quyết */
  pre?: string;
  /** học phần mới (★) */
  isnew?: boolean;
}

export interface OptItem {
  /** ký hiệu đầu dòng (vd '◇ CSE3069' hoặc '') */
  mark: string;
  /** tên học phần / mô tả */
  name: string;
  /** tín chỉ dạng chuỗi (vd '3 TC') hoặc '' */
  tc: string;
  /** nhãn mô đun tách ra từ inline <span class="mod">…</span> (đã bỏ span) */
  mod?: string;
}

export interface OptGroup {
  grp: string;
  items: OptItem[];
}

export interface SummerCourse {
  code: string;
  name: string;
  tc: TC;
}

export interface GradPa1 {
  code: string;
  name: string;
  tc: string;
}

export interface GradPa2Item {
  code: string;
  name: string;
  tc: string;
}

export interface GradPa2 {
  items: GradPa2Item[];
  note: string;
}

export interface GradBox {
  tc: string;
  rule: string[];
  pa1: GradPa1;
  pa2: GradPa2;
}

export interface Term {
  yr: string;
  hk: string;
  req: ReqCourse[];
  opt?: OptGroup[];
  summer?: SummerCourse[];
  summerLabel?: string;
  grad?: GradBox;
}

export const terms: Term[] = [
  {
    yr: 'Năm 1',
    hk: 'Học kỳ 1',
    req: [
      { code: 'PHI1006', name: 'Triết học Mác–Lênin', tc: 3, k: 'dc' },
      { code: 'VNU1001', name: 'Nhập môn công nghệ số & ứng dụng AI', tc: 3, k: 'dc' },
      { code: 'FLF1107', name: 'Tiếng Anh B1', tc: 5, k: 'dc' },
      { code: 'VJU2031', name: 'Tiếng Nhật sơ cấp 1', tc: 3, k: 'dc' },
      { code: 'VJU2002', name: 'Giải tích 1', tc: 2, k: 'toan' },
      { code: 'VJU2005', name: 'Vật lý 1', tc: 2, k: 'toan' },
      { code: 'AET2014', name: 'Nhập môn lập trình', tc: 2, k: 'toan' },
      { code: '—', name: 'Giáo dục thể chất', tc: 'ĐK', k: 'dc' },
      { code: '—', name: 'Kỹ năng bổ trợ', tc: 'ĐK', k: 'dc' },
    ],
    opt: [
      {
        grp: 'Tự chọn I.2.2 — khuyến nghị Nhóm A',
        items: [{ mark: '', name: '1 học phần (2 TC) · thỏa điều kiện ≥1 Nhóm A', tc: '' }],
      },
    ],
  },
  {
    yr: 'Năm 1',
    hk: 'Học kỳ 2',
    req: [
      { code: 'PEC1008', name: 'Kinh tế chính trị Mác–Lênin', tc: 2, k: 'dc', pre: 'PHI1006' },
      { code: 'FLF1108', name: 'Tiếng Anh B2', tc: 5, k: 'dc', pre: 'FLF1107' },
      { code: 'VJU2032', name: 'Tiếng Nhật sơ cấp 2', tc: 2, k: 'dc', pre: 'VJU2031' },
      { code: 'CSE3001', name: 'Giải tích 2', tc: 3, k: 'toan' },
      { code: 'VJU2030', name: 'Đại số tuyến tính 2', tc: 3, k: 'toan' },
      { code: 'VJU2006', name: 'Vật lý 2', tc: 2, k: 'toan' },
      { code: 'THL1057', name: 'Nhà nước và pháp luật đại cương', tc: 2, k: 'dc' },
      { code: '—', name: 'Giáo dục thể chất', tc: 'ĐK', k: 'dc' },
      { code: '—', name: 'Kỹ năng bổ trợ', tc: 'ĐK', k: 'dc' },
    ],
    opt: [
      {
        grp: 'Tự chọn I.2.2 — khuyến nghị Nhóm B–E',
        items: [{ mark: '', name: '1 học phần (2 TC)', tc: '' }],
      },
    ],
    summerLabel: '☀ Kỳ hè (sau HK2)',
    summer: [{ code: '—', name: 'Giáo dục quốc phòng – an ninh', tc: 'ĐK' }],
  },
  {
    yr: 'Năm 2',
    hk: 'Học kỳ 3',
    req: [
      { code: 'PHI1002', name: 'Chủ nghĩa xã hội khoa học', tc: 2, k: 'dc', pre: 'PHI1006' },
      { code: 'VJU2001', name: 'Phương pháp luận nghiên cứu khoa học', tc: 2, k: 'dc' },
      { code: 'CSE3003', name: 'Toán rời rạc', tc: 3, k: 'toan' },
      { code: 'CSE3013', name: 'Xác suất – Thống kê', tc: 3, k: 'toan' },
      { code: 'CSE3034', name: 'Cấu trúc dữ liệu và giải thuật', tc: 2, k: 'cs' },
      { code: 'CSE3014', name: 'Phương pháp số', tc: 2, k: 'cs' },
      { code: '—', name: 'Giáo dục thể chất', tc: 'ĐK', k: 'dc' },
    ],
    opt: [
      {
        grp: 'Tự chọn I.2.2 — Nhóm B–E',
        items: [{ mark: '', name: '1–2 học phần (2–4 TC)', tc: '' }],
      },
    ],
  },
  {
    yr: 'Năm 2',
    hk: 'Học kỳ 4',
    req: [
      { code: 'HIS1001', name: 'Lịch sử Đảng Cộng sản Việt Nam', tc: 2, k: 'dc' },
      { code: 'CSE3015', name: 'Lập trình hướng đối tượng', tc: 2, k: 'cs' },
      { code: 'CSE3032', name: 'Kiến trúc máy tính', tc: 3, k: 'cs' },
      { code: 'CSE3012', name: 'Nhập môn cơ sở dữ liệu', tc: 2, k: 'cs' },
      { code: 'CSE3041', name: 'Công nghệ phần mềm', tc: 2, k: 'nen' },
    ],
    opt: [
      {
        grp: 'Tự chọn I.2.2 — Nhóm B–E',
        items: [{ mark: '', name: '1–2 học phần (2–4 TC)', tc: '' }],
      },
      {
        grp: 'Tự chọn — Ngoại ngữ chuyên ngành (II.1) · chọn 1 học phần',
        items: [
          { mark: 'CSE3016', name: 'Tiếng Anh chuyên ngành', tc: '2 TC' },
          { mark: 'CSE3017', name: 'Tiếng Nhật chuyên ngành', tc: '2 TC' },
        ],
      },
      {
        grp: '◇ Cửa ngõ mô đun định hướng — chọn 1–2 học phần',
        items: [
          { mark: '◇ CSE3069', name: 'Phát triển ứng dụng IoT · ', mod: 'AIoT', tc: '3 TC' },
          { mark: '◇ CSE3043', name: 'Mạch logic và kỹ thuật số · ', mod: 'Vi mạch', tc: '3 TC' },
          { mark: '◇ CSE3042', name: 'Công nghệ tài chính · ', mod: 'Fintech', tc: '3 TC' },
        ],
      },
    ],
  },
  {
    yr: 'Năm 3',
    hk: 'Học kỳ 5',
    req: [
      { code: 'POL1001', name: 'Tư tưởng Hồ Chí Minh', tc: 2, k: 'dc' },
      { code: 'CSE3030', name: 'Mạng máy tính và truyền thông', tc: 3, k: 'cs' },
      { code: 'CSE3033', name: 'Nguyên lý hệ điều hành', tc: 2, k: 'cs' },
      { code: 'CSE3010', name: 'Lập trình nâng cao', tc: 2, k: 'nen' },
      { code: 'CSE3050', name: 'Trí tuệ nhân tạo', tc: 2, k: 'nen' },
      { code: 'CSE3079', name: 'Dự án I — củng cố nền tảng chung', tc: 2, k: 'nen' },
    ],
    opt: [
      {
        grp: 'Tự chọn cốt lõi — (3–6 TC)',
        items: [{ mark: '', name: 'Hướng SE (Web, Mobile, Cloud…)', tc: '' }],
      },
      {
        grp: '◇ Cửa ngõ mô đun định hướng — chọn 1–2 học phần',
        items: [
          { mark: '◇ CSE3069', name: 'Phát triển ứng dụng IoT · ', mod: 'AIoT', tc: '3 TC' },
          { mark: '◇ CSE3043', name: 'Mạch logic và kỹ thuật số · ', mod: 'Vi mạch', tc: '3 TC' },
          { mark: '◇ CSE3042', name: 'Công nghệ tài chính · ', mod: 'Fintech', tc: '3 TC' },
        ],
      },
    ],
  },
  {
    yr: 'Năm 3',
    hk: 'Học kỳ 6',
    req: [
      { code: 'CSE3040', name: 'Khoa học dữ liệu', tc: 3, k: 'nen' },
      { code: 'CSE3057', name: 'Học máy', tc: 3, k: 'nen', pre: 'CSE3050' },
      { code: 'CSE3065', name: 'Phân tích và thiết kế hệ thống', tc: 2, k: 'nen' },
      { code: 'CSE3080', name: 'Dự án II — đào sâu định hướng (SE / DS·AI)', tc: 2, k: 'nen' },
      { code: 'CSE3021', name: 'An ninh thông tin', tc: 3, k: 'nen' },
    ],
    summer: [{ code: 'CSE4001', name: 'Thực tập nghề nghiệp', tc: 5 }],
    opt: [
      {
        grp: 'Tự chọn cốt lõi — (3–6 TC)',
        items: [
          { mark: '', name: 'Hướng AI (Thị giác MT, NLP, Học tăng cường…)', tc: '' },
          { mark: '', name: 'Trong 5 mô đun, tùy định hướng', tc: '' },
        ],
      },
    ],
  },
  {
    yr: 'Năm 4',
    hk: 'Học kỳ 7',
    req: [{ code: 'CSE3081', name: 'Dự án III — bước đệm tốt nghiệp', tc: 2, k: 'nen' }],
    opt: [
      {
        grp: 'Tự chọn cốt lõi — 12 TC (4 học phần)',
        items: [{ mark: '', name: 'Chọn 4 học phần trong 5 mô đun định hướng', tc: '' }],
      },
    ],
  },
  {
    yr: 'Năm 4',
    hk: 'Học kỳ 8',
    req: [],
    grad: {
      tc: '10 TC',
      rule: [
        '<b>GPA tích lũy 6 kỳ ≥ 3,0:</b> chọn Phương án 1 hoặc 2',
        '<b>GPA < 3,0:</b> chọn Phương án 2',
      ],
      pa1: { code: 'CSE4050', name: 'Khóa luận tốt nghiệp', tc: '10 TC' },
      pa2: {
        items: [
          { code: 'CSE4051', name: 'Dự án tốt nghiệp', tc: '4 TC' },
          { code: '', name: '2 học phần tự chọn tốt nghiệp', tc: '6 TC' },
        ],
        note: 'Không trùng các học phần đã chọn trong Tự chọn cốt lõi',
      },
    },
  },
];

// ────────────────────────────────────────────────────────────────────────────
// DAICUONG GROUPS — Tự chọn đại cương I.2 (Nhóm A–E)
// ────────────────────────────────────────────────────────────────────────────
export interface DaicuongGroup {
  L: string;
  n: string;
  c: string[];
}

export const daicuongGroups: DaicuongGroup[] = [
  {
    L: 'A',
    n: 'Khoa học bền vững',
    c: [
      'VJU2011 Khoa học Trái đất',
      'VJU2012 KH toàn cầu & môi trường',
      'VJU2013 Phát triển & Năng lượng ở Châu Á',
      'VJU2014 KH cơ bản về biến đổi khí hậu',
      'VJU2015 Thực phẩm, nước & sức khỏe',
      'VJU2016 An ninh & phát triển bền vững',
      'VJU2017 KH, Công nghệ & Xã hội',
    ],
  },
  {
    L: 'B',
    n: 'Toàn cầu hóa & Khoa học xã hội',
    c: [
      'VJU2018 Toàn cầu hóa & Khu vực hóa',
      'VJU2019 Phát triển quốc tế & Khu vực',
      'VJU2020 Tôn giáo, Văn hóa & Xã hội',
      'VJU2021 Luật & Xã hội',
      'VJU2022 Quản trị kinh doanh',
      'VJU2033 Hệ thống pháp luật Việt Nam',
      'VJU2035 Nhập môn kinh tế học',
      'VJU2036 Xã hội học đại cương',
      'MNS2006 Khoa học quản lý',
    ],
  },
  {
    L: 'C',
    n: 'Nghiên cứu Nhật Bản',
    c: [
      'VJU2024 Văn hóa & lịch sử Nhật Bản',
      'VJU2025 Kinh doanh Nhật–Việt',
      'VJU2026 Hệ thống pháp luật Nhật Bản',
      'VJU2027 So sánh xã hội Nhật–Việt',
      'VJU2028 So sánh Việt–Nhật',
      'VJU2029 Giảng dạy tiếng Nhật',
      'VJU2044 Các vấn đề đương đại ở Đông Á',
    ],
  },
  {
    L: 'D',
    n: 'Khoa học thông tin',
    c: [
      'AET2012 Khoa học thông tin',
      'AET2013 Phân tích dữ liệu khoa học',
      'INE1052 Kinh tế lượng',
      'VJU2050 Thuật toán',
      'VJU2051 Mô phỏng toán học',
    ],
  },
  {
    L: 'E',
    n: 'Tư duy học thuật & nghiên cứu',
    c: [
      'VJU2034 Viết học thuật',
      'VJU2045 Thí nghiệm trong KH&KT',
      'VJU2046 AI, tri thức & đạo đức học thuật',
      'VJU2047 Phân tích dữ liệu liên ngành',
      'VJU2048 Tư duy tính toán & lập trình',
      'VJU2049 Khám phá liên ngành',
    ],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// BRANCHES — 5 mô đun tự chọn cốt lõi
// ────────────────────────────────────────────────────────────────────────────
export type BranchKey = 'ai' | 'se' | 'iot' | 'ic' | 'ft';

/** [mã, tên, tín chỉ] */
export type BranchCourse = readonly [string, string, string];

export interface Branch {
  key: BranchKey;
  name: string;
  desc: string;
  gate: string | null;
  courses: BranchCourse[];
}

export const branches: Branch[] = [
  {
    key: 'ai',
    name: 'DS / AI — Khoa học dữ liệu & Trí tuệ nhân tạo',
    desc: 'Mở tiếp từ nền bắt buộc — không cần cửa ngõ.',
    gate: null,
    courses: [
      ['CSE3051', 'Kỹ nghệ AI và MLOps', '3 TC'],
      ['CSE3062', 'Thị giác máy tính', '3 TC'],
      ['CSE3082', 'Xử lý ngôn ngữ tự nhiên', '3 TC'],
      ['CSE3083', 'Học tăng cường', '3 TC'],
      ['CSE3084', 'Học máy trên đồ thị', '3 TC'],
      ['CSE3060', 'Tính toán song song', '3 TC'],
      ['CSE3064', 'Vận trù học', '3 TC'],
      ['CSE3085', 'Khoa học nhận thức', '3 TC'],
    ],
  },
  {
    key: 'se',
    name: 'SE — Công nghệ phần mềm',
    desc: 'Mở tiếp từ nền bắt buộc — không cần cửa ngõ.',
    gate: null,
    courses: [
      ['CSE3052', 'Phát triển ứng dụng Web', '3 TC'],
      ['CSE3053', 'Phát triển ứng dụng di động', '3 TC'],
      ['CSE3056', 'Phát triển ứng dụng nâng cao', '3 TC'],
      ['CSE3059', 'Điện toán đám mây', '3 TC'],
      ['CSE3061', 'Tương tác người – máy', '3 TC'],
      ['CSE3066', 'Đánh giá hiệu năng hệ thống', '3 TC'],
      ['CSE3077', 'Đảm bảo chất lượng phần mềm', '3 TC'],
      ['CSE3086', 'Lập trình với trí tuệ nhân tạo', '3 TC'],
    ],
  },
  {
    key: 'iot',
    name: 'AIoT — Trí tuệ nhân tạo vạn vật',
    desc: 'Qua cửa ngõ CSE3069 trước khi học chuyên sâu.',
    gate: 'CSE3069',
    courses: [
      ['CSE3069', 'Phát triển ứng dụng IoT', '3 TC'],
      ['CSE3070', 'Mạng cảm biến không dây', '3 TC'],
      ['CSE3073', 'Lập trình nhúng nâng cao (RTOS/STM32)', '3 TC'],
      ['CSE3075', 'Điện toán biên và AIoT (Edge AI)', '3 TC'],
      ['CSE3076', 'An toàn hệ thống nhúng và IoT', '3 TC'],
    ],
  },
  {
    key: 'ic',
    name: 'Vi mạch — Thiết kế vi mạch (IC Design)',
    desc: 'Qua cửa ngõ CSE3043 trước khi học chuyên sâu.',
    gate: 'CSE3043',
    courses: [
      ['CSE3043', 'Mạch logic và kỹ thuật số', '3 TC'],
      ['CSE3036', 'Thiết kế luận lý số (FPGA)', '3 TC'],
      ['CSE3047', 'Thiết kế hệ thống số với HDL', '3 TC'],
      ['CSE3048', 'Thiết kế hệ thống SoC', '3 TC'],
      ['CSE3078', 'Thiết kế vi mạch số', '3 TC'],
    ],
  },
  {
    key: 'ft',
    name: 'Fintech — Công nghệ tài chính',
    desc: 'Qua cửa ngõ CSE3042 trước khi học chuyên sâu.',
    gate: 'CSE3042',
    courses: [
      ['CSE3042', 'Công nghệ tài chính', '3 TC'],
      ['CSE3054', 'Quản lý và phân tích dữ liệu tài chính', '3 TC'],
      ['CSE3055', 'Công nghệ tài chính và ứng dụng', '3 TC'],
      ['CSE3067', 'Học máy trong kinh tế và tài chính', '3 TC'],
      ['CSE3087', 'Mật mã ứng dụng và an toàn giao dịch', '3 TC'],
    ],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// BLK — ánh xạ mã học phần → nhãn khối (badge)
// ────────────────────────────────────────────────────────────────────────────
export const BLK: Record<string, string> = {
  PHI1006: 'I.1',
  PEC1008: 'I.1',
  PHI1002: 'I.1',
  HIS1001: 'I.1',
  POL1001: 'I.1',
  THL1057: 'I.1',
  VNU1001: 'I.1',
  FLF1107: 'I.1',
  FLF1108: 'I.1',
  VJU2031: 'I.2',
  VJU2032: 'I.2',
  VJU2001: 'I.2',
  VJU2002: 'I.3',
  CSE3001: 'I.3',
  VJU2030: 'I.3',
  CSE3003: 'I.3',
  CSE3013: 'I.3',
  VJU2005: 'I.3',
  VJU2006: 'I.3',
  AET2014: 'I.3',
  CSE3012: 'II.1',
  CSE3015: 'II.1',
  CSE3034: 'II.1',
  CSE3030: 'II.1',
  CSE3032: 'II.1',
  CSE3033: 'II.1',
  CSE3014: 'II.1',
  CSE3016: 'II.1',
  CSE3017: 'II.1',
  CSE3010: 'II.2',
  CSE3040: 'II.2',
  CSE3041: 'II.2',
  CSE3050: 'II.2',
  CSE3057: 'II.2',
  CSE3021: 'II.2',
  CSE3065: 'II.2',
  CSE3079: 'II.2',
  CSE3080: 'II.2',
  CSE3081: 'II.2',
  CSE4001: 'III',
};

// ────────────────────────────────────────────────────────────────────────────
// BRANCH CLUSTERS — cấu hình gom cụm mô đun (core / gate)
// ────────────────────────────────────────────────────────────────────────────
export interface BranchCluster {
  tone: 'core' | 'gate';
  cols: number;
  title: string;
  badge: string;
  keys: BranchKey[];
}

export const branchClusters: BranchCluster[] = [
  {
    tone: 'core',
    cols: 2,
    title: 'SE & DS/AI — mở tiếp từ nền',
    badge: 'KHÔNG cửa ngõ',
    keys: ['ai', 'se'],
  },
  {
    tone: 'gate',
    cols: 3,
    title: 'AIoT · Vi mạch · Fintech — Kỹ thuật máy tính & liên ngành',
    badge: '◇ QUA CỬA NGÕ',
    keys: ['iot', 'ic', 'ft'],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// HEADER META / LEGEND / NOTES / FOOTER
// ────────────────────────────────────────────────────────────────────────────
export interface HeaderMeta {
  label: string;
  value: string;
}

export const headerContent = {
  eyebrow: 'Sơ đồ tiến trình đào tạo · Curriculum Flowchart',
  h1: 'Khoa học và Kỹ thuật Máy tính — BCSE 2026',
  sub: 'Computer Science and Engineering · Mã ngành 7480101 · Trường Đại học Việt Nhật (VJU), ĐHQGHN',
  meta: [
    { label: 'Tổng tín chỉ tích lũy: ', value: '135' },
    { label: 'Thời gian: ', value: '4 năm / 8 học kỳ' },
    { label: 'Cấu trúc: ', value: '3 thành phần (QĐ 2690 / Mẫu 952)' },
    { label: 'Định hướng: ', value: 'ỨNG DỤNG — khai phóng, nền SE + Data/AI, 5 mô đun' },
  ] as HeaderMeta[],
};

/** Một mục chú giải. `swatch` = biến màu (var) hoặc hex; hoặc dạng tag/gate. */
export interface LegendItem {
  kind: 'swatch' | 'tagReq' | 'tagOpt' | 'gate';
  /** màu ô (chỉ dùng cho kind 'swatch') */
  color?: string;
  /** phần văn bản trước (label chính) */
  text: string;
  /** phần văn bản phụ sau tag (dùng cho tagReq/tagOpt) */
  suffix?: string;
}

export const legendItems: LegendItem[] = [
  { kind: 'swatch', color: 'var(--c-daicuong)', text: 'I.1–I.2 · Đại cương' },
  { kind: 'swatch', color: 'var(--c-toan)', text: 'I.3 · Toán & KHCB' },
  { kind: 'swatch', color: 'var(--c-coso)', text: 'II.1 · Cơ sở ngành' },
  { kind: 'swatch', color: 'var(--c-nen)', text: 'II.2 · Cốt lõi bắt buộc' },
  { kind: 'swatch', color: 'var(--c-ai)', text: 'Mô đun DS/AI' },
  { kind: 'swatch', color: 'var(--c-se)', text: 'Mô đun SE' },
  { kind: 'swatch', color: 'var(--c-iot)', text: 'Mô đun AIoT' },
  { kind: 'swatch', color: 'var(--c-ic)', text: 'Mô đun Vi mạch' },
  { kind: 'swatch', color: 'var(--c-fintech)', text: 'Mô đun Fintech' },
  { kind: 'swatch', color: 'var(--grad)', text: 'II.3 · Tốt nghiệp (2 phương án)' },
  { kind: 'swatch', color: '#C62828', text: 'III · Thực tập (kỳ hè)' },
  { kind: 'tagReq', text: 'Bắt buộc', suffix: 'mọi SV học' },
  { kind: 'tagOpt', text: 'Tự chọn', suffix: 'theo mô đun' },
  { kind: 'gate', text: 'Cửa ngõ (bắt buộc nếu theo mô đun)' },
];

/** Chú giải strip đại cương (heading). */
export const stripHeading = {
  swatchColor: 'var(--c-daicuong)',
  main: 'Tự chọn I.2.2 — Đại cương VJU (Nhóm A–E)',
  note:
    '· tích lũy 8 TC (4 học phần × 2 TC), rải Năm 1–2 · bắt buộc ≥1 học phần Nhóm A',
};

export const branchesSection = {
  h2: 'Khối tự chọn cốt lõi — 5 mô đun định hướng',
};

/** Note card. `bodyHtml` giữ inline <b>/<code> để render qua dangerouslySetInnerHTML. */
export interface NoteCard {
  dotColor: string;
  title: string;
  /** đoạn văn (mỗi phần tử = 1 <p>), có thể chứa inline HTML */
  paragraphs?: string[];
  /** danh sách (mỗi phần tử = 1 <li>), có thể chứa inline HTML */
  list?: string[];
}

export const noteCards: NoteCard[] = [
  {
    dotColor: 'var(--c-nen)',
    title: 'Nền bắt buộc phủ 2 trụ (mọi sinh viên)',
    paragraphs: [
      'Mọi cử nhân BCSE bắt buộc học <b>cả hai trụ</b>: <b>Công nghệ phần mềm (SE)</b> và <b>Khoa học dữ liệu / Trí tuệ nhân tạo (DS/AI)</b>. Cốt lõi bắt buộc phủ hai trụ: <code>CSE3040</code> Khoa học dữ liệu, <code>CSE3050</code> Trí tuệ nhân tạo, <code>CSE3057</code> Học máy, <code>CSE3041</code> Công nghệ phần mềm, cùng ba học phần Project. <b>Dự án II</b> sinh viên thực hiện theo hướng đã chọn — <b>SE hoặc DS/AI</b>. Học sâu tích hợp trong Học máy; Thị giác máy tính &amp; NLP ở tự chọn mô đun DS/AI.',
    ],
  },
  {
    dotColor: 'var(--gateway)',
    title: 'Khai phóng có kỷ luật',
    paragraphs: [
      'Sinh viên tự do chọn sâu trong 5 mô đun (không ép). Ba mô đun Kỹ thuật máy tính (AIoT, Vi mạch, Fintech) phải qua <b>học phần cửa ngõ ◇</b> trước khi học chuyên sâu; hai mô đun SE và DS/AI mở tiếp từ nền — không cần cửa ngõ.',
    ],
  },
  {
    dotColor: 'var(--gateway)',
    title: 'Cửa ngõ (gateway) từng mô đun',
    list: [
      '<b>AIoT:</b> <code>CSE3069</code> Phát triển ứng dụng IoT ◇ → Mạng cảm biến, LT nhúng nâng cao, Edge AI, An toàn IoT',
      '<b>Vi mạch:</b> <code>CSE3043</code> Mạch logic và kỹ thuật số ◇ → Luận lý số → HDL → SoC → Vi mạch số',
      '<b>Fintech:</b> <code>CSE3042</code> Công nghệ tài chính ◇ → nâng cao',
    ],
  },
  {
    dotColor: 'var(--grad)',
    title: 'Đỉnh tích hợp năng lực (Master)',
    paragraphs: [
      'Năng lực làm chủ hội tụ dần: <b>Dự án I → II → III (HK5–6–7) → Thực tập nghề nghiệp 5 TC (kỳ hè sau HK6) → Khóa luận / Dự án tốt nghiệp (HK8)</b>. Thực tập đặt ở kỳ hè để trải nghiệm nghề sớm. Mỗi Project neo hai tiêu chí bắt buộc (tác động xã hội–môi trường–bền vững; đạo đức &amp; bảo vệ dữ liệu) → PLO14, PLO15 cho 100% sinh viên (constructive alignment, AUN-QA).',
    ],
  },
];

export const footerHtml =
  'Bản dựng khung điều chỉnh 2026 — <b>135 tín chỉ</b> · Nhóm 2 (giữ 15 chuẩn đầu ra, tái cấu trúc 5 khối → 3 thành phần) · Đồng bộ với Quyển Khung 135 TC, Bản đặc tả Mẫu 952 và Bảng tương đương học phần. Học phần tự chọn hiển thị đại diện theo mô đun; danh mục đầy đủ xem Quyển Khung. Lộ trình là <b>gợi ý chuẩn</b> — sinh viên điều chỉnh theo tư vấn học tập.';
