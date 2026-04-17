export interface ResearchArea {
  id: string;
  name: string;
  nameEN: string;
  description: string;
  supervisors: string[];
  image: string;
  topics: string[];
  icon: string;
  color: 'rose' | 'purple' | 'sky' | 'emerald' | 'amber' | 'indigo';
  pattern: 'grid' | 'dots' | 'waves' | 'circuit' | 'scan' | 'nodes';
}

export interface Publication {
  id: string;
  doi?: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: 'journal' | 'conference';
  keywords?: string;
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  summary: string;
  pinned?: boolean;
}

export interface NckhProject {
  id: string;
  title: string;
  students: string;
  supervisors: string;
  summary: string;
  tags: string[];
}

// Lambda Lab info
export const lambdaLab = {
  name: 'λ Lab',
  fullName: 'Lambda Lab',
  tagline: 'Nơi ý tưởng liên ngành, đa ngành kết nối và giao thoa nhau.',
  url: 'https://sv03.bcse-vju.com',
  logo: '/images/logos/lambda-lab.svg',
};

export const researchAreas: ResearchArea[] = [
  {
    id: 'cv-robotics',
    name: 'Thị giác máy tính, Robotics & Multimodal AI',
    nameEN: 'Computer Vision, Robotics & Multimodal AI',
    description: 'YOLO, Vision-Language-Action, humanoid robot, ứng dụng liên ngành nông nghiệp thông minh.',
    supervisors: ['TS. Bùi Huy Kiên', 'TS. Trương Quốc Chiến'],
    image: '',
    icon: 'Bot',
    color: 'rose',
    pattern: 'scan',
    topics: ['Laser weeding robot', 'Fish behavior detection', 'Durian maturity measurement', 'Humanoid Robot (GR00T N1)', 'Multi-modal AI Sensory'],
  },
  {
    id: 'eeg-signal',
    name: 'Xử lý tín hiệu EEG & BCI',
    nameEN: 'EEG Signal Processing & Brain-Computer Interface',
    description: 'Xử lý tín hiệu EEG, thiết bị EEG di động, giao diện não-máy, brain activity.',
    supervisors: ['Prof. Honda Satoshi', 'TS. Bùi Huy Kiên'],
    image: '',
    icon: 'Brain',
    color: 'purple',
    pattern: 'waves',
    topics: ['EEG signal denoising', 'Source localization', 'Mobile EEG devices', 'Brain activity during language learning'],
  },
  {
    id: 'sensory-ai',
    name: 'Sensory AI đa phương thức',
    nameEN: 'Multimodal Sensory AI',
    description: 'Kết hợp EEG, ECG, Computer Vision, Speech và LLM để đánh giá cảm quan cà phê tự động.',
    supervisors: ['TS. Bùi Huy Kiên', 'Đặng Minh Hiếu', 'Hoàng Quốc Tuấn'],
    image: '',
    icon: 'Sparkles',
    color: 'amber',
    pattern: 'nodes',
    topics: ['Coffee taste evaluation', 'Video + Audio + EEG fusion', 'whisperX, DeepFace, ViT', 'PhoBERT, GPT-4, Claude fusion'],
  },
  {
    id: 'cloud-microservices',
    name: 'Cloud Computing & Microservices',
    nameEN: 'Cloud Computing & Microservices',
    description: 'Kiến trúc vi dịch vụ trên cloud, tối ưu mô hình AI, LLMOps.',
    supervisors: ['TS. Tạ Quang Ngọc'],
    image: '',
    icon: 'Cloud',
    color: 'sky',
    pattern: 'dots',
    topics: ['Microservices on Cloud', 'AI Model Optimization', 'LLMOps'],
  },
  {
    id: 'ai-education',
    name: 'AI trong Giáo dục & E-Learning',
    nameEN: 'AI in Education & E-Learning',
    description: 'AI trong e-learning, learning analytics, AR/VR đào tạo, bài giảng tương tác.',
    supervisors: ['TS. Phạm Đức Thọ'],
    image: '',
    icon: 'GraduationCap',
    color: 'emerald',
    pattern: 'grid',
    topics: ['Cheating detection', 'AI interactive lessons', 'VR Campus Tour', 'Timetable scheduling'],
  },
  {
    id: 'ic-embedded',
    name: 'Thiết kế vi mạch & Hệ thống nhúng',
    nameEN: 'IC Design & Embedded Systems',
    description: 'Thiết kế vi mạch SoC, FPGA, hệ thống nhúng, IoT applications.',
    supervisors: ['TS. Phạm Tiến Thành', 'ThS. Nguyễn Tiến Đạt'],
    image: '',
    icon: 'Cpu',
    color: 'indigo',
    pattern: 'circuit',
    topics: ['SoC Design', 'FPGA Development', 'Embedded IoT', 'Xilinx Kria KV260'],
  },
];

// 13 publications từ Lambda Lab (sv03.bcse-vju.com)
export const publications: Publication[] = [
  { id: 'p30', doi: '10.1007/978-3-032-18159-6_31', title: 'A Comparative Study of Machine Learning Models for Cheating Detection in Online Learning', authors: 'Pham Duc Tho et al.', venue: 'Springer, Book Chapter', year: 2026, type: 'journal', keywords: 'machine learning, cheating detection, e-learning', tags: ['ELEARN'] },
  { id: 'p04', doi: '10.1007/978-3-032-22062-2_37', title: 'From Taste to Text: Fine-Tuning ASR for Vietnamese Sensory Evaluation Domain', authors: 'Phuc Le Tuan, Thai Huy Dam, Quynh Thi Hoa Le, Hieu Minh Dang, Dzung Hoang Nguyen, Kien Huy Bui, Thao Thi Nguyen, Tuan Quoc Hoang', venue: 'icSoftComp 2025 · CCIS, Springer', year: 2026, type: 'conference', keywords: 'ASR, Vietnamese, sensory evaluation, fine-tuning', tags: ['SENSORY'] },
  { id: 'p31', doi: '10.1109/ICALT64023.2025.00069', title: 'AI Integration in Vietnamese Primary Education: Educator Perspectives and Implementation Challenges', authors: 'Pham Duc Tho et al.', venue: 'IEEE ICALT 2025', year: 2025, type: 'conference', keywords: 'AI, education, Vietnamese, primary education', tags: ['ELEARN'] },
  { id: 'p32', doi: '10.1109/ICALT64023.2025.00110', title: 'Blockchain-Based Assessment System Proposal for Personalized Learning Pathways', authors: 'Pham Duc Tho et al.', venue: 'IEEE ICALT 2025', year: 2025, type: 'conference', keywords: 'blockchain, assessment, personalized learning', tags: ['ELEARN'] },
  { id: 'p02', doi: '10.11113/aej.v15.22771', title: 'Application of YOLO models in the detection of fish behavioral change under acute exposure to synthetic estrogen in the environment', authors: 'Bui Huy Kien, Dang Minh Hieu, Nguyen T. H., Le V. T., Tran Q. D.', venue: 'ASEAN Engineering Journal, 15(2), 125–132', year: 2025, type: 'journal', keywords: 'YOLO, fish behavior, estrogen, computer vision', tags: ['INTER'] },
  { id: 'p03', doi: '10.1109/JAC-ECC64419.2024.11061240', title: 'Nondestructive Maturity Measurement of Durian Using Acoustic Signal', authors: 'Bui Khanh Linh, Dang Ngoc Hieu, Hoang Tien Duong, Nguyen Thi Nam, Pham Minh Tuan, Nguyen Van Thang, Dang Minh Hieu, Bui Huy Kien', venue: 'IEEE JAC-ECC 2024', year: 2024, type: 'conference', keywords: 'durian, acoustic signal, MobileNet V2', tags: ['INTER', 'SENSORY'] },
  { id: 'p01', doi: '10.1109/ICCC62278.2024.10582958', title: 'Development of Deep Learning-Based Laser Weeding Robot', authors: 'Bui Huy Kien, Dang Minh Hieu et al.', venue: '2024 IEEE ICCC', year: 2024, type: 'conference', keywords: 'deep learning, YOLO, laser weeding, robot, agriculture', tags: ['ROBOT', 'INTER'] },
  { id: 'p05', doi: '10.21303/2461-4262.2024.003369', title: 'The bulk modulus of fullerene C20 in the case of nonlinear volumetric deformation', authors: 'Bui Huy Kien et al.', venue: 'EUREKA: Physics and Engineering', year: 2024, type: 'journal', keywords: 'fullerene, C20, bulk modulus', tags: ['INTER'] },
  { id: 'p33', title: 'Design and Development of a Personalized Recommender System of Student Question-Generation Exercises for Programming Courses', authors: 'Pham Duc Tho et al.', venue: 'ICCE 2023', year: 2023, type: 'conference', keywords: 'recommender system, question generation', tags: ['ELEARN'] },
  { id: 'p06', doi: '10.1007/s10010-021-00557-9', title: 'Plastic gear remaining useful life prediction using artificial neural network', authors: 'Bui Huy Kien et al.', venue: 'Forschung im Ingenieurwesen', year: 2022, type: 'journal', keywords: 'plastic gear, RUL, ANN', tags: ['ROBOT'] },
  { id: 'p34', title: 'Exploring the Behavior Patterns of Students Accessing Online Learning Material in Online Course', authors: 'Pham Duc Tho et al.', venue: 'ICCE 2022', year: 2022, type: 'conference', keywords: 'behavior patterns, online learning', tags: ['ELEARN'] },
  { id: 'p07', doi: '10.1109/SSCI50451.2021.9660125', title: 'Separate Sound into STFT Frames to Eliminate Sound Noise Frames in Sound Classification', authors: 'Bui Huy Kien et al.', venue: 'IEEE SSCI 2021', year: 2021, type: 'conference', keywords: 'sound classification, STFT', tags: ['INTER'] },
  { id: 'p35', doi: '10.3966/160792642021012901051', title: 'Exploring Student Behavior during Student-Generated Questions Activities on Programming Learning', authors: 'Pham Duc Tho et al.', venue: 'ICCE 2021 / J. of Internet Technology', year: 2021, type: 'journal', keywords: 'student behavior, question generation', tags: ['ELEARN'] },
];

// Blog posts từ Lambda Lab
export const blogPosts: BlogPost[] = [
  {
    id: 'b05', pinned: true,
    title: 'Hội nghị cảm quan SPISE 6/2026: 4 hướng nghiên cứu',
    date: '2026-04-14',
    author: 'EEG & Sensory Team',
    tags: ['SPISE 2026', 'EEG', 'Sensory AI'],
    summary: 'Lab chuẩn bị 4 hướng nghiên cứu cho hội nghị cảm quan quốc tế SPISE tháng 6/2026: wireless sensory device, micro-expression detection, EEG taste classification, EEG olfactory discrimination.',
  },
  {
    id: 'b01',
    title: 'NCKH-SV: Robot Delta X loại bỏ hạt cà phê rang cháy',
    date: '2026-04-01',
    author: 'Trần Thu Trang, Nguyễn Đình Hải',
    tags: ['NCKH-SV', 'Robotics', 'CV'],
    summary: 'Robot Delta X tích hợp camera và deep learning để nhận diện và loại bỏ tự động hạt cà phê rang cháy. HD: Dr. Bùi Huy Kiên, Dr. Trương Quốc Chiến.',
  },
  {
    id: 'b02',
    title: 'NCKH-SV: Chế tạo robot cánh tay 6 bậc tự do bằng in 3D',
    date: '2026-04-01',
    author: 'Trần Quân',
    tags: ['NCKH-SV', 'Robotics', '3D Printing'],
    summary: 'Thiết kế, in 3D và lập trình điều khiển robot cánh tay máy 6-DOF. Kết hợp CAD + 3D printing với điều khiển servo. HD: Dr. Bùi Huy Kiên, Dr. Lê Kim Quy.',
  },
  {
    id: 'b03',
    title: 'NCKH-SV: Phát triển nguyên mẫu Drone – Robot mềm',
    date: '2026-04-01',
    author: 'Phú Đức Quý, Lê Trung Kiên',
    tags: ['NCKH-SV', 'Robotics', 'Drone'],
    summary: 'Nguyên mẫu kết hợp UAV drone với cơ cấu soft robotics, ứng dụng thu thập mẫu trong môi trường phức tạp. HD: Dr. Bùi Huy Kiên, Dr. Trương Quốc Chiến.',
  },
  {
    id: 'b04',
    title: 'NCKH-SV: Phân biệt mùi cà phê qua tín hiệu điện não EEG',
    date: '2026-04-01',
    author: 'Lê Trung Kiên',
    tags: ['NCKH-SV', 'EEG', 'Sensory AI'],
    summary: 'Thu thập và phân tích tín hiệu EEG khi người tham gia ngửi các loại cà phê khác nhau, dùng deep learning phân loại đặc trưng khứu giác. HD: EEG Team.',
  },
];

export const pubFilterTabs = [
  { key: 'all', label: 'All' },
  { key: 'journal', label: 'Journal', field: 'type' },
  { key: 'conference', label: 'Conference', field: 'type' },
  { key: 'ELEARN', label: 'ELEARN', field: 'tags' },
  { key: 'SENSORY', label: 'SENSORY', field: 'tags' },
  { key: 'INTER', label: 'INTER', field: 'tags' },
  { key: 'ROBOT', label: 'ROBOT', field: 'tags' },
] as const;

export const blogFilterTabs = [
  { key: 'all', label: 'All' },
  { key: 'SPISE 2026', label: 'SPISE 2026' },
  { key: 'EEG', label: 'EEG' },
  { key: 'Sensory AI', label: 'Sensory AI' },
  { key: 'NCKH-SV', label: 'NCKH-SV' },
  { key: 'Robotics', label: 'Robotics' },
  { key: 'CV', label: 'CV' },
  { key: '3D Printing', label: '3D Printing' },
  { key: 'Drone', label: 'Drone' },
] as const;

// NCKH-SV projects (sinh viên đang làm tại Lambda Lab)
export const nckhProjects: NckhProject[] = [
  { id: 'n1', title: 'Robot Delta X loại bỏ hạt cà phê rang cháy', students: 'Trần Thu Trang, Nguyễn Đình Hải', supervisors: 'Dr. Bùi Huy Kiên, Dr. Trương Quốc Chiến', summary: 'Delta robot + CV + deep learning phát hiện và loại hạt cà phê lỗi trên dây chuyền.', tags: ['Robotics', 'CV'] },
  { id: 'n2', title: 'Robot cánh tay 6-DOF bằng in 3D', students: 'Trần Quân', supervisors: 'Dr. Bùi Huy Kiên, Dr. Lê Kim Quy', summary: 'Thiết kế CAD, in 3D, điều khiển servo cánh tay máy 6 bậc tự do.', tags: ['Robotics', '3D Printing'] },
  { id: 'n3', title: 'Nguyên mẫu Drone – Soft Robot', students: 'Phú Đức Quý, Lê Trung Kiên', supervisors: 'Dr. Bùi Huy Kiên, Dr. Trương Quốc Chiến', summary: 'Kết hợp UAV với cơ cấu robot mềm để thu thập mẫu/thao tác môi trường phức tạp.', tags: ['Robotics', 'Drone'] },
  { id: 'n4', title: 'Phân biệt mùi cà phê qua EEG', students: 'Lê Trung Kiên', supervisors: 'EEG Team', summary: 'EEG + deep learning để phân loại đặc trưng khứu giác các loại cà phê.', tags: ['EEG', 'Sensory AI'] },
  { id: 'n5', title: 'Thiết bị wireless thu thập dữ liệu cảm quan', students: 'Trần Anh Quốc', supervisors: 'EEG Team', summary: 'Wireless device thu dữ liệu cảm quan từ xa cho thử nghiệm cà phê.', tags: ['Sensory AI', 'EEG'] },
  { id: 'n6', title: 'Phát hiện vi biểu cảm khi nếm cà phê', students: 'Nguyễn Quốc Hải Đăng', supervisors: 'EEG Team', summary: 'Computer Vision phát hiện micro-expression trong quá trình nếm thử.', tags: ['CV', 'Sensory AI'] },
  { id: 'n7', title: 'Phân loại vị giác 4 vị cơ bản qua EEG', students: 'Trần Tiến', supervisors: 'EEG Team, Dr. Hoàng Quốc Tuấn', summary: 'Phân tích tín hiệu EEG để phân loại chua-cay-mặn-ngọt.', tags: ['EEG', 'Sensory AI'] },
];
