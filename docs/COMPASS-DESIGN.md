# 🧭 BCSE Compass — La bàn sinh viên (sv02)

> **Cập nhật 2026-08-25 (phiên tối, quyết định GĐCT): Compass chuyển sv04 → sv02** — tái định nghĩa
> cổng AI Advisor hiện tại theo concept Compass, kế thừa hạ tầng sẵn có (VM102, Docker stack).
> Hệ quả: **sv04 e-service GIỮ chạy cho phòng kế toán** (bỏ kế hoạch tắt).
> Quyết định gốc 27/8 (vẫn giữ): mở app MỚI là ngoại lệ có chủ đích của nguyên tắc "không app mới";
> tách khỏi Tracker để **cách ly dữ liệu nhạy cảm** — Tracker giữ risk score, note cố vấn,
> dữ liệu toàn khóa; Compass chỉ cầm dữ liệu AN TOÀN cho chính SV xem.
>
> ⏱ **Nhịp làm: SAU masterplan "lâu đài"** — GĐCT 25/8: "chưa đến bước nâng cấp từng cổng;
> làm về hệ thống chung trong hệ sinh thái đã — như thiết kế một lâu đài, cần biết khu vực
> cho từng nhà chức năng, lối đi, trải nghiệm, rồi mới đi sâu thiết kế từng tòa."

> 🏰 **Masterplan 25/8 (chốt):** Compass là **quảng trường trung tâm** của lâu đài BCSE — xem
> `MASTERPLAN-LAU-DAI.md`. UI hiển thị các khu như **bản đồ thành/lâu đài** (quyết định thầy 25/8
> — cần vòng mockup 2–3 mẫu trước khi build v1). Ngân khố điểm senpai–kohai đặt ở **bcse-id**.

## Nó là gì

Dashboard toàn diện **cho từng sinh viên**: bức tranh hành trình của TÔI trong ngành —
kế hoạch học tập theo năm/kỳ, tiến độ, mốc sắp tới — **thâu tóm từ các cổng khác về một chỗ**.
Đây là bước 1 của "Student OS" (Strategy GĐ4) + "tấm gương số" (brainstorm 24/8).

## Phân vai trong hệ (chốt 25/8)

| Cổng | Vai |
|---|---|
| **SV08** | Cửa chung của cả hệ sinh thái — mọi đối tượng, giới thiệu chương trình |
| **Compass (sv02)** | **Hub chính của SV sau login** — cổng tiện ích thuần SV, dẫn theo hành trình; widget "Tuần này" chuyển dần từ bcse-id sang đây |
| **bcse-id** | Thu về vai trò kỹ thuật: tài khoản + SSO |

**Launcher hành trình** (lời dẫn theo nhu cầu, không khóa cứng theo năm):

| Đích | Lời mời | Ghi chú năm |
|---|---|---|
| Tracker (sv18 `/student`) | Khám phá bản thân qua bảng điểm, rà soát tích lũy | mọi khóa |
| Career (sv09) | Mạng lưới doanh nghiệp thực tập & việc làm sau này | xem: mọi khóa; quy trình thực tập: năm 3 |
| Hardware Lab (sv14) | Access cơ sở phòng lab + phần cứng FPGA/Jetson/RPi | năm 2 trở đi |
| Các Lab (sv03/sv17/sv19) | Hướng nghiên cứu của giảng viên, nhóm NCKH | mọi khóa |
| Guild (sv15) | Hỏi đáp ẩn danh, senpai giúp kohai | mọi khóa |
| Arena (sv12) | Luyện lập trình theo ladder (xem tầm nhìn Arena trong EXECUTION) | mọi khóa |

**AI Advisor kế thừa làm tầng hội thoại** — "Hỏi la bàn": chatbot RAG tư vấn học vụ sẵn có
(FastAPI+Ollama+Qdrant) nhúng trong Compass, thêm ngữ cảnh điều hướng (chỉ đường sang đúng cổng).

**Reward senpai–kohai (tầm nhìn, chốt hướng 25/8):** **ledger điểm thường** (bảng transactions
+ audit log, phát hành/quy đổi tập trung) — KHÔNG blockchain; đổi điểm dùng trong hệ sinh thái.
Chi tiết kỹ thuật chốt khi Guild thật sự chạy (sau N8).

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
| **v1** | Study Plan tĩnh: bản đồ 8 kỳ theo CTĐT (môn nào học kỳ nào, prerequisite chain), lịch mốc kỳ này, launcher hành trình (bảng trên) | `bcse_2023.yaml` + `week-calendar` + `apps.ts` — toàn public data | ❌ không |
| **v2** | Cá nhân hóa tiến độ: kỳ đã qua tô xanh, TC tích lũy, gợi ý đăng ký kỳ tới | Tracker mở `/api/me/summary` (SV-safe) | ✅ 1 endpoint phía Tracker |
| **v3** | Gương toàn cảnh: deadline Arena, trạng thái thực tập (sv09 `/api/me`), tiến độ KLTN (sv13), booking sv14, huy hiệu + điểm senpai | mỗi app 1 `/api/me` | ✅ dần từng app |

## Hạ tầng

- Domain: **`sv02.bcse-vju.com`** — kế thừa VM102 + Docker stack AI Advisor (repo git lồng
  `bcse-advisor/bcse-advisor` — nhớ hợp nhất WIP `local-wip-2026-08-24` trước khi đụng code).
- sv04/VM104: **giữ nguyên e-service kế toán** — không còn liên quan Compass.
- Stack phần portal: Next.js (App Router) + OIDC client theo checklist bcse-id — copy pattern từ sv09;
  chatbot giữ stack cũ chạy cạnh.
- Ngày 1 phải có: Umami snippet + `/api/health` + VERSION + repo GitHub private. Không nợ chuẩn nào.

## Điều kiện thành công (tránh vết xe P1)

Compass có lực kéo tự nhiên: nó trả lời "**tôi nên học gì kỳ tới?**" — câu SV nào cũng hỏi mỗi kỳ.
Neo phân phối: link từ widget "Tuần này của bạn" (tuần đăng ký môn) + cố vấn giới thiệu.
KPI duy nhất theo dõi: **WAU tuần đăng ký học phần**.
