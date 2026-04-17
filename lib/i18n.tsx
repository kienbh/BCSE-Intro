'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Lang = 'vi' | 'en' | 'ja';

export const dict = {
  vi: {
    // Nav
    'nav.home': 'Trang chủ',
    'nav.curriculum': 'Đào tạo',
    'nav.research': 'Nghiên cứu',
    'nav.facilities': 'Cơ sở vật chất',
    'nav.faculty': 'Giảng viên',
    'nav.services': 'Dịch vụ',
    'nav.contact': 'Liên hệ',
    'nav.cta': 'Tuyển sinh 2026',

    // Hero
    'hero.title1': 'Bachelor of',
    'hero.title2': 'Computer Science',
    'hero.title3': '& Engineering',
    'hero.tagline': 'Cử nhân Khoa học và Kỹ thuật Máy tính',
    'hero.bullets': '5 định hướng chuyên ngành • 152 tín chỉ • Giảng viên TS. tốt nghiệp các nước phát triển • NCKH từ năm nhất',
    'hero.ctaPrimary': 'Khám phá chương trình',
    'hero.ctaSecondary': 'Đăng ký tuyển sinh',

    // Philosophy
    'philosophy.title': 'Triết lý đào tạo',
    'philosophy.p1.title': 'Khai phóng',
    'philosophy.p1.desc': 'Đào tạo con người toàn diện, tự do học thuật. Sinh viên được khuyến khích tư duy phản biện, sáng tạo, không giới hạn trong kỹ thuật.',
    'philosophy.p2.title': 'Phát triển bền vững',
    'philosophy.p2.desc': 'Nghiên cứu và ứng dụng công nghệ vì cộng đồng. Từ nông nghiệp thông minh đến y tế, giáo dục — công nghệ phục vụ con người.',
    'philosophy.p3.title': 'Khoa học liên ngành',
    'philosophy.p3.desc': 'Kết hợp CNTT với nông nghiệp, y tế, giáo dục, tài chính, tin sinh học. Triết lý này ngày càng đúng đắn trong kỷ nguyên AI.',
    'philosophy.quote': 'Hiện tại xã hội đang thay đổi rất nhanh. Trong hoàn cảnh xã hội như vậy, con người nhiều khi phải "đi biển không có la bàn". Muốn vậy thì "tầm nhìn xa" của con người rất quan trọng. Vì vậy, việc xây dựng kiến thức cốt lõi vững chắc là một yêu cầu rất quan trọng trong việc đào tạo của các trường đại học.',
    'philosophy.quoteAuthor': 'GS.TS. Furuta Motoo',
    'philosophy.quoteTitle': 'Nguyên Hiệu trưởng VJU',
    'philosophy.distinct': 'Đặc trưng BCSE',

    // Specializations
    'specializations.title': '5 Định hướng chuyên ngành',
    'specializations.subtitle': 'Sinh viên tự do chọn hướng đi phù hợp với đam mê và thế mạnh',

    // Highlights
    'highlights.title': 'Điểm nổi bật',
    'highlights.subtitle': 'Chương trình đào tạo chất lượng cao theo chuẩn Nhật Bản',

    // Curriculum
    'section.curriculum': 'Chương trình đào tạo',
    'curriculum.subtitle': '152 tín chỉ, 4 năm — 2 năm nền tảng + 2 năm chuyên ngành',

    // Research
    'section.research': 'Nghiên cứu khoa học',
    'research.subtitle': 'NCKH từ năm nhất — Lambda Lab & các nhóm nghiên cứu',

    // Facilities
    'section.facilities': 'Cơ sở vật chất',
    'facilities.subtitle': 'Fully funded by JICA — From Design to Manufacture',

    // Faculty
    'section.faculty': 'Đội ngũ giảng viên',
    'faculty.subtitle': 'Giảng viên có trình độ cao, tốt nghiệp tiến sĩ tại các nước phát triển',

    // Services
    'section.services': 'Dịch vụ sinh viên',
    'services.subtitle': 'Hệ sinh thái số phục vụ học tập, nghiên cứu và đời sống',

    // Projects
    'section.projects': 'Dự án sinh viên',

    // CTA
    'cta.title': 'Sẵn sàng bắt đầu hành trình cùng BCSE?',
    'cta.subtitle': 'Đào tạo khai phóng, NCKH từ sớm, giảng viên TS. tốt nghiệp các nước phát triển, hạ tầng hiện đại',
    'cta.register': 'Đăng ký tuyển sinh',
    'cta.contact': 'Liên hệ & tư vấn',
    'cta.exploreFull': 'Khám phá đầy đủ',

    // Footer
    'footer.program': 'Chương trình',
    'footer.campus': 'Cơ sở',
    'footer.contact': 'Liên hệ',
    'footer.copyright': 'Vietnam Japan University. All rights reserved.',

    // Common labels
    'label.hotline': 'Hotline tuyển sinh',
    'label.email': 'Email liên hệ',
    'label.active': 'Đang hoạt động',
    'label.comingSoon': 'Sắp ra mắt',
    'label.internal': 'Nội bộ',
    'label.access': 'Truy cập',
    'theme.toggle': 'Đổi giao diện',
    'lang.label': 'Ngôn ngữ',

    // Page: Contact
    'contact.title': 'Liên hệ & Tuyển sinh',
    'contact.info': 'Thông tin liên hệ',
    'contact.switchboard': 'Tổng đài',
    'contact.websiteLink': 'Trang chương trình trên VJU',
    'contact.admission': 'Tuyển sinh',
    'contact.schoolCode': 'Mã trường',
    'contact.programCode': 'Mã ngành',
    'contact.quota': 'Chỉ tiêu',
    'contact.students': 'sinh viên',
    'contact.combinations': 'Tổ hợp xét tuyển',
    'contact.methods': 'Phương thức xét tuyển',
    'contact.viewMore': 'Xem thông tin tuyển sinh',
    'contact.highlights': 'Điểm nổi bật',
    'contact.emailAdm': 'Email tuyển sinh',

    // Page: Curriculum
    'curriculum.title': 'Chương trình đào tạo',
    'curriculum.path': 'Lộ trình 4 năm — Chi tiết từng học kỳ',
    'curriculum.year': 'Năm',
    'curriculum.semester': 'Học kỳ',
    'curriculum.required': 'Bắt buộc',
    'curriculum.elective': 'Tự chọn',
    'curriculum.specializationsTitle': '5 Định hướng chuyên ngành',
    'curriculum.specializationsNote': 'Sau 2 năm học các môn nền tảng chung, sinh viên chọn 1 trong 5 định hướng và hoàn thành danh sách học phần dưới đây.',
    'curriculum.legendPractice': 'Thực tập & Khóa luận',
    'curriculum.legendStar': '(*) = môn cốt lõi của định hướng',
    'curriculum.teachingMethods': 'Phương pháp giảng dạy',
    'curriculum.internshipPartners': 'Đối tác thực tập',

    // Page: Facilities
    'facilities.equipment': 'Thiết bị & Hạ tầng',

    // Page: Research
    'research.pageTitle': 'Research',
    'research.pubs': 'Publications',
    'research.pubsSubtitle': 'Kết quả nghiên cứu',
    'research.blog': 'News & Blog',
    'research.blogSubtitle': 'Cập nhật hoạt động lab, kết quả nghiên cứu, demo, sự kiện.',
    'research.sProjects': 'NCKH Sinh viên',
    'research.sProjectsSubtitle': 'Các đề tài sinh viên BCSE đang thực hiện tại Lambda Lab',
    'research.viewAll': 'Xem tất cả tại',
    'research.noResults': 'Không có kết quả phù hợp.',
    'research.noPosts': 'Không có bài viết phù hợp.',
    'research.studentsLabel': 'Sinh viên',
    'research.supervisorLabel': 'HD',

    // Page: Faculty
    'faculty.core': 'Giảng viên cơ hữu BCSE',
    'faculty.japanese': 'Giảng viên Nhật Bản & Cố vấn',
    'faculty.affiliated': 'Giảng viên thỉnh giảng',
    'faculty.badgeJP': 'Giảng viên Nhật Bản',

    // Page: Services
    'services.pageTitle': 'Cổng dịch vụ trực tuyến',
    'services.pageSubtitle': 'Hệ sinh thái số phục vụ giảng viên và sinh viên BCSE',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.curriculum': 'Curriculum',
    'nav.research': 'Research',
    'nav.facilities': 'Facilities',
    'nav.faculty': 'Faculty',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.cta': 'Admission 2026',

    // Hero
    'hero.title1': 'Bachelor of',
    'hero.title2': 'Computer Science',
    'hero.title3': '& Engineering',
    'hero.tagline': 'Bachelor of Computer Science and Engineering',
    'hero.bullets': '5 specializations • 152 credits • Faculty with PhDs from developed countries • Research from year 1',
    'hero.ctaPrimary': 'Explore the program',
    'hero.ctaSecondary': 'Apply now',

    // Philosophy
    'philosophy.title': 'Educational philosophy',
    'philosophy.p1.title': 'Liberal Arts',
    'philosophy.p1.desc': 'Well-rounded education with academic freedom. Students are encouraged to think critically and creatively — beyond the boundaries of engineering.',
    'philosophy.p2.title': 'Sustainable Development',
    'philosophy.p2.desc': 'Research and apply technology for the community — from smart agriculture to healthcare and education. Technology serves people.',
    'philosophy.p3.title': 'Interdisciplinary Science',
    'philosophy.p3.desc': 'Combining IT with agriculture, healthcare, education, finance, bioinformatics. This philosophy proves ever more relevant in the AI era.',
    'philosophy.quote': 'Society is changing very fast. In such circumstances, people often have to "sail without a compass". Thus a person\'s "long-range vision" is critical — which is why building a solid core knowledge base is an essential mission of universities.',
    'philosophy.quoteAuthor': 'Prof. Furuta Motoo, Ph.D.',
    'philosophy.quoteTitle': 'Former President, VJU',
    'philosophy.distinct': 'BCSE distinctives',

    // Specializations
    'specializations.title': '5 Specializations',
    'specializations.subtitle': 'Students freely choose the path that fits their passion and strengths',

    // Highlights
    'highlights.title': 'Highlights',
    'highlights.subtitle': 'High-quality program built to Japanese standards',

    // Curriculum
    'section.curriculum': 'Curriculum',
    'curriculum.subtitle': '152 credits, 4 years — 2 years of foundation + 2 years of specialization',

    // Research
    'section.research': 'Research',
    'research.subtitle': 'Research from year 1 — Lambda Lab & research groups',

    // Facilities
    'section.facilities': 'Facilities',
    'facilities.subtitle': 'Fully funded by JICA — From Design to Manufacture',

    // Faculty
    'section.faculty': 'Faculty',
    'faculty.subtitle': 'Highly qualified lecturers with PhDs from developed countries',

    // Services
    'section.services': 'Student services',
    'services.subtitle': 'A digital ecosystem for learning, research and student life',

    'section.projects': 'Student projects',

    // CTA
    'cta.title': 'Ready to start your journey with BCSE?',
    'cta.subtitle': 'Liberal education, early research, world-class faculty, modern infrastructure',
    'cta.register': 'Apply now',
    'cta.contact': 'Contact & consulting',
    'cta.exploreFull': 'Explore more',

    // Footer
    'footer.program': 'Program',
    'footer.campus': 'Campus',
    'footer.contact': 'Contact',
    'footer.copyright': 'Vietnam Japan University. All rights reserved.',

    'label.hotline': 'Admission hotline',
    'label.email': 'Contact email',
    'label.active': 'Active',
    'label.comingSoon': 'Coming soon',
    'label.internal': 'Internal',
    'label.access': 'Access',
    'theme.toggle': 'Toggle theme',
    'lang.label': 'Language',

    'contact.title': 'Contact & Admission',
    'contact.info': 'Contact information',
    'contact.switchboard': 'Main line',
    'contact.websiteLink': 'Program page on VJU',
    'contact.admission': 'Admission',
    'contact.schoolCode': 'School code',
    'contact.programCode': 'Program code',
    'contact.quota': 'Quota',
    'contact.students': 'students',
    'contact.combinations': 'Subject combinations',
    'contact.methods': 'Admission methods',
    'contact.viewMore': 'View admission details',
    'contact.highlights': 'Highlights',
    'contact.emailAdm': 'Admission email',

    'curriculum.title': 'Curriculum',
    'curriculum.path': '4-year path — details by semester',
    'curriculum.year': 'Year',
    'curriculum.semester': 'Semester',
    'curriculum.required': 'Required',
    'curriculum.elective': 'Elective',
    'curriculum.specializationsTitle': '5 Specializations',
    'curriculum.specializationsNote': 'After 2 years of common foundation, students choose 1 of 5 specializations and complete the course list below.',
    'curriculum.legendPractice': 'Internship & Thesis',
    'curriculum.legendStar': '(*) = core course of the specialization',
    'curriculum.teachingMethods': 'Teaching methods',
    'curriculum.internshipPartners': 'Internship partners',

    'facilities.equipment': 'Equipment & Infrastructure',

    'research.pageTitle': 'Research',
    'research.pubs': 'Publications',
    'research.pubsSubtitle': 'Research outputs',
    'research.blog': 'News & Blog',
    'research.blogSubtitle': 'Lab activity, research results, demos and events.',
    'research.sProjects': 'Student research (NCKH)',
    'research.sProjectsSubtitle': 'BCSE student projects at Lambda Lab',
    'research.viewAll': 'View all at',
    'research.noResults': 'No matching results.',
    'research.noPosts': 'No matching posts.',
    'research.studentsLabel': 'Students',
    'research.supervisorLabel': 'Adv.',

    'faculty.core': 'Core BCSE faculty',
    'faculty.japanese': 'Japanese faculty & advisors',
    'faculty.affiliated': 'Affiliated faculty',
    'faculty.badgeJP': 'Japanese faculty',

    'services.pageTitle': 'Online services portal',
    'services.pageSubtitle': 'Digital ecosystem for BCSE faculty and students',
  },
  ja: {
    // Nav
    'nav.home': 'ホーム',
    'nav.curriculum': 'カリキュラム',
    'nav.research': '研究',
    'nav.facilities': '施設',
    'nav.faculty': '教員',
    'nav.services': 'サービス',
    'nav.contact': 'お問い合わせ',
    'nav.cta': '2026年度入学',

    // Hero
    'hero.title1': 'Bachelor of',
    'hero.title2': 'Computer Science',
    'hero.title3': '& Engineering',
    'hero.tagline': 'コンピュータサイエンス・工学 学士課程',
    'hero.bullets': '5 専攻分野 • 152 単位 • 先進国で博士号を取得した高水準の教員陣 • 1 年次から研究開始',
    'hero.ctaPrimary': 'プログラムを見る',
    'hero.ctaSecondary': '出願する',

    // Philosophy
    'philosophy.title': '教育理念',
    'philosophy.p1.title': 'リベラルアーツ',
    'philosophy.p1.desc': '学問の自由を重んじた全人教育。工学の枠を超えて、批判的思考と創造性を育みます。',
    'philosophy.p2.title': '持続可能な発展',
    'philosophy.p2.desc': 'スマート農業から医療、教育まで——技術を社会のために応用し、人間に貢献する研究を推進します。',
    'philosophy.p3.title': '学際科学',
    'philosophy.p3.desc': 'IT と農業、医療、教育、金融、バイオインフォマティクスを融合。AI 時代にますます重要性が増す理念です。',
    'philosophy.quote': '現代社会は急速に変化しています。そのような状況下で、人は時に「羅針盤なしで航海する」ことを迫られます。だからこそ人間の「長期的視野」が重要であり、強固な核となる知識を築くことが大学教育の要となるのです。',
    'philosophy.quoteAuthor': '古田 元夫 博士',
    'philosophy.quoteTitle': 'VJU 前学長',
    'philosophy.distinct': 'BCSE の特色',

    // Specializations
    'specializations.title': '5 つの専攻',
    'specializations.subtitle': '学生は情熱と強みに合わせて自由に進路を選択できます',

    // Highlights
    'highlights.title': 'ハイライト',
    'highlights.subtitle': '日本基準の高品質プログラム',

    // Curriculum
    'section.curriculum': 'カリキュラム',
    'curriculum.subtitle': '152 単位、4 年間 — 2 年の基礎 + 2 年の専門',

    'section.research': '研究',
    'research.subtitle': '1 年次から研究 — Lambda Lab と研究グループ',

    'section.facilities': '施設',
    'facilities.subtitle': 'JICA 全額支援 — 設計から製造まで',

    'section.faculty': '教員',
    'faculty.subtitle': '先進国で博士号を取得した高水準の教員陣',

    'section.services': '学生サービス',
    'services.subtitle': '学び、研究、学生生活を支えるデジタルエコシステム',

    'section.projects': '学生プロジェクト',

    'cta.title': 'BCSE と共に新たな旅へ',
    'cta.subtitle': 'リベラル教育、早期研究、海外博士号の教員陣、最新のインフラ',
    'cta.register': '出願する',
    'cta.contact': '相談・お問い合わせ',
    'cta.exploreFull': 'もっと見る',

    'footer.program': 'プログラム',
    'footer.campus': 'キャンパス',
    'footer.contact': 'お問い合わせ',
    'footer.copyright': 'Vietnam Japan University. All rights reserved.',

    'label.hotline': '入学ホットライン',
    'label.email': '連絡先メール',
    'label.active': '稼働中',
    'label.comingSoon': '近日公開',
    'label.internal': '内部',
    'label.access': 'アクセス',
    'theme.toggle': 'テーマ切替',
    'lang.label': '言語',

    'contact.title': 'お問い合わせ・入学',
    'contact.info': '連絡先情報',
    'contact.switchboard': '代表電話',
    'contact.websiteLink': 'VJU プログラムページ',
    'contact.admission': '入学',
    'contact.schoolCode': '学校コード',
    'contact.programCode': '学科コード',
    'contact.quota': '定員',
    'contact.students': '名',
    'contact.combinations': '入試科目組み合わせ',
    'contact.methods': '入試方法',
    'contact.viewMore': '入学情報を見る',
    'contact.highlights': 'ハイライト',
    'contact.emailAdm': '入学用メール',

    'curriculum.title': 'カリキュラム',
    'curriculum.path': '4 年間のロードマップ — 学期ごとの詳細',
    'curriculum.year': '年次',
    'curriculum.semester': '学期',
    'curriculum.required': '必修',
    'curriculum.elective': '選択',
    'curriculum.specializationsTitle': '5 つの専攻',
    'curriculum.specializationsNote': '2 年間の共通基礎を経て、学生は 5 つの専攻から 1 つを選び、以下の科目群を履修します。',
    'curriculum.legendPractice': 'インターンシップ・卒業論文',
    'curriculum.legendStar': '(*) = 専攻のコア科目',
    'curriculum.teachingMethods': '教授法',
    'curriculum.internshipPartners': 'インターンシップ提携先',

    'facilities.equipment': '設備・インフラ',

    'research.pageTitle': 'Research',
    'research.pubs': 'Publications',
    'research.pubsSubtitle': '研究成果',
    'research.blog': 'News & Blog',
    'research.blogSubtitle': 'ラボ活動、研究成果、デモ、イベントの最新情報。',
    'research.sProjects': '学生研究 (NCKH)',
    'research.sProjectsSubtitle': 'Lambda Lab で進行中の BCSE 学生プロジェクト',
    'research.viewAll': '詳細はこちら',
    'research.noResults': '該当する結果はありません。',
    'research.noPosts': '該当する投稿はありません。',
    'research.studentsLabel': '学生',
    'research.supervisorLabel': '指導',

    'faculty.core': 'BCSE 専任教員',
    'faculty.japanese': '日本人教員・アドバイザー',
    'faculty.affiliated': '非常勤・客員教員',
    'faculty.badgeJP': '日本人教員',

    'services.pageTitle': 'オンラインサービスポータル',
    'services.pageSubtitle': 'BCSE 教員と学生のためのデジタルエコシステム',
  },
} as const;

export type DictKey = keyof typeof dict.vi;

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: DictKey) => string;
}

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('vi');

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('lang')) as Lang | null;
    if (saved && ['vi', 'en', 'ja'].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('lang', l);
    document.documentElement.lang = l;
  };

  const t = (k: DictKey) => (dict[lang] as Record<string, string>)[k] ?? (dict.vi as Record<string, string>)[k] ?? k;

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const c = useContext(Ctx);
  if (!c) return {
    lang: 'vi' as Lang,
    setLang: () => {},
    t: (k: DictKey) => (dict.vi as Record<string, string>)[k] ?? k,
  };
  return c;
}
