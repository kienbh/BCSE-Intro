import type { Localized } from '@/lib/localized';

export interface StatItem {
  value: number;
  suffix: string;
  label: Localized<string>;
  icon: 'BookOpen' | 'GitBranch' | 'Users' | 'Globe' | 'GraduationCap' | 'Monitor';
}

export const stats: StatItem[] = [
  {
    value: 152, suffix: '',
    label: { vi: 'Tín chỉ · từ khóa 2026: 135', en: 'Credits · 135 from 2026', ja: '総単位数・2026 年度から 135' },
    icon: 'BookOpen',
  },
  {
    value: 5, suffix: '',
    label: { vi: 'Định hướng chuyên ngành', en: 'Specialisation tracks', ja: '専攻分野' },
    icon: 'GitBranch',
  },
  {
    value: 20, suffix: '+',
    label: { vi: 'Giảng viên VN & Nhật', en: 'VN & Japan faculty', ja: 'ベトナム・日本の教員' },
    icon: 'Users',
  },
  {
    value: 13, suffix: '',
    label: { vi: 'ĐH đối tác Nhật Bản', en: 'Japan partner universities', ja: '日本の提携大学' },
    icon: 'Globe',
  },
  {
    value: 150, suffix: '',
    label: { vi: 'Chỉ tiêu tuyển sinh/năm', en: 'Admission quota / year', ja: '年間募集人数' },
    icon: 'GraduationCap',
  },
  {
    value: 63, suffix: '',
    label: { vi: 'Máy tính phòng Lab', en: 'Lab computers', ja: 'ラボの PC 台数' },
    icon: 'Monitor',
  },
];
