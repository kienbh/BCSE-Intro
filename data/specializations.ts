import type { Localized } from '@/lib/localized';

export type CourseType = 'required' | 'elective' | 'practice';

export interface SpecCourse {
  name: string;
  semester?: string;
  star?: boolean;
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
      { name: 'Nhập môn lập trình', semester: 'Kỳ 1', type: 'required' },
      { name: 'Lập trình hướng đối tượng', semester: 'Kỳ 2', type: 'required' },
      { name: 'Cấu trúc dữ liệu & giải thuật', semester: 'Kỳ 3', type: 'required' },
      { name: 'Công nghệ phần mềm', semester: 'Kỳ 4', star: true, type: 'required' },
      { name: 'Lập trình nâng cao', semester: 'Kỳ 5', type: 'elective' },
      { name: 'Phát triển ứng dụng Web', semester: 'Kỳ 5', star: true, type: 'elective' },
      { name: 'Tương tác người & máy', semester: 'Kỳ 5', star: true, type: 'elective' },
      { name: 'Điện toán đám mây', semester: 'Kỳ 5', star: true, type: 'elective' },
      { name: 'Học theo dự án KH và KT (Web)', semester: 'Kỳ 5', type: 'elective' },
      { name: 'Phát triển ứng dụng di động', semester: 'Kỳ 6', star: true, type: 'elective' },
      { name: 'Phân tích & thiết kế hệ thống', semester: 'Kỳ 6', type: 'elective' },
      { name: 'Phát triển ứng dụng nâng cao', semester: 'Kỳ 6', type: 'elective' },
      { name: 'Đồ án (CNPM)', semester: 'Kỳ 6', type: 'elective' },
      { name: 'Đảm bảo chất lượng phần mềm', semester: 'Kỳ 7', type: 'elective' },
      { name: 'Đánh giá hiệu năng hệ thống', semester: 'Kỳ 7', star: true, type: 'elective' },
      { name: 'Thực tập nghề nghiệp', semester: 'Kỳ 6 – hè', type: 'practice' },
      { name: 'Thực hành hướng nghiệp', semester: 'Kỳ 6 – hè', type: 'practice' },
      { name: 'Khóa luận tốt nghiệp', star: true, type: 'practice' },
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
      { name: 'Xác suất – Thống kê', semester: 'Kỳ 3', type: 'required' },
      { name: 'Toán rời rạc', semester: 'Kỳ 3', type: 'required' },
      { name: 'Phân tích dữ liệu khoa học', semester: 'Kỳ 3', type: 'required' },
      { name: 'Khoa học dữ liệu', semester: 'Kỳ 5', type: 'elective' },
      { name: 'Trí tuệ nhân tạo', semester: 'Kỳ 5', star: true, type: 'elective' },
      { name: 'XLTT âm thanh & hình ảnh', semester: 'Kỳ 5', star: true, type: 'elective' },
      { name: 'Học máy', semester: 'Kỳ 6', star: true, type: 'elective' },
      { name: 'Tính toán song song', semester: 'Kỳ 6', star: true, type: 'elective' },
      { name: 'Đồ án (DS & AI)', semester: 'Kỳ 6', type: 'elective' },
      { name: 'Thị giác máy tính', semester: 'Kỳ 7', star: true, type: 'elective' },
      { name: 'Các công cụ trong AI', semester: 'Kỳ 8', type: 'elective' },
      { name: 'Vận trù học', semester: 'Kỳ 8', star: true, type: 'elective' },
      { name: 'Thực tập nghề nghiệp', semester: 'Kỳ 6 – hè', type: 'practice' },
      { name: 'Thực hành hướng nghiệp', semester: 'Kỳ 6 – hè', type: 'practice' },
      { name: 'Khóa luận tốt nghiệp', star: true, type: 'practice' },
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
      { name: 'Thí nghiệm trong KHKT 1 (AVR)', semester: 'Kỳ 2', type: 'required' },
      { name: 'Nhập môn hệ thống máy tính', semester: 'Kỳ 2', type: 'required' },
      { name: 'Thí nghiệm trong KHKT 2 (ESP32, STM32)', semester: 'Kỳ 3', type: 'required' },
      { name: 'Kiến trúc máy tính', semester: 'Kỳ 3', type: 'required' },
      { name: 'Nguyên lý hệ điều hành', semester: 'Kỳ 4', type: 'required' },
      { name: 'Mạng máy tính & truyền thông', semester: 'Kỳ 5', type: 'required' },
      { name: 'Phát triển ứng dụng Web', semester: 'Kỳ 5', star: true, type: 'elective' },
      { name: 'Đồ án (Nhúng & IoT)', semester: 'Kỳ 6', type: 'elective' },
      { name: 'Phát triển ứng dụng IoT', semester: 'Kỳ 7', type: 'elective' },
      { name: 'Mạng cảm biến không dây', semester: 'Kỳ 7', type: 'elective' },
      { name: 'Thực tập nghề nghiệp', semester: 'Kỳ 6 – hè', type: 'practice' },
      { name: 'Thực hành hướng nghiệp', semester: 'Kỳ 6 – hè', type: 'practice' },
      { name: 'Khóa luận tốt nghiệp', star: true, type: 'practice' },
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
      { name: 'Mạch logic & kỹ thuật số', semester: 'Kỳ 4', type: 'required' },
      { name: 'Thiết kế luận lý số', semester: 'Kỳ 5', type: 'required' },
      { name: 'Thiết kế hệ thống số với HDL', semester: 'Kỳ 6', type: 'required' },
      { name: 'Đồ án (TKVM)', semester: 'Kỳ 6', type: 'elective' },
      { name: 'Thiết kế hệ thống SoC', semester: 'Kỳ 7', type: 'elective' },
      { name: 'Thiết kế vi mạch số', semester: 'Kỳ 7', star: true, type: 'elective' },
      { name: 'Thực tập nghề nghiệp', semester: 'Kỳ 6 – hè', type: 'practice' },
      { name: 'Thực hành hướng nghiệp', semester: 'Kỳ 6 – hè', type: 'practice' },
      { name: 'Khóa luận tốt nghiệp', star: true, type: 'practice' },
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
      { name: 'Kinh tế học vi mô', semester: 'Kỳ 6', type: 'required' },
      { name: 'Kinh tế học vĩ mô', semester: 'Kỳ 6', type: 'required' },
      { name: 'Marketing', semester: 'Kỳ 6', type: 'required' },
      { name: 'Nguyên lý kế toán', semester: 'Kỳ 6', type: 'required' },
      { name: 'Công nghệ tài chính', semester: 'Kỳ 6', type: 'required' },
      { name: 'Quản lý & phân tích dữ liệu tài chính', semester: 'Kỳ 7', star: true, type: 'elective' },
      { name: 'Công nghệ tài chính & ứng dụng', semester: 'Kỳ 7', type: 'elective' },
      { name: 'Lý thuyết tài chính tiền tệ', semester: 'Kỳ 7', star: true, type: 'elective' },
      { name: 'Tài chính doanh nghiệp', semester: 'Kỳ 7', star: true, type: 'elective' },
      { name: 'Học máy trong kinh tế & tài chính', semester: 'Kỳ 7', type: 'elective' },
    ],
  },
];
