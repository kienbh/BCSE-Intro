# Kế hoạch thực thi Fall 2026 — mỗi ngày một đầu việc

> Lập 2026-08-24. Tài liệu **vận hành hằng ngày** — con của MASTER-PLAN-2026 (chiến lược) qua lăng kính 3 tầng: **nhịp tim** (thói quen hằng ngày) → **độ tin** (boring-solid) → **tấm gương** (bản sắc số của SV).
> Cách dùng: mỗi phiên nói *"hôm nay làm gì"* → mở file này, làm đầu việc kế tiếp chưa ✅, xong đánh dấu kèm ngày thật. Trượt ngày không sao — thứ tự quan trọng hơn lịch.
> Quy tắc nhịp: mỗi ngày tối đa **1 đầu việc chính**; việc nền chỉ làm khi ngày trống.

---

## TUẦN 1 (25–31/8) — Nền đo & an toàn

- [x] **D1 · SSH probe sv09** — so file trên server (192.168.2.150) với local `bcse-internship-careerpath`, tìm hotfix chỉ-có-trên-server (sv09 có nhiều `fix_*.py` nhất). *DoD: báo cáo drift; nếu server ahead → pull về local + commit; 34 file dirty của sv09 được commit sạch.*
  - ✅ D1 (24/8) — Server ahead thật: kéo về 26 file (ecosystem.config.js, 21 logo doanh nghiệp, 4 tool script). 3 file khác nội dung: local đúng cả 3 (verify DB prod dùng `proposedLecturerName` — migration local chuẩn; layout.tsx local có Umami chờ D2; t1-packages local có filter mới chưa deploy). Repo sv09 commit + push sạch (`kienbh/bcse-internship-careerpath` master). Auth sv09 = SSH key `bcse_master_ed25519`, KHÔNG phải password.
> ⚠ **Ghi chú phiên batch 24/8:** D2–D4 (deploy) bị lớp bảo vệ auto-mode chặn khi chạy không giám sát — cần phiên thầy ngồi accept lệnh deploy. D6 nửa data (journey field trong services.ts) hóa ra ĐÃ XONG từ commit N1.1 tháng 7; còn nửa UI (redesign `app/services/Content.tsx` 364 dòng theo chặng + review với SV).

- [x] **D2 · Umami sv09** ✅ (25/8) — deploy full (kèm filter t1-packages), smoke test pass, snippet live.
- [x] **D3 · Umami sv13 + sv18** ✅ (25/8) — sv13 deploy full; sv18 deploy full; cả hai verify công khai.
- [x] **D4 · Umami sv12 + sv14** ✅ (25/8) — sv12: SSH key bcse_master vào được VM112 (không cần reset password), mini-deploy base.html; sv14: mini-deploy layout.tsx + docker rebuild frontend. **5/5 Core có analytics — N0 CHỐT SỔ.** Verify công khai cả 5.
- [x] **D5 · Backup ngoài máy** ✅ (25/8) — *DoD: mất laptop không mất chìa khóa VM và dữ liệu SV.*
  - KLTN 1.5GB: **đối chiếu Drive — ĐÃ CÓ ĐỦ 62/62 folder SV** (app sv13 tự sync từ tháng 5, spot-check khớp) → không cần upload lại.
  - Tracker data (bảng điểm + bcse.db + phiếu, zip 1.7MB) + cong-bcse.db → `G:\My Drive\BCSE-ecosystem-backup\` (Google Drive for Desktop tự sync).
  - `vm_inventory.json`: 🧑‍🏫 **thầy tự backup** (đã chọn không đưa secrets lên cloud qua Claude). Gợi ý: copy vào password manager hoặc USB.
  - Ghi chú kỹ thuật: service account `bcse-thesis-sync` KHÔNG còn upload được vào My Drive (Google bỏ quota SA) — backup tự động sau này (B8) nên dùng Shared Drive hoặc Google Drive for Desktop.
- [x] **D6 · SV08 services redesign** ✅ (26/8, deploy live) — qua 2 vòng review với thầy, kết quả KHÁC thiết kế N1 ban đầu:
  - Quyết định thầy: **cổng dịch vụ thuần sinh viên** — bỏ role switcher (SV/GV/CBQL), app tiện ích tự nói công dụng nên KHÔNG ép chia theo năm.
  - Mặc định "Dịch vụ" (theo nhóm như cũ); "🗺 Bản đồ 4 năm" (journey 5 chặng + lời dẫn 3 thứ tiếng) thành chế độ xem phụ; app coming-soon gom mục "Sắp ra mắt".
  - Thêm trường `audience` (student/faculty/staff) gán tay 20 app — E-Office thuần GV/CBQL ẩn khỏi trang; audience để dành cho dashboard bcse-id lọc tự động sau login (N2).
- [ ] **D7 · Nghỉ / buffer / việc nền** (xem Backlog).

## TUẦN 2 (1–7/9) — Nhịp tim SV08 + chuẩn bị onboarding

- [~] **D8 · SV08 login** — ⚙ QUYẾT ĐỊNH KIẾN TRÚC (26/8, chờ thầy xác nhận): SV08 là site TĨNH (`output: export`) không làm OIDC server-side được. Chọn **hướng B**: hub cá nhân hóa đặt tại **dashboard bcse-id** (Next.js, đã có session + registry apps.ts + audience field); SV08 giữ tĩnh, thêm nút "Đăng nhập" → id.bcse-vju.com (✅ đã code + build, chờ deploy). Ưu điểm: không phải chuyển kiến trúc SV08, tái dùng dashboard có sẵn, phân vai tự động sau login.
- [x] **D9 · "Tuần này của bạn" v1** ✅ (27/8, LIVE trên id.bcse-vju.com) — widget trong dashboard bcse-id (hướng B): lịch tĩnh `src/data/week-calendar.ts` (6 mốc seed Fall 2026, lọc theo cohort, badge "Cần làm", link đúng app), chỉ hiện cho role student. Mốc HD483/KLTN đang là "(dự kiến)" — 🧑‍🏫 thầy chốt tuần trong 1 file duy nhất `week-calendar.ts` (hoặc điền HD483-TIMELINE.md rồi Claude đổ vào). Deploy: mini-sync 3 file + pnpm build + pm2 reload (bcse-id chạy port 3010, VM108).
- [ ] **D10 · Nạp lịch Fall 2026 thật** — 🧑‍🏫 *thầy cung cấp*: lịch kỳ, mốc HD483/CSE4001, mốc KLTN, lịch cố vấn → Claude nhập vào data lịch tĩnh. *DoD: nội dung tuần nào cũng có ít nhất 1 mốc thật.*
- [x] **D11 · ~~Cấp bcse-id hàng loạt~~ — KHÔNG CẦN** (đính chính thầy 27/8): bcse-id tự định danh khi SV đăng nhập Google VJU lần đầu, hồ sơ đi kèm sẵn. Việc còn lại gộp vào D12: hướng dẫn "đăng nhập lần đầu" trong gói định hướng. Bonus 27/8: id.bcse-vju.com đã gắn Umami (website `3849789c`) — từ giờ đo được lượt đăng nhập SSO.
- [~] **D12 · Gói tuần định hướng** — ✅ draft (25/8): `docs/onboarding-2026/goi-dinh-huong.html` + `.pdf` (A4 2 trang). ⏸ **GÁC LẠI theo quyết định thầy 25/8**: hoàn thiện toàn hệ trước, thầy tự làm hướng dẫn sau. Placeholder khi quay lại: tên bài Arena nhập môn (khớp A1), email hỗ trợ.
- [~] **D13 · Mobile pass SV08** — ✅ pass tự động 390×844 (25/8): sv08 (hero/services/careers/footer), id login+home, Pulse — **0 tràn ngang, layout đẹp**. 🔴 **Bắt & sửa sự cố**: bcse-id MẤT CSS toàn site từ deploy cohort 09:26 (thiếu bước copy `.next/static` → `.next/standalone/.next/` sau build) — đã fix trên VM108 + vá `deploy_bcse_id_cohort_stats.py` chống tái diễn. 2 quan sát cho thầy: (a) trang chủ sv08 dài ~34 màn hình mobile — cân nhắc rút gọn; (b) hero sv08 ghi "**152 tín chỉ**" nhưng tài liệu CTĐT ghi **146 TC** — số nào đúng? Còn lại: 🧑‍🏫 thầy thử flow login Google thật trên điện thoại (không tự động hóa được).
- [ ] **D14 · Tổng duyệt + buffer.**

## TUẦN ĐỊNH HƯỚNG (~8/9) — 🧑‍🏫 việc của thầy, Claude standby sửa nóng

- [ ] **D15 · Chạy onboarding khóa 2026.** *DoD: 100% tân SV có bcse-id; ≥70% login SV08 ít nhất 1 lần trong tuần.*
- [ ] **D16 · 🧑‍🏫 Chọn 2–3 SV owner (N8)** — gặp 30', giao vai + checklist tuần (Claude soạn checklist).

## NHỊP TUẦN FALL 2026 (từ 9/9 đến hết kỳ)

| Nhịp | Việc |
|---|---|
| **Thứ 2, 10'** | Mở sv05 (uptime) + **analytics.bcse-vju.com** (WAU — mở 27/8, login SSO email giám đốc, Umami đăng nhập lần đầu admin/umami rồi ĐỔI PASS): app nào lỗi/chậm → tuần đó là "tuần sửa" |
| **Mỗi tuần, 1 đầu việc chính** | Lấy theo thứ tự backlog A (dưới) |
| **🧑‍🏫 15'/tuần** | Review với SV owner |
| **Cuối tháng 10** | 📊 Báo cáo WAU đầu tiên → họp triage KEEP/FREEZE bằng số liệu (GĐ0.2) |
| **Cuối kỳ (12/2026)** | Thí điểm N7: trang distilled OOP + di sản chuẩn nhóm KLTN đầu tiên |

> ✅ **A8 · BCSE Pulse CÔNG KHAI — XONG (25/8, LIVE, v2 sau duyệt UI):** `https://sv05.bcse-vju.com/` (root 302 → `/pulse/`). Thầy duyệt qua 3 mẫu (`pulse/mockups/`) → chốt **Clean SaaS** + 3 chỉnh: trục tung, filter Ngày/Tuần/Tháng/Năm, cột "Mức hoạt động 7d" **4 màu có nhãn** (Sôi động ≥100 / Ổn định 20–99 / Trầm lắng 1–19 / Im ắng 0) thay sparkline ping. Nguồn liệu: (1) Kuma status page `bcse` 16 monitor — trạng thái/ping/uptime; (2) `pulse.json` cron `7 * * * *` VM105 — series ngày/tuần/tháng/năm + delta tuần trước từ Umami; (3) **endpoint mới `bcse-id /api/stats/cohort`** (chỉ số tổng hợp, không định danh) → card "Tham gia theo khóa" (25/8: K2023 dẫn đầu 13 SV). nginx: `/pulse/*` `/status/*` `/api/status-page/*` `/assets/*` public — `/overview` `/dashboard` vẫn sau SSO. Redeploy: `sv05-ops-center/deploy_pulse_public.py` (sv05) + `deploy_bcse_id_cohort_stats.py` (VM108). Verify 25/8: 541 views (+163%)/97 phiên 7d, 16/16 up.

### Backlog A — đầu việc chính trong kỳ (theo thứ tự)
- [ ] A1 · Arena gắn điểm thành phần môn thầy dạy Fall 2026 (phổ biến trong đề cương — 🧑‍🏫) + bộ đề tuần
- [~] A2 · Bảng mốc HD483 ✅ draft (26/8: `bcse-internship-careerpath/docs/HD483-TIMELINE.md` — 9 mốc ↔ state machine + 3 quy tắc) — 🧑‍🏫 **chờ thầy điền tuần thật + duyệt**
- [~] A3 · Mobile pass lần lượt: sv14 → sv18 → sv09 → sv13 → sv12 (mỗi app 1 phiên) — ✅ **sweep tìm lỗi cả 5 cổng xong (25/8)**: báo cáo `docs/PORTAL-REVIEW-FALL-2026.md` (0 tràn ngang; sv14 🔴 auth/refresh 404; sv09/sv18 🟡 lỗi script CF inject; sv12 🟡 nav mobile; sv13 ✅ sạch). Còn: các phiên SỬA theo thứ tự trong báo cáo.
- [ ] A4 · "Tuần này" v2: nối API thật đầu tiên — deadline Arena (lực kéo mạnh nhất)
- [~] A5 · `/api/health` trả git SHA: ✅ LIVE cả 5/5 Core (verify public 27/8; sv18 miễn auth cho health; sha="unknown" đến khi B8 ghi VERSION lúc deploy) — còn: panel so sánh local↔origin↔server trên sv05
- [ ] A6 · Kokoro phân phối mùa thi: banner SV08 + 1 dòng gợi ý trong phiếu cố vấn Tracker (N9)

### Backlog B — việc nền (ngày trống mới làm, mỗi lần 1 mục)
- [x] B1–B6 · Git đợt 2 ✅ (24/8 batch): 12 repo mới lên GitHub private (lambda-codex, delta/hygieia-platform+landing, kiensensei-lms, demeter-codex, hygieia-food-health, xuathoadon, ai-career-trends, aurabrew-v1/-backend/-ver2-be). Phát hiện: bcse-advisor có repo git LỒNG BÊN TRONG (`bcse-advisor/bcse-advisor`, remote kienbh/bcse-advisor, master **behind 8** so origin — WIP 14 file đã bảo toàn ở nhánh `local-wip-2026-08-24`, cần thầy hợp nhất). Bỏ qua: `BCSE LAB MANAGEMENT` (rỗng), `qdrant` (data dir).
- [x] B7 · Sửa remote ✅ (24/8): e-service-be/e-services → origin kienbh (thenamvn giữ làm `upstream`); lambda-lab-platform tách remote riêng; review-hub có remote + push. **Sweep WIP toàn workspace**: 14 repo dirty đã commit + push — WORKSPACE SẠCH 100%, mọi repo đều có backup GitHub.
- [ ] B8 · Deployer chuẩn hóa: 1 script + `vm_inventory.json` thay ~40 biến thể (ghi SHA vào server khi deploy)
- [ ] B9 · Rotate password VM (sau B8; lịch sử GitHub nhánh archive có password cũ)
- [ ] B10 · Dọn sv01 (đang serve app lạ) ~~+ xác minh sv11, sv20~~ ✅ đã xác minh 24/8: sv11=Review Hub, sv20=Lambda Codex Campus LMS
- [x] B11 · Đồng bộ skill server-management ✅ (24/8): thêm khối "THÔNG BÁO DRIFT" đầu SKILL.md trỏ về bcse-ecosystem + vm_inventory + các lệch đã biết.
- [ ] **B12 · Gom & giải phóng máy chủ** (khảo sát 24/8; đã thu hẹp theo quyết định thầy 24/8: sv01 GIỮ — 1 GV đang dùng; sv07 Aura Brew GIỮ — dự án cá nhân của thầy; sv17/sv19 ĐỂ TẠM. Điều kiện tiên quyết: repo tương ứng có git backup ở B1–B6):
  - B12.1 · Gộp sv16 (Codex) vào sv20 (Codex Campus — cùng brand): nội dung distilled thành section trong LMS → giải phóng VM116.
  - B12.2 · sv15 Guild: app FREEZE trong git (chờ N8 chạy tay ổn) → giải phóng VM115.
  - B12.3 · Tái sử dụng 2 VM giải phóng: (a) **VM staging + CI runner** cho 5 app Core (hiện deploy thẳng prod — gốc của "chưa ổn định"), (b) VM backup tập trung (pg_dump hằng đêm + Drive sync). KHÔNG build app SV mới trước triage tháng 10.

## 🧭 MÓN CHỐT HẠ — BCSE Compass (sv04) · *làm CUỐI CÙNG, sau khi tinh chỉnh toàn hệ*

> Quyết định thầy 27/8: KHÔNG build ngay. Compass là dashboard toàn diện từng SV (thiết kế đầy đủ:
> `docs/COMPASS-DESIGN.md`) — nó thâu tóm dữ liệu từ các cổng khác, nên chỉ có giá trị khi các cổng
> nguồn đã chạy ổn định và có API `/api/me/*`. Trình tự: xong nhịp tim (D-series) → boring-solid +
> backlog A/B trong kỳ → triage tháng 10 → **rồi mới Compass**.
> Hạ tầng đã chốt: **sv04 + VM104** (sv21 ở VPS ngoài cụm). Bước 0 khi bắt đầu: backup DB e-service
> kế toán → tắt hẳn (quyết định thầy; code đã an toàn trên GitHub private).

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
