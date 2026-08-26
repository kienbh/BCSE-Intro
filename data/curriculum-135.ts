// Khung ĐIỀU CHỈNH 135 TC — mã ngành 7480101, áp dụng từ khóa tuyển sinh 2026.
// Nguồn chuẩn: QUYEN_KHUNG_CHUONG_TRINH_BCSE_135TC.docx (Nộp QA 22/8/2026).
// Chạy song hành với khung hiện hành 152 TC (curriculum-152.ts) cho khóa cũ.

export const programStructure135 = {
  totalCredits: 135,
  majorCode: '7480101',
  creditBlocks: [
    { code: 'I.1', name: 'Khối ĐHQGHN', credits: 26, detail: 'Lý luận chính trị + Tiếng Anh + Nhập môn ĐHQGHN' },
    { code: 'I.2', name: 'Đại cương ĐHVN', credits: 15, detail: 'Bắt buộc (7) + Tự chọn (8)' },
    { code: 'I.3', name: 'Toán & KH cơ bản', credits: 20, detail: 'Giải tích, ĐSTT, Vật lý, Toán rời rạc, XS–TK, Nhập môn lập trình' },
    { code: 'II.1', name: 'Cơ sở ngành', credits: 18, detail: 'Bắt buộc (16) + Ngoại ngữ chuyên ngành (2)' },
    { code: 'II.2', name: 'Cốt lõi ngành', credits: 41, detail: 'Bắt buộc (23) + Tự chọn 5 mô đun (18)' },
    { code: 'II.3', name: 'Tốt nghiệp', credits: 10, detail: 'Khóa luận hoặc Dự án TN + 2 học phần' },
    { code: 'III', name: 'Thực tập', credits: 5, detail: 'Thực tập nghề nghiệp — kỳ hè sau HK6' },
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
}

// II.2.2 — 5 mô đun định hướng (2 trụ không cửa ngõ + 3 mô đun cửa ngõ)
export const modules135: Module135[] = [
  {
    id: 'se',
    name: 'Công nghệ phần mềm',
    nameEN: 'Software Engineering',
    desc: 'Trụ không cửa ngõ — học sâu ngay từ nền bắt buộc.',
  },
  {
    id: 'dsai',
    name: 'KHDL & Trí tuệ nhân tạo',
    nameEN: 'Data Science & AI',
    desc: 'Trụ không cửa ngõ — học sâu ngay từ nền bắt buộc.',
  },
  {
    id: 'aiot',
    name: 'AIoT',
    nameEN: 'AIoT',
    gateway: 'CSE3069 · Phát triển ứng dụng IoT',
    desc: 'Kỹ thuật máy tính liên ngành: IoT thông minh, hệ nhúng.',
  },
  {
    id: 'ic',
    name: 'Thiết kế vi mạch',
    nameEN: 'IC Design',
    gateway: 'CSE3043 · Mạch logic và kỹ thuật số',
    desc: 'Thiết kế vi mạch số, phần cứng chuyên dụng.',
  },
  {
    id: 'fintech',
    name: 'Công nghệ tài chính',
    nameEN: 'Fintech',
    gateway: 'CSE3042 · Công nghệ tài chính',
    desc: 'Liên ngành công nghệ – tài chính, phân tích dữ liệu tài chính.',
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

// Tải tín chỉ BẮT BUỘC theo kỳ (chưa gồm tự chọn) — validate tổng = 135
export const semesterPlan135 = [
  { sem: 1, credits: 20 },
  { sem: 2, credits: 19, note: 'Hè: GDQP–AN' },
  { sem: 3, credits: 14 },
  { sem: 4, credits: 11 },
  { sem: 5, credits: 13, note: 'Dự án I' },
  { sem: 6, credits: 13, note: 'Dự án II · Hè: Thực tập 5 TC' },
  { sem: 7, credits: 2, note: 'Dự án III + tự chọn mô đun' },
  { sem: 8, credits: 10, note: 'Tốt nghiệp' },
];
