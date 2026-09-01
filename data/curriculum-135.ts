// Khung ĐIỀU CHỈNH 135 TC — mã ngành 7480101, áp dụng từ khóa tuyển sinh 2026.
// Nguồn chuẩn: QUYEN_KHUNG_CHUONG_TRINH_BCSE_135TC.docx + Ke_hoach_hoc_tap_BCSE_135TC.html
// (Nộp QA 22/8/2026). Chạy song hành với khung hiện hành 152 TC (curriculum-152.ts).
import type { YearBlock } from './curriculum';

export const programStructure135 = {
  totalCredits: 135,
  majorCode: '7480101',
  // reqCredits = bắt buộc, optCredits = tự chọn (cộng lại = credits).
  // Tổng: BB 107 + TC 28 = 135.
  creditBlocks: [
    { code: 'I.1', name: 'Khối ĐHQGHN', credits: 26, reqCredits: 26, optCredits: 0, detail: 'Lý luận chính trị + Tiếng Anh + Nhập môn ĐHQGHN' },
    { code: 'I.2', name: 'Đại cương ĐHVN', credits: 15, reqCredits: 7, optCredits: 8, detail: 'Đại cương ĐHVN' },
    { code: 'I.3', name: 'Toán & KH cơ bản', credits: 20, reqCredits: 20, optCredits: 0, detail: 'Giải tích, ĐSTT, Vật lý, Toán rời rạc, XS–TK, Nhập môn lập trình' },
    { code: 'II.1', name: 'Cơ sở ngành', credits: 18, reqCredits: 16, optCredits: 2, detail: 'Bắt buộc 16 + Ngoại ngữ chuyên ngành 2 (chọn 1)' },
    { code: 'II.2', name: 'Cốt lõi ngành', credits: 41, reqCredits: 23, optCredits: 18, detail: 'Cốt lõi bắt buộc + tự chọn 5 mô đun' },
    { code: 'II.3', name: 'Tốt nghiệp', credits: 10, reqCredits: 10, optCredits: 0, detail: 'Khóa luận hoặc Dự án TN + 2 học phần' },
    { code: 'III', name: 'Thực tập', credits: 5, reqCredits: 5, optCredits: 0, detail: 'Thực tập nghề nghiệp — kỳ hè sau HK6' },
  ],
  degreeTitle: 'Cử nhân Khoa học và Kỹ thuật Máy tính',
  degreeTitleEN: 'Bachelor of Computer Science and Engineering',
  duration: '4 năm (8 kỳ)',
  partnerNote: 'Hợp tác với 7 trường đại học lớn tại Nhật Bản. Đại học Tokyo là đối tác chính.',
  englishLevel: 'Tốt nghiệp đạt trình độ B2/Bậc 4 tiếng Anh',
};

// II.2.1 — Cốt lõi bắt buộc 23 TC, phủ cả 2 trụ SE + DS·AI
export const coreRequired135 = [
  { code: 'CSE3041', name: 'Công nghệ phần mềm', credits: 2 },
  { code: 'CSE3010', name: 'Lập trình nâng cao', credits: 2 },
  { code: 'CSE3050', name: 'Trí tuệ nhân tạo', credits: 2 },
  { code: 'CSE3040', name: 'Khoa học dữ liệu', credits: 3 },
  { code: 'CSE3057', name: 'Học máy', credits: 3 },
  { code: 'CSE3065', name: 'Phân tích & thiết kế hệ thống', credits: 2 },
  { code: 'CSE3021', name: 'An ninh thông tin', credits: 3 },
  { code: 'CSE3079', name: 'Dự án I', credits: 2 },
  { code: 'CSE3080', name: 'Dự án II', credits: 2 },
  { code: 'CSE3081', name: 'Dự án III', credits: 2 },
];

export interface Module135 {
  id: string;
  name: string;
  nameEN: string;
  gateway?: string;
  desc: string;
  courses: { code: string; name: string; credits: number }[];
}

// II.2.2 — 5 mô đun định hướng (2 trụ không cửa ngõ + 3 mô đun cửa ngõ)
export const modules135: Module135[] = [
  {
    id: 'dsai',
    name: 'KHDL & Trí tuệ nhân tạo',
    nameEN: 'Data Science & AI',
    desc: 'Trụ không cửa ngõ — mở tiếp từ nền bắt buộc.',
    courses: [
      { code: 'CSE3051', name: 'Kỹ nghệ AI và MLOps', credits: 3 },
      { code: 'CSE3062', name: 'Thị giác máy tính', credits: 3 },
      { code: 'CSE3082', name: 'Xử lý ngôn ngữ tự nhiên', credits: 3 },
      { code: 'CSE3083', name: 'Học tăng cường', credits: 3 },
      { code: 'CSE3084', name: 'Học máy trên đồ thị', credits: 3 },
      { code: 'CSE3060', name: 'Tính toán song song', credits: 3 },
      { code: 'CSE3064', name: 'Vận trù học', credits: 3 },
      { code: 'CSE3085', name: 'Khoa học nhận thức', credits: 3 },
    ],
  },
  {
    id: 'se',
    name: 'Công nghệ phần mềm',
    nameEN: 'Software Engineering',
    desc: 'Trụ không cửa ngõ — mở tiếp từ nền bắt buộc.',
    courses: [
      { code: 'CSE3052', name: 'Phát triển ứng dụng Web', credits: 3 },
      { code: 'CSE3053', name: 'Phát triển ứng dụng di động', credits: 3 },
      { code: 'CSE3056', name: 'Phát triển ứng dụng nâng cao', credits: 3 },
      { code: 'CSE3059', name: 'Điện toán đám mây', credits: 3 },
      { code: 'CSE3061', name: 'Tương tác người – máy', credits: 3 },
      { code: 'CSE3066', name: 'Đánh giá hiệu năng hệ thống', credits: 3 },
      { code: 'CSE3077', name: 'Đảm bảo chất lượng phần mềm', credits: 3 },
      { code: 'CSE3086', name: 'Lập trình với trí tuệ nhân tạo', credits: 3 },
    ],
  },
  {
    id: 'aiot',
    name: 'AIoT — Trí tuệ nhân tạo vạn vật',
    nameEN: 'AIoT',
    gateway: 'CSE3069',
    desc: 'Qua cửa ngõ CSE3069 trước khi học chuyên sâu.',
    courses: [
      { code: 'CSE3069', name: 'Phát triển ứng dụng IoT', credits: 3 },
      { code: 'CSE3070', name: 'Mạng cảm biến không dây', credits: 3 },
      { code: 'CSE3073', name: 'Lập trình nhúng nâng cao (RTOS/STM32)', credits: 3 },
      { code: 'CSE3075', name: 'Điện toán biên và AIoT (Edge AI)', credits: 3 },
      { code: 'CSE3076', name: 'An toàn hệ thống nhúng và IoT', credits: 3 },
    ],
  },
  {
    id: 'ic',
    name: 'Thiết kế vi mạch',
    nameEN: 'IC Design',
    gateway: 'CSE3043',
    desc: 'Qua cửa ngõ CSE3043 trước khi học chuyên sâu.',
    courses: [
      { code: 'CSE3043', name: 'Mạch logic và kỹ thuật số', credits: 3 },
      { code: 'CSE3036', name: 'Thiết kế luận lý số (FPGA)', credits: 3 },
      { code: 'CSE3047', name: 'Thiết kế hệ thống số với HDL', credits: 3 },
      { code: 'CSE3048', name: 'Thiết kế hệ thống SoC', credits: 3 },
      { code: 'CSE3078', name: 'Thiết kế vi mạch số', credits: 3 },
    ],
  },
  {
    id: 'fintech',
    name: 'Công nghệ tài chính',
    nameEN: 'Fintech',
    gateway: 'CSE3042',
    desc: 'Qua cửa ngõ CSE3042 trước khi học chuyên sâu.',
    courses: [
      { code: 'CSE3042', name: 'Công nghệ tài chính', credits: 3 },
      { code: 'CSE3054', name: 'Quản lý và phân tích dữ liệu tài chính', credits: 3 },
      { code: 'CSE3055', name: 'Công nghệ tài chính và ứng dụng', credits: 3 },
      { code: 'CSE3067', name: 'Học máy trong kinh tế và tài chính', credits: 3 },
      { code: 'CSE3087', name: 'Mật mã ứng dụng và an toàn giao dịch', credits: 3 },
    ],
  },
];

// 3 Dự án xuyên suốt HK5–HK7 (mỗi dự án neo tiêu chí bền vững + đạo đức dữ liệu)
export const projects135 = [
  { code: 'CSE3079', title: 'Dự án I', sem: 'HK5', desc: 'Củng cố nền tảng chung trước khi rẽ hướng.' },
  { code: 'CSE3080', title: 'Dự án II', sem: 'HK6', desc: 'Đào sâu định hướng: thuần SE, thuần DS·AI hoặc tích hợp cả hai.' },
  { code: 'CSE3081', title: 'Dự án III', sem: 'HK7', desc: 'Bước đệm tốt nghiệp — capstone theo định hướng đã chọn.' },
];

// II.3 — Tốt nghiệp 10 TC, chọn 1 trong 2 phương án
export const graduation135 = [
  {
    code: 'CSE4050',
    title: 'Phương án 1 · Khóa luận tốt nghiệp',
    credits: '10 TC',
    condition: 'Điều kiện GPA ≥ 3,0',
  },
  {
    code: 'CSE4051',
    title: 'Phương án 2 · Dự án tốt nghiệp + 2 học phần tự chọn',
    credits: '4 + 6 TC',
    condition: 'Áp dụng mọi GPA (GPA dưới 3,0 bắt buộc phương án này)',
  },
];

// Kế hoạch học tập chuẩn 8 kỳ — theo Ke_hoach_hoc_tap_BCSE_135TC.html (lộ trình gợi ý,
// SV điều chỉnh theo tư vấn học tập). credits = TC bắt buộc của kỳ, chưa gồm tự chọn.
export const yearBlocks135: YearBlock[] = [
  {
    year: 1,
    title: 'Nền tảng đại cương',
    titleEN: 'Foundation',
    theme: 'Toán, vật lý, lập trình, tiếng Anh, tiếng Nhật, đại cương VJU',
    color: 'sky',
    semesters: [
      {
        semester: 1,
        credits: 20,
        required: [
          'PHI1006 · Triết học Mác – Lênin (3 TC)',
          'VNU1001 · Nhập môn công nghệ số & ứng dụng AI (3 TC)',
          'FLF1107 · Tiếng Anh B1 (5 TC)',
          'VJU2031 · Tiếng Nhật sơ cấp 1 (3 TC)',
          'VJU2002 · Giải tích 1 (2 TC)',
          'VJU2005 · Vật lý 1 (2 TC)',
          'AET2014 · Nhập môn lập trình (2 TC)',
          'Giáo dục thể chất · Kỹ năng bổ trợ (điều kiện)',
        ],
        elective: ['Tự chọn I.2.2 — 1 học phần (2 TC) · khuyến nghị Nhóm A (Khoa học bền vững)'],
      },
      {
        semester: 2,
        credits: 19,
        required: [
          'PEC1008 · Kinh tế chính trị Mác – Lênin (2 TC)',
          'FLF1108 · Tiếng Anh B2 (5 TC)',
          'VJU2032 · Tiếng Nhật sơ cấp 2 (2 TC)',
          'CSE3001 · Giải tích 2 (3 TC)',
          'VJU2030 · Đại số tuyến tính 2 (3 TC)',
          'VJU2006 · Vật lý 2 (2 TC)',
          'THL1057 · Nhà nước và pháp luật đại cương (2 TC)',
          'Giáo dục thể chất · Kỹ năng bổ trợ (điều kiện)',
        ],
        elective: ['Tự chọn I.2.2 — 1 học phần (2 TC) · Nhóm B–E'],
        note: 'Kỳ hè: Giáo dục quốc phòng – an ninh (điều kiện)',
      },
    ],
  },
  {
    year: 2,
    title: 'Cơ sở ngành & cửa ngõ',
    titleEN: 'Core Foundation & Gateways',
    theme: 'Cấu trúc dữ liệu, kiến trúc máy tính, CSDL, CNPM — mở cửa ngõ mô đun',
    color: 'indigo',
    semesters: [
      {
        semester: 3,
        credits: 14,
        required: [
          'PHI1002 · Chủ nghĩa xã hội khoa học (2 TC)',
          'VJU2001 · Phương pháp luận nghiên cứu khoa học (2 TC)',
          'CSE3003 · Toán rời rạc (3 TC)',
          'CSE3013 · Xác suất – Thống kê (3 TC)',
          'CSE3034 · Cấu trúc dữ liệu và giải thuật (2 TC)',
          'CSE3014 · Phương pháp số (2 TC)',
        ],
        elective: ['Tự chọn I.2.2 — 1–2 học phần (2–4 TC) · Nhóm B–E'],
      },
      {
        semester: 4,
        credits: 11,
        required: [
          'HIS1001 · Lịch sử Đảng Cộng sản Việt Nam (2 TC)',
          'CSE3015 · Lập trình hướng đối tượng (2 TC)',
          'CSE3032 · Kiến trúc máy tính (3 TC)',
          'CSE3012 · Nhập môn cơ sở dữ liệu (2 TC)',
          'CSE3041 · Công nghệ phần mềm (2 TC)',
        ],
        elective: [
          'Tự chọn I.2.2 — 1–2 học phần (2–4 TC)',
          'Ngoại ngữ chuyên ngành (chọn 1, 2 TC): CSE3016 Tiếng Anh · CSE3017 Tiếng Nhật',
          '◇ Cửa ngõ mô đun (3 TC/HP): CSE3069 IoT · CSE3043 Mạch logic · CSE3042 Công nghệ tài chính',
        ],
        note: 'Mở cửa ngõ 3 mô đun định hướng (AIoT · Vi mạch · Fintech)',
      },
    ],
  },
  {
    year: 3,
    title: 'Cốt lõi 2 trụ & Dự án I–II',
    titleEN: 'Core Pillars & Projects I–II',
    theme: 'SE + DS·AI cho mọi sinh viên, an ninh thông tin, thực tập hè',
    color: 'purple',
    semesters: [
      {
        semester: 5,
        credits: 13,
        required: [
          'POL1001 · Tư tưởng Hồ Chí Minh (2 TC)',
          'CSE3030 · Mạng máy tính và truyền thông (3 TC)',
          'CSE3033 · Nguyên lý hệ điều hành (2 TC)',
          'CSE3010 · Lập trình nâng cao (2 TC)',
          'CSE3050 · Trí tuệ nhân tạo (2 TC)',
          'CSE3079 · Dự án I (2 TC)',
        ],
        elective: [
          'Tự chọn cốt lõi 3–6 TC — hướng SE (Web, Mobile, Cloud…)',
          '◇ Cửa ngõ mô đun nếu chưa học ở HK4',
        ],
        note: 'Dự án I — củng cố nền tảng chung',
      },
      {
        semester: 6,
        credits: 13,
        required: [
          'CSE3040 · Khoa học dữ liệu (3 TC)',
          'CSE3057 · Học máy (3 TC, tiên quyết CSE3050)',
          'CSE3065 · Phân tích và thiết kế hệ thống (2 TC)',
          'CSE3080 · Dự án II (2 TC)',
          'CSE3021 · An ninh thông tin (3 TC)',
        ],
        elective: ['Tự chọn cốt lõi 3–6 TC — hướng AI (Thị giác máy tính, NLP, Học tăng cường…)'],
        note: 'Dự án II — đào sâu định hướng (SE / DS·AI) · Kỳ hè: CSE4001 Thực tập nghề nghiệp (5 TC)',
      },
    ],
  },
  {
    year: 4,
    title: 'Định hướng sâu & Tốt nghiệp',
    titleEN: 'Specialization & Graduation',
    theme: 'Dự án III, 12 TC mô đun định hướng, khóa luận / dự án tốt nghiệp',
    color: 'amber',
    semesters: [
      {
        semester: 7,
        credits: 2,
        required: ['CSE3081 · Dự án III (2 TC)'],
        elective: ['Tự chọn cốt lõi 12 TC — 4 học phần trong 5 mô đun định hướng'],
        note: 'Dự án III — bước đệm tốt nghiệp',
      },
      {
        semester: 8,
        credits: 10,
        required: [
          'Phương án 1: CSE4050 · Khóa luận tốt nghiệp (10 TC) — GPA ≥ 3,0',
          'Phương án 2: CSE4051 · Dự án tốt nghiệp (4 TC) + 2 học phần tự chọn tốt nghiệp (6 TC)',
        ],
        elective: [],
        note: 'GPA dưới 3,0 bắt buộc Phương án 2 · học phần PA2 không trùng tự chọn cốt lõi',
      },
    ],
  },
];
