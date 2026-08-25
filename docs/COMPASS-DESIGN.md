# 🧭 BCSE Compass — La bàn sinh viên (sv21)

> Quyết định GĐCT 2026-08-27: mở app MỚI (ngoại lệ có chủ đích của nguyên tắc "không app mới").
> Lý do tách khỏi Tracker: **cách ly dữ liệu nhạy cảm** — Tracker giữ risk score, note cố vấn,
> dữ liệu toàn khóa; Compass chỉ cầm dữ liệu AN TOÀN cho chính SV xem.

## Nó là gì

Dashboard toàn diện **cho từng sinh viên**: bức tranh hành trình của TÔI trong ngành —
kế hoạch học tập theo năm/kỳ, tiến độ, mốc sắp tới — **thâu tóm từ các cổng khác về một chỗ**.
Đây là bước 1 của "Student OS" (Strategy GĐ4) + "tấm gương số" (brainstorm 24/8).

## Nguyên tắc kiến trúc — privacy by design

1. **Compass KHÔNG có DB dữ liệu học tập riêng** — không copy bảng điểm về. Nó là tầng HIỂN THỊ.
2. Mỗi app nguồn tự quyết định lộ gì qua endpoint **`/api/me/*` (SV-safe view)**: đã lọc,
   đã framing tích cực, chỉ dữ liệu của chính SV đang đăng nhập (theo mẫu `student_view.py` của Tracker).
3. Xác thực: **bcse-id OIDC** end-to-end — Compass gọi app nguồn bằng token của SV
   (hoặc service-token scope hẹp qua LRS bcse-id đã có mầm: `event:read`).
4. Dữ liệu KHÔNG nhạy cảm (CTĐT `bcse_2023.yaml`, lịch kỳ, danh mục dịch vụ) → nhúng tĩnh thoải mái.

## Phân tầng màn hình (v1 → v3)

| Bản | Nội dung | Nguồn | Cần API mới? |
|---|---|---|---|
| **v1** | Study Plan tĩnh: bản đồ 8 kỳ theo CTĐT (môn nào học kỳ nào, prerequisite chain), lịch mốc kỳ này, launcher dịch vụ | `bcse_2023.yaml` + `week-calendar` + `apps.ts` — toàn public data | ❌ không |
| **v2** | Cá nhân hóa tiến độ: kỳ đã qua tô xanh, TC tích lũy, gợi ý đăng ký kỳ tới | Tracker mở `/api/me/summary` (SV-safe) | ✅ 1 endpoint phía Tracker |
| **v3** | Gương toàn cảnh: deadline Arena, trạng thái thực tập (sv09 `/api/me`), tiến độ KLTN (sv13), booking sv14, huy hiệu | mỗi app 1 `/api/me` | ✅ dần từng app |

## Hạ tầng

- Domain: `sv21.bcse-vju.com` (CF tunnel — script mẫu `cf_dns_*.py` có sẵn).
- VM: dùng **VM116** sau khi gộp Codex→sv20 (B12.1) hoặc VM mới nếu muốn làm ngay.
- Stack: Next.js (App Router) + OIDC client theo checklist bcse-id — copy pattern từ sv09.
- Ngày 1 phải có: Umami snippet + `/api/health` + VERSION + repo GitHub private. Không nợ chuẩn nào.

## Điều kiện thành công (tránh vết xe P1)

Compass có lực kéo tự nhiên: nó trả lời "**tôi nên học gì kỳ tới?**" — câu SV nào cũng hỏi mỗi kỳ.
Neo phân phối: link từ widget "Tuần này của bạn" (tuần đăng ký môn) + cố vấn giới thiệu.
KPI duy nhất theo dõi: **WAU tuần đăng ký học phần**.
