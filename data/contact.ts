import type { Localized } from '@/lib/localized';

export const contactInfo: {
  program: Localized<string>;
  programEN: string;
  programCode: string;
  schoolCode: string;
  university: Localized<string>;
  campuses: Array<{ name: Localized<string>; address: Localized<string>; rooms: Localized<string> }>;
  phones: { main: string; admissionExt: string; hotline1: string; hotline2: string };
  directorName: string;
  directorTitle: Localized<string>;
  emails: { director: string; admission: string; info: string; cooperation: string };
  website: string;
  admissionUrl: string;
  social: { facebook: string; github: string; youtube: string };
} = {
  program: {
    vi: 'Chương trình Cử nhân Khoa học và Kỹ thuật Máy tính (BCSE)',
    en: 'Bachelor of Computer Science and Engineering (BCSE)',
    ja: 'コンピュータサイエンス・工学 学士課程 (BCSE)',
  },
  programEN: 'Bachelor of Computer Science and Engineering (Honors Program)',
  programCode: '7480204QTD',
  schoolCode: 'VJU',
  university: {
    vi: 'Đại học Việt Nhật (VJU) — Đại học Quốc gia Hà Nội',
    en: 'Vietnam Japan University (VJU) — Vietnam National University, Hanoi',
    ja: 'ベトナム日本大学 (VJU) — ベトナム国家大学 ハノイ校',
  },

  campuses: [
    {
      name: {
        vi: 'Cơ sở Mỹ Đình',
        en: 'My Dinh Campus',
        ja: 'ミーディン・キャンパス',
      },
      address: {
        vi: 'Tầng 5, Nhà điều hành, Phố Lưu Hữu Phước, Phường Cầu Diễn, Quận Nam Từ Liêm, Hà Nội',
        en: '5F, Administrative Building, Luu Huu Phuoc Street, Cau Dien Ward, Nam Tu Liem District, Hanoi',
        ja: 'ハノイ市ナムトゥーリエム区カウディエン町ルーフー・フォック通り、管理棟 5 階',
      },
      rooms: { vi: 'Phòng 502', en: 'Room 502', ja: '502 号室' },
    },
    {
      name: {
        vi: 'Cơ sở Hòa Lạc',
        en: 'Hoa Lac Campus',
        ja: 'ホアラック・キャンパス',
      },
      address: {
        vi: 'GĐ3 + QGHN04, Khu CNC Hòa Lạc, Thạch Thất, Hà Nội',
        en: 'Building GD3 + QGHN04, Hoa Lac High-Tech Park, Thach That District, Hanoi',
        ja: 'ハノイ市タックタット区ホアラック・ハイテクパーク、GD3 + QGHN04 棟',
      },
      rooms: {
        vi: 'Phòng 3204, BCSE Workshop',
        en: 'Room 3204, BCSE Workshop',
        ja: '3204 号室、BCSE ワークショップ',
      },
    },
  ],

  phones: {
    main: '024.7306.6001',
    admissionExt: '024.7306.6001 – Ext 5093',
    hotline1: '0966 954 736',
    hotline2: '0969 638 426',
  },

  directorName: 'TS. Bùi Huy Kiên',
  directorTitle: {
    vi: 'Giám đốc chương trình',
    en: 'Program Director',
    ja: 'プログラム・ディレクター',
  },

  emails: {
    director: 'bh.kien@vju.ac.vn',
    admission: 'admission@vju.ac.vn',
    info: 'info@vju.ac.vn',
    cooperation: 'cooperation@vju.ac.vn',
  },

  website: 'https://vju.ac.vn/khoa-hoc-ky-thuat-may-tinh/',
  admissionUrl: 'https://vju.ac.vn/ttts2026/',

  social: {
    facebook: '#',
    github: 'https://github.com/kienbh',
    youtube: '#',
  },
};

export const admissionInfo = {
  year: 2026,
  quota: 150,
  subjectCombinations: [
    { code: 'A00', subjects: 'Toán, Lý, Hóa' },
    { code: 'A01', subjects: 'Toán, Lý, Anh' },
    { code: 'D28', subjects: 'Toán, Lý, Nhật' },
    { code: 'D07', subjects: 'Toán, Hóa, Anh' },
    { code: 'D23', subjects: 'Toán, Hóa, Nhật' },
    { code: 'D08', subjects: 'Toán, Sinh, Anh' },
    { code: 'D33', subjects: 'Toán, Sinh, Nhật' },
  ],
  admissionMethods: [
    'Xét học bạ + phỏng vấn',
    'Kết quả thi THPT Quốc gia',
    'Chứng chỉ tiếng Anh quốc tế + 2 môn THPT',
    'Điểm SAT',
    'Chứng chỉ A-Level',
    'Tuyển thẳng từ trường chuyên',
    'Giải quốc gia / quốc tế',
    'Kỳ thi đánh giá năng lực ĐHQGHN',
  ],
  scholarshipNote: 'Tối thiểu 20% sinh viên được nhận học bổng toàn phần hoặc bán phần. Có thêm học bổng từ doanh nghiệp.',
  partnerUniversities: '7 trường đại học lớn tại Nhật Bản',
};
