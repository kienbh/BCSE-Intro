// Hub dữ liệu CTĐT — 2 khung chạy SONG HÀNH (quyết định 26/8/2026):
//   curriculum-152.ts · khung hiện hành 152 TC (mã 7480204) — khóa 2025 trở về trước
//   curriculum-135.ts · khung điều chỉnh 135 TC (mã 7480101) — từ khóa 2026

export interface Semester {
  semester: number;
  /** TC bắt buộc của kỳ (chưa gồm tự chọn) — chỉ khung 135 dùng */
  credits?: number;
  required: string[];
  elective: string[];
  note?: string;
}

export interface YearBlock {
  year: number;
  title: string;
  titleEN: string;
  theme: string;
  color: string;
  semesters: Semester[];
}

export { programStructure152, yearBlocks152 } from './curriculum-152';
export {
  programStructure135,
  coreRequired135,
  modules135,
  projects135,
  graduation135,
  yearBlocks135,
} from './curriculum-135';
export type { Module135 } from './curriculum-135';

export const internshipPartners = {
  description: 'Sinh viên được giới thiệu đến các đối tác của VJU gồm các doanh nghiệp trong và ngoài nước. Hoặc sinh viên có thể theo định hướng nghiên cứu từ sớm để theo đuổi các bậc học cao hơn, từ đó có cơ hội học bổng.',
  partners: ['DEHA', 'Rikkei', 'SanAn', 'MeanLab', 'NTQ', 'Aimesoft', 'Mirai Labs', 'VRTECH', 'VietA Solutions', 'Viettel', 'Samsung', 'Google', 'Grab', 'Shopee'],
};

export const teachingMethods = [
  { title: 'Project-Based Learning', description: 'Xây dựng sản phẩm thực tế từ năm 2, deploy lên hạ tầng 10 VPS.', icon: 'Rocket' as const },
  { title: 'Hands-on Lab & Maker Space', description: 'Workshop với máy in 3D, cắt laser, bàn điện tử, sân chơi robot.', icon: 'Wrench' as const },
  { title: 'Research Integration', description: 'Tham gia NCKH cùng giảng viên, công bố bài báo quốc tế.', icon: 'Microscope' as const },
  { title: 'Tiêu chuẩn Nhật Bản', description: 'Thiết kế với sự tư vấn của JICA, giảng viên Nhật trực tiếp giảng dạy.', icon: 'Globe' as const },
];
