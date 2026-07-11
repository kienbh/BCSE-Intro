# BCSE Digital Ecosystem — Rà soát & Chiến lược phát triển 2026–2027

> Tài liệu sống. Lập ngày 2026-07-11. Cập nhật sau mỗi giai đoạn.
> Nguyên tắc đọc: phần 2 (chẩn đoán) là quan trọng nhất — mọi quyết định sau này đối chiếu về đó.

---

## 1. Hiện trạng — kiểm kê 20 cổng dịch vụ

### Nhóm A — Chạy tốt, có giá trị thật (2)
| Cổng | URL | Ai hưởng lợi | Vì sao thành công |
|---|---|---|---|
| VJU Hardware Lab | sv14 | Sinh viên | Nằm trên **đường bắt buộc** của môn học/khóa luận: cần kit để hoàn thành bài. Xóa friction thật (VPN, phải đến lab). Dùng lặp lại hàng tuần. |
| BCSE Tracker | sv18 | Giảng viên/cố vấn | Giải quyết **pain của chính người vận hành**: rà 152 TC, cảnh báo rủi ro, phiếu cố vấn PDF — việc bắt buộc mỗi kỳ. |

### Nhóm B — Chạy nhưng chưa tốt / chưa rõ mức dùng (≈7)
Code Arena (sv12 — grader), Cổng Thực tập & Nghề nghiệp (sv09), Thesis Review (sv13), AI Advisor (sv02), E-Service (sv04), Lab Ops Dashboard (sv05), Lab Booking (sv10). Điểm chung: có lý do tồn tại gắn với workflow thật, nhưng mức độ dùng thực tế **chưa đo được** — cần số liệu trước khi quyết định đầu tư thêm.

### Nhóm C — Thành hình nhưng không có người dùng thật (≈5)
| Cổng | Vấn đề |
|---|---|
| λ Lambda Lab (sv03) | Portal là brochure — chưa có hoạt động nghiên cứu thật + nội dung mới phía sau |
| Δ Delta Lab (sv17) | Như trên |
| Υ Hygieia Lab (sv19) | Như trên |
| Lambda Codex (sv16) | Dang dở; scope "khóa học mở tự nguyện" quá rộng, không có lực kéo |
| Kokoro / Mochi (sv06) | Sản phẩm tốt nhưng **không có kênh phân phối**: không ai tự tìm app của khoa để tâm sự nếu không được giới thiệu đúng thời điểm |

### Nhóm D — Coming soon (6)
Self-Study Portal, BCSE Club, E-Office, Talent Showcase, Competition Hub, Koe (sv20). BCSE Guild (sv15) active nhưng chưa rõ người dùng — xếp tạm giữa B và C.

### Hạ tầng nền (tài sản quan trọng nhất hiện có)
- **bcse-id SSO** — 6+ OIDC client, Google Workspace VJU login. Đây là mảnh ghép cho phép "một cửa" và đo lường theo từng sinh viên.
- Proxmox VM fleet + Cloudflare Tunnel — chi phí vận hành thấp, deploy nhanh.

---

## 2. Chẩn đoán — vấn đề cốt lõi

**Chẩn đoán một câu: Năng lực XÂY phần mềm đã vượt xa năng lực VẬN HÀNH — hệ sinh thái được xây theo hướng cung (build-first), trong khi người dùng chỉ đến qua workflow bắt buộc hoặc qua con người vận hành, cả hai đều đang thiếu.**

Phân rã thành 5 vấn đề, xếp theo mức độ gốc rễ:

### P1. Build theo cung, không theo lực kéo (demand-pull)
Nhìn vào 2 app thành công và ~10 app không có người dùng, quy luật rất rõ:
- **Thành công** khi app nằm trên đường đi **bắt buộc** của một người cụ thể: sinh viên phải nộp bài (grader), phải dùng kit (hardware), cố vấn phải rà TC (tracker), khoa phải chấm KLTN (thesis review).
- **Thất bại** khi app là **điểm đến tự nguyện**: portal lab, Codex, Kokoro đòi hỏi sinh viên tự nhớ ra và tự ghé thăm — điều không xảy ra nếu không có cơ chế kéo.

→ Hệ quả: **không bao giờ đánh giá một app bằng chất lượng của nó nữa; đánh giá bằng workflow bắt buộc nào kéo người dùng đến nó.**

### P2. Không có cơ chế vận hành (người + nội dung + nhịp)
Một portal sống cần: (1) một **người own** nó, (2) **nội dung mới** theo nhịp tuần, (3) lý do quay lại. Hiện tại cả 20 cổng có đúng 1 người vận hành — là thầy — và 100% thời gian của thầy đang dồn vào build, 0% vào operate. Portal lab chết không phải vì code kém mà vì không ai đăng gì lên đó tuần này.

### P3. Phân mảnh — 20 cửa, không có một cửa
20 app riêng, nhiều stack (Next.js, FastAPI, Express, SPA), mỗi app phải tự kiếm người dùng từ đầu. Sinh viên không thể nhớ 20 URL. SV08 hiện là danh mục (catalog) chứ chưa phải cửa (front door): không đăng nhập, không cá nhân hóa, không có "việc của tôi tuần này".

### P4. Portal lab đi trước lab thật
λ/Δ/Υ có website trước khi có nhóm nghiên cứu hoạt động đều đặn. Portal nghiên cứu chỉ có giá trị khi nó **phản chiếu** hoạt động thật (đề tài đang chạy, sinh viên có tên, log tiến độ, kết quả). Không thể sửa vấn đề này bằng cách sửa website.

### P5. Không đo lường — quyết định bằng cảm giác
Không có analytics nên "chạy chưa tốt" / "không ai dùng" hiện là ước lượng. Không đo được thì không biết nên dồn lực vào đâu và không biết thay đổi có tác dụng không.

### P6. Không có cơ chế kế thừa liên khóa (bổ sung 2026-07-11)
Mỗi học phần (OOP, Computer Vision…) đang được số hóa tốt nhưng chỉ phục vụ **sinh viên trong học kỳ đó**. Kỳ kết thúc → tri thức, bài tập, Q&A, kinh nghiệm, quan hệ anh–em khóa trên/dưới đều tan biến; khóa sau bắt đầu lại gần như từ đầu. Chưa có chỗ cho sinh viên học lại / ôn lại / tips / track dài hạn. Đây là lý do hệ sinh thái **không cộng dồn**: mỗi năm nỗ lực reset về 0 thay vì chồng lên năm trước. Sửa được P6 thì thời gian sẽ tự làm việc cho hệ thống — mỗi khóa đi qua để hệ thống giàu lên chứ không nghèo đi.

**Lưu ý về nghịch lý token/công sức:** với Claude, chi phí xây thêm 1 app ≈ 0 so với trước đây — nên bẫy tự nhiên là tiếp tục xây. Nhưng bottleneck thật bây giờ là **người dùng, nội dung, và giờ vận hành** — những thứ token không mua được. Kế hoạch dưới đây tối ưu cho bottleneck thật.

---

## 3. Nguyên tắc chỉ đạo (bất biến qua các giai đoạn)

1. **Không app mới** cho đến khi ≥5 app hiện có đạt ngưỡng người dùng hoạt động hàng tuần. (WIP limit cho cả hệ sinh thái.)
2. Mỗi app được giữ phải trả lời được: *"Ai bị workflow nào bắt buộc phải dùng nó, vào tuần nào của học kỳ?"* Không trả lời được → freeze.
3. **Không xóa app.** Các app đều sinh từ nhu cầu thực và đã có sẵn — vấn đề là tổ chức & kết nối, không phải sự tồn tại. FREEZE = ngủ đông chờ đúng thời điểm/cơ chế kéo, không phải chết. Việc "dọn SV08" là **sắp xếp lại theo hành trình người dùng**, không phải gỡ bỏ.
4. **Đo trước, xây sau.** Mọi quyết định đầu tư từ GĐ1 trở đi phải dẫn số liệu.
5. **Quy trình trước, nền tảng sau.** Cơ chế vận hành bắt đầu bằng con người + checklist chạy tay; chỉ phần mềm hóa (Guild) những gì đã chạy tay ổn định ≥1 tháng.
6. Vai trò của thầy dịch chuyển: **builder → editor-in-chief**. Sinh viên vận hành, thầy duyệt.
7. Portal phản chiếu hoạt động thật, không thay thế hoạt động thật.
8. **Mọi hoạt động phải để lại di sản có cấu trúc** cho khóa sau (xem P6 và trục Kế thừa ở GĐ3).

---

## 4. Lộ trình 4 giai đoạn

Mỗi bước dưới đây được cắt vừa 1–2 session Claude. Đánh dấu ✅ khi xong.

### GĐ 0 — Đo & Gọn (tháng 7–8/2026, trước học kỳ mới)
- [ ] **0.1 Analytics toàn hệ thống.** Dựng Umami (hoặc Plausible) self-host trên 1 VM, gắn script vào tất cả app active. Sau 2–4 tuần có bức tranh WAU thật của từng cổng. *(1–2 session)*
- [ ] **0.2 Triage chính thức bằng số liệu.** Xếp mỗi app vào: `KEEP-CORE` (đầu tư), `KEEP-SEASONAL` (chỉ chạy theo mùa: thesis, internship), `FREEZE` (ngủ đông — vẫn chạy, 0 effort mới, chờ đúng cơ chế kéo). **Không xóa app nào.** Trên SV08, sắp xếp lại card theo hành trình người dùng (tân SV / trong kỳ / mùa KLTN / mùa thực tập…) thay vì grid phẳng 20 card. *(1 session, sau khi có data)*
- [ ] **0.3 Chốt danh sách môn học kỳ Fall 2026 mà thầy dạy/phụ trách** — đây là nguồn "workflow bắt buộc" để neo app ở GĐ1.

### GĐ 1 — Một cửa & Workflow hóa (học kỳ Fall 2026)
- [ ] **1.1 SV08 thành cửa thật.** Thêm đăng nhập bcse-id vào SV08; sau đăng nhập hiện **"Tuần này của bạn"**: deadline nộp bài grader, booking sắp tới, mốc HD483/KLTN, quest Guild. Một URL duy nhất sinh viên cần nhớ. *(3–5 session, làm dần)*
- [ ] **1.2 Neo từng app KEEP vào lịch học kỳ.** Ví dụ: Code Arena = bộ đề OOP hàng tuần của môn thầy dạy (điểm thành phần → bắt buộc dùng); sv09 = timeline HD483/CSE4001; sv13 = mùa KLTN; sv14 = môn nhúng/FPGA + special access khóa luận; sv18 = tuần cố vấn giữa kỳ. Mỗi app 1 dòng: *môn/mốc nào — tuần nào — ai bắt buộc*. *(1 session lập bảng, thực thi theo kỳ)*
- [ ] **1.3 SSO phủ hết app KEEP** — mọi lượt dùng gắn với danh tính sinh viên → dữ liệu cho GĐ4.

### GĐ 2 — Cơ chế vận hành bằng con người (song song GĐ1)
- [ ] **2.1 Cơ chế vận hành v0 — chạy tay trước** (Guild hiện mới là ý tưởng, chưa dùng làm cơ chế được). Thầy đã có nhiều sinh viên — chọn 2–3 em tin cậy nhất, giao vai trò cụ thể ngay, không cần app: mỗi em own 1 cụm ((a) nội dung LMS/Codex, (b) Code Arena + contest, (c) labs/NCKH) + 1 checklist tuần + 1 nhóm chat + 15 phút review với thầy mỗi tuần. Đơn giản đến mức không thể thất bại vì lý do kỹ thuật.
- [ ] **2.2 Nhịp nội dung tối thiểu:** mỗi portal KEEP có 1 cập nhật/tuần do owner sinh viên đăng, thầy chỉ duyệt (15 phút/tuần). Portal nào 4 tuần không có cập nhật → tự động rơi xuống FREEZE.
- [ ] **2.3 Guild = phần mềm hóa quy trình 2.1** — chỉ sau khi 2.1 chạy tay ổn ≥1 tháng. Khi đó quest board, XP, rank có nội dung thật để mô phỏng thay vì thiết kế chay. Guild trở thành sản phẩm "đóng gói" cơ chế đã được chứng minh, và có users ngay từ ngày 1 (chính các em đang vận hành).

### GĐ 3 — Lab thật trước, portal sau (Fall 2026 → Spring 2027)
- [ ] **3.1 Mỗi lab 1 nhóm NCKH thật/học kỳ**: đề tài chốt, 3–5 sinh viên có tên, log tiến độ hàng tuần đăng lên chính portal lab. Portal λ/Δ/Υ chuyển từ brochure → nhật ký nghiên cứu sống. Chấp nhận: học kỳ nào lab không có nhóm thật thì portal đó không cần cập nhật gì — và đó là tín hiệu đúng.
- [ ] **3.2 Lambda Codex — thu hẹp để hoàn thành.** Bỏ tham vọng "khóa học mở"; scope lại thành: (a) tài liệu các môn thầy đang dạy (sinh viên **bắt buộc** đọc → có người dùng ngay ngày 1), (b) hướng dẫn NCKH/academic writing cho các nhóm ở 3.1. Codex xong khi phục vụ đúng 2 nhóm này.
- [ ] **3.3 Kokoro — sửa phân phối, không sửa sản phẩm.** Không kỳ vọng organic. Ba kênh kéo: (1) banner trên SV08 hub vào mùa thi, (2) cố vấn giới thiệu khi Tracker flag sinh viên at-risk, (3) tích hợp giới thiệu từ phòng CTSV/tư vấn của VJU nếu được. Đo 1 chỉ số duy nhất: số phiên chat/tuần mùa thi.

### GĐ 3½ — Trục Kế thừa liên khóa (giải P6, chạy xuyên suốt từ Fall 2026)

Trả lời câu hỏi *"mỗi khóa nối tiếp nhau, điều gì kế thừa được?"* — 5 loại vốn cộng dồn, mỗi loại một cơ chế:

| Vốn | Cơ chế kế thừa | Nơi chứa |
|---|---|---|
| **Học liệu & bài tập** | LMS môn học chuyển chế độ **evergreen** sau mỗi kỳ: mở read-only/self-paced cho SV học lại, ôn thi, học vượt. Bộ đề Code Arena giữ mở quanh năm làm sân luyện. | LMS + Code Arena |
| **Tri thức chưng cất** (tips, lỗi hay gặp, Q&A hay, bài mẫu) | Cuối mỗi kỳ, owner sinh viên chưng cất từ khóa vừa chạy → 1 trang "distilled" mỗi môn. Codex chính là **tầng cộng dồn** này — mỗi kỳ dày thêm một lớp. | Lambda Codex |
| **Dự án & code** | Mỗi nhóm NCKH/KLTN để lại **di sản chuẩn hóa**: repo + README chạy được + 1 trang tổng kết + demo 5 phút. Khóa sau **nối tiếp** đề tài thay vì làm lại từ đầu — hình thành lineage đề tài của labs. | Portal λ/Δ/Υ + Git |
| **Dữ liệu học tập dọc** | Tracker giữ hồ sơ nhiều khóa → sau 2–3 khóa có pattern thật (môn nào nghẽn, lộ trình nào rủi ro) để tư vấn khóa sau bằng chứng cứ. | BCSE Tracker |
| **Con người** | Khóa trên hướng dẫn khóa dưới thành nghĩa vụ có ghi nhận (quy trình 2.1, sau này là quest Guild); cựu SV giữ kết nối qua Club/Showcase khi chín muồi. | Guild / Club |

- [ ] **3½.1 Thiết kế chế độ evergreen cho LMS** (bắt đầu với OOP + Computer Vision — 2 môn đã số hóa tốt nhất): sau kỳ, khóa học không đóng mà chuyển archive tự học; thêm track "ôn lại / học vượt" tách khỏi cohort trong kỳ.
- [ ] **3½.2 Chuẩn "di sản cuối kỳ"**: 1 template duy nhất (trang distilled cho môn học; repo+README+tổng kết cho đề tài). Đưa vào checklist bắt buộc cuối kỳ của owner và của nhóm NCKH/KLTN.
- [ ] **3½.3 Nghi thức chuyển giao đầu kỳ**: buổi handover mỗi đầu kỳ — khóa trước trình bày di sản cho khóa sau, ngay trên portal tương ứng. Vừa là cơ chế kế thừa, vừa là nội dung sống cho portal.

### GĐ 4 — BCSE Student OS (2027)
- [ ] **4.1 Tracker làm xương sống dữ liệu**, nối các cổng thành vòng lặp: sinh viên at-risk → lịch cố vấn + gợi ý Kokoro; sinh viên giỏi → quest Guild, Competition Hub, Talent Showcase; sinh viên năm cuối → sv13 + special access sv14 + sv09.
- [ ] **4.2 Mở lại các app coming-soon theo nhu cầu thật đo được** (Showcase khi có ≥2 doanh nghiệp Nhật thật sự hỏi; Competition Hub khi Guild đã chạy; E-Office khi có ≥2 giảng viên khác cùng dùng).

---

## 5. Chỉ số theo dõi (xem lại mỗi cuối kỳ)

| Chỉ số | Baseline 07/2026 | Mục tiêu cuối Fall 2026 |
|---|---|---|
| Số cổng active trên SV08 | 14 | ≤ 8–10 (gọn, sống thật) |
| WAU từng cổng KEEP | chưa đo | đo được + ≥3 cổng có WAU > 30 |
| Sinh viên vận hành (owner) | 0 | 3–5 |
| Nhóm NCKH thật đang chạy trong 3 lab | ~0 | ≥ 2 nhóm |
| Cập nhật nội dung/tuần toàn hệ | ~0 | ≥ 4 |
| % sinh viên BCSE đăng nhập bcse-id trong tháng | chưa đo | ≥ 50% |

---

## 6. Việc tiếp theo (bước đi ngay session sau)

1. **Bước 1 — GĐ 0.1:** dựng Umami trên VM (sv16–20 còn tài nguyên), gắn vào các app active. 
2. **Bước 2 — GĐ 0.3:** thầy liệt kê các môn Fall 2026 + mốc học vụ (KLTN, HD483) → lập bảng neo app ↔ lịch kỳ.
3. **Bước 3 — GĐ 0.2:** sau 2–4 tuần data, họp triage với Claude, chốt KEEP/FREEZE, dọn SV08.
