export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  position: string;
  positionEN: string;
  specialization: string[];
  email: string;
  isJapanese?: boolean;
  affiliation?: string;
  founderRole?: 'founder' | 'cofounder';
}

// === GIẢNG VIÊN CƠ HỮU BCSE ===
export const coreFaculty: FacultyMember[] = [
  {
    id: 'dr-oanh',
    name: 'Nguyễn Hoàng Oanh',
    title: 'TS.',
    position: 'Hiệu trưởng VJU · Founder BCSE, Giảng viên',
    positionEN: 'Rector of VJU · Founder BCSE Program, Lecturer',
    specialization: ['Data Science', 'Cloud Computing', 'Statistics'],
    email: 'nguyenoh@vju.ac.vn',
    founderRole: 'founder',
  },
  {
    id: 'dr-kien',
    name: 'Bùi Huy Kiên',
    title: 'TS.',
    position: 'Giám đốc chương trình, Giảng viên, Cố vấn học tập',
    positionEN: 'Program Director, Lecturer, Academic Advisor',
    specialization: ['Computer Vision', 'AI/ML', 'IoT', 'Robotics'],
    email: 'bh.kien@vju.ac.vn',
  },
  {
    id: 'dr-thanh',
    name: 'Phạm Tiến Thành',
    title: 'TS.',
    position: 'Phó khoa FATE phụ trách đào tạo · Co-founder BCSE, Giảng viên',
    positionEN: 'Vice Dean of FATE (Education) · Co-founder BCSE Program, Lecturer',
    specialization: ['Electrical', 'Electronic Engineering'],
    email: 'pt.thanh@vju.ac.vn',
    founderRole: 'cofounder',
  },
  {
    id: 'dr-tho',
    name: 'Phạm Đức Thọ',
    title: 'TS.',
    position: 'Phó phòng nhân sự phụ trách chuyển đổi số, Giảng viên',
    positionEN: 'Vice Head of HR (Digital Transformation), Lecturer',
    specialization: ['AI in Education', 'E-Learning', 'AR/VR'],
    email: 'pd.tho@vju.ac.vn',
  },
  {
    id: 'dr-ngoc',
    name: 'Tạ Quang Ngọc',
    title: 'TS.',
    position: 'Giảng viên',
    positionEN: 'Lecturer',
    specialization: ['Cloud Computing', 'Microservices', 'LLMOps'],
    email: 'tq.ngoc@vju.ac.vn',
  },
  {
    id: 'dr-quy',
    name: 'Lê Kim Quy',
    title: 'TS.',
    position: 'Giảng viên',
    positionEN: 'Lecturer',
    specialization: ['Image Processing', 'Computer Vision', 'Flow Analysis'],
    email: 'lk.quy@vju.ac.vn',
  },
  {
    id: 'prof-honda',
    name: 'Honda Satoshi',
    title: 'GS.',
    position: 'Chuyên gia JICA, Giảng viên',
    positionEN: 'JICA Expert, Lecturer',
    specialization: ['Signal Processing', 'EEG/BCI', 'ML', '3D Printing'],
    email: 'honda.s@vju.ac.vn',
    isJapanese: true,
    affiliation: 'Keio University',
  },
  {
    id: 'msc-dat',
    name: 'Nguyễn Tiến Đạt',
    title: 'ThS.',
    position: 'Trợ giảng, Quản lý thiết bị Lab',
    positionEN: 'TA, Lab Equipment Manager',
    specialization: ['Lab Management', 'IC Design'],
    email: 'nt.dat@vju.ac.vn',
  },
];

// === GIẢNG VIÊN NHẬT BẢN & CỐ VẤN (không thuộc cơ hữu) ===
export const japaneseFaculty: FacultyMember[] = [
  {
    id: 'prof-ishikawa',
    name: 'Ishikawa Masatoshi',
    title: 'GS.TS.',
    position: 'Cố vấn chương trình',
    positionEN: 'Program Advisor',
    specialization: ['Computer Science'],
    email: '',
    isJapanese: true,
    affiliation: 'University of Tokyo',
  },
  {
    id: 'prof-tamai',
    name: 'Tetsuo Tamai',
    title: 'GS.',
    position: 'Cố vấn chương trình',
    positionEN: 'Program Advisor',
    specialization: ['Software Engineering'],
    email: '',
    isJapanese: true,
  },
  {
    id: 'prof-kasai',
    name: 'Kasai Hideki',
    title: 'GS.TS.',
    position: 'Giảng viên',
    positionEN: 'Lecturer',
    specialization: ['Computer Science'],
    email: '',
    isJapanese: true,
    affiliation: 'Osaka University',
  },
  {
    id: 'prof-ochimizu',
    name: 'Koichiro Ochimizu',
    title: 'GS.',
    position: 'Giảng viên',
    positionEN: 'Lecturer',
    specialization: ['Software Engineering'],
    email: '',
    isJapanese: true,
  },
  {
    id: 'dr-nakamaru',
    name: 'Tomoki Nakamaru',
    title: 'TS.',
    position: 'Giảng viên',
    positionEN: 'Lecturer',
    specialization: ['Computer Science'],
    email: '',
    isJapanese: true,
  },
  {
    id: 'dr-hino',
    name: 'Hino Yoshifumi',
    title: 'TS.',
    position: 'Giảng viên',
    positionEN: 'Lecturer',
    specialization: ['Business Administration'],
    email: '',
    isJapanese: true,
  },
  {
    id: 'dr-tamura',
    name: 'Tamura Makoto',
    title: 'TS.',
    position: 'Giảng viên',
    positionEN: 'Lecturer',
    specialization: ['Climate Change'],
    email: '',
    isJapanese: true,
    affiliation: 'Ibaraki University',
  },
];

// === GIẢNG VIÊN THỈNH GIẢNG (từ file Excel) ===
export const affiliatedFaculty: FacultyMember[] = [
  { id: 'gv-01', name: 'Lương Trâm Anh', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'tramanh@vnu.edu.vn', affiliation: 'ĐH Kinh tế, ĐHQGHN' },
  { id: 'gv-02', name: 'Đỗ Xuân Chợ', title: 'PGS.TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'chodx@ptit.edu.vn', affiliation: 'Học viện CNBCVT' },
  { id: 'gv-03', name: 'Lê Cường', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'cuongle@epu.edu.vn', affiliation: 'ĐH Điện lực Hà Nội' },
  { id: 'gv-04', name: 'Trần Thị Điểm', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'diemtt@uit.edu.vn', affiliation: 'ĐH CNTT, ĐHQG TP.HCM' },
  { id: 'gv-05', name: 'Nguyễn Ngọc Điệp', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'diepnguyenngoc@ptit.edu.vn', affiliation: 'Học viện CNBCVT' },
  { id: 'gv-06', name: 'Nguyễn Ngọc Đỉnh', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'nguyenngocdinh@hus.edu.vn', affiliation: 'ĐH KHTN, ĐHQGHN' },
  { id: 'gv-07', name: 'Vũ Hoàng Gia', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'giavh@lqdtu.edu.vn', affiliation: 'Học viện KTQS' },
  { id: 'gv-08', name: 'Phạm Đăng Hải', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'haipd@soict.hust.edu.vn', affiliation: 'ĐH Bách khoa Hà Nội' },
  { id: 'gv-09', name: 'Nguyễn Thế Hùng', title: 'ThS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'nthungmta@gmail.com', affiliation: 'Học viện KTQS' },
  { id: 'gv-10', name: 'Nguyễn Tài Hưng', title: 'PGS.TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'hung.nguyentai@hust.edu.vn', affiliation: 'ĐH Bách Khoa Hà Nội' },
  { id: 'gv-11', name: 'Trần Đăng Hưng', title: 'PGS.TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'Hungtd@haui.edu.vn', affiliation: 'ĐH Sư phạm Hà Nội' },
  { id: 'gv-12', name: 'Đặng Thị Hương', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'huongdthvn@gmail.com', affiliation: 'ĐH Kinh tế, ĐHQGHN' },
  { id: 'gv-13', name: 'Phạm Văn Khánh', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'khanhvietdm@gmail.com', affiliation: 'Viện CNTT, Viện HLKHCNVN' },
  { id: 'gv-14', name: 'Tô Văn Khánh', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'khanhtv@vnu.edu.vn', affiliation: 'ĐH Công nghệ, ĐHQGHN' },
  { id: 'gv-15', name: 'Đỗ Trung Kiên', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'kiendt@hnue.edu.vn', affiliation: 'ĐH Sư phạm Hà Nội' },
  { id: 'gv-16', name: 'Phạm Hoài Luân', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'luanph@uit.edu.vn', affiliation: 'ĐH CNTT, ĐHQG TP.HCM' },
  { id: 'gv-17', name: 'Đinh Đức Mạnh', title: 'ThS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'manh.dev.2010@gmail.com', affiliation: 'ĐH FPT' },
  { id: 'gv-18', name: 'Lê Chí Ngọc', title: 'PGS.TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'lechingoc@yahoo.com', affiliation: 'ĐH Bách Khoa Hà Nội' },
  { id: 'gv-19', name: 'Trần Thị Oanh', title: 'PGS.TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'tranthioanh@vnu.edu.vn', affiliation: 'Trường Quốc tế, ĐHQGHN' },
  { id: 'gv-20', name: 'Trần Hữu Phi', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'huuphi.tran88@gmail.com', affiliation: 'Học viện KTQS' },
  { id: 'gv-21', name: 'Lê Hồng Thái', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'thailh@vnu.edu.vn', affiliation: 'ĐH Kinh tế, ĐHQGHN' },
  { id: 'gv-22', name: 'Lê Xuân Thanh', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'lxthanh@math.ac.vn', affiliation: 'Viện Toán học, Viện HLKHCNVN' },
  { id: 'gv-23', name: 'Nguyễn Văn Tình', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'take@lqdtu.edu.vn', affiliation: 'Học viện KTQS' },
  { id: 'gv-24', name: 'Phạm Doãn Tĩnh', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'tinh.phamdoan@hust.edu.vn', affiliation: 'ĐH Bách khoa Hà Nội' },
  { id: 'gv-25', name: 'Nguyễn Thùy Trang', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'Nguyenthuytrang@hus.edu.vn', affiliation: 'ĐH KHTN, ĐHQGHN' },
  { id: 'gv-26', name: 'Lưu Quang Trung', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'trung.luuquang@hust.edu.vn', affiliation: 'ĐH Bách Khoa Hà Nội' },
  { id: 'gv-27', name: 'Giang Thành Trung', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'trunggt@hnue.edu.vn', affiliation: 'ĐH Sư phạm Hà Nội' },
  { id: 'gv-28', name: 'Nguyễn Văn Vinh', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'vinhnv@vnu.edu.vn', affiliation: 'ĐH Công nghệ, ĐHQGHN' },
  { id: 'gv-29', name: 'Nguyễn Cảnh Việt', title: 'ThS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'vietncp@gmail.com', affiliation: 'ĐH KHTN, ĐHQGHN' },
  { id: 'gv-30', name: 'Phạm Văn Việt', title: 'TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'v.v.pham2012@gmail.com', affiliation: 'Học viện KTQS' },
  { id: 'gv-31', name: 'Đào Xuân Việt', title: 'PGS.TS.', position: 'Giảng viên thỉnh giảng', positionEN: 'Visiting Lecturer', specialization: [], email: 'viet.daoxuan@hust.edu.vn', affiliation: 'ĐH Bách Khoa Hà Nội' },
];

// All faculty combined
export const faculty = [...coreFaculty, ...japaneseFaculty, ...affiliatedFaculty];
