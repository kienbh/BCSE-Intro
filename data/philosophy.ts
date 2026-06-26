import type { Localized } from '@/lib/localized';

export const philosophy = {
  rector: 'GS. Furuta Motoo',
  rectorTitle: {
    vi: 'Hiệu trưởng Đại học Việt Nhật',
    en: 'President, Vietnam Japan University',
    ja: 'ベトナム日本大学 学長',
  } as Localized<string>,
  rectorImage: '/images/faculty/prof-furuta.jpg',
  pillars: [
    {
      title: { vi: 'Khai phóng', en: 'Liberal Arts', ja: 'リベラルアーツ' } as Localized<string>,
      titleEN: 'Liberal Arts',
      description: {
        vi: 'Đào tạo con người toàn diện, tự do học thuật. Sinh viên được khuyến khích tư duy phản biện, sáng tạo, không giới hạn trong kỹ thuật.',
        en: 'A well-rounded education with academic freedom. Students are encouraged to think critically and creatively — beyond the boundaries of engineering.',
        ja: '学問の自由を重んじた全人教育。工学の枠を超えて、批判的思考と創造性を育みます。',
      } as Localized<string>,
      icon: 'Lightbulb' as const,
    },
    {
      title: {
        vi: 'Phát triển bền vững', en: 'Sustainable Development', ja: '持続可能な発展',
      } as Localized<string>,
      titleEN: 'Sustainable Development',
      description: {
        vi: 'Nghiên cứu và ứng dụng công nghệ vì cộng đồng. Từ nông nghiệp thông minh đến y tế, giáo dục — công nghệ phục vụ con người.',
        en: 'Research and apply technology for the community — from smart agriculture to healthcare and education. Technology serves people.',
        ja: 'スマート農業から医療、教育まで——技術を社会のために応用し、人間に貢献する研究を推進します。',
      } as Localized<string>,
      icon: 'Leaf' as const,
    },
    {
      title: {
        vi: 'Khoa học liên ngành', en: 'Interdisciplinary Science', ja: '学際科学',
      } as Localized<string>,
      titleEN: 'Interdisciplinary Science',
      description: {
        vi: 'Kết hợp KH-KTMT với nông nghiệp, y tế, giáo dục, tài chính, tin sinh học. Triết lý này ngày càng đúng đắn trong kỷ nguyên AI.',
        en: 'Combining CS-CE with agriculture, healthcare, education, finance, and bioinformatics. This philosophy proves ever more relevant in the AI era.',
        ja: 'CS・CE と農業、医療、教育、金融、バイオインフォマティクスと融合。AI 時代にますます重要性が増す理念です。',
      } as Localized<string>,
      icon: 'Layers' as const,
    },
  ],
};

export const distinctFeatures: Array<{
  title: Localized<string>;
  description: Localized<string>;
  icon: 'Shield' | 'Blocks' | 'Compass' | 'Zap' | 'UserCog' | 'Microscope' | 'Globe' | 'Award';
}> = [
  {
    title: {
      vi: 'Cơ sở vật chất hiện đại, cập nhật công nghệ liên tục',
      en: 'Modern facilities, continuously updated technology',
      ja: '最新の施設・継続的な技術アップデート',
    },
    description: {
      vi: 'Đầu tư trực tiếp từ ĐHQGHN và JICA Nhật Bản — phòng lab, hạ tầng server, thiết bị luôn được nâng cấp theo công nghệ mới (AI, robotics, IoT).',
      en: 'Directly funded by VNU Hanoi and JICA Japan — labs, server infrastructure and equipment are continuously upgraded to track new technology (AI, robotics, IoT).',
      ja: 'VNU ハノイ校と JICA 日本の直接投資により、研究室・サーバー・機材を最新技術 (AI・ロボティクス・IoT) に合わせて継続的にアップデート。',
    },
    icon: 'Zap',
  },
  {
    title: {
      vi: 'Nền tảng vững chắc',
      en: 'Solid foundation',
      ja: '強固な基礎',
    },
    description: {
      vi: '2 năm đầu trang bị các học phần nền tảng vững chắc — toán, lập trình, cấu trúc dữ liệu, mạng — tạo bệ phóng cho chuyên ngành.',
      en: 'The first two years build a solid foundation — mathematics, programming, data structures, networking — providing a launchpad for the specialisations.',
      ja: '最初の 2 年で数学、プログラミング、データ構造、ネットワークなど強固な基礎を築き、専攻への足掛かりとします。',
    },
    icon: 'Blocks',
  },
  {
    title: {
      vi: 'Tự chọn đa dạng, liên ngành — thiết kế nghề nghiệp cá thể hóa',
      en: 'Diverse interdisciplinary electives — personalised career design',
      ja: '多様な学際選択科目 — 個別最適化されたキャリア設計',
    },
    description: {
      vi: 'Tự do chọn định hướng, học phần và đề tài nghiên cứu. Mỗi sinh viên thiết kế lộ trình nghề nghiệp riêng dựa trên thế mạnh và đam mê.',
      en: 'Free choice of specialisation, electives and research topics. Each student designs their own career path around their strengths and passions.',
      ja: '専攻・選択科目・研究テーマを自由に選択。各学生が自分の強みと情熱に合わせて独自のキャリアロードマップを設計できます。',
    },
    icon: 'UserCog',
  },
  {
    title: {
      vi: 'Học theo dự án thực tế và NCKH',
      en: 'Project-based learning & research',
      ja: 'プロジェクト型学習と研究',
    },
    description: {
      vi: 'Học phần dạng dự án thực tế, deploy sản phẩm lên hạ tầng server BCSE. Sinh viên có thể tham gia NCKH ngay từ năm nhất với hướng dẫn trực tiếp từ giảng viên.',
      en: 'Project-based courses with real products deployed to BCSE server infrastructure. Students can join scientific research from year 1 with direct faculty mentoring.',
      ja: 'プロジェクト型授業で実プロダクトを BCSE サーバーへデプロイ。学生は 1 年次から教員の直接指導の下で研究活動に参加できます。',
    },
    icon: 'Microscope',
  },
  {
    title: {
      vi: 'Môi trường quốc tế, đa văn hóa',
      en: 'International, multicultural environment',
      ja: '国際的・多文化な学習環境',
    },
    description: {
      vi: 'Học cùng giảng viên Nhật Bản từ Keio University và các trường đối tác. Cơ hội trao đổi sinh viên với các đại học Nhật và quốc tế.',
      en: 'Study with Japanese faculty from Keio University and partner schools, with student exchange opportunities at Japanese and international universities.',
      ja: '慶應義塾大学などの提携校から派遣される日本人教員と学び、日本および海外大学との交換留学の機会も提供します。',
    },
    icon: 'Globe',
  },
  {
    title: {
      vi: 'Giảng viên trình độ cao',
      en: 'Highly qualified faculty',
      ja: '高水準の教員陣',
    },
    description: {
      vi: 'Giảng viên cơ hữu BCSE có trình độ cao, tốt nghiệp tiến sĩ tại các nước phát triển (Nhật Bản, Đài Loan, Singapore), đảm bảo chất lượng quốc tế.',
      en: 'BCSE core faculty hold doctorates from developed countries (Japan, Taiwan, Singapore), ensuring international quality.',
      ja: 'BCSE の専任教員は日本・台湾・シンガポールなど先進国で博士号を取得しており、国際水準の品質を保証します。',
    },
    icon: 'Award',
  },
];
