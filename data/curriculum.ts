export const programStructure = {
  totalCredits: 152,
  creditBlocks: [
    { code: 'M1', name: 'Kiến thức chung', credits: 26, detail: 'Đại cương (16) + Ngoại ngữ (10)' },
    { code: 'M2', name: 'Kiến thức theo lĩnh vực', credits: 30, detail: 'Bắt buộc (22) + Tự chọn (8/78)' },
    { code: 'M3', name: 'Kiến thức theo khối ngành', credits: 22, detail: 'Bắt buộc (20) + Tự chọn (2/4)' },
    { code: 'M4', name: 'Kiến thức theo nhóm ngành', credits: 18, detail: 'Bắt buộc (18)' },
    { code: 'M5', name: 'Kiến thức ngành', credits: 56, detail: 'Bắt buộc (20) + Tự chọn (21/86) + Thực tập (5) + Tốt nghiệp (10)' },
  ],
  degreeTitle: 'Cử nhân Khoa học và Kỹ thuật Máy tính',
  degreeTitleEN: 'Bachelor of Computer Science and Engineering (Honors Program)',
  duration: '4 năm (8 kỳ)',
  partnerNote: 'Hợp tác với 7 trường đại học lớn tại Nhật Bản. Đại học Tokyo là đối tác chính.',
  englishLevel: 'Tốt nghiệp đạt trình độ B2/Bậc 4 tiếng Anh',
};

export interface Semester {
  semester: number;
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

export const yearBlocks: YearBlock[] = [
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
          'Tin học cơ sở',
          'Tiếng Anh B1',
          'Giải tích 1',
          'Đại số tuyến tính',
          'Vật lý 1',
          'Nhập môn lập trình',
          'Khoa học tự nhiên và môi trường',
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
          'Đồ án theo chuyên ngành',
          'Nguyên lý hệ điều hành',
          'Nhập môn cơ sở dữ liệu và MySQL',
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
          'Học theo dự án KH và KT',
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
          'An ninh thông tin',
          'Đồ án theo chuyên ngành',
          'Lý thuyết trò chơi',
          'Thiết kế hệ thống SoC',
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
