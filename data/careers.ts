import type { Localized } from '@/lib/localized';

export interface TrackCareer {
  specId: string;
  name: Localized<string>;
  specialist: Localized<string[]>;
  roles: string[]; // English titles intentionally — globally recognised
}

export interface IntegratedDirection {
  id: string;
  name: Localized<string>;
  nameEN: string;
  description: Localized<string>;
  icon: string;
  color: string;
  roles: string[];
}

export const trackCareers: TrackCareer[] = [
  {
    specId: 'software-engineering',
    name: { vi: 'Công nghệ phần mềm', en: 'Software Engineering', ja: 'ソフトウェアエンジニアリング' },
    specialist: {
      vi: ['Lập trình backend/frontend', 'Kiến trúc hệ thống', 'DevOps & Cloud'],
      en: ['Backend / frontend development', 'System architecture', 'DevOps & Cloud'],
      ja: ['バックエンド／フロントエンド開発', 'システムアーキテクチャ', 'DevOps・クラウド'],
    },
    roles: ['Software Engineer', 'Full-stack Developer', 'DevOps Engineer', 'Software Architect', 'Mobile Developer'],
  },
  {
    specId: 'data-science-ai',
    name: { vi: 'Khoa học dữ liệu & AI', en: 'Data Science & AI', ja: 'データサイエンス・AI' },
    specialist: {
      vi: ['Machine Learning', 'Computer Vision', 'NLP'],
      en: ['Machine Learning', 'Computer Vision', 'NLP'],
      ja: ['機械学習', 'コンピュータビジョン', 'NLP'],
    },
    roles: ['AI Engineer', 'Data Scientist', 'ML Engineer', 'Computer Vision Engineer', 'Data Analyst'],
  },
  {
    specId: 'embedded-iot',
    name: { vi: 'Hệ thống nhúng & IoT', en: 'Embedded Systems & IoT', ja: '組込みシステム・IoT' },
    specialist: {
      vi: ['Lập trình nhúng', 'IoT & Sensor Networks', 'Robotics'],
      en: ['Embedded programming', 'IoT & Sensor networks', 'Robotics'],
      ja: ['組込みプログラミング', 'IoT・センサーネットワーク', 'ロボティクス'],
    },
    roles: ['Embedded Engineer', 'IoT Developer', 'Robotics Engineer', 'Firmware Engineer', 'Edge Computing Engineer'],
  },
  {
    specId: 'integrated-circuit',
    name: { vi: 'Thiết kế vi mạch', en: 'Integrated Circuit Design', ja: '集積回路設計' },
    specialist: {
      vi: ['Thiết kế vi mạch số', 'SoC & FPGA', 'HDL Verilog/VHDL'],
      en: ['Digital IC design', 'SoC & FPGA', 'HDL (Verilog/VHDL)'],
      ja: ['デジタル IC 設計', 'SoC・FPGA', 'HDL (Verilog/VHDL)'],
    },
    roles: ['IC Design Engineer', 'FPGA Engineer', 'Hardware Engineer', 'Verification Engineer', 'Physical Design Engineer'],
  },
  {
    specId: 'financial-technology',
    name: { vi: 'Công nghệ tài chính', en: 'Financial Technology', ja: 'フィンテック' },
    specialist: {
      vi: ['Blockchain', 'Phân tích dữ liệu tài chính', 'Kinh tế học'],
      en: ['Blockchain', 'Financial data analysis', 'Economics'],
      ja: ['ブロックチェーン', '金融データ分析', '経済学'],
    },
    roles: ['Fintech Developer', 'Blockchain Engineer', 'Quantitative Analyst', 'Financial Data Analyst', 'Risk Engineer'],
  },
];

export const integratedDirections: IntegratedDirection[] = [
  {
    id: 'ai-fintech',
    name: { vi: 'AI trong Tài chính', en: 'AI in Finance', ja: '金融分野の AI' },
    nameEN: 'AI × Finance',
    description: {
      vi: 'Kết hợp Data Science/AI với Fintech — phân tích rủi ro, giao dịch thuật toán, chấm điểm tín dụng.',
      en: 'Combining Data Science / AI with Fintech — risk analysis, algorithmic trading, credit scoring.',
      ja: 'データサイエンス／AI と Fintech の融合 — リスク分析、アルゴリズム取引、信用スコアリング。',
    },
    icon: 'TrendingUp',
    color: 'emerald',
    roles: ['Quant ML Engineer', 'Credit Risk Analyst', 'Algo Trading Engineer'],
  },
  {
    id: 'smart-iot',
    name: { vi: 'IoT & Smart City', en: 'IoT & Smart City', ja: 'IoT・スマートシティ' },
    nameEN: 'IoT × Smart City',
    description: {
      vi: 'Hệ thống nhúng kết hợp AI tại edge — nông nghiệp thông minh, giao thông, môi trường, y tế.',
      en: 'Embedded systems combined with edge AI — smart agriculture, transport, environment, healthcare.',
      ja: '組込みシステムとエッジ AI の融合 — スマート農業、交通、環境、医療。',
    },
    icon: 'Network',
    color: 'sky',
    roles: ['Smart Agriculture Engineer', 'Edge AI Engineer', 'Smart City Developer'],
  },
  {
    id: 'ic-ai',
    name: { vi: 'AI Hardware & Chip', en: 'AI Hardware & Chips', ja: 'AI ハードウェア・チップ' },
    nameEN: 'AI × IC Design',
    description: {
      vi: 'Thiết kế vi mạch cho AI/ML — NPU, accelerator, chip cho edge computing.',
      en: 'IC design for AI/ML — NPUs, accelerators, chips for edge computing.',
      ja: 'AI/ML 向け IC 設計 — NPU、アクセラレータ、エッジ用チップ。',
    },
    icon: 'Cpu',
    color: 'red',
    roles: ['AI Chip Designer', 'NPU Architect', 'Hardware-ML Engineer'],
  },
  {
    id: 'robotics-ai',
    name: { vi: 'Robotics & AI', en: 'Robotics & AI', ja: 'ロボティクス・AI' },
    nameEN: 'Robotics × AI',
    description: {
      vi: 'Robot tích hợp thị giác máy tính, học máy — drone, cánh tay robot, robot nhân hình.',
      en: 'Robots integrated with computer vision and machine learning — drones, robotic arms, humanoid robots.',
      ja: 'コンピュータビジョン・機械学習を統合したロボット — ドローン、ロボットアーム、ヒューマノイド。',
    },
    icon: 'Bot',
    color: 'purple',
    roles: ['Robotics Engineer', 'Autonomous Systems Engineer', 'Robot Perception Engineer'],
  },
  {
    id: 'healthcare-tech',
    name: { vi: 'Y tế & Tin sinh học', en: 'Health Tech & Bioinformatics', ja: '医療・バイオインフォマティクス' },
    nameEN: 'HealthTech × BioInformatics',
    description: {
      vi: 'Ứng dụng CNTT cho y tế — chẩn đoán hình ảnh AI, hồ sơ sức khỏe số, tin sinh học.',
      en: 'IT applied to healthcare — AI medical imaging, digital health records, bioinformatics.',
      ja: '医療への IT 応用 — AI 画像診断、電子カルテ、バイオインフォマティクス。',
    },
    icon: 'HeartPulse',
    color: 'rose',
    roles: ['Medical AI Engineer', 'BioInformatics Engineer', 'Health Data Scientist'],
  },
  {
    id: 'security-tech',
    name: { vi: 'An toàn thông tin', en: 'Cybersecurity', ja: 'サイバーセキュリティ' },
    nameEN: 'Cybersecurity',
    description: {
      vi: 'Bảo mật phần mềm, mạng, hệ thống nhúng — pentest, cryptography, blockchain security.',
      en: 'Software, network, and embedded-system security — pentesting, cryptography, blockchain security.',
      ja: 'ソフトウェア・ネットワーク・組込みのセキュリティ — ペンテスト、暗号、ブロックチェーンセキュリティ。',
    },
    icon: 'ShieldCheck',
    color: 'amber',
    roles: ['Security Engineer', 'Pentester', 'Cryptography Engineer'],
  },
];

export const careerStats = {
  avgStartingSalary: {
    vi: '15–25 triệu VND/tháng',
    en: '15–25 M VND / month',
    ja: '月給 1500〜2500 万 VND',
  } as Localized<string>,
  internshipRate: {
    vi: '100% sinh viên năm 3 có thực tập',
    en: '100% of 3rd-year students complete internships',
    ja: '3 年生の 100% がインターンシップに参加',
  } as Localized<string>,
  postGradEmployment: {
    vi: '>95% có việc trong 6 tháng sau tốt nghiệp',
    en: '>95% employed within 6 months of graduation',
    ja: '卒業後 6 ヶ月以内に 95% 以上が就職',
  } as Localized<string>,
  partnerCompanies: {
    vi: '30+ doanh nghiệp đối tác',
    en: '30+ partner companies',
    ja: '提携企業 30 社以上',
  } as Localized<string>,
};
