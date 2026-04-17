export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  features: string[];
  url: string;
  icon: string;
  status: 'active' | 'coming-soon' | 'internal';
}

export const services: ServiceItem[] = [
  {
    id: 'lab-booking',
    name: 'Đặt lịch phòng Lab & In 3D',
    description: 'Đặt lịch sử dụng máy in 3D, máy cắt laser. Theo dõi trạng thái job, quản lý vật liệu in.',
    features: ['Booking wizard 5 bước', 'Xem trước file 3D (STL/3MF)', 'Theo dõi trạng thái realtime', 'Miễn phí cho sinh viên BCSE'],
    url: 'https://sv01.bcse-vju.com',
    icon: 'Printer',
    status: 'active',
  },
  {
    id: 'ai-advisor',
    name: 'Tư vấn AI — BCSE Advisor',
    description: 'Chatbot AI tư vấn học vụ, lộ trình học tập. RAG với knowledge base nội bộ.',
    features: ['Chatbot AI tiếng Việt', 'RAG tài liệu chương trình', 'Lộ trình cá nhân hóa', 'Thư viện tài liệu'],
    url: 'https://sv02.bcse-vju.com',
    icon: 'Bot',
    status: 'active',
  },
  {
    id: 'lambda-lab',
    name: 'Lambda Lab — Nghiên cứu',
    description: 'Cổng thông tin nghiên cứu khoa học BCSE. Đề tài, publications, cơ hội tham gia NCKH.',
    features: ['Nhóm nghiên cứu & đề tài', 'Publications', 'Đăng ký NCKH', 'Tài liệu & datasets'],
    url: 'https://sv03.bcse-vju.com',
    icon: 'FlaskConical',
    status: 'active',
  },
  {
    id: 'e-service',
    name: 'Dịch vụ hành chính số',
    description: 'Cổng nộp hồ sơ, đơn từ trực tuyến. AI sơ duyệt hồ sơ, theo dõi tiến trình.',
    features: ['Nộp hồ sơ online', 'AI sơ duyệt', 'Theo dõi tiến trình', 'Thông báo email'],
    url: 'https://sv04.bcse-vju.com',
    icon: 'FileCheck',
    status: 'active',
  },
  {
    id: 'lab-management',
    name: 'Quản lý phòng Lab',
    description: 'Giám sát realtime phòng máy tính, thiết bị, camera, mượn trả thiết bị.',
    features: ['63 PC realtime', 'Camera 4 khu vực', 'Mượn/trả thiết bị', 'Thống kê sử dụng'],
    url: 'https://sv05.bcse-vju.com',
    icon: 'LayoutDashboard',
    status: 'active',
  },
  {
    id: 'wellbeing-chat',
    name: 'Mochi Chat — Sức khỏe tinh thần',
    description: 'Chat AI hỗ trợ sức khỏe tinh thần. Nhiều persona, bài tập thở, âm thanh thư giãn.',
    features: ['4 personas AI', 'Bài tập thở', 'Ambient sounds', 'Community chat'],
    url: 'https://sv06.bcse-vju.com',
    icon: 'Heart',
    status: 'active',
  },
  {
    id: 'self-learning',
    name: 'Cổng đăng ký dịch vụ tự học',
    description: 'Đăng ký sử dụng thư viện, khu vực tự học, máy tính khu vực tự học và truy cập học liệu điện tử (Udemy + tài liệu nội bộ BCSE).',
    features: [
      'Sử dụng thư viện',
      'Sử dụng các khu vực tự học',
      'Đăng ký quyền sử dụng máy tính khu vực tự học',
      'Truy cập học liệu điện tử, khóa học Udemy, tài liệu nội bộ BCSE',
    ],
    url: '#',
    icon: 'BookOpen',
    status: 'coming-soon',
  },
  {
    id: 'learning-dashboard',
    name: 'Dashboard theo dõi học tập sinh viên BCSE',
    description: 'Theo dõi tình trạng học tập từng sinh viên, phân tích và dự đoán xu hướng chuyên môn phù hợp, khuyến nghị lộ trình cá thể hóa.',
    features: ['Phân tích năng lực cá nhân', 'Dự đoán xu hướng chuyên môn', 'Lộ trình học tập cá thể hóa', 'Dashboard sinh viên'],
    url: '#',
    icon: 'LineChart',
    status: 'coming-soon',
  },
  {
    id: 'bcse-club',
    name: 'BCSE Club',
    description: 'Kết nối cộng đồng sinh viên BCSE các khóa. Tổ chức hoạt động chuyên môn, trao đổi kinh nghiệm học tập và nghiên cứu. Cựu sinh viên chia sẻ cơ hội việc làm.',
    features: ['Kết nối sinh viên các khóa', 'Hoạt động chuyên môn', 'Cựu SV chia sẻ cơ hội', 'Giới thiệu việc làm'],
    url: '#',
    icon: 'Users',
    status: 'coming-soon',
  },
  {
    id: 'career-portal',
    name: 'Cổng Thực tập & Nghề nghiệp',
    description: 'Kết nối doanh nghiệp và sinh viên — sắp xếp đăng ký thực tập, chia sẻ thông tin tuyển dụng thực tập sinh và nhân sự.',
    features: [
      'Kết nối doanh nghiệp và sinh viên',
      'Sắp xếp đăng ký thực tập',
      'Thông tin tuyển dụng thực tập sinh, nhân sự',
      'Theo dõi hồ sơ ứng tuyển',
    ],
    url: '#',
    icon: 'Briefcase',
    status: 'coming-soon',
  },
  {
    id: 'e-office',
    name: 'Cổng E-Office BCSE',
    description: 'Quản lý giảng viên cơ hữu, giảng viên thỉnh giảng, hợp tác đào tạo nghiên cứu, lập kế hoạch, phân công công việc.',
    features: ['Quản lý giảng viên', 'Hợp tác đào tạo & nghiên cứu', 'Lập kế hoạch', 'Phân công công việc'],
    url: '#',
    icon: 'Building',
    status: 'coming-soon',
  },
];
