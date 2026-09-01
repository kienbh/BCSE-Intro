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

import { useRef } from 'react';
import {
  flow152,
  electiveCatalog152,
  type Flow152Course,
  type Flow152Elective,
  type Flow152Term,
  type Flow152Color,
} from '@/data/curriculum-152';

export interface CreditBlock {
  code: string;
  name: string;
  credits: number;
  reqCredits?: number;
  optCredits?: number;
  detail?: string;
}

/** Một định hướng chuyên ngành (rổ đầy đủ: lộ trình môn theo kỳ, cốt lõi ★). */
export interface Flow152Direction {
  group: string;
  nameEN?: string;
  desc?: string;
  careers?: string[];
  color?: Flow152Color;
  items: { code?: string; name: string; credits?: number; semester?: string; star?: boolean; type: 'required' | 'elective' | 'practice' }[];
}
interface Props {
  creditBlocks?: CreditBlock[];
  totalCredits?: number;
  /** Nếu truyền, mục "5 Định hướng chuyên ngành" dùng dữ liệu này (rổ đầy đủ). */
  directions?: Flow152Direction[];
}

function printFlow(root: HTMLElement | null) {
  if (!root) {
    window.print();
    return;
  }
  const body = document.body;
  root.classList.add('cf-printing');
  body.classList.add('cflow-printing');
  const cleanup = () => {
    root.classList.remove('cf-printing');
    body.classList.remove('cflow-printing');
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  window.print();
  setTimeout(cleanup, 1500);
}

// ── Phân loại khối M1–M5 theo màu (khối lấy trực tiếp từ dữ liệu flow152). ──
type MBlock = 'M1' | 'M2' | 'M3' | 'M4' | 'M5';
const M_META: Record<MBlock, { c: string; bg: string; badge: string }> = {
  M1: { c: 'var(--c-daicuong)', bg: 'var(--c-daicuong-bg)', badge: 'M1' },
  M2: { c: 'var(--c-toan)', bg: 'var(--c-toan-bg)', badge: 'M2' },
  M3: { c: 'var(--c-coso)', bg: 'var(--c-coso-bg)', badge: 'M3' },
  M4: { c: 'var(--c-nen)', bg: 'var(--c-nen-bg)', badge: 'M4' },
  M5: { c: 'var(--c-se)', bg: 'var(--c-se-bg)', badge: 'M5' },
};

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
  --cc-req: #167C4A; --cc-opt: #B45309;
  /* khối M — LIGHT defaults (khớp bản 135) */
  --c-daicuong: #6B7A99; --c-daicuong-bg: #EEF1F6;
  --c-toan: #0891B2; --c-toan-bg: #E0F5FB;
  --c-coso: #3B7A8C; --c-coso-bg: #E4F0F2;
  --c-nen: #2B5CE6; --c-nen-bg: #E5ECFD;
  --c-se: #7A56B8; --c-se-bg: #EEE7F8;
  /* 5 mô đun định hướng — khớp bảng màu bản 135 */
  --c-ai: #C0392B; --c-ai-bg: #FBE9E7;
  --c-iot: #2E8B57; --c-iot-bg: #E4F3EA;
  --c-ic: #B8860B; --c-ic-bg: #F7EFDA;
  --c-fintech: #1F7A8C; --c-fintech-bg: #E0F0F3;
  color: var(--ink); line-height: 1.5;
}
.cflow152 * { box-sizing: border-box; }
:root:not([data-theme="light"]) .cflow152,
:root[data-theme="dark"] .cflow152 {
  --accent: #6E97FF; --grad: #B79CF5; --grad-bg: #241A40;
  --cc-req: #52D191; --cc-opt: #F0A868;
  --c-daicuong: #9AA6BE; --c-daicuong-bg: #212a38;
  --c-toan: #5CC5DE; --c-toan-bg: #0C2A36;
  --c-coso: #6BB6C7; --c-coso-bg: #1a2e33;
  --c-nen: #6E97FF; --c-nen-bg: #1a2540;
  --c-se: #A98FE0; --c-se-bg: #241d33;
  --c-ai: #E8756A; --c-ai-bg: #331d1a;
  --c-iot: #5FBE86; --c-iot-bg: #172d20;
  --c-ic: #D6A94A; --c-ic-bg: #2d2510;
  --c-fintech: #56AEC0; --c-fintech-bg: #16292d;
}
:root[data-theme="light"] .cflow152 {
  --accent: #2B5CE6; --grad: #6D28D9; --grad-bg: #F3EEFC;
  --cc-req: #167C4A; --cc-opt: #B45309;
  --c-daicuong: #6B7A99; --c-daicuong-bg: #EEF1F6;
  --c-toan: #0891B2; --c-toan-bg: #E0F5FB;
  --c-coso: #3B7A8C; --c-coso-bg: #E4F0F2;
  --c-nen: #2B5CE6; --c-nen-bg: #E5ECFD;
  --c-se: #7A56B8; --c-se-bg: #EEE7F8;
  --c-ai: #C0392B; --c-ai-bg: #FBE9E7;
  --c-iot: #2E8B57; --c-iot-bg: #E4F3EA;
  --c-ic: #B8860B; --c-ic-bg: #F7EFDA;
  --c-fintech: #1F7A8C; --c-fintech-bg: #E0F0F3;
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
.cflow152 .cf-board { display: grid; grid-template-columns: repeat(8, minmax(200px, 1fr)); gap: 14px; min-width: 1720px; }
.cflow152 .cf-term { display: flex; flex-direction: column; gap: 9px; }
.cflow152 .cf-term-head { position: sticky; top: 0; text-align: center; padding: 8px 6px; border-radius: 8px;
  background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow); z-index: 2; }
.cflow152 .cf-term-head .yr { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-soft); }
.cflow152 .cf-term-head .hk { font-size: 15px; font-weight: 700; color: var(--ink); }
.cflow152 .cf-term-head .tc { font-size: 11px; color: var(--ink-soft); margin-top: 2px; }

.cflow152 .cf-course { position: relative; background: var(--surface); border: 1px solid var(--line);
  border-left: 4px solid var(--kc, var(--line)); border-radius: 8px; padding: 8px 11px 9px;
  box-shadow: var(--shadow); transition: transform .12s, box-shadow .12s; display: flex;
  flex-direction: column; gap: 3px; }
.cflow152 .cf-course:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,.35); }
.cflow152 .cf-course .code { font-size: 10.5px; font-weight: 700; letter-spacing: .04em;
  font-variant-numeric: tabular-nums; color: var(--kc, var(--accent)); }
.cflow152 .cf-course .name { font-size: 12.5px; line-height: 1.32; color: var(--ink); font-weight: 500; }
.cflow152 .cf-course .foot { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-top: 2px; }
.cflow152 .cf-course .tc { font-size: 10.5px; font-weight: 700; color: var(--ink-soft); font-variant-numeric: tabular-nums; }
.cflow152 .cf-course .pre { font-size: 9.5px; color: var(--ink-soft); line-height: 1.3; margin-top: 1px; }
.cflow152 .cf-course .pre b { color: var(--kc, var(--accent)); font-variant-numeric: tabular-nums; font-weight: 700; }
.cflow152 .cf-badge { font-size: 9px; font-weight: 700; letter-spacing: .04em; padding: 2px 6px;
  border-radius: 4px; background: var(--kbg, var(--line-soft)); color: var(--kc, var(--ink-soft)); flex: none; }

.cflow152 .cf-sec-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; padding: 4px 8px; border-radius: 5px; margin-top: 4px; }
.cflow152 .cf-sec-req { background: var(--c-nen); color: #fff; }
.cflow152 .cf-sec-opt { background: transparent; color: var(--c-coso); border: 1px dashed var(--c-coso); margin-top: 10px; }
.cflow152 .cf-sec-summer { background: var(--summer); color: #fff; margin-top: 8px; }
.cflow152 .cf-cond { margin-top: 8px; padding: 6px 9px; border: 1px dashed var(--line); border-radius: 7px; background: var(--surface); font-size: 10.5px; color: var(--ink-soft); line-height: 1.4; }
.cflow152 .cf-cond-lb { display: block; font-family: "IBM Plex Mono", monospace; font-size: 9px; letter-spacing: .06em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 2px; }

.cflow152 .cf-opt-group { background: var(--c-coso-bg); border: 1px dashed var(--line); border-left: 3px solid var(--c-coso); border-radius: 7px; padding: 7px 10px 8px; }
.cflow152 .cf-opt-group + .cf-opt-group { margin-top: 7px; }
.cflow152 .cf-opt-gtitle { font-size: 10.5px; font-weight: 800; letter-spacing: .02em; color: var(--c-coso); margin-bottom: 5px; }
.cflow152 .cf-opt-gnote { font-size: 9.5px; font-weight: 500; color: var(--ink-soft); letter-spacing: 0; text-transform: none; }
.cflow152 .cf-opt-item { display: flex; align-items: baseline; gap: 6px; font-size: 11px; color: var(--ink); padding: 2px 0; line-height: 1.32; }
.cflow152 .cf-opt-item .oc { font-size: 9.5px; font-weight: 700; letter-spacing: .03em; font-variant-numeric: tabular-nums; color: var(--c-coso); flex: none; min-width: 52px; }
.cflow152 .cf-opt-item .on { flex: 1; }
.cflow152 .cf-opt-item .ot { font-size: 9.5px; font-weight: 700; color: var(--ink-soft); font-variant-numeric: tabular-nums; flex: none; }

.cflow152 .cf-note-inline { font-size: 10.5px; color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); border-radius: 6px; padding: 4px 7px; margin-top: 4px; line-height: 1.35; }

/* Con trỏ gọn tự chọn trong cột kỳ (không lặp danh mục) */
.cflow152 .cf-opt-hint { font-size: 10.5px; color: var(--c-coso); background: var(--c-coso-bg);
  border: 1px dashed var(--c-coso); border-radius: 7px; padding: 6px 9px; line-height: 1.4; }
.cflow152 .cf-opt-hint b { color: var(--c-coso); font-weight: 800; display: block; margin-bottom: 2px; }
.cflow152 .cf-opt-hint span { color: var(--ink-soft); font-size: 9.5px; }

/* Danh mục tự chọn theo định hướng — hiển thị MỘT LẦN dưới bảng */
.cflow152 .cf-catalog { margin-top: 34px; }
.cflow152 .cf-catalog > h3 { font-size: 16px; margin: 0 0 4px; letter-spacing: -.01em; color: var(--ink); }
.cflow152 .cf-catalog > .lead { font-size: 12.5px; color: var(--ink-soft); margin: 0 0 16px; line-height: 1.55; }
.cflow152 .cf-cat-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
@media (max-width: 1100px) { .cflow152 .cf-cat-grid { grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); } }
.cflow152 .cf-cat-col { background: var(--surface); border: 1px solid var(--line); border-top: 4px solid var(--cat, var(--c-se)); border-radius: 10px; padding: 0 0 12px; box-shadow: var(--shadow); overflow: hidden; }
.cflow152 .cf-cat-col h4 { font-size: 12.5px; font-weight: 800; color: var(--cat, var(--c-se)); margin: 0; padding: 10px 13px 9px; letter-spacing: .01em; background: var(--cat-bg, var(--c-se-bg)); border-bottom: 1px solid var(--line-soft); }
.cflow152 .cf-cat-note { font-size: 10.5px; color: var(--ink-soft); margin: 8px 13px 4px; line-height: 1.4; }
/* Chú giải loại học phần + sao cốt lõi */
.cflow152 .cf-cat-legend { display: flex; flex-wrap: wrap; gap: 8px 16px; margin: 0 0 14px; font-size: 11.5px; color: var(--ink-soft); }
.cflow152 .cf-cat-legend .lg { display: inline-flex; align-items: center; gap: 6px; }
.cflow152 .cf-cat-legend .dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.cflow152 .cf-cat-legend .star, .cflow152 .cf-cat-item .star { color: #E8A93A; font-weight: 700; }
.cflow152 .dot.req, .cflow152 .cf-cat-item.t-required .dot { background: #8B7CD8; }
.cflow152 .dot.opt, .cflow152 .cf-cat-item.t-elective .dot { background: #3FB984; }
.cflow152 .dot.prac, .cflow152 .cf-cat-item.t-practice .dot { background: #E36A88; }
.cflow152 .cf-cat-en { font-family: "IBM Plex Mono", monospace; font-size: 10px; color: var(--cat, var(--c-se)); padding: 5px 13px 0; }
.cflow152 .cf-cat-careers { display: flex; flex-wrap: wrap; gap: 4px; padding: 7px 13px 3px; }
.cflow152 .cf-cat-careers .chip { font-size: 9px; padding: 1px 7px; border-radius: 999px; background: color-mix(in srgb, var(--cat, var(--c-se)) 12%, transparent); color: var(--cat, var(--c-se)); font-weight: 600; }
.cflow152 .cf-cat-list { margin-top: 7px; }
.cflow152 .cf-cat-item { display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 6px; font-size: 11.5px; color: var(--ink); padding: 4px 13px; line-height: 1.35; border-top: 1px solid var(--line-soft); }
.cflow152 .cf-cat-item:first-child { border-top: none; }
.cflow152 .cf-cat-item .dot { width: 6px; height: 6px; border-radius: 50%; flex: none; position: relative; top: 4px; }
.cflow152 .cf-cat-item .oc { font-family: "IBM Plex Mono", monospace; font-size: 9.5px; font-weight: 700; letter-spacing: .02em; color: var(--cat, var(--c-se)); flex: none; }
.cflow152 .cf-cat-item .on { flex: 1 1 55%; min-width: 0; }
.cflow152 .cf-cat-item .tc2 { font-family: "IBM Plex Mono", monospace; font-size: 9.5px; font-weight: 700; color: var(--ink); flex: none; }
.cflow152 .cf-cat-item .sem { font-family: "IBM Plex Mono", monospace; font-size: 9px; color: var(--ink-soft); flex: none; white-space: nowrap; }

.cflow152 .cf-grad-box { border: 1.5px solid var(--grad); background: var(--grad-bg); border-radius: 9px; padding: 8px 10px 10px; margin-top: 4px; }
.cflow152 .cf-grad-box .gh { font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; color: var(--grad); margin-bottom: 5px; }
.cflow152 .cf-grad-box .gn { font-size: 12px; color: var(--ink); line-height: 1.3; }

.cflow152 .cf-footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid var(--line); font-size: 12px; color: var(--ink-soft); line-height: 1.5; }
.cflow152 .cf-footer b { color: var(--ink); }

/* ── Hộp tích lũy tín chỉ theo khối (đóng khung rõ ràng cho SV) ─────────── */
.cflow152 .cf-credits { border: 1.5px solid var(--accent); border-radius: 11px; padding: 12px 14px 13px;
  margin: 18px 0 26px; background: color-mix(in srgb, var(--accent) 5%, var(--surface)); box-shadow: var(--shadow); }
.cflow152 .cf-credits .cc-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em;
  color: var(--accent); margin: 0 0 10px; display: flex; align-items: baseline; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.cflow152 .cf-credits .cc-total { font-size: 12px; font-weight: 700; color: var(--ink-soft); letter-spacing: 0; text-transform: none; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.cflow152 .cf-credits .cc-total .cc-tot-n { color: var(--ink); font-weight: 800; }
.cflow152 .cf-credits .cc-total .cc-tot-n b { color: var(--accent); font-size: 15px; font-variant-numeric: tabular-nums; }
.cflow152 .cf-credits .cc-key { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; }
.cflow152 .cf-credits .cc-key .kdot { width: 11px; height: 11px; border-radius: 3px; flex: none; }
.cflow152 .cf-credits .cc-key.req { color: var(--cc-req); }
.cflow152 .cf-credits .cc-key.req .kdot { background: var(--cc-req); }
.cflow152 .cf-credits .cc-key.opt { color: var(--cc-opt); }
.cflow152 .cf-credits .cc-key.opt .kdot { border: 1px dashed var(--cc-opt); background: transparent; }
.cflow152 .cf-cc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 8px; }
.cflow152 .cf-cc-cell { border: 1px solid var(--line); border-left: 4px solid var(--accent); border-radius: 8px;
  padding: 7px 10px 8px; background: var(--surface); }
.cflow152 .cf-cc-cell .cc-code { font-size: 10px; font-weight: 700; letter-spacing: .04em; color: var(--accent); font-variant-numeric: tabular-nums; display: flex; align-items: baseline; justify-content: space-between; gap: 6px; }
.cflow152 .cf-cc-cell .cc-code .cc-tot { font-size: 15px; font-weight: 800; color: var(--ink); }
.cflow152 .cf-cc-cell .cc-code .cc-tot small { font-size: 9px; font-weight: 600; color: var(--ink-soft); }
.cflow152 .cf-cc-cell .cc-name { font-size: 11px; font-weight: 600; color: var(--ink); margin-top: 2px; line-height: 1.25; }
.cflow152 .cf-cc-cell .cc-split { display: flex; gap: 5px; margin-top: 6px; }
.cflow152 .cf-cc-cell .cc-pill { flex: 1; border-radius: 6px; padding: 3px 6px; text-align: center; line-height: 1.1; }
.cflow152 .cf-cc-cell .cc-pill .pn { font-size: 14px; font-weight: 800; font-variant-numeric: tabular-nums; display: block; }
.cflow152 .cf-cc-cell .cc-pill .pl { font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }
.cflow152 .cf-cc-cell .cc-pill.req { background: color-mix(in srgb, var(--cc-req) 16%, transparent); color: var(--cc-req); }
.cflow152 .cf-cc-cell .cc-pill.opt { background: transparent; color: var(--cc-opt); border: 1px dashed var(--cc-opt); }
.cflow152 .cf-cc-cell .cc-detail { font-size: 9px; color: var(--ink-soft); margin-top: 5px; line-height: 1.3; }

/* ── IN / XUẤT PDF — 4 kỳ / trang, A4 ngang ──────────────────────────── */
@media print {
  /* CHỐNG TRANG TRẮNG THỪA: visibility:hidden vẫn chiếm chiều cao -> mọi phần
     KHÔNG chứa sơ đồ đang in đều display:none để chiều cao tài liệu co lại.
     Dùng :has() ẩn các nhánh không phải tổ tiên của .cf-printing. */
  body.cflow-printing *:not(:has(.cflow152.cf-printing)):not(.cflow152.cf-printing):not(.cflow152.cf-printing *) {
    display: none !important;
  }
  body.cflow-printing,
  body.cflow-printing :has(.cflow152.cf-printing) {
    display: block !important; height: auto !important; min-height: 0 !important;
    margin: 0 !important; padding: 0 !important; background: #fff !important;
  }
  body.cflow-printing .cflow152.cf-printing {
    position: static !important; width: 100% !important;
    padding: 0 !important; margin: 0 !important; background: #fff !important;
  }
}
@page { size: A4 landscape; margin: 7mm; }

@media print {
  .cflow152.cf-printing { color: #000 !important; }
  .cflow152.cf-printing .cf-toolbar { display: none !important; }
  .cflow152.cf-printing .cf-header { border-color: #000; padding-bottom: 8px; margin-bottom: 6px; }
  .cflow152.cf-printing .cf-h1 { font-size: 17px; }
  .cflow152.cf-printing .cf-sub { font-size: 11px; }
  .cflow152.cf-printing .cf-meta { font-size: 10px; margin-top: 6px; gap: 4px 14px; }
  .cflow152.cf-printing .cf-legend { font-size: 9px; gap: 4px 10px; margin: 4px 0 8px; }

  .cflow152.cf-printing .cf-credits { border-color: #444; background: #fff; box-shadow: none; margin: 8px 0 10px; break-inside: avoid; }
  .cflow152.cf-printing .cf-cc-cell { border-color: #999; background: #fff; box-shadow: none; }

  .cflow152.cf-printing .cf-board-scroll { overflow: visible !important; }
  .cflow152.cf-printing .cf-board {
    display: grid !important; grid-template-columns: repeat(4, 1fr) !important;
    min-width: 0 !important; width: 100% !important; gap: 7px !important; align-items: start;
  }
  .cflow152.cf-printing .cf-term:nth-child(5) { break-before: page; }
  .cflow152.cf-printing .cf-term { break-inside: avoid; }
  .cflow152.cf-printing .cf-course, .cflow152.cf-printing .cf-term-head { box-shadow: none !important; }
  .cflow152.cf-printing .cf-course { break-inside: avoid; }
  .cflow152.cf-printing .cf-term-head { position: static !important; }
  .cflow152.cf-printing .cf-catalog { break-before: page; }
  .cflow152.cf-printing .cf-cat-col { break-inside: avoid; box-shadow: none; }
}
@media (prefers-reduced-motion: reduce) { .cflow152 * { transition: none !important; } }
`;

function CourseChip({ course }: { course: Flow152Course }) {
  const m = M_META[course.block];
  return (
    <div className="cf-course" style={{ ['--kc' as string]: m.c, ['--kbg' as string]: m.bg }}>
      <span className="code">{course.code}</span>
      <span className="name">{course.name}</span>
      <div className="foot">
        <span className="tc">{course.credits} TC</span>
        <span className="cf-badge">{m.badge}</span>
      </div>
      {course.pre && (
        <div className="pre">Tiên quyết: <b>{course.pre}</b></div>
      )}
    </div>
  );
}

function ElectiveGroup({ el }: { el: Flow152Elective }) {
  return (
    <div className="cf-opt-group">
      <div className="cf-opt-gtitle">
        {el.group}
        {el.note && <span className="cf-opt-gnote"> · {el.note}</span>}
      </div>
      {el.items.map((it, j) => (
        <div className="cf-opt-item" key={j}>
          {it.code && <span className="oc">{it.code}</span>}
          <span className="on">{it.name}</span>
          {it.credits != null && <span className="ot">{it.credits}</span>}
        </div>
      ))}
    </div>
  );
}

function CreditBox({ blocks, total }: { blocks: CreditBlock[]; total?: number }) {
  const sumReq = blocks.reduce((s, b) => s + (b.reqCredits ?? 0), 0);
  const sumOpt = blocks.reduce((s, b) => s + (b.optCredits ?? 0), 0);
  const hasSplit = blocks.some((b) => b.reqCredits != null || b.optCredits != null);
  return (
    <div className="cf-credits">
      <p className="cc-title">
        <span>Tích lũy tín chỉ theo khối học phần</span>
        <span className="cc-total">
          <span className="cc-tot-n">
            Tổng: <b>{total}</b> TC
          </span>
          {hasSplit && (
            <>
              <span className="cc-key req">
                <span className="kdot" /> Bắt buộc {sumReq}
              </span>
              <span className="cc-key opt">
                <span className="kdot" /> Tự chọn {sumOpt}
              </span>
            </>
          )}
        </span>
      </p>
      <div className="cf-cc-grid">
        {blocks.map((b) => {
          const req = b.reqCredits ?? 0;
          const opt = b.optCredits ?? 0;
          return (
            <div className="cf-cc-cell" key={b.code}>
              <div className="cc-code">
                <span>{b.code}</span>
                <span className="cc-tot">
                  {b.credits} <small>TC</small>
                </span>
              </div>
              <div className="cc-name">{b.name}</div>
              {hasSplit && (
                <div className="cc-split">
                  <div className="cc-pill req">
                    <span className="pn">{req}</span>
                    <span className="pl">Bắt buộc</span>
                  </div>
                  <div className="cc-pill opt">
                    <span className="pn">{opt}</span>
                    <span className="pl">Tự chọn</span>
                  </div>
                </div>
              )}
              {b.detail && <div className="cc-detail">{b.detail}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CurriculumFlow152({ creditBlocks, totalCredits, directions }: Props) {
  const sems: Flow152Term[] = flow152;
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div className="cflow152" ref={rootRef}>
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

      {creditBlocks && creditBlocks.length > 0 && (
        <CreditBox blocks={creditBlocks} total={totalCredits} />
      )}

      <div className="cf-toolbar">
        <button className="cf-tool" type="button" onClick={() => printFlow(rootRef.current)}>
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
          {sems.map((s, i) => {
            const reqTC = s.required.reduce((a, c) => a + c.credits, 0);
            return (
            <div className="cf-term" key={i}>
              <div className="cf-term-head">
                <div className="yr">{s.year}</div>
                <div className="hk">{s.hk}</div>
                <div className="tc">
                  {s.grad ? 'Tốt nghiệp' : s.required.length > 0 ? `${s.required.length} HP · ${reqTC} TC bắt buộc` : 'Chuyên ngành (tự chọn)'}
                </div>
              </div>

              {s.required.length > 0 && !s.grad && (
                <>
                  <div className="cf-sec-label cf-sec-req">Bắt buộc</div>
                  {s.required.map((c, j) => (
                    <CourseChip course={c} key={j} />
                  ))}
                </>
              )}

              {s.grad && (
                <div className="cf-grad-box">
                  <div className="gh">Tốt nghiệp · 10 TC</div>
                  <div className="gn">CSE4050 — Khóa luận tốt nghiệp</div>
                </div>
              )}

              {s.electives && s.electives.length > 0 && (
                <>
                  <div className="cf-sec-label cf-sec-opt">Tự chọn</div>
                  {s.electives.map((el, j) =>
                    el.compact ? (
                      // Con trỏ gọn (không lặp lại toàn bộ danh mục trong cột kỳ)
                      <div className="cf-opt-hint" key={j}>
                        <b>{el.group}</b>
                        {el.note && <span> · {el.note}</span>}
                      </div>
                    ) : (
                      <ElectiveGroup el={el} key={j} />
                    )
                  )}
                </>
              )}

              {s.conds && s.conds.length > 0 && (
                <div className="cf-cond">
                  <span className="cf-cond-lb">Điều kiện · không tính TC</span>
                  {s.conds.join(' · ')}
                </div>
              )}

              {s.summer && s.summer.length > 0 && (
                <>
                  <div className="cf-sec-label cf-sec-summer">{s.summerLabel ?? '☀ Kỳ hè'}</div>
                  {s.summer.map((c, j) => (
                    <div
                      key={j}
                      className="cf-course"
                      style={{ ['--kc' as string]: 'var(--summer)', ['--kbg' as string]: 'color-mix(in srgb, var(--summer) 18%, transparent)' }}
                    >
                      <span className="code" style={{ color: 'var(--summer)' }}>{c.code}</span>
                      <span className="name">{c.name}</span>
                      <div className="foot">
                        <span className="tc">{typeof c.credits === 'number' ? `${c.credits} TC` : c.credits}</span>
                        <span className="cf-badge" style={{ background: 'var(--summer)', color: '#fff' }}>KỲ HÈ</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            );
          })}
        </div>
      </div>

      <section className="cf-catalog">
        <h3>5 Định hướng chuyên ngành</h3>
        <p className="lead">
          Sinh viên <b>tham khảo</b> 5 định hướng chuyên ngành dưới đây. <b>Học phần bắt buộc</b> thì mọi
          sinh viên đều phải học theo kế hoạch từng học kỳ; <b>học phần tự chọn</b> thì căn cứ định hướng
          mình chọn để lấy cho phù hợp (đủ <b>21 TC tự chọn ngành</b>).
        </p>
        <div className="cf-cat-legend">
          <span className="lg"><span className="dot req" /> Bắt buộc</span>
          <span className="lg"><span className="dot opt" /> Tự chọn</span>
          <span className="lg"><span className="dot prac" /> Thực tập &amp; Khóa luận</span>
        </div>
        <div className="cf-cat-grid">
          {(directions ?? electiveCatalog152.map((el) => ({
            group: el.group,
            color: el.color,
            items: el.items.map((it) => ({ name: it.code ? `${it.code} ${it.name}` : it.name, type: 'elective' as const })),
          }))).map((d, i) => {
            const cvar = d.color ? (d.color === 'ft' ? 'fintech' : d.color) : null;
            return (
              <div
                className="cf-cat-col"
                key={i}
                style={cvar ? { ['--cat' as string]: `var(--c-${cvar})`, ['--cat-bg' as string]: `var(--c-${cvar}-bg)` } : undefined}
              >
                <h4>{d.group}</h4>
                {'nameEN' in d && d.nameEN && <div className="cf-cat-en">{d.nameEN}</div>}
                {'careers' in d && Array.isArray(d.careers) && d.careers.length > 0 && (
                  <div className="cf-cat-careers">
                    {d.careers.map((c) => (
                      <span className="chip" key={c}>{c}</span>
                    ))}
                  </div>
                )}
                <div className="cf-cat-list">
                  {d.items.map((it, j) => (
                    <div className={`cf-cat-item t-${'type' in it ? it.type : 'elective'}`} key={j}>
                      <span className="dot" />
                      {'code' in it && it.code && <span className="oc">{it.code}</span>}
                      <span className="on">{it.name}</span>
                      {'credits' in it && it.credits != null && <span className="tc2">{it.credits} TC</span>}
                      {'semester' in it && it.semester && <span className="sem">{it.semester}</span>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="cf-footer">
        Khung <b>hiện hành 152 TC</b> (mã thí điểm 7480204) — áp dụng cho các khóa tuyển sinh <b>2025 trở về trước</b>.
        Sơ đồ hiển thị <b>mã học phần, tên, số tín chỉ và khối M1–M5</b>; điều kiện tiên quyết ghi trên thẻ khi có.
        Học phần tự chọn ngành (M5) gom theo <b>5 định hướng</b> (AI &amp; DS, SE, IoT, Vi mạch/IC, Fintech); sinh viên chọn đủ số TC
        tự chọn của từng khối. Lộ trình là <b>gợi ý chuẩn</b> — sinh viên điều chỉnh theo tư vấn học tập.
        Khóa 2026 trở đi áp dụng <b>khung điều chỉnh 135 TC</b> (chuyển tab để xem).
      </footer>
    </div>
  );
}
