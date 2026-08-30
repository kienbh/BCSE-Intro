# Rà soát Theme Light/Dark — Toàn hệ BCSE & Playbook chuyển sang Semantic Token

> **Ngày:** 2026-08-30 · **Phạm vi:** 14 repo frontend trong `d:\files\` · **Người rà:** Claude Code
> **Mục đích:** Chuẩn bị cho đợt **fix lại nhiều cổng khi đổi mô hình theme**. Báo cáo này (1) chỉ ra cổng nào đang dùng mô hình nào, (2) chốt **một mô hình đích dùng chung** (semantic token + `dark:`/`[data-theme]`), (3) đưa **playbook migration lặp lại được** cho từng cổng, (4) SV08 làm ca điển hình chi tiết.
> **Tin tốt:** Hệ này **đã có sẵn mô hình đúng** — bộ lab-platform (lambda/delta/hygieia) dùng CSS-variable + `[data-theme]`, 0 `!important`. Không cần phát minh lại; chỉ cần **chuẩn hóa mọi cổng về khuôn đó**.

---

## 0. Dùng tài liệu này thế nào

Khi fix một cổng bất kỳ:
1. Tra **§1 Bảng hiện trạng** → biết cổng đó đang ở "nhóm" nào (blocklist hỏng / hardcode 1 theme / đã sạch).
2. Đọc **§2** để nhận diện anti-pattern (3 dấu hiệu) — xác nhận đúng bệnh.
3. Áp **§4 Mô hình đích** + **§5 Playbook 7 bước** + **§6 Bảng tra class → token**.
4. Với cổng nào cần ca cụ thể, xem **§7 Ghi chú từng cổng** và **§3 (SV08 điển hình)**.
5. Tránh các bẫy ở **§8**.

---

## 1. Bảng hiện trạng theme — 14 repo

| Repo | Cổng | Stack | `darkMode` | Dùng `dark:` | Override thủ công | Toggle | Class dark cố định | **Nhóm** |
|---|---|---|---|---|---|---|---|---|
| **bcse-intro** | sv08 | Next 14 · TW v3 | `'class'` | **0** | `html.light` + ~41 `!important` | Có | ~446 (lớn) | 🔴 **A. Blocklist hỏng** |
| **bcse-compass** | sv02 | Next 14 · TW v3 | `'class'` | 0 | `:root.dark` (15 `!important`, có chủ đích) | Có | ~17 (nhỏ) | 🟢 **D. Token (đã đúng)** ✅ *đã fix 30/8* |
| **bcse vLab** | sv14 | Next 14 · TW v3 | `'class'` | **507** | Không | Có | ~541 (cặp với `dark:`) | 🟢 **C. `dark:` chuẩn** |
| **lambda-lab-platform** | sv03 | Next 15 · TW v4 | — | 0 | `[data-theme]` + **0** `!important` | Có | ~10 | 🟢 **D. Token/`[data-theme]`** |
| **delta-lab-platform** | sv17 | Next 15 · TW v4 | — | 0 | `[data-theme]` + **0** `!important` | Có | 0 | 🟢 **D. Token/`[data-theme]`** |
| **hygieia-lab-platform** | sv19 | Next 15 · TW v4 | — | 0 | `[data-theme]` + **0** `!important` | Có | 0 | 🟢 **D. Token/`[data-theme]`** |
| **bcse-internship-careerpath** | sv09 | Next 15 · TW v4 | — | 5 | Không | Không | **~1626 (rất lớn)** | 🟡 **B. Hardcode 1 theme** |
| **BCSE thesis review** (`cong-bcse`) | sv13 | Next 14 · TW v3 | *(thiếu)* | 0 | Không | Không | ~263 (lớn) | 🟡 **B. Hardcode 1 theme** |
| **bcse-id** | SSO | Next 15 · TW v4 | — | 0 | Không | Không | ~140 (vừa) | 🟡 **B. Hardcode 1 theme** |
| **mochi-chat** | sv06 | React 19 · TW v3 | *(thiếu)* | 0 | Không | Không¹ | ~81 (vừa) | 🟡 **B. Hardcode 1 theme** |
| **bcse-curriculum-review-hub** | (reset) | Next 14 · TW v3 | `'class'` | ~55 | Không | Không² | ~6 | 🟡 **B.** (config thừa) |
| **bcse-world** | sv15 | React 18 · **MUI**³ | — | 0 | Không (MuiTheme.ts, 1 theme) | Không | 0 | ⚪ **E. Ngoài Tailwind** |
| **Kiensensei_LMS_system** | sv20 | Django/templates | — | — | — | — | — | ⚪ **F. Không FE React** |
| **oop-grader** | sv12 | Flask/Jinja | — | — | — | — | — | ⚪ **F. Không FE React** |

¹ mochi-chat có `setTheme` nhưng là "theme thở/âm thanh", không phải light/dark. ² review-hub khai `darkMode:'class'` nhưng không có toggle → cấu hình thừa. ³ bcse-world dùng MUI + styled-components (game client), theme qua `MuiTheme.ts` — không thuộc phạm vi Tailwind.

### Đọc bảng theo nhóm

- 🔴 **Nhóm A — Blocklist hỏng (1 cổng: sv08):** viết CSS đè lên class Tailwind bằng `!important` để "dịch ngược" dark→light. **Đây là mô hình sai** (xem §2). **Ưu tiên fix cao nhất** vì đang có light mode nhưng light mode vỡ.
- 🟢 **Nhóm C + D — đã đúng (5 cổng: sv14, sv03, sv17, sv19, + sv02 sau khi fix):** dùng `dark:` (vLab) hoặc token đảo theo theme (lab trio + compass). **Không cần migrate** — dùng làm **khuôn mẫu**.
  - ⚠️ **Đính chính (đọc code thật 30/8):** **sv02 bcse-compass** ban đầu bị agent xếp nhầm nhóm A vì có `:root.dark` + `!important`. Nhưng đọc code: compass **đã xây trên semantic token** (`paper`/`paper-card`/`paper-sunk` + thang `ink-50..950` map qua CSS var, **đảo** ở dark mode) — đúng mô hình đích. Khối `:root.dark !important` chỉ là **remap 15 dòng có chủ đích cho chip accent** (teal/brass/rose/amber) để đạt AA, tác giả đã ghi chú rõ lý do. **Không phải anti-pattern.** → Chỉ có **1 lỗi thật**: nút chính `bg-ink-900 text-white` **biến mất ở dark mode** (vì `ink-900` đảo thành gần-trắng → chữ trắng trên nền trắng). Đã fix bằng class dùng lại `.btn-primary` (navy cố định, không đảo) + đổi 10 call site; build sạch.
- 🟡 **Nhóm B — hardcode 1 theme (5 cổng):** chỉ có dark (hoặc chỉ light), chưa có cơ chế theme. Chưa "hỏng" nhưng nếu muốn 2 theme thì phải migrate. careerpath (sv09) nặng nhất (~1626 class).
- ⚪ **Nhóm E/F:** ngoài phạm vi Tailwind (bcse-world MUI) hoặc không phải FE React (LMS Django, grader Flask) — bỏ qua đợt này.

> **Bài học rút ra:** kết quả grep bề mặt (`:root.dark` + `!important` = "blocklist hỏng") **không đủ để kết luận** — phải đọc code mới phân biệt được "override cả bảng màu" (sai, sv08) với "remap vài chip có chủ đích trên nền token" (đúng, sv02). Trước khi migrate cổng nào, luôn đọc `globals.css` + `tailwind.config` thật.
>
> **Bẫy mới phát hiện — "inversion trap":** khi token bề mặt **tự đảo** theo theme (như thang `ink` của compass), đừng ghép nó với chữ **cố định** (`text-white`). `bg-ink-900 text-white` đọc tốt ở light (navy + trắng) nhưng ở dark thì `ink-900`→trắng, chữ trắng biến mất. Nút "solid primary" phải dùng **màu nền cố định không đảo**, hoặc để cả nền lẫn chữ cùng đảo. Cần kiểm pattern này khi migrate SV08.

---

## 2. Anti-pattern gốc: "Override Blocklist" (bệnh của nhóm A)

### 2.1 Bệnh là gì

App được viết **chỉ cho một theme** (thường là dark) bằng **class màu tuyệt đối** (`bg-slate-900`, `text-white`, `border-white/10`…). Khi cần thêm theme thứ hai, thay vì sửa cách viết màu, người ta thêm một khối CSS **liệt kê thủ công từng class** và ép màu ngược lại bằng `!important`:

```css
/* bcse-intro/app/globals.css — mô hình SAI */
html.light .bg-slate-950 { background-color: #f8fafc !important; }
html.light .text-white   { color: #0f172a !important; }
html.light .text-slate-300 { color: #334155 !important; }
/* …~35 dòng nữa, và không bao giờ đủ */
```

### 2.2 Vì sao chắc chắn hỏng

| Khuyết tật cấu trúc | Hệ quả |
|---|---|
| **Là danh sách chặn (blocklist)** | Chỉ đúng với class **có tên trong danh sách**. Mọi sắc độ/độ mờ khác (`bg-slate-950/55`, `bg-slate-900/60`, `bg-slate-800/30`, `text-slate-700`, `text-sky-500`…) **bị bỏ sót → giữ nguyên màu tối**. |
| **Không chạm được gradient/inline** | `from-sky-600 to-indigo-600`, `bg-[linear-gradient(...rgba(2,6,23,...))]`, `style={{color:'#fff'}}` — override theo class **không với tới**. |
| **`text-white → #0f172a` là dao hai lưỡi** | Trên nền đã sáng thì đúng; trên **nền tối chưa đổi** (overlay/gradient) → **chữ gần đen trên nền tối = không đọc được**. Đây là nguồn lỗi NẶNG nhất. |
| **Phải vá tay từng bề mặt** | Mỗi card/overlay màu mới lại phải nhớ thêm một dòng override. Không ai nhớ xuể → nợ tích lũy vô hạn. |

### 2.3 Ba dấu hiệu nhận diện (chạy ở bất kỳ repo nào)

```bash
# (1) Có bật darkMode class nhưng KHÔNG dùng dark: variant  → nghi ngờ ngay
grep -rn "darkMode" tailwind.config.*          # có 'class'?
grep -rc "dark:" --include=*.tsx --include=*.css . | grep -v ':0'   # gần như rỗng?

# (2) Có khối override thủ công bằng !important
grep -rn "html.light\|:root.dark\|\.light \|\[data-theme" --include=*.css .
grep -rc "!important" --include=*.css .

# (3) Quy mô hardcode class dark
grep -rEc "text-white|bg-slate-[89]|border-white/|text-slate-" --include=*.tsx .
```

Nếu (1) rỗng + (2) có `html.light`/`:root.dark` + `!important` + (3) lớn → **đúng bệnh nhóm A**, áp playbook §5.

---

## 3. Ca điển hình chi tiết — SV08 (bcse-intro)

SV08 là ca nặng nhất nhóm A và đang **LIVE với vai trò cổng chung** (front door). Dùng làm ví dụ để hình dung "hỏng trông như thế nào".

**Số liệu:** `darkMode:'class'` bật nhưng **0** component dùng `dark:`; **~446** class dark cố định / 26 file; **23** gradient màu / 12 file không class nào được override; khối override light `globals.css:232–312` (~41 `!important`) chỉ phủ ~35 class + 3 class `research-*`.

### 3.1 Lỗi NẶNG (light mode không đọc được)

| # | Vị trí | Nguyên nhân | Biểu hiện ở light mode |
|---|---|---|---|
| N1 | `components/home/CTASection.tsx:14` | `bg-slate-950/80` overlay **không map** | Cả section "Đăng ký/Liên hệ" **tối đen**; mọi `text-white` (18,25,41,52,62,74)→đen ⇒ **đen trên đen** |
| N2 | `components/home/HeroSection.tsx:61–63,101,121` | Overlay `slate-950/38..88` + inline `rgba(2,6,23,…)` **không map**, nhưng `text-white`→đen, `text-slate-300`→xám đậm | Hero **giữ overlay tối** còn chữ **chuyển tối** ⇒ **chữ tối trên nền tối** *(chữ "BCSE" dùng `.gold-shine-text` nên vẫn vàng)* |
| N3 | `FacilitiesPreview.tsx:32` · `facilities/Content.tsx:22,50` | `bg-slate-950/55` **không map** | Ô ảnh phòng học **gần đen** giữa card sáng |
| N4 | `faculty/Content.tsx:60–61` | `bg-slate-800/30` + `hover:/50` **không map** | Ô ma trận GV **tối**, `text-white`→đen ⇒ không đọc được |
| N5 | `services/Content.tsx:116,143,157` | `bg-slate-900/60` (search/toggle/filter) **không map** | Ô tìm kiếm **tối**, input `text-white`→đen ⇒ **gõ không thấy chữ** |
| N6 | `services/Content.tsx:334` | `bg-slate-900/40` chip **không map** | Chip danh mục tối, chữ mờ |
| N7 | `FacultyPreview.tsx:27` · `faculty/Content.tsx:13` | Avatar gradient `from-sky-600 to-indigo-600` cố định + `text-white`→đen | Chữ viết tắt **đen trên nền xanh đậm** |
| N8 | `curriculum/Content.tsx:42` | `bg-slate-800/30` card năm học **không map** | Card lộ trình **giữ nền tối** |

### 3.2 Lỗi NHẸ (tương phản kém)

Accent pastel ngoài `sky` **không được override** → nhạt trên nền sáng: cả **7 danh mục** `data/services.ts` (`bg-*-500/10 text-*-300`), `SpecializationsSection` & `StudentProjectsSection` (tag `-300`), các `colorMap`/`PILLAR_COLORS` dùng emerald/violet/amber/purple/red `-400`, `text-sky-500`, và `text-slate-600`→`#94a3b8` (chữ phụ mờ).

### 3.3 UX/kỹ thuật khác (áp cho nhiều cổng)

- **Nháy icon toggle:** `ThemeToggle.tsx:7` khởi tạo cứng `'dark'` rồi mới đọc `localStorage` trong `useEffect` → icon nháy sai một nhịp. (Nền trang không nháy nhờ `themeScript` ở `layout.tsx:13`.)
- **Font `@import` chặn render:** `globals.css:1` nạp 6 họ font Google bằng `@import` → chậm FCP. Nên chuyển `next/font`.
- **`ScrollReveal` no-op:** nhận `delay` nhưng không dùng; chưa có IntersectionObserver thật.
- **Navbar trong suốt trên hero:** `Navbar.tsx:28` khi chưa cuộn là `bg-transparent` → phụ thuộc N2.

---

## 4. MÔ HÌNH ĐÍCH (chốt dùng chung toàn hệ)

**Nguyên tắc:** *Component không bao giờ viết màu tuyệt đối. Component chỉ nói vai trò (bề mặt / chữ / viền / nhấn). Màu do token quyết định, token đổi theo theme.* Sau đó light/dark **tự đúng**, không cần override, không sợ sót class.

Hệ đã có **hai biến thể sạch** đang chạy — chọn theo Tailwind version của repo:

### 4.1 Biến thể chuẩn: CSS-variable token + `[data-theme]` (khuyến nghị mặc định)

Đây chính là mô hình bộ **lab-platform** đang dùng (`lambda/delta/hygieia`, 0 `!important`) — chạy được cả Tailwind v3 lẫn v4, và độc lập framework.

**Bước A — Khai token trong `globals.css`** (rút gọn từ `lambda-lab-platform/src/app/globals.css`):

```css
:root { /* token bất biến: bo góc, bóng, font… */
  --radius: 16px; --shadow-md: 0 4px 16px rgba(0,0,0,.08);
}
[data-theme="light"] {
  --bg:#ffffff; --bg2:#f8f9fa; --surface:#ffffff; --surface2:#f8f9fa;
  --border:#e8eaed; --text:#202124; --text2:#3c4043; --text3:#5f6368;
  --accent:#4285f4; --accent-bg:rgba(66,133,244,.08);
  /* overlay trên ảnh GIỮ tối ở cả 2 theme — xem §8 */
  --hero-bg:#0a1628; --hero-text:#e8eaed;
}
[data-theme="dark"] {
  --bg:#131416; --bg2:#1a1c1e; --surface:#1e2022; --surface2:#252729;
  --border:#2d2f31; --text:#e8eaed; --text2:#bdc1c6; --text3:#9aa0a6;
  --accent:#8ab4f8; --accent-bg:rgba(138,180,248,.1);
  --hero-bg:#0a1628; --hero-text:#e8eaed;
}
body { background:var(--bg); color:var(--text);
  transition:background .3s, color .3s; }
```

**Bước B — Map token vào Tailwind** để viết class ngắn (`tailwind.config.ts`, v3):

```ts
theme: { extend: { colors: {
  bg:'var(--bg)', surface:'var(--surface)', 'surface-2':'var(--surface2)',
  content:'var(--text)', 'content-2':'var(--text2)', muted:'var(--text3)',
  line:'var(--border)', accent:'var(--accent)',
}}}
```
> Tailwind **v4** (bcse-id, careerpath, lab trio): không cần `tailwind.config`; khai trong CSS bằng `@theme { --color-surface: var(--surface); … }`.

**Bước C — Component dùng token:**

```tsx
// TRƯỚC: <div className="bg-slate-800/60 text-white border-white/10">
// SAU:   <div className="bg-surface text-content border-line">
```

### 4.2 Biến thể phụ: Tailwind `dark:` variant (khi muốn giữ v3 `darkMode:'class'`)

Đây là mô hình **bcse vLab** (507 lần `dark:`, không CSS override). Hợp khi bạn thích viết màu ngay trên component:

```tsx
// darkMode:'class' + <html class="dark"|"light">
<div className="bg-white text-slate-900 border-slate-200
                dark:bg-slate-800 dark:text-slate-100 dark:border-white/10">
```

> **Chọn cái nào?** Mặc định dùng **4.1** (token) để đồng bộ với lab-platform đang chạy và dễ chỉnh brand sau này. Chỉ dùng **4.2** khi cổng đã lỡ hardcode Tailwind dày và muốn migrate tối thiểu (thêm `dark:` cạnh class hiện có). **Hai biến thể có thể sống chung**: token cho bề mặt/chữ, `dark:` cho vài ngoại lệ.

### 4.3 Chống nháy theme (FOUC) — đặt sớm trong `<head>`

```tsx
// layout.tsx — chạy trước khi render, không nháy nền
const themeInit = `(function(){try{
  var t=localStorage.getItem('theme')||'dark';
  document.documentElement.setAttribute('data-theme',t);   // hoặc classList.add(t)
}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;
<script dangerouslySetInnerHTML={{__html: themeInit}} />
```
Và trong `ThemeToggle`, khởi tạo state **từ DOM/localStorage** (thêm cờ `mounted`) để icon không nháy.

---

## 5. PLAYBOOK MIGRATION (lặp lại cho từng cổng nhóm A/B)

> Làm trên nhánh riêng mỗi cổng. Ước lượng: cổng nhỏ (compass) ~0.5 ngày; cổng lớn (intro/careerpath) ~2–3 ngày.

1. **Chẩn đoán** — chạy 3 lệnh grep §2.3, xác nhận nhóm.
2. **Khai token** — thêm khối `:root` + `[data-theme]` (§4.1 A). Lấy màu light/dark từ bộ lab-platform cho đồng bộ, chỉnh accent theo brand cổng.
3. **Map Tailwind** — thêm `colors` token (§4.1 B) hoặc `@theme` (v4).
4. **Thay class theo bảng §6** — quét & thay bề mặt/chữ/viền trước (chiếm ~80% lỗi), để lại accent màu và gradient cho bước sau.
5. **Xử lý ngoại lệ** (§8): overlay trên ảnh (giữ tối 2 theme), gradient text, avatar gradient, accent pastel → dùng token `--accent`/`--hero-*` hoặc class `dark:` ngoại lệ.
6. **Gỡ khối override cũ** (`html.light`/`:root.dark` + `!important`) — sau khi token phủ hết, khối này thừa; xóa để hết xung đột `!important`.
7. **Kiểm 2 theme** — bật light & dark, rà từng section: không còn "chữ tối trên nền tối" / "ô đen giữa nền sáng". Sửa toggle FOUC (§4.3).

---

## 6. Bảng tra "class cũ → token" (cheat-sheet khi thay)

| Vai trò | Class dark cũ (ví dụ) | Thay bằng (token §4.1) |
|---|---|---|
| Nền trang | `bg-slate-950`, `bg-slate-900` | `bg-bg` |
| Bề mặt card | `bg-slate-800/60`, `bg-slate-900/50`, `glass` | `bg-surface` (thêm `/80` nếu cần trong) |
| Bề mặt phụ / input | `bg-slate-900/60`, `bg-slate-800/40` | `bg-surface-2` |
| Overlay tối trên ảnh | `bg-slate-950/55..88`, `rgba(2,6,23,…)` | **GIỮ NGUYÊN** (là kính che ảnh, xem §8) |
| Chữ chính | `text-white`, `text-slate-100` | `text-content` |
| Chữ phụ | `text-slate-300/400` | `text-content-2` |
| Chữ mờ / caption | `text-slate-500/600` | `text-muted` |
| Viền | `border-white/10`, `border-white/[0.06]` | `border-line` |
| Màu nhấn (link/icon) | `text-sky-400`, `text-*-400` | `text-accent` |
| Nền nhấn nhạt | `bg-sky-500/10`, `bg-*-500/10` | `bg-accent-bg` |
| Chữ trên ảnh/overlay | `text-white` (trong hero/CTA) | `text-[var(--hero-text)]` hoặc class `.on-media` (§8) |

> **Quy tắc vàng:** nếu một chỗ `text-white` **nằm trên ảnh/gradient tối cố định** thì **KHÔNG** đổi sang `text-content` (sẽ thành đen) — giữ trắng qua `--hero-text` hoặc `.on-media`.

---

## 7. Ghi chú & thứ tự ưu tiên từng cổng

| Ưu tiên | Cổng | Việc | Ghi chú |
|---|---|---|---|
| ✅ **XONG** | **sv02 bcse-compass** | ~~Migrate~~ → chỉ fix 1 lỗi | *(30/8)* Hoá ra đã đúng mô hình token; chỉ fix nút `bg-ink-900 text-white` vô hình ở dark mode bằng `.btn-primary`. Build OK. |
| ✅ **XONG** | **sv08 bcse-intro** | Migrate token đầy đủ ✅ | *(30/8, nhánh `sv08-theme-tokens`)* **Đã migrate hẳn sang token** — bỏ toàn bộ blocklist. Khai token RGB-channel `:root/[data-theme]` (bg/surface/surface-2/surface-3, ink/ink-1..7, line, fill), map vào tailwind.config, thay **~446 class** hardcode trên 26 file, đổi theme init sang `data-theme` + sửa FOUC icon. **Dark mode pixel-identical** (token resolve đúng giá trị slate cũ: surface-2=`30 41 59`, ink=`255 255 255`, bg=`2 6 23`). Còn lại `[data-theme=light]` chỉ 3 việc token không diễn đạt được: `.on-media` (chữ trắng trên ảnh Hero), nút solid màu, accent pastel hạ tông, card research. Build OK; 0 rule `html.light`, 65 rule `[data-theme=light]`. **Chưa merge vào `main`** — chờ review + test 2 theme trên trình duyệt. |
| P2 | **sv09 careerpath** | Chỉ migrate NẾU muốn 2 theme | Hardcode ~1626 class (rất lớn). Nếu chỉ cần 1 theme → để yên, không nợ. |
| P2 | **sv13 thesis / sv06 mochi / SSO id** | Như trên | Nhóm B, 1 theme, chưa hỏng. Migrate khi có nhu cầu light/dark. |
| — | **sv14 vLab** | Không đụng | Đã dùng `dark:` chuẩn — dùng làm mẫu biến thể 4.2. |
| — | **sv03/17/19 lab trio** | Không đụng | Đã dùng token `[data-theme]` — **mẫu gốc biến thể 4.1**. |
| — | review-hub | Gỡ `darkMode:'class'` thừa | Cấu hình dư, không có toggle. |

**Chiến lược gợi ý:** làm **sv02 trước** (nhỏ, chứng minh mô hình chạy) → rồi **sv08** (áp cùng token) → sau đó khi cần mới đụng nhóm B. Khớp nguyên tắc "tối đa 2 hạng mục kỹ thuật cùng lúc".

---

## 8. Bẫy cần tránh khi migrate

1. **Overlay trên ảnh KHÔNG phải nền trang.** Hero/CTA phủ lớp tối để chữ trắng nổi trên ảnh — lớp này phải **giữ tối ở cả 2 theme**. Đừng token-hóa nó thành `--bg`. Chữ trên nó dùng `--hero-text` (luôn sáng), không dùng `text-content`.
2. **Gradient text** (`.gold-shine-text`, `.hero-title-gradient`, `bg-clip-text`) thiết kế cho nền tối → nếu section chuyển sáng thật thì chữ bệt trắng. Giữ chúng trong vùng nền tối, hoặc làm biến thể sáng riêng.
3. **Avatar/badge nền gradient màu cố định** (`from-sky-600 to-indigo-600`): nền không đổi theo theme → chữ trên đó phải giữ trắng (đừng để `text-white`→đen).
4. **Accent pastel `-300`** đọc tốt trên nền tối nhưng **nhạt trên nền sáng**. Ở light mode chuyển sang tông đậm hơn (`-600/-700`) — tốt nhất gom về token `--accent` để đổi theo theme một chỗ.
5. **FOUC** (nháy theme): luôn đặt script init trong `<head>` (§4.3) và khởi tạo state toggle từ DOM.
6. **`@import` font trong CSS** chặn render → chuyển `next/font`.
7. **Đừng gỡ khối override cũ TRƯỚC khi token phủ hết** — gỡ sớm sẽ làm light mode càng vỡ. Gỡ ở bước 6, sau cùng.

---

## Phụ lục A — Số liệu quét (2026-08-30)

- 14 repo quét; **2** cổng nhóm A (blocklist hỏng: sv08, sv02); **4** cổng đã sạch (sv14 `dark:`; sv03/17/19 token); **5** cổng hardcode 1 theme; **1** MUI ngoài Tailwind; **2** không phải FE React.
- SV08: `darkMode:'class'` + **0** `dark:` + ~446 class dark cố định + override `globals.css:232–312`.
- Mẫu gốc mô hình đích: `lambda-lab-platform/src/app/globals.css` (`[data-theme]` + token, 0 `!important`) và `lambda-lab-platform/src/components/theme-toggle.tsx`.

## Phụ lục B — File đã đọc trực tiếp

`bcse-intro/`: `tailwind.config.ts` · `app/globals.css` · `app/layout.tsx` · `components/layout/{Navbar,Footer,ThemeToggle,LanguageToggle}.tsx` · `components/shared/ScrollReveal.tsx` · `components/ui/GlassCard.tsx` · `components/home/{Hero,CTA}Section.tsx` · `app/research/page.tsx` · `data/services.ts` · `lib/utils.ts` · toàn bộ `components/home/*` + `app/*/Content.tsx` (qua agent).
`lambda-lab-platform/`: `src/app/globals.css` · `src/components/theme-toggle.tsx` (mẫu mô hình đích).
Quét tín hiệu theme (darkMode / `dark:` / override / class dark): 14 repo trong `d:\files\` (qua agent).
