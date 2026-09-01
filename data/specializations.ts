import type { Localized } from '@/lib/localized';

export type CourseType = 'required' | 'elective' | 'practice';

export interface SpecCourse {
  /** Mã học phần theo Quyển chương trình 152 TC (7480204) */
  code?: string;
  name: string;
  /** Số tín chỉ */
  credits?: number;
  semester?: string;
  star?: boolean;
  /** required = Bắt buộc · elective = Tự chọn · practice = Thực tập & Khóa luận */
  type: CourseType;
}

export interface Specialization {
  id: string;
  name: Localized<string>;
  nameEN: string;
  description: Localized<string>;
  icon: string;
  color: string;
  logo: string;
  keySubjects: string[];
  careers: string[];
  courses: SpecCourse[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Dữ liệu môn học từng định hướng — RÀ THEO Quyển chương trình BCSE 152 TC.
//   • Mã + tên + số TC lấy đúng khung; BB (bắt buộc) / TC (tự chọn) theo khối:
//     M2/M3/M4 bắt buộc → required; M2/M3 tự chọn (AET20xx…) → elective;
//     M5.1 cốt lõi bắt buộc (CSE3040/3041/3021·AnninhTT/3045/3047·HDL/3048/3049)
//     → required; M5.2 (CSE3050+, JPS…) → elective; CSE4001/4002/4050 → practice.
//   • ★ = học phần đánh dấu (*) "cốt lõi định hướng" trong Quyển khung.
//   • ⚠ Khung dùng LẶP mã cho 2 học phần khác nhau (giữ nguyên theo khung):
//     CSE3047 = "Cấu trúc dữ liệu và giải thuật" (M4) VÀ "Thiết kế hệ thống số
//     với HDL" (M5); CSE3021 = "Tiếng Anh chuyên ngành" (M3) VÀ "An ninh thông
//     tin" (M5). Học kỳ bám lộ trình chuẩn (flow152).
// ─────────────────────────────────────────────────────────────────────────────
export const specializations: Specialization[] = [
  {
    id: 'software-engineering',
    name: { vi: 'Công nghệ phần mềm', en: 'Software Engineering', ja: 'ソフトウェアエンジニアリング' },
    nameEN: 'Software Engineering',
    description: {
      vi: 'Phát triển phần mềm, web/mobile, kiến trúc hệ thống, DevOps, cloud computing.',
      en: 'Software development, web/mobile apps, system architecture, DevOps, cloud computing.',
      ja: 'ソフトウェア開発、Web/モバイル、システムアーキテクチャ、DevOps、クラウド。',
    },
    icon: 'Code',
    color: 'sky',
    logo: '',
    keySubjects: ['Công nghệ phần mềm', 'Web Development', 'Mobile Programming', 'Cloud Computing'],
    careers: ['Software Engineer', 'Full-stack Developer', 'DevOps Engineer'],
    courses: [
      { code: 'AET2014', name: 'Nhập môn lập trình', credits: 2, semester: 'Kỳ 1', type: 'required' },
      { code: 'CSE3011', name: 'Lập trình hướng đối tượng', credits: 3, semester: 'Kỳ 2', type: 'required' },
      { code: 'CSE3047', name: 'Cấu trúc dữ liệu và giải thuật', credits: 3, semester: 'Kỳ 3', type: 'required' },
      { code: 'CSE3010', name: 'Lập trình nâng cao', credits: 3, semester: 'Kỳ 5', type: 'required' },
      { code: 'CSE3052', name: 'Phát triển ứng dụng Web', credits: 3, semester: 'Kỳ 5', star: true, type: 'elective' },
      { code: 'CSE3061', name: 'Tương tác người và máy', credits: 3, semester: 'Kỳ 5', star: true, type: 'elective' },
      { code: 'CSE3059', name: 'Điện toán đám mây', credits: 3, semester: 'Kỳ 5', star: true, type: 'elective' },
      { code: 'CSE3041', name: 'Công nghệ phần mềm', credits: 3, semester: 'Kỳ 6', type: 'required' },
      { code: 'CSE3045', name: 'Học theo dự án khoa học và kỹ thuật', credits: 3, semester: 'Kỳ 6', star: true, type: 'required' },
      { code: 'CSE3053', name: 'Phát triển ứng dụng di động', credits: 3, semester: 'Kỳ 6', star: true, type: 'elective' },
      { code: 'CSE3065', name: 'Phân tích và thiết kế hệ thống', credits: 3, semester: 'Kỳ 6', type: 'elective' },
      { code: 'CSE3056', name: 'Phát triển ứng dụng nâng cao', credits: 3, semester: 'Kỳ 6', type: 'elective' },
      { code: 'CSE3049', name: 'Đồ án theo chuyên ngành (SE)', credits: 2, semester: 'Kỳ 6', type: 'required' },
      { code: 'CSE3077', name: 'Đảm bảo chất lượng phần mềm', credits: 3, semester: 'Kỳ 7', type: 'elective' },
      { code: 'CSE3066', name: 'Đánh giá hiệu năng hệ thống', credits: 3, semester: 'Kỳ 7', star: true, type: 'elective' },
      { code: 'CSE4001', name: 'Thực tập nghề nghiệp', credits: 3, semester: 'Kỳ 6 – hè', type: 'practice' },
      { code: 'CSE4002', name: 'Thực hành hướng nghiệp', credits: 2, semester: 'Kỳ 6 – hè', type: 'practice' },
      { code: 'CSE4050', name: 'Khóa luận tốt nghiệp', credits: 10, semester: 'Kỳ 8', type: 'practice' },
    ],
  },
  {
    id: 'data-science-ai',
    name: { vi: 'Khoa học dữ liệu & AI', en: 'Data Science & AI', ja: 'データサイエンス・AI' },
    nameEN: 'Data Science and AI',
    description: {
      vi: 'Machine Learning, Deep Learning, Computer Vision, NLP, xử lý dữ liệu lớn.',
      en: 'Machine Learning, Deep Learning, Computer Vision, NLP, big-data processing.',
      ja: '機械学習、ディープラーニング、コンピュータビジョン、NLP、ビッグデータ処理。',
    },
    icon: 'Brain',
    color: 'purple',
    logo: '',
    keySubjects: ['Trí tuệ nhân tạo', 'Machine Learning', 'Computer Vision', 'Deep Learning'],
    careers: ['AI Engineer', 'Data Scientist', 'ML Engineer'],
    courses: [
      { code: 'CSE3004', name: 'Xác suất – Thống kê', credits: 3, semester: 'Kỳ 3', type: 'required' },
      { code: 'CSE3003', name: 'Toán rời rạc', credits: 3, semester: 'Kỳ 3', type: 'required' },
      { code: 'CSE3047', name: 'Cấu trúc dữ liệu và giải thuật', credits: 3, semester: 'Kỳ 3', type: 'required' },
      { code: 'AET2013', name: 'Phân tích dữ liệu khoa học', credits: 2, semester: 'Kỳ 3', type: 'elective' },
      { code: 'CSE3040', name: 'Khoa học dữ liệu', credits: 3, semester: 'Kỳ 5', type: 'required' },
      { code: 'CSE3050', name: 'Trí tuệ nhân tạo', credits: 3, semester: 'Kỳ 5', star: true, type: 'elective' },
      { code: 'CSE3063', name: 'Xử lý thông tin âm thanh và hình ảnh', credits: 3, semester: 'Kỳ 5', star: true, type: 'elective' },
      { code: 'CSE3057', name: 'Học máy', credits: 3, semester: 'Kỳ 6', star: true, type: 'elective' },
      { code: 'CSE3060', name: 'Tính toán song song', credits: 3, semester: 'Kỳ 6', star: true, type: 'elective' },
      { code: 'CSE3049', name: 'Đồ án theo chuyên ngành (DS/AI)', credits: 2, semester: 'Kỳ 6', type: 'required' },
      { code: 'CSE3062', name: 'Thị giác máy tính', credits: 3, semester: 'Kỳ 7', star: true, type: 'elective' },
      { code: 'CSE3064', name: 'Vận trù học', credits: 3, semester: 'Kỳ 8', star: true, type: 'elective' },
      { code: 'CSE3051', name: 'Các công cụ trong AI', credits: 3, semester: 'Kỳ 8', type: 'elective' },
      { code: 'CSE4001', name: 'Thực tập nghề nghiệp', credits: 3, semester: 'Kỳ 6 – hè', type: 'practice' },
      { code: 'CSE4002', name: 'Thực hành hướng nghiệp', credits: 2, semester: 'Kỳ 6 – hè', type: 'practice' },
      { code: 'CSE4050', name: 'Khóa luận tốt nghiệp', credits: 10, semester: 'Kỳ 8', type: 'practice' },
    ],
  },
  {
    id: 'embedded-iot',
    name: { vi: 'Hệ thống nhúng & IoT', en: 'Embedded Systems & IoT', ja: '組込みシステム・IoT' },
    nameEN: 'Embedded Systems and IoT',
    description: {
      vi: 'Lập trình nhúng, IoT, robotics, automation, edge computing.',
      en: 'Embedded programming, IoT, robotics, automation, edge computing.',
      ja: '組込みプログラミング、IoT、ロボティクス、オートメーション、エッジコンピューティング。',
    },
    icon: 'CircuitBoard',
    color: 'emerald',
    logo: '',
    keySubjects: ['Hệ thống nhúng', 'IoT', 'Robotics', 'Sensor Networks'],
    careers: ['Embedded Engineer', 'IoT Developer', 'Robotics Engineer'],
    courses: [
      { code: 'AET2015', name: 'Nhập môn hệ thống máy tính', credits: 2, semester: 'Kỳ 2', type: 'required' },
      { code: 'AET2021', name: 'Thí nghiệm trong KH&KT 1', credits: 2, semester: 'Kỳ 2', type: 'elective' },
      { code: 'CSE3047', name: 'Cấu trúc dữ liệu và giải thuật', credits: 3, semester: 'Kỳ 3', type: 'required' },
      { code: 'CSE3032', name: 'Kiến trúc máy tính', credits: 3, semester: 'Kỳ 3', type: 'required' },
      { code: 'AET2022', name: 'Thí nghiệm trong KH&KT 2', credits: 2, semester: 'Kỳ 3', type: 'elective' },
      { code: 'CSE3033', name: 'Nguyên lý hệ điều hành', credits: 3, semester: 'Kỳ 4', type: 'required' },
      { code: 'CSE3030', name: 'Mạng máy tính và truyền thông', credits: 3, semester: 'Kỳ 5', type: 'required' },
      { code: 'CSE3049', name: 'Đồ án theo chuyên ngành (IoT)', credits: 2, semester: 'Kỳ 6', type: 'required' },
      { code: 'CSE3069', name: 'Phát triển ứng dụng IoT', credits: 3, semester: 'Kỳ 7', type: 'elective' },
      { code: 'CSE3070', name: 'Mạng cảm biến không dây', credits: 3, semester: 'Kỳ 7', type: 'elective' },
      { code: 'CSE4001', name: 'Thực tập nghề nghiệp', credits: 3, semester: 'Kỳ 6 – hè', type: 'practice' },
      { code: 'CSE4002', name: 'Thực hành hướng nghiệp', credits: 2, semester: 'Kỳ 6 – hè', type: 'practice' },
      { code: 'CSE4050', name: 'Khóa luận tốt nghiệp', credits: 10, semester: 'Kỳ 8', type: 'practice' },
    ],
  },
  {
    id: 'integrated-circuit',
    name: { vi: 'Thiết kế vi mạch', en: 'Integrated Circuit Design', ja: '集積回路設計' },
    nameEN: 'Integrated Circuit Design',
    description: {
      vi: 'Thiết kế vi mạch tích hợp, SoC, FPGA, xử lý tín hiệu số.',
      en: 'Integrated circuit design, SoC, FPGA, digital signal processing.',
      ja: '集積回路設計、SoC、FPGA、デジタル信号処理。',
    },
    icon: 'Cpu',
    color: 'red',
    logo: '',
    keySubjects: ['Thiết kế vi mạch', 'FPGA', 'SoC Design', 'Digital Signal Processing'],
    careers: ['IC Design Engineer', 'FPGA Engineer', 'Hardware Engineer'],
    courses: [
      { code: 'CSE3032', name: 'Kiến trúc máy tính', credits: 3, semester: 'Kỳ 3', type: 'required' },
      { code: 'CSE3043', name: 'Mạch logic và kỹ thuật số', credits: 3, semester: 'Kỳ 4', type: 'required' },
      { code: 'CSE3036', name: 'Thiết kế luận lý số', credits: 3, semester: 'Kỳ 5', type: 'required' },
      { code: 'CSE3047', name: 'Thiết kế hệ thống số với HDL', credits: 3, semester: 'Kỳ 6', type: 'required' },
      { code: 'CSE3048', name: 'Thiết kế hệ thống SoC', credits: 3, semester: 'Kỳ 6', type: 'required' },
      { code: 'CSE3049', name: 'Đồ án theo chuyên ngành (IC)', credits: 2, semester: 'Kỳ 6', type: 'required' },
      { code: 'CSE3078', name: 'Thiết kế vi mạch số', credits: 3, semester: 'Kỳ 7', type: 'elective' },
      { code: 'CSE4001', name: 'Thực tập nghề nghiệp', credits: 3, semester: 'Kỳ 6 – hè', type: 'practice' },
      { code: 'CSE4002', name: 'Thực hành hướng nghiệp', credits: 2, semester: 'Kỳ 6 – hè', type: 'practice' },
      { code: 'CSE4050', name: 'Khóa luận tốt nghiệp', credits: 10, semester: 'Kỳ 8', type: 'practice' },
    ],
  },
  {
    id: 'financial-technology',
    name: { vi: 'Công nghệ tài chính', en: 'Financial Technology', ja: 'フィンテック' },
    nameEN: 'Financial Technology',
    description: {
      vi: 'Ứng dụng công nghệ trong tài chính, blockchain, fintech.',
      en: 'Applying technology to finance — blockchain and fintech.',
      ja: '金融分野への技術応用、ブロックチェーン、フィンテック。',
    },
    icon: 'Landmark',
    color: 'amber',
    logo: '',
    keySubjects: ['Fintech', 'Blockchain', 'Data Analytics', 'Kinh tế học'],
    careers: ['Fintech Developer', 'Blockchain Engineer', 'Quantitative Analyst'],
    courses: [
      { code: 'CSE3049', name: 'Đồ án theo chuyên ngành (Fintech)', credits: 2, semester: 'Kỳ 6', type: 'required' },
      { code: 'JPS3034', name: 'Kinh tế học vi mô', credits: 3, semester: 'Kỳ 6', type: 'elective' },
      { code: 'JPS3035', name: 'Kinh tế học vĩ mô', credits: 3, semester: 'Kỳ 6', type: 'elective' },
      { code: 'JPS3036', name: 'Marketing', credits: 2, semester: 'Kỳ 6', type: 'elective' },
      { code: 'JPS3038', name: 'Nguyên lý kế toán', credits: 2, semester: 'Kỳ 6', type: 'elective' },
      { code: 'CSE3042', name: 'Công nghệ tài chính', credits: 3, semester: 'Kỳ 6', type: 'elective' },
      { code: 'CSE3054', name: 'Quản lý và phân tích dữ liệu tài chính', credits: 3, semester: 'Kỳ 7', star: true, type: 'elective' },
      { code: 'CSE3055', name: 'Công nghệ tài chính và ứng dụng', credits: 3, semester: 'Kỳ 7', type: 'elective' },
      { code: 'CSE3071', name: 'Lý thuyết tài chính tiền tệ', credits: 2, semester: 'Kỳ 7', type: 'elective' },
      { code: 'CSE3072', name: 'Tài chính doanh nghiệp', credits: 2, semester: 'Kỳ 7', type: 'elective' },
      { code: 'CSE3067', name: 'Học máy trong kinh tế và tài chính', credits: 3, semester: 'Kỳ 7', type: 'elective' },
      { code: 'CSE4001', name: 'Thực tập nghề nghiệp', credits: 3, semester: 'Kỳ 6 – hè', type: 'practice' },
      { code: 'CSE4002', name: 'Thực hành hướng nghiệp', credits: 2, semester: 'Kỳ 6 – hè', type: 'practice' },
      { code: 'CSE4050', name: 'Khóa luận tốt nghiệp', credits: 10, semester: 'Kỳ 8', type: 'practice' },
    ],
  },
];
