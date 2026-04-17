export interface TrackCareer {
  specId: string;
  name: string;
  specialist: string[];
  roles: string[];
}

export interface IntegratedDirection {
  id: string;
  name: string;
  nameEN: string;
  description: string;
  icon: string;
  color: string;
  roles: string[];
}

export const trackCareers: TrackCareer[] = [
  {
    specId: 'software-engineering',
    name: 'Công nghệ phần mềm',
    specialist: ['Lập trình backend/frontend', 'Kiến trúc hệ thống', 'DevOps & Cloud'],
    roles: ['Software Engineer', 'Full-stack Developer', 'DevOps Engineer', 'Software Architect', 'Mobile Developer'],
  },
  {
    specId: 'data-science-ai',
    name: 'Khoa học dữ liệu & AI',
    specialist: ['Machine Learning', 'Computer Vision', 'NLP'],
    roles: ['AI Engineer', 'Data Scientist', 'ML Engineer', 'Computer Vision Engineer', 'Data Analyst'],
  },
  {
    specId: 'embedded-iot',
    name: 'Hệ thống nhúng & IoT',
    specialist: ['Lập trình nhúng', 'IoT & Sensor Networks', 'Robotics'],
    roles: ['Embedded Engineer', 'IoT Developer', 'Robotics Engineer', 'Firmware Engineer', 'Edge Computing Engineer'],
  },
  {
    specId: 'integrated-circuit',
    name: 'Thiết kế vi mạch',
    specialist: ['Thiết kế vi mạch số', 'SoC & FPGA', 'HDL Verilog/VHDL'],
    roles: ['IC Design Engineer', 'FPGA Engineer', 'Hardware Engineer', 'Verification Engineer', 'Physical Design Engineer'],
  },
  {
    specId: 'financial-technology',
    name: 'Công nghệ tài chính',
    specialist: ['Blockchain', 'Phân tích dữ liệu tài chính', 'Kinh tế học'],
    roles: ['Fintech Developer', 'Blockchain Engineer', 'Quantitative Analyst', 'Financial Data Analyst', 'Risk Engineer'],
  },
];

/**
 * Các hướng tích hợp công nghệ liên ngành.
 * Sinh viên theo 1 định hướng "lõi" + tự chọn các môn bổ trợ từ định hướng khác
 * có thể tham gia các ngành nghề tích hợp.
 */
export const integratedDirections: IntegratedDirection[] = [
  {
    id: 'ai-fintech',
    name: 'AI trong Tài chính',
    nameEN: 'AI × Finance',
    description: 'Kết hợp Data Science/AI với Fintech — phân tích rủi ro, giao dịch thuật toán, chấm điểm tín dụng.',
    icon: 'TrendingUp',
    color: 'emerald',
    roles: ['Quant ML Engineer', 'Credit Risk Analyst', 'Algo Trading Engineer'],
  },
  {
    id: 'smart-iot',
    name: 'IoT & Smart City',
    nameEN: 'IoT × Smart City',
    description: 'Hệ thống nhúng kết hợp AI tại edge — nông nghiệp thông minh, giao thông, môi trường, y tế.',
    icon: 'Network',
    color: 'sky',
    roles: ['Smart Agriculture Engineer', 'Edge AI Engineer', 'Smart City Developer'],
  },
  {
    id: 'ic-ai',
    name: 'AI Hardware & Chip',
    nameEN: 'AI × IC Design',
    description: 'Thiết kế vi mạch cho AI/ML — NPU, accelerator, chip cho edge computing.',
    icon: 'Cpu',
    color: 'red',
    roles: ['AI Chip Designer', 'NPU Architect', 'Hardware-ML Engineer'],
  },
  {
    id: 'robotics-ai',
    name: 'Robotics & AI',
    nameEN: 'Robotics × AI',
    description: 'Robot tích hợp thị giác máy tính, học máy — drone, cánh tay robot, robot nhân hình.',
    icon: 'Bot',
    color: 'purple',
    roles: ['Robotics Engineer', 'Autonomous Systems Engineer', 'Robot Perception Engineer'],
  },
  {
    id: 'healthcare-tech',
    name: 'Y tế & Tin sinh học',
    nameEN: 'HealthTech × BioInformatics',
    description: 'Ứng dụng CNTT cho y tế — chẩn đoán hình ảnh AI, hồ sơ sức khỏe số, tin sinh học.',
    icon: 'HeartPulse',
    color: 'rose',
    roles: ['Medical AI Engineer', 'BioInformatics Engineer', 'Health Data Scientist'],
  },
  {
    id: 'security-tech',
    name: 'An toàn thông tin',
    nameEN: 'Cybersecurity',
    description: 'Bảo mật phần mềm, mạng, hệ thống nhúng — pentest, cryptography, blockchain security.',
    icon: 'ShieldCheck',
    color: 'amber',
    roles: ['Security Engineer', 'Pentester', 'Cryptography Engineer'],
  },
];

export const careerStats = {
  avgStartingSalary: '15–25 triệu VND/tháng',
  internshipRate: '100% sinh viên năm 3 có thực tập',
  postGradEmployment: '>95% có việc trong 6 tháng sau tốt nghiệp',
  partnerCompanies: '30+ doanh nghiệp đối tác',
};
