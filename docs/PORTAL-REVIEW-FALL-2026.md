# Review từng cổng Core — Fall 2026 (A3)

> Sweep tự động 25/8/2026 (Claude): mỗi cổng chụp desktop 1280 + mobile 390 (iPhone 13),
> đo tràn ngang, bắt lỗi console + request fail, đo thời gian tải. Đây là **báo cáo tìm lỗi**
> — việc SỬA làm trong phiên riêng từng cổng theo đúng nhịp A3 (sv14 → sv18 → sv09 → sv13 → sv12).
> Screenshot lưu tại scratchpad phiên 25/8; chạy lại sweep: script `portal-review.js` (transcript).

## Tổng quan: cả 5 cổng đều KHÔNG tràn ngang mobile, tải 4–6s qua CF, layout đẹp.

## sv14 · Hardware Lab — ưu tiên sửa cao nhất
- ✅ **ĐÃ SỬA + DEPLOY (25/8 chiều)** — `POST /api/auth/refresh` live, verify công khai 401 NO_REFRESH_TOKEN (hết 404); test 5/5 pass trên PG test SV14; merge `fd552dc`.
- 🔴 ~~**`/api/auth/refresh` trả 404**~~ — ĐÃ XÁC MINH bug thật (25/8): login phát refresh cookie
  (`issue_refresh_token` + `set_auth_cookies`) nhưng backend KHÔNG có route tiêu thụ; frontend
  `lib/auth.ts` gọi ở 3 chỗ (fetchMe/apiGet/apiPost) → tab quá TTL 60' là văng phiên dù cookie còn hạn.
  **✅ Fix + 5 test đã chuẩn bị trên branch `fix/auth-refresh-endpoint`** (repo `bcse vLab`, đã push).
  → Phiên sv14: chạy pytest (cần PG test DB), thầy review PR, deploy backend.
- 🟡 `/api/auth/me` 401 khi chưa login — bình thường, nhưng đang in đỏ console; nên bắt lỗi im lặng.
- 🟢 Mobile đẹp (hero "Truy cập kit thực hành từ Mỹ Đình", badge version API).

## sv18 · BCSE Tracker
- ✅ **ĐÃ SỬA (25/8 tối, qua CF API — không cần dashboard)**: tắt auto-install CF Web Analytics
  cho zone `bcse-vju.com` → hết inject beacon, verify HTML sạch `cloudflareinsights`.
- 🟡 ~~**CSP chặn `static.cloudflareinsights.com/beacon.min.js`**~~ (CF Web Analytics tự inject nhưng
  CSP của app không cho) — lỗi đỏ console mọi trang.
- 🟡 Trang login ghi "**152 TC**" — đúng với khóa cũ; khi có khung 135 phải hiển thị theo cohort
  (đã nằm trong `KHUNG-135-TODO.md`).
- 🟢 `/student` redirect về `/login` đúng thiết kế; form login đẹp.

## sv09 · Career Portal
- ✅ **ĐÃ SỬA (25/8 tối, qua CF API)**: thủ phạm là **email obfuscation** (Rocket Loader vốn đã off
  từ trước) → tắt `email_obfuscation` zone `bcse-vju.com`, verify HTML sạch `/cdn-cgi/scripts` +
  `email-decode`. Hệ quả phụ chấp nhận: email trên trang hiển thị dạng thường (bot scrape được).
- 🟡 ~~**TypeError ×4 từ script Cloudflare inject**~~ (`/cdn-cgi/scripts/.../cloudflare-static/…`
  `Cannot read properties of undefined (reading 'querySelectorAll')`) — xác nhận là email-decode
  của CF xung đột Next.js.
- 🟢 Hero + số liệu (42 DN, 11 lĩnh vực) render chuẩn mobile.

## sv13 · Thesis Review
- 🟢 **Sạch hoàn toàn** — 0 lỗi console, 0 request fail, login + banner "Xem danh sách KLTN công khai" rõ ràng.

## sv12 · Code Arena
- ✅ **ĐÃ DEPLOY (25/8 tối)** — pytest 145 pass/20 skip → `deploy/sv12_deploy.py` chạy sạch (giữ DB,
  re-seed idempotent, systemd active, smoke 200) → verify công khai `#mobile-nav` live.
- 🟡 ~~**Nav mobile xổ 3 hàng**~~ — fix hamburger + panel mobile (commit `98dfc94`), desktop nguyên trạng.
- 🟢 Còn lại sạch: 0 lỗi console, hero rõ.

## ✅ TỔNG KẾT A3: 5/5 cổng Core SẠCH LỖI SWEEP (đóng 25/8 tối)
sv14 auth/refresh ✅ · sv09 email-decode ✅ · sv18 CSP beacon ✅ · sv12 hamburger ✅ · sv13 vốn sạch ✅.
Còn lại chỉ mục 🟡 nhỏ không chặn: sv14 console 401 khi chưa login (bắt im lặng), sv18 số "152 TC"
theo cohort (nằm trong KHUNG-135-TODO.md).

## Thứ tự phiên sửa đề xuất (theo mức độ + nhịp A3 gốc)
1. **sv14** — bug auth/refresh (ảnh hưởng chức năng thật)
2. **sv09** — tắt Rocket Loader (thao tác CF dashboard, 10')
3. **sv18** — CSP/tắt CF Analytics (10')
4. **sv12** — hamburger nav mobile
5. **sv13** — không cần sửa gì ✅
