# BCSE Intro — Landing VJU · Bachelor of Computer Science & Engineering

Trang giới thiệu chương trình **Cử nhân Khoa học và Kỹ thuật Máy tính** (BCSE) tại Đại học Việt Nhật — ĐHQGHN.

- Live: **https://sv08.bcse-vju.com**
- Stack: Next.js 14 (App Router) + Tailwind CSS + TypeScript + Framer Motion
- Build mode: `output: 'export'` — static export, Nginx serve.

---

## 1. Cấu trúc thư mục

```
bcse-intro/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout — LanguageProvider + theme pre-paint script
│   ├── page.tsx            # Trang chủ (Hero + Philosophy + Highlights + ...)
│   ├── globals.css         # Tailwind + light-mode overrides (html.light cascade)
│   ├── curriculum/         # /curriculum
│   ├── research/           # /research
│   ├── facilities/         # /facilities
│   ├── faculty/            # /faculty
│   ├── services/           # /services
│   └── contact/            # /contact
├── components/
│   ├── layout/             # Navbar, Footer, ThemeToggle, LanguageToggle
│   ├── home/               # Hero, Philosophy, Specializations, ...
│   ├── shared/             # SectionTitle, ScrollReveal
│   └── ui/                 # GlassCard, ImagePlaceholder, StatCounter, ...
├── data/                   # Dữ liệu nội dung (tất cả content hardcoded ở đây)
│   ├── navigation.ts       # Menu + CTA
│   ├── philosophy.ts       # Triết lý đào tạo + distinct features
│   ├── curriculum.ts, research.ts, facilities.ts, faculty.ts, services.ts, contact.ts
│   └── ...
├── lib/
│   ├── i18n.tsx            # LanguageProvider + dict (vi/en/ja) + useLang()
│   └── utils.ts            # cn() + getIcon()
├── public/images/          # Logos, ảnh facility, faculty, products...
├── next.config.mjs         # output: 'export', trailingSlash, images.unoptimized
└── tailwind.config.ts      # darkMode: 'class' + custom colors/fonts
```

---

## 2. Tính năng chính

### Light / Dark mode
- Mặc định **dark** (brand BCSE). Toggle sun/moon ở navbar.
- Lưu vào `localStorage.theme = 'dark' | 'light'`.
- Pre-paint script trong `app/layout.tsx` đọc localStorage trước khi React mount để tránh flash.
- Light mode dùng CSS cascade trong `globals.css` (selector `html.light .bg-slate-950` ...) — KHÔNG cần viết `dark:` prefix cho mọi class.

### Đa ngôn ngữ VI / EN / JA
- `lib/i18n.tsx` chứa dictionary 3 ngôn ngữ cho UI chrome (nav, hero, section titles, CTA).
- Toggle globe ở navbar dropdown VI/EN/JA. Lưu vào `localStorage.lang`.
- Dùng trong component:
  ```tsx
  import { useLang } from '@/lib/i18n';
  const { t } = useLang();
  <h1>{t('hero.title1')}</h1>
  ```
- **Lưu ý**: nội dung dữ liệu trong `data/*.ts` (triết lý, khóa học, giảng viên...) hiện vẫn tiếng Việt. Khi cần dịch content chi tiết, mở rộng dictionary hoặc chuyển `data/*.ts` sang object `{ vi, en, ja }`.

### Deploy
- Static export `out/`, Nginx serve trực tiếp trên SV08 (192.168.2.108).
- Domain: `sv08.bcse-vju.com` qua Cloudflare Tunnel.

---

## 3. Quy trình dev local

```bash
# Cài dependencies
npm install

# Dev server
npm run dev          # http://localhost:3000

# Build production (xuất ra ./out/)
npm run build

# Lint
npm run lint
```

**Quy tắc quan trọng:**
- Script build strict mode cho ESLint — mọi `unused import` sẽ fail build.
- Nội dung tiếng Việt tập trung trong `data/` — tránh hardcode text trong component.
- UI strings đa ngôn ngữ đi qua `t('key')`. Thêm key mới vào `lib/i18n.tsx` cho đủ 3 ngôn ngữ.
- Với image lớn (facility, robot...): đặt trong `public/images/...`, dùng component `ImagePlaceholder`.

---

## 4. Thêm section / trang mới

### Thêm một section trên trang chủ
1. Tạo component mới trong `components/home/XyzSection.tsx`.
2. Import dữ liệu từ `data/xyz.ts` (nếu content-heavy thì tách file).
3. Gắn vào `app/page.tsx`.
4. Nếu có title → dùng `SectionTitle` với key i18n.

### Thêm một trang mới
1. Tạo `app/<slug>/page.tsx` (server component; thêm `'use client'` nếu cần hook).
2. Export `metadata` cho SEO.
3. Thêm mục vào `data/navigation.ts` (labelKey + href) + key tương ứng trong `lib/i18n.tsx`.

### Thêm ngôn ngữ mới
1. Mở `lib/i18n.tsx`, thêm vào type `Lang` (ví dụ `'ko'`).
2. Thêm object `ko: { ... }` đầy đủ key trong `dict`.
3. Thêm vào `LANGS` trong `components/layout/LanguageToggle.tsx`.

---

## 5. Deploy lên SV08

Script deploy tại `C:/Users/Admin/Desktop/files/Server Management/deploy_bcse_intro.py`.

```bash
cd "C:/Users/Admin/Desktop/files/Server Management"
python deploy_bcse_intro.py
```

Pipeline:
1. Ensure Cloudflare CNAME `sv08 → bcse-vju.com`.
2. Pack source tar.gz (exclude `node_modules`, `.next`, `out`, `.git`).
3. SSH qua jump host `123.16.53.250:2223 → 192.168.2.108`.
4. Ensure Node.js 20 LTS trên VPS (NodeSource).
5. Upload tar, extract vào `/opt/bcse-intro`, `npm install`, `npx next build`.
6. `chmod a+rX` cho Nginx đọc; `chmod o+x /opt /opt/bcse-intro`.
7. Cài Nginx config `/etc/nginx/sites-available/bcse-intro`, reload.
8. Smoke test `curl 127.0.0.1 -H "Host: sv08.bcse-vju.com"`.

**Cấu hình Nginx** (trong script, auto-deploy): serve `root /opt/bcse-intro/out`, `try_files $uri $uri.html $uri/index.html =404` cho Next.js static export với `trailingSlash: true`.

---

## 6. Quy trình làm việc chuẩn (từ issue → production)

```
┌────────────────┐     ┌──────────────┐     ┌────────────┐     ┌─────────────┐
│ 1. Nhận yêu   │ ──> │ 2. Sửa code  │ ──> │ 3. Build   │ ──> │ 4. Git      │
│    cầu (user)  │     │    + test    │     │    local   │     │    commit   │
└────────────────┘     └──────────────┘     └────────────┘     └─────────────┘
                                                                       │
                       ┌──────────────┐     ┌────────────┐              ▼
                       │ 7. Smoke     │ <── │ 6. Deploy  │ <── ┌─────────────┐
                       │    test URL  │     │    SV08    │     │ 5. Push     │
                       └──────────────┘     └────────────┘     └─────────────┘
```

1. **Nhận yêu cầu** — user báo bug/feature.
2. **Sửa code** — ưu tiên chỉnh `data/*.ts` nếu là nội dung; chỉnh component nếu là UI.
3. **Build local** — `npm run build`. Fail → fix ngay (ESLint strict, không cho unused).
4. **Git commit** — commit từng bước rõ ràng, message theo style existing.
5. **Push** (nếu đã set remote).
6. **Deploy SV08** — chạy `deploy_bcse_intro.py`.
7. **Smoke test** — `curl -I https://sv08.bcse-vju.com` → phải 200.

---

## 7. Hạ tầng liên quan (BCSE cluster)

| Server | IP              | Domain                | Stack                              |
|--------|-----------------|-----------------------|------------------------------------|
| SV01   | 192.168.2.101   | sv01.bcse-vju.com     | 3D Lab Manager (React+Express)     |
| SV02   | 192.168.2.102   | sv02.bcse-vju.com     | BCSE AI Advisor (FastAPI+Chroma)   |
| SV03   | 192.168.2.103   | sv03.bcse-vju.com     | GPU Server (Ollama + RTX 4090)     |
| SV04   | 192.168.2.104   | sv04.bcse-vju.com     | E-Service (NestJS+Next.js+PG)      |
| SV06   | 192.168.2.106   | sv06.bcse-vju.com     | Mochi Chat (React+Express+Gemini)  |
| **SV08** | **192.168.2.108** | **sv08.bcse-vju.com** | **BCSE Intro (this repo)**       |

Tất cả domain đi qua Cloudflare Tunnel; CNAME `svXX → bcse-vju.com` proxied.

---

## 8. Liên hệ

- **Email tuyển sinh**: admission@vju.ac.vn
- **Tuyển sinh 2026**: https://vju.ac.vn/ttts2026/
- **Website chương trình**: https://vju.ac.vn/khoa-hoc-ky-thuat-may-tinh/
