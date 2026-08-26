# Chuẩn bị đón khung chương trình MỚI 135 tín chỉ (BCSE2026)

> Lập 25/8/2026 theo chỉ đạo thầy: **khung cũ 152 TC** (K2025 trở về trước) · **khung mới 135 TC**
> (BCSE2026 vận hành). Chi tiết khung 135 đã duyệt **thầy sẽ cung cấp sau** — file này là bản đồ
> mọi chỗ phải thay để khi có tài liệu là đổ vào được ngay, không sót.

## Nguyên tắc hiển thị — ✅ THẦY CHỐT 26/8: 2 khung SONG HÀNH
- **Landing / tuyển sinh (sv08)** → hiển thị **CẢ HAI khung song hành**: 135 TC (K2026+) và
  152 TC (K2025 trở về trước). Không chỉ hiện khung mới.
- **sv18 Tracker** → chạy khung theo **cohort tương ứng**: ≤K2025 rà 152 TC, K2026+ rà 135 TC.
- Trang `/curriculum` có **toggle "Khung 2026 (135 TC)" / "Khung cũ (152 TC)"**.
- ⚠ Con số "146 TC" trong tài liệu/skill cũ (bcse-clo-de-cuong) là **SAI** — sửa khi cập nhật.
- Chi tiết 2 khung đã có trong 2 skill: `bcse-khung-135tc` + `bcse-khung-152tc` (thầy lưu 26/8).

## Việc cần làm khi nhận được khung 135 (repo bcse-intro)
- [x] `data/curriculum.ts` → tách `curriculum-152.ts` + tạo `curriculum-135.ts` ✅ (26/8: cấu trúc
      3 thành phần I/II/III 7 khối, cốt lõi 23 TC, 5 mô đun + cửa ngõ, 3 Dự án, tốt nghiệp 2 phương án,
      tải 8 kỳ — theo skill `bcse-khung-135tc`; curriculum.ts thành hub re-export + types + phần chung).
- [x] `data/stats.ts` — stat hero → 135 "(từ khóa 2026)" ✅ (26/8)
- [x] `lib/i18n.tsx` — `hero.bullets` + `curriculum.subtitle` ×3 thứ tiếng ghi cả 2 khung; thêm 12 khóa
      mới `curriculum.fw*/core135/modules135*/gateway/projects135/grad135/plan135` ×3 ✅ (26/8)
- [x] `app/contact/Content.tsx` — "135 tín chỉ từ khóa 2026 (khóa cũ 152 TC)" ✅ (26/8)
- [x] `app/curriculum/` — toggle 2 khung (mặc định Khung 2026; khung 152 giữ nguyên board 4 năm
      + 5 định hướng cũ; khung 135 render cốt lõi/mô đun/dự án/tốt nghiệp/8 kỳ) ✅ (26/8)
- [x] `data/services.ts` (mô tả sv18 Tracker) — "rà theo khung đúng khóa (152/135)" ✅ (26/8,
      theo quyết định thầy 26/8: tracker chạy khung theo cohort tương ứng)

## Ngoài bcse-intro (làm sau, việc riêng từng app)
- [ ] **sv18 BCSE Tracker**: logic rà 152 TC cần bảng mapping khung 135 cho K2026+ (chọn khung theo `cohort` từ bcse-id). ⚠ Cần xong trước khi K2026 nhập học có dữ liệu điểm. Nguồn: `BANG_TUONG_DUONG_HOC_PHAN.docx` + skill `bcse-khung-135tc`.
- [x] **Skill `bcse-clo-de-cuong`**: ✅ (26/8) sửa 4 chỗ "146" → khung 135 (SKILL.md ×3 + references/po-plo-bcse.md + thang-irm.md), trỏ về 2 skill khung.
- [ ] **bcse-id "Tuần này của bạn"**: mốc học vụ nếu gắn số TC thì phân biệt theo cohort.

## Đầu vào cần từ thầy
1. ✅ (26/8) Chi tiết 2 khung đã có trong skill `bcse-khung-135tc` + `bcse-khung-152tc`.
2. ✅ (26/8) Nguyên tắc hiển thị: 2 khung SONG HÀNH cả landing lẫn Tracker (xem đầu file).
