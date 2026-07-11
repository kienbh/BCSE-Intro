import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'BCSE — Khoa học Máy tính & Kỹ thuật | VJU',
  description: 'Chương trình Cử nhân Khoa học Máy tính & Kỹ thuật tại Đại học Việt Nhật (VJU). Đào tạo chất lượng Nhật Bản, nghiên cứu tiên tiến, cơ sở vật chất hiện đại.',
  keywords: ['BCSE', 'VJU', 'Vietnam Japan University', 'Computer Science', 'Khoa học máy tính'],
};

const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme') || 'dark';
    var l = localStorage.getItem('lang') || 'vi';
    document.documentElement.classList.add(t);
    document.documentElement.lang = l;
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Umami analytics — BCSE Ops Center (sv05). Đo WAU cho GĐ0 (docs/MASTER-PLAN-2026 N0). */}
        <script
          defer
          src="https://sv05.bcse-vju.com/script.js"
          data-website-id="51db80fc-9006-4619-9899-0cde73524a33"
        />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
