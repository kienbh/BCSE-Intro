# KẾ HOẠCH CHỈNH SỬA & NÂNG CẤP — Tổng hợp 4 bản rà 29/8

> **Ngày lập:** 2026-08-30 · **Nguồn:** 4 report review đêm 29/8 (SV18 Tracker, SV08 Intro, SV03 Lambda Lab, SV14 Hardware Lab).
> **Trạng thái:** CHỜ THẦY DUYỆT. Chưa sửa dòng code nào. File này là bảng điều khiển để duyệt lệnh — mỗi lệnh có mã, effort, rủi ro, và nhãn phụ thuộc.
> **Đã thẩm định chéo trên mã** (không tin suông tóm tắt agent): 🔴 SV18 `abc135` (db.py:182,184,296-301 — xác nhận, không set must_change_password khi seed), 🔴 SV14 rate-limit (slowapi đã cài ở pyproject.toml:25 nhưng 0 chỗ `@limit` trong backend/app — xác nhận), 🔴 SV14 dev-login (auth.py:191-228 — xác nhận).
>
> **Report gốc:** `BCSE-Tracker/docs/REVIEW-20260829.md` · `bcse-intro/docs/REVIEW-SV08-20260829.md` · `lambda-lab-platform/docs/REVIEW-SV03-20260829.md` · `bcse vLab/docs/REVIEW-SV14-20260829.md`.

---

## 0. Ảnh chụp nhanh 4 app

| App | Hạng | Điểm tổng | 🔴 | 🟡 | 🟢 | Bản chất vấn đề |
|---|---|---|---|---|---|---|
| **SV18 Tracker** | Core winner | ~6.6/10 (bảo mật ×2) | 5 | 9 | 7 | Nền tảng bảo mật tốt hơn "v1"; lỗ ở mật khẩu mặc định + XSS SPA + replay bridge |
| **SV14 Hardware Lab** | Core winner | ~6.9/10 | 5 | 9 | 6 | Kiến trúc gateway xuất sắc; yếu ở "vành đai" — rate-limit chưa wire, dev-login, IDOR nhẹ |
| **SV08 Intro** | Core (cửa) | ~4.7/10 | 9 | 14 | 8 | Brochure đẹp nhưng **đang nói sai sự thật** ở 4 chỗ + light-mode vỡ + logo 5.4MB |
| **SV03 Lambda Lab** | Frozen | (chẩn đoán) | — | — | — | Không chết vì code; chết vì **không có nhóm NCKH thật** + seed demo quá hạn làm trang trông mục |

**Nhận định xuyên suốt:** Hai app Core winner (SV18/SV14) có kiến trúc tốt, chỉ cần **vá an ninh vành đai** — rủi ro cao nhất toàn hệ vì chúng giữ dữ liệu điểm hàng trăm SV (SV18) và cấp shell lên phần cứng thật trong LAN lab (SV14). SV08 là cửa chính đang **làm mất niềm tin** bằng thông tin sai — rủi ro uy tín cấp chương trình giữa mùa tuyển sinh. SV03 là bài toán con người, không phải kỹ thuật.

---

## 1. ƯU TIÊN TỔNG — làm gì trước

Xếp theo **thiệt hại nếu KHÔNG làm × độ khẩn theo lịch**, không theo app.

### 🥇 Đợt 1 — AN NINH (làm ngay, không cần thầy quyết nội dung)
Rủi ro rò dữ liệu SV / chiếm quyền / hại phần cứng. Toàn bộ là sửa kỹ thuật thuần, reversible, không đụng quyết định sản phẩm.

| Thứ tự | Lệnh | App | Vá | Effort |
|---|---|---|---|---|
| 1 | **T1** — bịt mật khẩu mặc định `abc135` + ép đổi ở API | SV18 | 🔴-1, 🔴-2 | S |
| 2 | **H2** — khóa `dev-login` khỏi prod (guard `is_prod:404`) | SV14 | 🔴-3.2 | S |
| 3 | **H5** — guard reset vật lý (chặn power-cycle khi có session khác) | SV14 | 🔴-3.4 | S |
| 4 | **T2** — escape toàn bộ dữ liệu SV trong SPA (diệt stored-XSS) | SV18 | 🔴-4, 🟡-9 | S–M |
| 5 | **H1** — wire rate-limit thật + bỏ default password | SV14 | 🔴-3.1 | M |
| 6 | **T3** — cứng hóa bridge Compass (exp≤120s + jti + limiter riêng) | SV18 | 🔴-3 | M (2 cổng) |
| 7 | **H3** — buộc session↔hop bằng token 1-lần (bỏ tin client_ip) | SV14 | 🔴-3.3, 🟡-3.13 | M |

> **Tại sao thứ tự này:** T1/H2/H5 là "S, một nhánh code, chặn được takeover ngay" → hái trước. T2 (XSS) và H1 (brute-force) là bề mặt tấn công rộng nhất còn lại. T3/H3 để sau vì cần sửa 2 cổng đồng bộ (rủi ro thao tác cao hơn, phải cẩn thận).

### 🥈 Đợt 2 — SỰ THẬT TRÊN CỬA CHÍNH (khẩn theo mùa tuyển sinh, phần lớn làm ngay)
Front door đang nói sai → mất niềm tin. Đa số là data + vài dòng render, effort S.

> **✅ 4 quyết định đã chốt (30/8) — không còn chờ thầy:** xem §3.

| Thứ tự | Lệnh | App | Sửa | Effort | Trạng thái |
|---|---|---|---|---|---|
| 8 | **I1** — sửa mã ngành tuyển sinh 2026 (thêm 7480101 theo khóa) | SV08 | F1 🔴 | S | ✅ sẵn sàng |
| 9 | **I2** — content-truth pass danh mục (sv02→Compass, **Guild→BCSE World công khai**, Tracker audience) | SV08 | F3,F4,F10 🔴/🟡 | S | ✅ chốt: công khai World |
| 10 | **I3** — vá teaser trang chủ (filter audience, ẩn sv04, FEATURED chủ đích) | SV08 | F2,F12 🔴/🟡 | S | ✅ sẵn sàng |
| 11 | **I4** — nén logo 5.4MB→WebP + gỡ BCSE.docx + dọn asset chết | SV08 | F6,F20,F21 🔴/🟡 | S | ✅ sẵn sàng |
| 12 | **I5** — **BỎ** số không kiểm chứng/mâu thuẫn (>95% việc làm, 30-vs-11 DN, 13-vs-7 ĐH) | SV08 | F8 🔴 | S | ✅ chốt: bỏ, không bịa số mới |

### 🥉 Đợt 3 — CHUẨN BỊ TUẦN ĐỊNH HƯỚNG (~8/9) + SV03
| Thứ tự | Lệnh | App | Nội dung | Effort | Trạng thái |
|---|---|---|---|---|---|
| 13 | **S1** — **seed tài khoản K2026 lên bcse-id** từ danh sách SV | bcse-id | — | S | ✅ chốt: cần file xlsx của thầy |
| 14 | **I6** — gói tân SV K2026 (banner "bắt đầu tại đây") | SV08 | F9,F13 | S–M | ✅ sau S1 |
| 15 | **L1** — SV03 trung thực hóa + đổi thành trang chỉ đường "email tới GV theo định hướng" | SV03 | — | S | ✅ **ĐÃ LÀM + DEPLOY 30/8** — hồ sơ: `lambda-lab-platform/docs/CLEANUP-SV03-20260830.md` (seed dọn demo, /groups chỉ đường + 6 mailto, CTA landing→/groups, /recruitment hết chu kỳ mùa giả) |

### 🏅 Đợt 4 — NỢ CHẤT LƯỢNG (không khẩn, xếp lịch sau)
| Lệnh | App | Nội dung | Effort |
|---|---|---|---|
| I7 | SV08 | A11y contrast dark (slate-500→400, focus ring, pause carousel) | M |
| I8 | SV08 | Light-mode vá nhanh (theo audit riêng §5.2) | M |
| I9 | SV08 | SEO pass (OG tags, sitemap, h1, /research metadata) | M |
| I10 | SV08 | Font diet (6 họ → 2–3, next/font) | S–M |
| T4 | SV18 | Deploy an toàn: merge env (giữ COMPASS_TRACKER_SECRET) + VERSION + backup DB cron | M |
| T5 | SV18 | Parser báo lỗi thay vì nuốt + bật WAL | S |
| T6 | SV18 | Test phân quyền end-to-end (khóa regression IDOR/role) | M |
| H4 | SV14 | Xác nhận + tài liệu hóa cách ly mạng device/plug (tầng hạ tầng) | L |
| H6 | SV14 | Cứng hóa SSO (RS256/JWKS, chặn app_role→admin, compare_digest, chống replay webhook) | M |
| H7 | SV14 | Kiểm chứng GIST EXCLUDE + tái kiểm quyền khi mint password | M |

---

## 2. CHI TIẾT TỪNG LỆNH ĐỢT 1 (an ninh — sẵn sàng thực thi)

### T1 · SV18 — Bịt mật khẩu mặc định + ép đổi mật khẩu · S · rủi ro thấp
- **Vấn đề (đã verify):** `db.py:182,184` hardcode `abc135`; seed admin `db.py:296-301` không set `must_change_password`; lặp trong `scripts/deploy_2022_2023.py:12`, `deploy_k2024.py:12`, `hot_swap_cohort_comparison.py:29`; prefill UI `api-app.js:3300,3336` + `index.html:608`. `must_change_password` chỉ ép ở client JS (`student.html:221`, `class.html:91`).
- **Việc:** (a) đọc mật khẩu admin seed từ ENV `BCSE_ADMIN_PASSWORD` (deploy đã có `pw("TRACKER_ADMIN_PASS")`), bỏ hằng `abc135`; (b) seed admin + tạo lecturer mới đều `must_change_password=1` + sinh mật khẩu ngẫu nhiên hiện 1 lần (mẫu `create_student_user` đã có); (c) **thêm chặn ở `auth_guard`**: nếu `must_change_password` và path ∉ {change-password, logout, me} → 403; (d) bỏ prefill `abc135` khỏi `index.html`/`api-app.js`.
- **Kiểm thử:** login bằng mật khẩu tạm → mọi API trừ đổi-mật-khẩu trả 403 tới khi đổi xong.
- **⚠ Việc người sau khi sửa:** đổi mật khẩu admin thật trên prod (nếu vẫn đang là `abc135`).

### H2 · SV14 — Khóa dev-login khỏi prod · S · rủi ro thấp
- **Vấn đề (đã verify):** `auth.py:191-228` `dev_login` cấp cookie ADMIN không cần mật khẩu; chỉ phụ thuộc env `DEV_LOGIN_ENABLED`, không guard `is_prod`. `/dev-status` public.
- **Việc:** thêm `if settings.is_prod: raise HTTPException(404)` ngay đầu `dev_login` và `dev_status`, độc lập với `DEV_LOGIN_ENABLED`. Lý tưởng compile-out ở prod.
- **Kiểm thử:** với `ENV=production`, `POST /api/auth/dev-login/admin` → 404 kể cả khi lỡ set `DEV_LOGIN_ENABLED=true`.

### H5 · SV14 — Guard reset vật lý · S · rủi ro thấp
- **Vấn đề:** `reset.py:20-93` cho current-booker/admin/TA power-cycle mà không kiểm có session active khác trên thiết bị → cắt điện KIT khi người khác đang nạp firmware. `reset_requests.py:258` auto-approve plug-cycle ngay.
- **Việc:** chặn power-cycle khi có gateway session active khác trên thiết bị (mẫu `vps_admin._has_active_session`); đưa reset admin/TA qua cùng guard; giữ log hiện có.

### T2 · SV18 — Escape dữ liệu SV trong SPA · S–M · rủi ro thấp
- **Vấn đề:** `api-app.js` nội suy `${r.full_name}`/`${n.note}` thẳng `innerHTML` không escape (`:860,922,1078,1089,1271,1382,2100,2267`); `student.html:469`. Tên SV từ file Excel PĐT chứa `<img onerror=>` → chạy script trong phiên admin → chiếm quyền. `renderVoice:3494` đã escape đúng (có sẵn mẫu `esc()`).
- **Việc:** bọc `esc()` cho MỌI trường người-nhập (`full_name, note, course_name, message, resolution`) ở mọi renderer. Không đụng CSP `unsafe-inline` vội (để sau, cần refactor).
- **Kiểm thử:** thêm SV test tên chứa `<img src=x onerror=alert(1)>` → mở tab Students/Graduation → không popup.

### H1 · SV14 — Wire rate-limit thật + bỏ default password · M · rủi ro trung bình
- **Vấn đề (đã verify):** `slowapi` cài (pyproject.toml:25) + 4 hằng `RATE_LIMIT_*` (config.py:100-103) nhưng 0 chỗ dùng. `POST /api/auth/login` + `/api/gateway/auth` là brute-force/DoS oracle; `DEFAULT_PASSWORD="VJU@2026"` hằng số toàn hệ.
- **Việc:** (a) wire `slowapi` cho `/auth/login` (5/phút/IP + theo email), `/auth/change-password`, `/gateway/auth` (10/phút/IP), `/reset-requests`, `/classes/{id}/enroll/csv`; (b) thêm cột `password_prefix` index cho `verify_password` → O(N) bcrypt-walk thành O(1); (c) `DEFAULT_PASSWORD` → sinh ngẫu nhiên per-account.
- **⚠ Rủi ro:** cấu hình limiter sai có thể chặn nhầm SV thật → test kỹ ngưỡng + có đường whitelist IP nội bộ nếu cần.

### T3 · SV18 — Cứng hóa bridge Compass · M · rủi ro trung bình (2 cổng)
- **Vấn đề:** `compass_bridge.py:43-78` verify JWT nhưng không ép `exp-iat≤120s`, không `jti`/nonce (replay), request bridge gộp rate-limit theo IP sv02 (DoS nội bộ).
- **Việc:** decode ép `require=["exp","iat","jti"]` + kiểm `exp-iat≤120`; cache jti đã dùng (TTL=window); limiter bridge theo `student_id` trong token. **Cần sửa sv02 (Compass) phát kèm `jti`+`iat` cùng lúc** — đây là repo `bcse-compass`, phối hợp 2 đầu.
- **⚠ Rủi ro:** sửa lệch 2 đầu → bridge tắt ("Compass không lên điểm"). Deploy có kịch bản rollback + verify `/api/health {tracker:true}` sau mỗi bước.

### H3 · SV14 — Token 1-lần buộc session↔hop · M · rủi ro trung bình
- **Vấn đề:** `gateway.py:399-440` `resolve-target` tin `client_ip` từ payload + `ssh_username='vlab'` dùng chung → 2 SV connect gần nhau có thể route nhầm thiết bị.
- **Việc:** `auth` trả token 1-lần (server-side); ForceCommand trình lại token ở `resolve-target` thay vì dựa client_ip + cửa sổ 60s; backend lấy IP TCP thật (`request.client.host`), chỉ dùng `payload.client_ip` để log.
- **⚠ Rủi ro:** đụng script jump-host (`vlab-jump.sh`) NGOÀI repo — cần sửa đồng bộ PAM/ForceCommand. Việc phối hợp hạ tầng, làm cẩn thận, có cửa sổ bảo trì.

---

## 3. QUYẾT ĐỊNH ĐÃ CHỐT (30/8) — cập nhật hướng làm

Bốn câu hỏi Đợt 2–3 đã có câu trả lời. Ghi lại + hệ quả với lệnh:

1. **[I5 — số liệu SV08] → BỎ.** Không kiểm chứng/mâu thuẫn thì bỏ, KHÔNG bịa số mới thay thế.
   - ">95% việc làm trong 6 tháng": bỏ (BCSE chưa có khóa tốt nghiệp) — hoặc thay bằng câu định tính không số ("SV thực tập tại DN đối tác từ năm 3") nếu thầy muốn giữ khối này.
   - "30+ DN" vs "11 DN", "13 ĐH Nhật" vs "7 ĐH Nhật": bỏ số cứng ở chỗ không chắc, giữ 1 nguồn thống nhất nếu có số thật; nếu không chắc thì đổi thành "nhiều DN/ĐH đối tác" không đếm.
   - Nguyên tắc: thà không có số còn hơn có số sai trên trang tuyển sinh.
2. **[I2 — SV08] → CÔNG KHAI BCSE World.** Card Guild (sv15) đổi thành **BCSE World** (mô tả thật: campus VJU 2D, gặp gỡ + hỏi đáp video/mic); Guild chuyển "sắp trở lại". sv02 card đổi thành Compass. → I2 chạy được ngay.
3. **[L1 — SV03] → KHÔNG mở "đợt tuyển theo mùa".** Cơ chế thật: **tuyển quanh năm, SV đam mê email trực tiếp tới thầy cô theo định hướng**; cơ chế cơ bản chưa rõ ràng. → Đổi hướng L1 (xem §3a): trung thực hóa + biến sv03 thành **trang chỉ đường** "muốn làm NCKH → đây là các định hướng + email GV phụ trách", KHÔNG dùng RecruitmentWave. Đây khớp seed hiện có: 6 nhóm đã có `piEmail` thật (bh.kien, lk.quy, pd.tho, tq.ngoc @vju.ac.vn).
4. **[S1 — bcse-id] → SEED ĐƯỢC.** K2026 chưa seed (0 tài khoản) nhưng thầy **có danh sách SV**. Script `bcse-id/scripts/seed-identities-from-excel.ts` ĐÃ SẴN SÀNG — idempotent, chỉ cần file xlsx đúng format (STT | Mã SV 8 số | Họ tên). → S1 làm được ngay khi có file; I6 (banner tân SV) chạy sau S1.

### §3a — L1 SV03 hướng mới: trang chỉ đường NCKH (thay đợt tuyển mùa)
- **Mục tiêu:** SV muốn làm NCKH biết ngay **liên hệ ai, định hướng nào, email nào** — đúng cơ chế thật (email trực tiếp GV).
- **Việc:** (1) dọn seed demo: bỏ 3 "SV Demo", bỏ 4 đề tài mẫu quá hạn (badge "quá hạn 71 ngày" là thứ hại nhất) — chuyển về "đề tài mở/đã hoàn thành" trung thực hoặc gỡ; **giữ 6 nhóm nghiên cứu thật + piEmail**. (2) Trang `/groups` (hoặc landing) làm nổi bật khối "Muốn tham gia NCKH? → chọn định hướng → email GV phụ trách" với mailto sẵn. (3) Sửa CTA landing "Vào hệ thống NCKH" trỏ `/groups` (public) thay vì `/chat` (đòi login). (4) KHÔNG mở RecruitmentWave, KHÔNG tạo workflow đơn tuyển (cơ chế chưa rõ → đừng dựng quy trình giả).
- **Tiên quyết phi kỹ thuật:** thầy xác nhận 6 nhóm + piEmail hiện tại là ĐÚNG và các thầy cô sẵn sàng nhận email SV. (Nếu định hướng/email đổi → cập nhật seed.)
- **Effort:** S. **Nhân bản:** playbook này (chỉ đường qua email thay vì workflow tuyển) copy thẳng sang sv17/sv19 nếu chúng cũng tuyển kiểu email trực tiếp.

### §3b — S1 seed K2026 lên bcse-id
- **Cách chạy (khi có file):** `DATABASE_URL=... pnpm tsx scripts/seed-identities-from-excel.ts --input <ds_bcse2026.xlsx> --dry-run` (đếm trước) → bỏ `--dry-run` để ghi.
- **Format file cần:** cột STT | Mã SV (8 số, bắt đầu `26`) | Họ tên. Script tự derive cohort K2026 + email `{mãSV}@st.vju.ac.vn`, status `pending` (tự active khi SV login lần đầu).
- **Kiểm sau seed:** script in tổng identity student theo cohort → xác nhận số K2026 khớp danh sách.
- **⚠ Việc thầy cần đưa:** file xlsx danh sách K2026 (hoặc chỉ đường tới file — SV09 whitelist đã có ds_bcse2022–2025 cùng format ở `bcse-internship-careerpath/thongbao/`).

---

## 4. HIỆU ỨNG NHÂN BẢN — 1 lần sửa, 3 cổng hưởng

- **SV03 → SV17 (Delta) + SV19 (Hygieia):** cùng template Next.js y hệt (`src/app` trùng: admin/chat/groups/me/pi/projects/qa/recruitment) + cùng mô hình landing tĩnh. Mọi lỗi của SV03 (seed demo quá hạn, CTA trỏ /chat đòi login, CMS localStorage giả) **gần như chắc chắn có ở sv17/sv19**. → Khi làm L1 cho SV03, rà cùng lúc 3 cổng; playbook copy thẳng. (sv16 Codex kiến trúc khác, không áp — đã có lộ trình GĐ3.2 riêng.)
- **SV18 T3 ↔ SV14 H3/H6:** cùng class lỗi "shared HS256 secret + thiếu chống replay JWT". Nếu quyết định chuyển sang RS256/JWKS, nên thiết kế 1 lần cho cả cụm app federate bcse-id, không vá lẻ.

---

## 5. NGUYÊN TẮC GIỮ VỮNG (chống scope creep — gom từ 4 report)

- **KHÔNG** chuyển SV18 sang Postgres / viết Alembic — SQLite+WAL thừa sức cho vài nghìn SV.
- **KHÔNG** rework ML Track Predictor — heuristic hệ-số-học-phần giải thích được, cố vấn cần "vì sao".
- **KHÔNG** cấp SSH key riêng cho SV ở SV14 — mô hình gateway 1-password/booking an toàn hơn, đừng cải tiến ngược.
- **KHÔNG** mở `DEV_LOGIN_ENABLED` trên bất kỳ môi trường public nào.
- **KHÔNG** xây lại landing SV03 bằng CMS mới — vấn đề là không có gì để đăng, không phải công cụ.
- **KHÔNG** seed thêm nội dung "cho sinh động" ở SV03 — trống trung thực > đầy giả tạo.
- **KHÔNG** biến SV08 thành app có đăng nhập/cá nhân hóa — hub cá nhân ở bcse-id/Compass (hướng B đã chốt).
- **KHÔNG** tự chế số liệu thay số bịa ở SV08 — sửa bằng nguồn thật từ thầy.
- **KHÔNG** đưa SV03 lại launcher Compass/SV08 trước khi L1 xong — dẫn traffic vào trang mục là đốt uy tín.
- **KHÔNG** refactor token theme SV08 (I11, effort L) trong tuần định hướng — vá nhanh I8 là đủ.
- Giữ quy tắc MASTER-PLAN: **tối đa 2 hạng mục kỹ thuật + 1 hạng mục con người mỗi thời điểm.**

---

## 6. GHI NHẬN — cái đang làm tốt (để không phá khi sửa)

- **SV18:** PII sạch khỏi git, `/api/me/*` không IDOR (student_id từ session), k-anonymity thật (test có sẵn), PBKDF2 timing-safe, framing tích cực nhất quán, parser .xls-HTML nhận magic-byte, path-traversal đã vá.
- **SV14:** kiến trúc gateway ADR-0013 chỉn chu (SV không cầm SSH key), command injection xử lý kỷ luật (`shlex.quote` khắp nơi, không `shell=True`), access-control tập trung + có test, chống enumeration bằng 404, secret sạch khỏi git.
- **SV08:** dữ liệu khung 135 chuẩn (7 khối = 135 TC, mã cửa ngõ đúng), audience model đúng, nút login hướng B đúng, Umami gắn đúng, dark identity nhất quán.
- **SV03:** hạ tầng chạy ổn, platform có đủ UI cập nhật không cần deploy — chỉ thiếu nội dung thật.
```
