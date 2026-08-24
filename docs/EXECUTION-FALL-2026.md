# Kế hoạch thực thi Fall 2026 — mỗi ngày một đầu việc

> Lập 2026-08-24. Tài liệu **vận hành hằng ngày** — con của MASTER-PLAN-2026 (chiến lược) qua lăng kính 3 tầng: **nhịp tim** (thói quen hằng ngày) → **độ tin** (boring-solid) → **tấm gương** (bản sắc số của SV).
> Cách dùng: mỗi phiên nói *"hôm nay làm gì"* → mở file này, làm đầu việc kế tiếp chưa ✅, xong đánh dấu kèm ngày thật. Trượt ngày không sao — thứ tự quan trọng hơn lịch.
> Quy tắc nhịp: mỗi ngày tối đa **1 đầu việc chính**; việc nền chỉ làm khi ngày trống.

---

## TUẦN 1 (25–31/8) — Nền đo & an toàn

- [ ] **D1 · SSH probe sv09** — so file trên server (192.168.2.150) với local `bcse-internship-careerpath`, tìm hotfix chỉ-có-trên-server (sv09 có nhiều `fix_*.py` nhất). *DoD: báo cáo drift; nếu server ahead → pull về local + commit; 34 file dirty của sv09 được commit sạch.*
- [ ] **D2 · Umami sv09** — snippet đã chèn sẵn trong layout.tsx từ trước; verify + deploy bằng script đã sửa IP/path. *DoD: mở sv09 thấy `script.js` 200 + `api/send` 200.*
- [ ] **D3 · Umami sv13 + sv18** — chèn snippet (sv13: Next layout; sv18: `dashboard_assets/*.html` + login.html), deploy, verify. *DoD: cả 2 đo được WAU.*
- [ ] **D4 · Umami sv12 + sv14** — sv12: reset password VM112 qua Proxmox (đã drift) → cập nhật `vm_inventory.json` → deploy; sv14: chèn + deploy. *DoD: 5/5 Core có analytics. N0 CHỐT SỔ.*
- [ ] **D5 · Backup ngoài máy** — `vm_inventory.json`, `BCSE-Tracker/data/` (bảng điểm + bcse.db), backup KLTN 1.5GB → Google Drive. *DoD: mất laptop không mất chìa khóa VM và dữ liệu SV.*
- [ ] **D6 · SV08 journey layout (N1)** — gán trường `journey` cho 20 services trong `data/services.ts`, redesign section theo 5 chặng (Năm 1→4 + Xuyên suốt), app Frozen vào mục "sắp trở lại". *DoD: build pass, deploy.*
- [ ] **D7 · Nghỉ / buffer / việc nền** (xem Backlog).

## TUẦN 2 (1–7/9) — Nhịp tim SV08 + chuẩn bị onboarding

- [ ] **D8 · SV08 login bcse-id** — onboard SV08 làm OIDC client theo checklist có sẵn của bcse-id. *DoD: đăng nhập Google VJU trên SV08 hoạt động, session bền.*
- [ ] **D9 · "Tuần này của bạn" v1** — widget sau login: lịch tĩnh theo năm học của SV (chỉ cần biết SV năm mấy), hiện mốc tuần hiện tại + link đúng app đúng lúc. KHÔNG nối API app nào ở v1. *DoD: SV login thấy ngay "việc của tôi tuần này".*
- [ ] **D10 · Nạp lịch Fall 2026 thật** — 🧑‍🏫 *thầy cung cấp*: lịch kỳ, mốc HD483/CSE4001, mốc KLTN, lịch cố vấn → Claude nhập vào data lịch tĩnh. *DoD: nội dung tuần nào cũng có ít nhất 1 mốc thật.*
- [ ] **D11 · Quy trình cấp bcse-id ngày nhập học** — auto-provision từ Google Workspace VJU, test với 2–3 tài khoản thử. *DoD: flow chạy được cho danh sách khóa mới trong <30 phút.*
- [ ] **D12 · Gói tuần định hướng** — Claude soạn: 1 slide + QR SV08 + checklist SV làm theo (login → xem "Tuần này" → thử Arena nhập môn → biết Hardware Lab tồn tại). 🧑‍🏫 thầy duyệt. *DoD: tài liệu in được.*
- [ ] **D13 · Mobile pass SV08** — kiểm tra toàn bộ flow login + Tuần này trên điện thoại thật. *DoD: mượt trên màn hình 6 inch.*
- [ ] **D14 · Tổng duyệt + buffer.**

## TUẦN ĐỊNH HƯỚNG (~8/9) — 🧑‍🏫 việc của thầy, Claude standby sửa nóng

- [ ] **D15 · Chạy onboarding khóa 2026.** *DoD: 100% tân SV có bcse-id; ≥70% login SV08 ít nhất 1 lần trong tuần.*
- [ ] **D16 · 🧑‍🏫 Chọn 2–3 SV owner (N8)** — gặp 30', giao vai + checklist tuần (Claude soạn checklist).

## NHỊP TUẦN FALL 2026 (từ 9/9 đến hết kỳ)

| Nhịp | Việc |
|---|---|
| **Thứ 2, 10'** | Mở sv05 Ops Center: app Core nào lỗi/chậm → tuần đó là "tuần sửa", không thêm tính năng |
| **Mỗi tuần, 1 đầu việc chính** | Lấy theo thứ tự backlog A (dưới) |
| **🧑‍🏫 15'/tuần** | Review với SV owner |
| **Cuối tháng 10** | 📊 Báo cáo WAU đầu tiên → họp triage KEEP/FREEZE bằng số liệu (GĐ0.2) |
| **Cuối kỳ (12/2026)** | Thí điểm N7: trang distilled OOP + di sản chuẩn nhóm KLTN đầu tiên |

### Backlog A — đầu việc chính trong kỳ (theo thứ tự)
- [ ] A1 · Arena gắn điểm thành phần môn thầy dạy Fall 2026 (phổ biến trong đề cương — 🧑‍🏫) + bộ đề tuần
- [ ] A2 · Bảng mốc HD483 ↔ hành động trên sv09 (1 session lập + 🧑‍🏫 duyệt, đưa vào phổ biến học phần)
- [ ] A3 · Mobile pass lần lượt: sv14 → sv18 → sv09 → sv13 → sv12 (mỗi app 1 phiên)
- [ ] A4 · "Tuần này" v2: nối API thật đầu tiên — deadline Arena (lực kéo mạnh nhất)
- [ ] A5 · Chuẩn `/api/health` trả git SHA cho 5 Core + panel so local↔origin↔server trên sv05
- [ ] A6 · Kokoro phân phối mùa thi: banner SV08 + 1 dòng gợi ý trong phiếu cố vấn Tracker (N9)

### Backlog B — việc nền (ngày trống mới làm, mỗi lần 1 mục)
- [ ] B1 · Git đợt 2: bcse-advisor · B2 · Lambda Codex · B3 · delta-lab-platform · B4 · hygieia-lab-platform · B5 · Kiensensei_LMS_system · B6 · các folder còn lại
- [ ] B7 · Sửa remote: e-service-be/e-services về kienbh; tách remote lambda-lab-platform; thêm remote review-hub
- [ ] B8 · Deployer chuẩn hóa: 1 script + `vm_inventory.json` thay ~40 biến thể (ghi SHA vào server khi deploy)
- [ ] B9 · Rotate password VM (sau B8; lịch sử GitHub nhánh archive có password cũ)
- [ ] B10 · Dọn sv01 (đang serve app lạ) ~~+ xác minh sv11, sv20~~ ✅ đã xác minh 24/8: sv11=Review Hub, sv20=Lambda Codex Campus LMS
- [ ] B11 · Đồng bộ skill server-management với thực tế (đã biết drift)
- [ ] **B12 · Gom & giải phóng máy chủ** (khảo sát 24/8 — điều kiện tiên quyết: repo tương ứng đã có git backup ở B1–B6):
  - B12.1 · 3 portal lab (sv03·17·19) → export tĩnh, host chung 1 nơi (Cloudflare Pages hoặc 1 VM nhỏ) → giải phóng 2–3 VM. Domain giữ nguyên, app FREEZE trong git.
  - B12.2 · Gộp sv16 (Codex) vào sv20 (Codex Campus — cùng brand): nội dung distilled thành section trong LMS → giải phóng VM116.
  - B12.3 · Dời Aura Brew khỏi sv07 (dự án cá nhân — sang hosting riêng/ngoài dải BCSE) → giải phóng VM107.
  - B12.4 · Format sv01 (app lạ) → giải phóng VM101.
  - B12.5 · Tái sử dụng VM giải phóng: ưu tiên (a) **VM staging + CI runner** cho 5 app Core (hiện deploy thẳng prod!), (b) VM backup tập trung (pg_dump + Drive sync), (c) dự phòng scale sv20 LMS. KHÔNG build app SV mới trước triage tháng 10.

## SPRING 2027 — phác trước, chi tiết hóa sau triage tháng 10
- Tấm gương số trên bcse-id (portfolio sống từ dữ liệu Arena/booking/NCKH/KLTN)
- GV thứ hai onboard (công cụ giảm-việc-cho-GV: chấm bài hoặc phiếu cố vấn)
- Guild = phần mềm hóa quy trình owner đã chạy tay ổn ≥1 tháng
- Handover liên khóa đầu tiên (N7)

## ❓ Hai quyết định chờ input của thầy
1. SV BCSE mở gì mỗi sáng (Zalo group? Classroom?) → quyết định có làm kênh thông báo Zalo OA nối từ SV08 không.
2. GV nào trong ngành dễ "chịu thử" công cụ nhất → quyết định sản phẩm GV đầu tiên của Spring 2027.

---
*Nhật ký hoàn thành: ghi `✅ D1 (26/8) — ghi chú ngắn` ngay dưới đầu việc khi xong.*
