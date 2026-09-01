'use client';

/**
 * CurriculumFlow152 — Sơ đồ tiến trình BCSE khung HIỆN HÀNH 152 TC.
 *
 * Cùng NGÔN NGỮ THIẾT KẾ với CurriculumFlow (135) của thầy: bảng 8 cột cuộn
 * ngang, thẻ môn viền màu theo khối, section Bắt buộc / Tự chọn / Kỳ hè, hộp
 * tốt nghiệp, legend, nút In/Xuất PDF. KHÁC BIỆT CÓ CHỦ ĐÍCH: dữ liệu 152 hiện
 * chỉ có TÊN môn (chưa có mã / số TC / tiên quyết) — nên thẻ môn ở đây gọn hơn,
 * chỉ hiển thị TÊN + badge KHỐI M1–M5, KHÔNG bịa mã/TC. Khi có dữ liệu 152 đầy
 * đủ (mã+TC+tiên quyết) có thể nâng cấp thẻ ngang chuẩn như bản 135.
 *
 * Bảng màu category + biến khung: tái dùng đúng scope `.cflow` (đồng bộ theme
 * SV08). Component này KHÔNG tự khai báo lại CSS `.cflow` — nó dựa vào việc
 * được render CẠNH hoặc SAU khi CurriculumFlow (135) đã bơm <style> .cflow…?
 * KHÔNG — để độc lập (tab 152 hiển thị riêng), nó tự bơm 1 bản CSS scope
 * `.cflow152` tối giản, cùng token.
 */

import {
  yearBlocks152,
  type YearBlock,
} from '@/data/curriculum';

// ── Phân loại khối M1–M5 theo màu (ánh xạ tinh thần 135: đại cương/toán/cơ sở/
//    cốt lõi/chuyên ngành). 152 chia theo M1–M5; ta gán màu gần nghĩa nhất. ──
type MBlock = 'm1' | 'm2' | 'm3' | 'm4' | 'm5';
const M_META: Record<MBlock, { c: string; bg: string; badge: string }> = {
  m1: { c: 'var(--c-daicuong)', bg: 'var(--c-daicuong-bg)', badge: 'M1' },
  m2: { c: 'var(--c-toan)', bg: 'var(--c-toan-bg)', badge: 'M2' },
  m3: { c: 'var(--c-coso)', bg: 'var(--c-coso-bg)', badge: 'M3' },
  m4: { c: 'var(--c-nen)', bg: 'var(--c-nen-bg)', badge: 'M4' },
  m5: { c: 'var(--c-se)', bg: 'var(--c-se-bg)', badge: 'M5' },
};

// Năm (0-based) → khối chủ đạo của các HK trong năm đó (theo cấu trúc 152:
// Năm1 = chung/lĩnh vực, Năm2 = khối/nhóm ngành, Năm3–4 = ngành).
const YEAR_BLOCK: MBlock[] = ['m1', 'm3', 'm5', 'm5'];

// Một số học phần lý luận chính trị / ngoại ngữ luôn thuộc M1 dù ở năm 2–4.
const M1_KEYWORDS = [
  'Mác', 'Lênin', 'xã hội khoa học', 'Lịch sử Đảng', 'Hồ Chí Minh',
  'Tiếng Anh', 'Tiếng Nhật', 'Phương pháp luận',
];
function blockFor(name: string, yearIdx: number): MBlock {
  if (M1_KEYWORDS.some((k) => name.includes(k))) return 'm1';
  return YEAR_BLOCK[yearIdx] ?? 'm5';
}

const CSS = `
.cflow152 {
  --surface: rgb(var(--surface));
  --ink: rgb(var(--ink));
  --ink-soft: rgb(var(--ink-5));
  --line: rgb(var(--line) / 0.14);
  --line-soft: rgb(var(--line) / 0.08);
  --accent: #6E97FF;
  --shadow: 0 1px 2px rgba(0,0,0,.3), 0 2px 8px rgba(0,0,0,.25);
  --grad: #6D28D9; --grad-bg: #F3EEFC;
  --summer: #C62828;
  /* khối M — LIGHT defaults (khớp bản 135) */
  --c-daicuong: #6B7A99; --c-daicuong-bg: #EEF1F6;
  --c-toan: #0891B2; --c-toan-bg: #E0F5FB;
  --c-coso: #3B7A8C; --c-coso-bg: #E4F0F2;
  --c-nen: #2B5CE6; --c-nen-bg: #E5ECFD;
  --c-se: #7A56B8; --c-se-bg: #EEE7F8;
  color: var(--ink); line-height: 1.5;
}
.cflow152 * { box-sizing: border-box; }
:root:not([data-theme="light"]) .cflow152,
:root[data-theme="dark"] .cflow152 {
  --accent: #6E97FF; --grad: #B79CF5; --grad-bg: #241A40;
  --c-daicuong: #9AA6BE; --c-daicuong-bg: #212a38;
  --c-toan: #5CC5DE; --c-toan-bg: #0C2A36;
  --c-coso: #6BB6C7; --c-coso-bg: #1a2e33;
  --c-nen: #6E97FF; --c-nen-bg: #1a2540;
  --c-se: #A98FE0; --c-se-bg: #241d33;
}
:root[data-theme="light"] .cflow152 {
  --accent: #2B5CE6; --grad: #6D28D9; --grad-bg: #F3EEFC;
  --c-daicuong: #6B7A99; --c-daicuong-bg: #EEF1F6;
  --c-toan: #0891B2; --c-toan-bg: #E0F5FB;
  --c-coso: #3B7A8C; --c-coso-bg: #E4F0F2;
  --c-nen: #2B5CE6; --c-nen-bg: #E5ECFD;
  --c-se: #7A56B8; --c-se-bg: #EEE7F8;
}

.cflow152 .cf-header { border-bottom: 2px solid var(--ink); padding-bottom: 18px; margin-bottom: 8px; }
.cflow152 .cf-eyebrow { font-size: 12px; letter-spacing: .11em; text-transform: uppercase; color: var(--accent); font-weight: 700; margin: 0 0 6px; }
.cflow152 .cf-h1 { font-size: clamp(22px, 3vw, 30px); margin: 0 0 6px; letter-spacing: -.01em; }
.cflow152 .cf-sub { color: var(--ink-soft); font-size: 15px; margin: 0; }
.cflow152 .cf-meta { display: flex; flex-wrap: wrap; gap: 8px 22px; margin-top: 14px; font-size: 13px; color: var(--ink-soft); }
.cflow152 .cf-meta b { color: var(--ink); font-variant-numeric: tabular-nums; }

.cflow152 .cf-toolbar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin: 20px 0; }
.cflow152 button.cf-tool { font: inherit; font-size: 13px; font-weight: 600; color: var(--ink); background: var(--surface);
  border: 1px solid var(--line); border-radius: 7px; padding: 7px 13px; cursor: pointer; transition: border-color .15s; }
.cflow152 button.cf-tool:hover { border-color: var(--accent); }

.cflow152 .cf-legend { display: flex; flex-wrap: wrap; gap: 8px 16px; margin: 4px 0 26px; font-size: 12.5px; }
.cflow152 .cf-lg { display: inline-flex; align-items: center; gap: 7px; color: var(--ink-soft); }
.cflow152 .cf-sw { width: 13px; height: 13px; border-radius: 3px; flex: none; border: 1px solid rgba(0,0,0,.12); }

.cflow152 .cf-board-scroll { overflow-x: auto; padding-bottom: 8px; }
.cflow152 .cf-board { display: grid; grid-template-columns: repeat(8, minmax(150px, 1fr)); gap: 12px; min-width: 1360px; }
.cflow152 .cf-term { display: flex; flex-direction: column; gap: 9px; }
.cflow152 .cf-term-head { position: sticky; top: 0; text-align: center; padding: 8px 6px; border-radius: 8px;
  background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow); z-index: 2; }
.cflow152 .cf-term-head .yr { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-soft); }
.cflow152 .cf-term-head .hk { font-size: 15px; font-weight: 700; color: var(--ink); }
.cflow152 .cf-term-head .tc { font-size: 11px; color: var(--ink-soft); margin-top: 2px; }

.cflow152 .cf-course { position: relative; background: var(--surface); border: 1px solid var(--line);
  border-left: 4px solid var(--kc, var(--line)); border-radius: 8px; padding: 6px 9px 7px;
  box-shadow: var(--shadow); transition: transform .12s, box-shadow .12s; display: flex;
  justify-content: space-between; align-items: flex-start; gap: 6px; }
.cflow152 .cf-course:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,.35); }
.cflow152 .cf-course .name { font-size: 12px; line-height: 1.3; color: var(--ink); }
.cflow152 .cf-badge { font-size: 9px; font-weight: 700; letter-spacing: .04em; padding: 2px 6px;
  border-radius: 4px; background: var(--kbg, var(--line-soft)); color: var(--kc, var(--ink-soft)); flex: none; }

.cflow152 .cf-sec-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; padding: 4px 8px; border-radius: 5px; margin-top: 4px; }
.cflow152 .cf-sec-req { background: var(--c-nen); color: #fff; }
.cflow152 .cf-sec-opt { background: transparent; color: var(--c-coso); border: 1px dashed var(--c-coso); margin-top: 10px; }
.cflow152 .cf-sec-summer { background: var(--summer); color: #fff; margin-top: 8px; }

.cflow152 .cf-opt-group { background: var(--c-coso-bg); border: 1px dashed var(--line); border-left: 3px solid var(--c-coso); border-radius: 7px; padding: 6px 9px; }
.cflow152 .cf-opt-item { font-size: 11.5px; color: var(--ink); padding: 1px 0; line-height: 1.35; }

.cflow152 .cf-note-inline { font-size: 10.5px; color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); border-radius: 6px; padding: 4px 7px; margin-top: 4px; line-height: 1.35; }

.cflow152 .cf-grad-box { border: 1.5px solid var(--grad); background: var(--grad-bg); border-radius: 9px; padding: 8px 10px 10px; margin-top: 4px; }
.cflow152 .cf-grad-box .gh { font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; color: var(--grad); margin-bottom: 5px; }
.cflow152 .cf-grad-box .gn { font-size: 12px; color: var(--ink); line-height: 1.3; }

.cflow152 .cf-footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid var(--line); font-size: 12px; color: var(--ink-soft); line-height: 1.5; }
.cflow152 .cf-footer b { color: var(--ink); }

@media print {
  .cflow152 .cf-toolbar { display: none; }
  .cflow152 .cf-board { min-width: 0; }
  .cflow152 .cf-course, .cflow152 .cf-term-head { box-shadow: none; }
}
@media (prefers-reduced-motion: reduce) { .cflow152 * { transition: none !important; } }
`;

function CourseChip({ name, block }: { name: string; block: MBlock }) {
  const m = M_META[block];
  return (
    <div className="cf-course" style={{ ['--kc' as string]: m.c, ['--kbg' as string]: m.bg }}>
      <span className="name">{name}</span>
      <span className="cf-badge">{m.badge}</span>
    </div>
  );
}

type FlatSem = {
  yr: string;
  hk: string;
  yearIdx: number;
  required: string[];
  elective: string[];
  note?: string;
  isGrad: boolean;
};

function flatten(blocks: YearBlock[]): FlatSem[] {
  const out: FlatSem[] = [];
  blocks.forEach((b, yearIdx) => {
    b.semesters.forEach((s) => {
      const isGrad = s.required.some((r) => /Khóa luận/i.test(r));
      out.push({
        yr: `Năm ${b.year}`,
        hk: `Học kỳ ${s.semester}`,
        yearIdx,
        required: s.required,
        elective: s.elective,
        note: s.note,
        isGrad,
      });
    });
  });
  return out;
}

export default function CurriculumFlow152() {
  const sems = flatten(yearBlocks152);

  return (
    <div className="cflow152">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <header className="cf-header">
        <p className="cf-eyebrow">Sơ đồ tiến trình đào tạo · Curriculum Flowchart</p>
        <h1 className="cf-h1">Khoa học và Kỹ thuật Máy tính — BCSE (khung hiện hành)</h1>
        <p className="cf-sub">
          Computer Science and Engineering (Honors Program) · Mã thí điểm 7480204 · Trường Đại học Việt Nhật (VJU), ĐHQGHN
        </p>
        <div className="cf-meta">
          <span>Tổng tín chỉ tích lũy: <b>152</b></span>
          <span>Thời gian: <b>4 năm / 8 học kỳ</b></span>
          <span>Cấu trúc: <b>5 khối M1–M5</b></span>
          <span>Áp dụng: <b>khóa tuyển sinh 2025 trở về trước</b></span>
        </div>
      </header>

      <div className="cf-toolbar">
        <button className="cf-tool" type="button" onClick={() => window.print()}>
          ⎙ In / Xuất PDF
        </button>
      </div>

      <div className="cf-legend" aria-label="Chú giải khối kiến thức">
        <span className="cf-lg"><span className="cf-sw" style={{ background: 'var(--c-daicuong)' }} /> M1 · Kiến thức chung</span>
        <span className="cf-lg"><span className="cf-sw" style={{ background: 'var(--c-toan)' }} /> M2 · Theo lĩnh vực</span>
        <span className="cf-lg"><span className="cf-sw" style={{ background: 'var(--c-coso)' }} /> M3 · Theo khối ngành</span>
        <span className="cf-lg"><span className="cf-sw" style={{ background: 'var(--c-nen)' }} /> M4 · Theo nhóm ngành</span>
        <span className="cf-lg"><span className="cf-sw" style={{ background: 'var(--c-se)' }} /> M5 · Kiến thức ngành</span>
        <span className="cf-lg"><span className="cf-sw" style={{ background: 'var(--grad)' }} /> Khóa luận tốt nghiệp</span>
        <span className="cf-lg"><span className="cf-sw" style={{ background: 'var(--summer)' }} /> Thực tập (kỳ hè)</span>
      </div>

      <div className="cf-board-scroll">
        <div className="cf-board">
          {sems.map((s, i) => (
            <div className="cf-term" key={i}>
              <div className="cf-term-head">
                <div className="yr">{s.yr}</div>
                <div className="hk">{s.hk}</div>
                <div className="tc">
                  {s.isGrad ? 'Tốt nghiệp' : s.required.length > 0 ? `${s.required.length} HP bắt buộc` : 'Chuyên ngành'}
                </div>
              </div>

              {s.required.length > 0 && !s.isGrad && (
                <>
                  <div className="cf-sec-label cf-sec-req">Bắt buộc</div>
                  {s.required.map((name, j) => (
                    <CourseChip name={name} block={blockFor(name, s.yearIdx)} key={j} />
                  ))}
                </>
              )}

              {s.isGrad && (
                <div className="cf-grad-box">
                  <div className="gh">Tốt nghiệp · 10 TC</div>
                  <div className="gn">Khóa luận tốt nghiệp</div>
                </div>
              )}

              {s.elective.length > 0 && (
                <>
                  <div className="cf-sec-label cf-sec-opt">Tự chọn</div>
                  <div className="cf-opt-group">
                    {s.elective.map((e, j) => (
                      <div className="cf-opt-item" key={j}>{e}</div>
                    ))}
                  </div>
                </>
              )}

              {s.note && <div className="cf-note-inline">{s.note}</div>}

              {/* Kỳ hè sau HK6: thực tập nghề nghiệp (152 ghi trong note HK6) */}
              {s.hk === 'Học kỳ 6' && (
                <>
                  <div className="cf-sec-label cf-sec-summer">☀ Kỳ hè (sau HK6)</div>
                  <div className="cf-course" style={{ ['--kc' as string]: 'var(--summer)', ['--kbg' as string]: 'color-mix(in srgb, var(--summer) 18%, transparent)' }}>
                    <span className="name">Thực tập nghề nghiệp + Thực hành hướng nghiệp</span>
                    <span className="cf-badge" style={{ background: 'var(--summer)', color: '#fff' }}>KỲ HÈ</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="cf-footer">
        Khung <b>hiện hành 152 TC</b> (mã thí điểm 7480204) — áp dụng cho các khóa tuyển sinh <b>2025 trở về trước</b>.
        Sơ đồ hiển thị <b>tên học phần theo học kỳ</b>; mã học phần, số tín chỉ chi tiết và điều kiện tiên quyết xem trong
        Quyển Khung chương trình. Học phần tự chọn hiển thị đại diện theo định hướng. Lộ trình là <b>gợi ý chuẩn</b> —
        sinh viên điều chỉnh theo tư vấn học tập. Khóa 2026 trở đi áp dụng <b>khung điều chỉnh 135 TC</b> (chuyển tab để xem).
      </footer>
    </div>
  );
}
