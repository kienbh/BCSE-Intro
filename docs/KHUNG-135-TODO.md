# Chuẩn bị đón khung chương trình MỚI 135 tín chỉ (BCSE2026)

> Lập 25/8/2026 theo chỉ đạo thầy: **khung cũ 152 TC** (K2025 trở về trước) · **khung mới 135 TC**
> (BCSE2026 vận hành). Chi tiết khung 135 đã duyệt **thầy sẽ cung cấp sau** — file này là bản đồ
> mọi chỗ phải thay để khi có tài liệu là đổ vào được ngay, không sót.

## Nguyên tắc hiển thị (chốt với thầy trước khi làm)
- **Landing / tuyển sinh (sv08)** → hiển thị khung MỚI **135 TC** (đối tượng là khóa sắp vào).
- **Công cụ phục vụ SV đang học khóa cũ** (sv18 Tracker audit, mô tả dịch vụ) → giữ **152 TC**
  cho đến khi công cụ hỗ trợ song song 2 khung theo cohort.
- Trang `/curriculum` nên có **toggle "Khung 2026 (135 TC)" / "Khung cũ (152 TC)"**.
- ⚠ Con số "146 TC" trong tài liệu/skill cũ (bcse-clo-de-cuong) là **SAI** — sửa khi cập nhật.

## Việc cần làm khi nhận được khung 135 (repo bcse-intro)
- [ ] `data/curriculum.ts` → tách `curriculum-152.ts` (giữ nguyên) + tạo `curriculum-135.ts`
      (programStructure: totalCredits 135 + creditBlocks M1–M5 mới + yearBlocks 8 kỳ mới).
- [ ] `data/stats.ts:12` — `value: 152` → 135 (stat hero).
- [ ] `lib/i18n.tsx` — 6 chuỗi × 3 thứ tiếng:
      `hero.bullets` (dòng 24 VI / 184 EN / 335 JA) và `curriculum.subtitle` (52 / 212 / 363).
- [ ] `app/contact/Content.tsx:114` — "152 tín chỉ, 4 năm đào tạo".
- [ ] `app/curriculum/` — toggle 2 khung theo cohort.
- [ ] `data/services.ts:409–416` (mô tả sv18 Tracker) — GIỮ 152 (khóa cũ), thêm ghi chú
      "K2026+ theo khung 135" khi Tracker hỗ trợ.

## Ngoài bcse-intro (làm sau, việc riêng từng app)
- [ ] **sv18 BCSE Tracker**: logic rà 152 TC cần bảng mapping khung 135 cho K2026+ (chọn khung theo `cohort` từ bcse-id).
- [ ] **Skill `bcse-clo-de-cuong`**: đang ghi "146 tín chỉ" — cập nhật thành 2 khung khi soạn đề cương theo khung mới.
- [ ] **bcse-id "Tuần này của bạn"**: mốc học vụ nếu gắn số TC thì phân biệt theo cohort.

## Đầu vào cần từ thầy
1. File khung 135 đã duyệt (bảng M1–M5 + danh mục học phần theo kỳ).
2. Xác nhận nguyên tắc hiển thị ở trên (đặc biệt: hero sv08 đổi sang 135 ngay hay chờ khung chi tiết).
