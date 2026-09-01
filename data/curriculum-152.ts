// Khung HIỆN HÀNH 152 TC — mã thí điểm 7480204, áp dụng khóa 2025 trở về trước.
// Chạy song hành với khung điều chỉnh 135 TC (curriculum-135.ts) cho khóa 2026+.
import type { YearBlock } from './curriculum';

export const programStructure152 = {
  totalCredits: 152,
  majorCode: '7480204',
  // reqCredits = bắt buộc, optCredits = tự chọn (cộng lại = credits).
  // Tổng: BB 121 + TC 31 = 152. (M5: BB 20 + Thực tập 5 + Tốt nghiệp 10 = 35 BB, TC 21)
  creditBlocks: [
    { code: 'M1', name: 'Kiến thức chung', credits: 26, reqCredits: 26, optCredits: 0, detail: 'Đại cương (16) + Ngoại ngữ (10)' },
    { code: 'M2', name: 'Kiến thức theo lĩnh vực', credits: 30, reqCredits: 22, optCredits: 8, detail: 'Tự chọn 8/78 TC' },
    { code: 'M3', name: 'Kiến thức theo khối ngành', credits: 22, reqCredits: 20, optCredits: 2, detail: 'Tự chọn 2/4 TC' },
    { code: 'M4', name: 'Kiến thức theo nhóm ngành', credits: 18, reqCredits: 18, optCredits: 0, detail: 'Toàn bộ bắt buộc' },
    { code: 'M5', name: 'Kiến thức ngành', credits: 56, reqCredits: 35, optCredits: 21, detail: 'Cốt lõi 20 + Thực tập 5 + Tốt nghiệp 10; Tự chọn 21/86' },
  ],
  degreeTitle: 'Cử nhân Khoa học và Kỹ thuật Máy tính',
  degreeTitleEN: 'Bachelor of Computer Science and Engineering (Honors Program)',
  duration: '4 năm (8 kỳ)',
  partnerNote: 'Hợp tác với 7 trường đại học lớn tại Nhật Bản. Đại học Tokyo là đối tác chính.',
  englishLevel: 'Tốt nghiệp đạt trình độ B2/Bậc 4 tiếng Anh',
};

// ─────────────────────────────────────────────────────────────────────────
// SƠ ĐỒ TIẾN TRÌNH 152 TC — dữ liệu GIÀU (có MÃ học phần), dùng riêng cho
// component CurriculumFlow152. Mã lấy từ Quyển khung 152 TC (7480204).
// Placement học kỳ bám theo lộ trình chuẩn hiện có (yearBlocks152 bên dưới),
// đã áp dụng 2 chỉnh sửa của thầy:
//   1) CSE3045 "Học theo dự án khoa học và kỹ thuật" = BẮT BUỘC M5, mở ở HK6.
//   2) CSE3068 "Lý thuyết trò chơi" = TỰ CHỌN (định hướng AI & DS), KHÔNG bắt buộc.
// ─────────────────────────────────────────────────────────────────────────
export interface Flow152Course {
  code: string;
  name: string;
  credits: number;
  block: 'M1' | 'M2' | 'M3' | 'M4' | 'M5';
  /** Mã học phần tiên quyết (nếu có) */
  pre?: string;
}
/** Khóa màu mô đun định hướng — khớp bảng màu bản 135 (KIND). */
export type Flow152Color = 'ai' | 'se' | 'iot' | 'ic' | 'ft';

export interface Flow152Elective {
  /** Tên nhóm/định hướng, vd "AI & DS", "Nhóm A · Khoa học bền vững" */
  group: string;
  note?: string;
  items: { code?: string; name: string; credits?: number }[];
  /** true = chỉ hiện con trỏ gọn trong cột kỳ (danh mục đầy đủ ở mục dưới) */
  compact?: boolean;
  /** Màu mô đun (dùng cho danh mục 5 định hướng — mỗi khung một màu) */
  color?: Flow152Color;
}

/** Học phần kỳ hè — tc có thể là số (Thực tập) hoặc 'ĐK' (điều kiện, GDQP-AN). */
export interface Flow152Summer {
  code: string;
  name: string;
  credits: number | string;
}

export interface Flow152Term {
  year: string;
  hk: string;
  required: Flow152Course[];
  electives?: Flow152Elective[];
  /** Học phần kỳ hè (thực tập / GDQP-AN) hiển thị sau kỳ */
  summer?: Flow152Summer[];
  /** Nhãn kỳ hè (vd "☀ Kỳ hè (sau HK2)") */
  summerLabel?: string;
  /** Kỳ tốt nghiệp (khóa luận) */
  grad?: boolean;
}

// Danh mục tự chọn ngành M5 gom theo ĐỊNH HƯỚNG (dùng lại ở các kỳ chuyên ngành).
const AIDS_ELECTIVE: Flow152Elective = {
  group: 'AI & Khoa học dữ liệu',
  color: 'ai',
  items: [
    { code: 'CSE3050', name: 'Trí tuệ nhân tạo', credits: 3 },
    { code: 'CSE3057', name: 'Học máy', credits: 3 },
    { code: 'CSE3060', name: 'Tính toán song song', credits: 3 },
    { code: 'CSE3062', name: 'Thị giác máy tính', credits: 3 },
    { code: 'CSE3063', name: 'Xử lý thông tin âm thanh và hình ảnh', credits: 3 },
    { code: 'CSE3064', name: 'Vận trù học', credits: 3 },
    { code: 'CSE3068', name: 'Lý thuyết trò chơi', credits: 3 },
    { code: 'CSE3051', name: 'Các công cụ trong AI', credits: 3 },
  ],
};
const SE_ELECTIVE: Flow152Elective = {
  group: 'Công nghệ phần mềm (SE)',
  color: 'se',
  items: [
    { code: 'CSE3052', name: 'Phát triển ứng dụng Web', credits: 3 },
    { code: 'CSE3053', name: 'Phát triển ứng dụng di động', credits: 3 },
    { code: 'CSE3056', name: 'Phát triển ứng dụng nâng cao', credits: 3 },
    { code: 'CSE3059', name: 'Điện toán đám mây', credits: 3 },
    { code: 'CSE3061', name: 'Tương tác người và máy', credits: 3 },
    { code: 'CSE3065', name: 'Phân tích và thiết kế hệ thống', credits: 3 },
    { code: 'CSE3066', name: 'Đánh giá hiệu năng hệ thống', credits: 3 },
    { code: 'CSE3077', name: 'Đảm bảo chất lượng phần mềm', credits: 3 },
  ],
};
const IOT_ELECTIVE: Flow152Elective = {
  group: 'Hệ thống nhúng & IoT',
  color: 'iot',
  items: [
    { code: 'CSE3069', name: 'Phát triển ứng dụng IoT', credits: 3 },
    { code: 'CSE3070', name: 'Mạng cảm biến không dây', credits: 3 },
  ],
};
const IC_ELECTIVE: Flow152Elective = {
  group: 'Thiết kế vi mạch (IC)',
  color: 'ic',
  items: [
    { code: 'CSE3078', name: 'Thiết kế vi mạch số', credits: 3 },
  ],
};
const FINTECH_ELECTIVE: Flow152Elective = {
  group: 'Fintech',
  color: 'ft',
  items: [
    { code: 'CSE3042', name: 'Công nghệ tài chính', credits: 3 },
    { code: 'CSE3054', name: 'Quản lý và phân tích dữ liệu tài chính', credits: 3 },
    { code: 'CSE3055', name: 'Công nghệ tài chính và ứng dụng', credits: 3 },
    { code: 'CSE3067', name: 'Học máy trong kinh tế và tài chính', credits: 3 },
    { code: 'CSE3071', name: 'Lý thuyết tài chính tiền tệ', credits: 2 },
    { code: 'CSE3072', name: 'Tài chính doanh nghiệp', credits: 2 },
    { code: 'JPS3034', name: 'Kinh tế học vi mô', credits: 3 },
    { code: 'JPS3035', name: 'Kinh tế học vĩ mô', credits: 3 },
    { code: 'JPS3036', name: 'Marketing', credits: 2 },
    { code: 'JPS3038', name: 'Nguyên lý kế toán', credits: 2 },
  ],
};

// Danh mục tự chọn ngành M5 — hiển thị ĐẦY ĐỦ MỘT LẦN ở mục dưới bảng (tránh
// lặp lại toàn bộ trong từng cột kỳ → "ôm đồm").
export const electiveCatalog152: Flow152Elective[] = [
  AIDS_ELECTIVE,
  SE_ELECTIVE,
  IOT_ELECTIVE,
  IC_ELECTIVE,
  FINTECH_ELECTIVE,
];

// Con trỏ GỌN dùng trong cột kỳ chuyên ngành (HK5–HK7): chỉ 1 dòng, trỏ xuống
// danh mục đầy đủ bên dưới thay vì liệt kê ~30 học phần mỗi kỳ.
const ELECTIVE_HINT: Flow152Elective = {
  group: 'Chọn học phần theo định hướng',
  note: 'AI&DS · SE · IoT · Vi mạch (IC) · Fintech — xem danh mục đầy đủ ở mục “Tự chọn ngành theo định hướng” bên dưới ↓',
  items: [],
  compact: true,
};

export const flow152: Flow152Term[] = [
  {
    year: 'Năm 1',
    hk: 'Học kỳ 1',
    required: [
      { code: 'PHI1006', name: 'Triết học Mác – Lênin', credits: 3, block: 'M1' },
      { code: 'VNU1001', name: 'Nhập môn công nghệ số & ứng dụng AI', credits: 3, block: 'M1' },
      { code: 'FLF1107', name: 'Tiếng Anh B1', credits: 5, block: 'M1' },
      { code: 'VJU2031', name: 'Tiếng Nhật sơ cấp 1', credits: 3, block: 'M2' },
      { code: 'VJU2002', name: 'Giải tích 1', credits: 2, block: 'M2' },
      { code: 'VJU2030', name: 'Đại số tuyến tính 2', credits: 3, block: 'M2' },
      { code: 'VJU2005', name: 'Vật lý 1', credits: 2, block: 'M2' },
      { code: 'AET2014', name: 'Nhập môn lập trình', credits: 2, block: 'M2' },
      { code: 'VJU2012', name: 'Khoa học toàn cầu và môi trường', credits: 2, block: 'M2' },
    ],
  },
  {
    year: 'Năm 1',
    hk: 'Học kỳ 2',
    required: [
      { code: 'PEC1008', name: 'Kinh tế chính trị Mác – Lênin', credits: 2, block: 'M1', pre: 'PHI1006' },
      { code: 'FLF1108', name: 'Tiếng Anh B2', credits: 5, block: 'M1' },
      { code: 'VJU2032', name: 'Tiếng Nhật sơ cấp 2', credits: 2, block: 'M2', pre: 'VJU2031' },
      { code: 'AET2015', name: 'Nhập môn hệ thống máy tính', credits: 2, block: 'M2' },
      { code: 'VJU2006', name: 'Vật lý 2', credits: 2, block: 'M2' },
      { code: 'CSE3001', name: 'Giải tích 2', credits: 3, block: 'M3' },
      { code: 'CSE3011', name: 'Lập trình hướng đối tượng', credits: 3, block: 'M3' },
    ],
    electives: [
      {
        group: 'Tự chọn theo lĩnh vực (M2 · 8/78 TC — chọn rải các kỳ)',
        note: 'Nhóm A–E; mỗi học phần 2 TC',
        items: [
          { code: 'AET2021', name: 'Thí nghiệm trong KH&KT 1', credits: 2 },
          { code: 'AET2012', name: 'Khoa học thông tin', credits: 2 },
          { code: 'INE1052', name: 'Kinh tế lượng', credits: 2 },
        ],
      },
    ],
    summerLabel: '☀ Kỳ hè (sau HK2)',
    summer: [{ code: '—', name: 'Giáo dục quốc phòng – an ninh', credits: 'ĐK' }],
  },
  {
    year: 'Năm 2',
    hk: 'Học kỳ 3',
    required: [
      { code: 'PHI1002', name: 'Chủ nghĩa xã hội khoa học', credits: 2, block: 'M1', pre: 'PHI1006' },
      { code: 'CSE3004', name: 'Xác suất – Thống kê', credits: 3, block: 'M3' },
      { code: 'CSE3003', name: 'Toán rời rạc', credits: 3, block: 'M3' },
      { code: 'CSE3032', name: 'Kiến trúc máy tính', credits: 3, block: 'M4', pre: 'AET2015' },
      { code: 'CSE3047', name: 'Cấu trúc dữ liệu và giải thuật', credits: 3, block: 'M4' },
    ],
    electives: [
      {
        group: 'Tự chọn theo lĩnh vực (M2)',
        items: [
          { code: 'AET2022', name: 'Thí nghiệm trong KH&KT 2', credits: 2 },
          { code: 'AET2013', name: 'Phân tích dữ liệu khoa học', credits: 2 },
          { code: 'AET2017', name: 'Mô phỏng toán học', credits: 2 },
        ],
      },
    ],
  },
  {
    year: 'Năm 2',
    hk: 'Học kỳ 4',
    required: [
      { code: 'HIS1001', name: 'Lịch sử Đảng Cộng sản Việt Nam', credits: 2, block: 'M1' },
      { code: 'VJU2001', name: 'Phương pháp luận nghiên cứu khoa học', credits: 2, block: 'M2' },
      { code: 'CSE3033', name: 'Nguyên lý hệ điều hành', credits: 3, block: 'M4' },
      { code: 'CSE3012', name: 'Nhập môn cơ sở dữ liệu', credits: 3, block: 'M3' },
      { code: 'CSE3005', name: 'Phương pháp số', credits: 2, block: 'M3' },
      { code: 'CSE3043', name: 'Mạch logic và kỹ thuật số', credits: 3, block: 'M4' },
    ],
    electives: [
      {
        group: 'Tự chọn theo khối ngành (M3 · 2/6 TC)',
        items: [
          { code: 'CSE3021', name: 'Tiếng Anh chuyên ngành', credits: 2 },
          { code: 'CSE3022', name: 'Tiếng Nhật chuyên ngành', credits: 2 },
          { code: 'AET2016', name: 'Thuật toán', credits: 2 },
        ],
      },
    ],
  },
  {
    year: 'Năm 3',
    hk: 'Học kỳ 5',
    required: [
      { code: 'POL1001', name: 'Tư tưởng Hồ Chí Minh', credits: 2, block: 'M1' },
      { code: 'CSE3010', name: 'Lập trình nâng cao', credits: 3, block: 'M3' },
      { code: 'CSE3036', name: 'Thiết kế luận lý số', credits: 3, block: 'M4' },
      { code: 'CSE3030', name: 'Mạng máy tính và truyền thông', credits: 3, block: 'M4' },
      { code: 'CSE3040', name: 'Khoa học dữ liệu', credits: 3, block: 'M5' },
    ],
    electives: [ELECTIVE_HINT],
  },
  {
    year: 'Năm 3',
    hk: 'Học kỳ 6',
    required: [
      { code: 'CSE3047', name: 'Thiết kế hệ thống số với HDL', credits: 3, block: 'M5' },
      { code: 'CSE3041', name: 'Công nghệ phần mềm', credits: 3, block: 'M5', pre: 'CSE3011' },
      { code: 'CSE3021', name: 'An ninh thông tin', credits: 3, block: 'M5' },
      { code: 'CSE3045', name: 'Học theo dự án khoa học và kỹ thuật', credits: 3, block: 'M5' },
      { code: 'CSE3048', name: 'Thiết kế hệ thống SoC', credits: 3, block: 'M5' },
      { code: 'CSE3049', name: 'Đồ án theo chuyên ngành (theo định hướng SV chọn)', credits: 2, block: 'M5' },
    ],
    electives: [ELECTIVE_HINT],
    summerLabel: '☀ Kỳ hè (sau HK6)',
    summer: [
      { code: 'CSE4001', name: 'Thực tập nghề nghiệp', credits: 3 },
      { code: 'CSE4002', name: 'Thực hành hướng nghiệp', credits: 2 },
    ],
  },
  {
    year: 'Năm 4',
    hk: 'Học kỳ 7',
    required: [],
    electives: [ELECTIVE_HINT],
  },
  {
    year: 'Năm 4',
    hk: 'Học kỳ 8',
    required: [
      { code: 'CSE4050', name: 'Khóa luận tốt nghiệp', credits: 10, block: 'M5' },
    ],
    grad: true,
  },
];

export const yearBlocks152: YearBlock[] = [
  {
    year: 1,
    title: 'Kiến thức chung',
    titleEN: 'General Knowledge',
    theme: 'Toán, lập trình, tiếng Anh, tiếng Nhật, vật lý',
    color: 'sky',
    semesters: [
      {
        semester: 1,
        required: [
          'Triết học Mác – Lênin',
          'Nhập môn công nghệ số & ứng dụng AI',
          'Tiếng Anh B1',
          'Giải tích 1',
          'Đại số tuyến tính 2',
          'Vật lý 1',
          'Nhập môn lập trình',
          'Khoa học toàn cầu và môi trường',
        ],
        elective: ['Tự chọn từ khối học phần thế kỷ 21'],
      },
      {
        semester: 2,
        required: [
          'Kinh tế chính trị Mác – Lênin',
          'Tiếng Anh B2',
          'Tiếng Nhật sơ cấp 2',
          'Nhập môn hệ thống máy tính',
          'Vật lý 2',
          'Giải tích 2',
          'Lập trình hướng đối tượng',
        ],
        elective: ['Thí nghiệm trong KHKT 1', 'Khoa học thông tin', 'Kinh tế lượng'],
      },
    ],
  },
  {
    year: 2,
    title: 'Kiến thức cơ sở ngành',
    titleEN: 'Core Foundation',
    theme: 'Cấu trúc dữ liệu, thuật toán, cơ sở dữ liệu, hệ điều hành',
    color: 'indigo',
    semesters: [
      {
        semester: 3,
        required: [
          'Chủ nghĩa xã hội khoa học',
          'Xác suất – Thống kê',
          'Toán rời rạc',
          'Kiến trúc máy tính',
          'Cấu trúc dữ liệu và giải thuật',
        ],
        elective: ['Thí nghiệm trong KHKT 2', 'Phân tích dữ liệu khoa học', 'Mô phỏng toán học'],
      },
      {
        semester: 4,
        required: [
          'Lịch sử Đảng Cộng sản Việt Nam',
          'Phương pháp luận trong NCKH',
          'Nguyên lý hệ điều hành',
          'Nhập môn cơ sở dữ liệu',
          'Phương pháp số',
          'Mạch logic và kỹ thuật số',
        ],
        elective: ['Thuật toán', 'Tiếng Anh chuyên ngành', 'Tiếng Nhật chuyên ngành'],
      },
    ],
  },
  {
    year: 3,
    title: 'Kiến thức chuyên ngành',
    titleEN: 'Specialization',
    theme: 'Chuyên sâu theo định hướng: AI, Software, Fintech, IoT, IC',
    color: 'purple',
    semesters: [
      {
        semester: 5,
        required: [
          'Tư tưởng Hồ Chí Minh',
          'Lập trình nâng cao',
          'Thiết kế luận lý số',
          'Mạng máy tính và truyền thông',
          'Khoa học dữ liệu',
        ],
        elective: [
          'Trí tuệ nhân tạo (*)',
          'XLTT âm thanh và hình ảnh (*)',
          'Phát triển ứng dụng Web (*)',
          'Tương tác người và máy (*)',
          'Điện toán đám mây (*)',
        ],
        note: 'Bắt đầu chọn định hướng chuyên ngành',
      },
      {
        semester: 6,
        required: [
          'Thiết kế hệ thống số với HDL',
          'Công nghệ phần mềm',
          'An ninh thông tin',
          'Học theo dự án KH và KT',
          'Thiết kế hệ thống SoC',
          'Đồ án theo chuyên ngành',
        ],
        elective: [
          'AI & DS: Học máy (*), Tính toán song song (*)',
          'SE: Phát triển ứng dụng di động (*), Phân tích và thiết kế HT',
          'Fintech: Kinh tế vi mô, Kinh tế vĩ mô, Marketing, Công nghệ tài chính',
        ],
        note: 'Thực tập nghề nghiệp + Thực hành hướng nghiệp (kỳ hè)',
      },
    ],
  },
  {
    year: 4,
    title: 'Khóa luận & Hướng nghiệp',
    titleEN: 'Thesis & Career',
    theme: 'Khóa luận tốt nghiệp, chuyên sâu theo định hướng',
    color: 'amber',
    semesters: [
      {
        semester: 7,
        required: [],
        elective: [
          'AI & DS: Thị giác máy tính (*)',
          'IC Design: Thiết kế vi mạch số (*)',
          'IoT: Phát triển ứng dụng IoT, Mạng cảm biến không dây',
          'SE: Đảm bảo chất lượng PM, Đánh giá hiệu năng HT (*)',
          'Fintech: Phân tích dữ liệu tài chính (*), Tài chính doanh nghiệp (*)',
        ],
        note: 'Tự chọn 3-4 môn theo định hướng chuyên môn',
      },
      {
        semester: 8,
        required: ['Khóa luận tốt nghiệp'],
        elective: ['Toán kỹ thuật', 'Các công cụ trong AI'],
      },
    ],
  },
];
