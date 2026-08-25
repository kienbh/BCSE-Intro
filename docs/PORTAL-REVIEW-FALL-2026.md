# Review từng cổng Core — Fall 2026 (A3)

> Sweep tự động 25/8/2026 (Claude): mỗi cổng chụp desktop 1280 + mobile 390 (iPhone 13),
> đo tràn ngang, bắt lỗi console + request fail, đo thời gian tải. Đây là **báo cáo tìm lỗi**
> — việc SỬA làm trong phiên riêng từng cổng theo đúng nhịp A3 (sv14 → sv18 → sv09 → sv13 → sv12).
> Screenshot lưu tại scratchpad phiên 25/8; chạy lại sweep: script `portal-review.js` (transcript).

## Tổng quan: cả 5 cổng đều KHÔNG tràn ngang mobile, tải 4–6s qua CF, layout đẹp.

## sv14 · Hardware Lab — ưu tiên sửa cao nhất
- 🔴 **`/api/auth/refresh` trả 404** — frontend gọi khi tải trang. Nếu flow gia hạn phiên dựa vào
  endpoint này thì SV sẽ bị văng phiên giữa chừng (nghi backend chưa có route hoặc đổi tên).
  → Phiên sv14: xác minh route trong FastAPI + hành vi khi token hết hạn.
- 🟡 `/api/auth/me` 401 khi chưa login — bình thường, nhưng đang in đỏ console; nên bắt lỗi im lặng.
- 🟢 Mobile đẹp (hero "Truy cập kit thực hành từ Mỹ Đình", badge version API).

## sv18 · BCSE Tracker
- 🟡 **CSP chặn `static.cloudflareinsights.com/beacon.min.js`** (CF Web Analytics tự inject nhưng
  CSP của app không cho) — lỗi đỏ console mọi trang. Chọn 1: thêm domain vào CSP, hoặc tắt
  CF Web Analytics cho zone (đã có Umami, không cần RUM của CF).
- 🟡 Trang login ghi "**152 TC**" — đúng với khóa cũ; khi có khung 135 phải hiển thị theo cohort
  (đã nằm trong `KHUNG-135-TODO.md`).
- 🟢 `/student` redirect về `/login` đúng thiết kế; form login đẹp.

## sv09 · Career Portal
- 🟡 **TypeError ×4 từ script Cloudflare inject** (`/cdn-cgi/scripts/.../cloudflare-static/…`
  `Cannot read properties of undefined (reading 'querySelectorAll')`) — nghi **Rocket Loader /
  email-decode của CF** xung đột Next.js. Không thấy hỏng chức năng nhưng ồn console + rủi ro ngầm.
  → Phiên sv09: vào CF dashboard tắt Rocket Loader (hoặc Scrape Shield email obfuscation) cho zone, verify hết lỗi.
- 🟢 Hero + số liệu (42 DN, 11 lĩnh vực) render chuẩn mobile.

## sv13 · Thesis Review
- 🟢 **Sạch hoàn toàn** — 0 lỗi console, 0 request fail, login + banner "Xem danh sách KLTN công khai" rõ ràng.

## sv12 · Code Arena
- 🟡 **Nav mobile xổ 3 hàng** (7 mục menu không có hamburger) — chiếm ~1/5 màn hình đầu, nhìn rối.
  → Phiên sv12: thêm hamburger/collapse cho `base.html` (Jinja).
- 🟢 Còn lại sạch: 0 lỗi console, hero rõ.

## Thứ tự phiên sửa đề xuất (theo mức độ + nhịp A3 gốc)
1. **sv14** — bug auth/refresh (ảnh hưởng chức năng thật)
2. **sv09** — tắt Rocket Loader (thao tác CF dashboard, 10')
3. **sv18** — CSP/tắt CF Analytics (10')
4. **sv12** — hamburger nav mobile
5. **sv13** — không cần sửa gì ✅
