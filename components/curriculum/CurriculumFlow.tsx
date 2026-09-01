'use client';

/**
 * CurriculumFlow — Sơ đồ tiến trình BCSE 135 (chuyển thể từ
 * Ke_hoach_hoc_tap_BCSE_135TC.html sang React/Next).
 *
 * Layout tái hiện trung thực bản gốc: bảng 8 cột cuộn ngang, strip đại cương,
 * 5 mô đun (2 cụm), 4 note card, footer. Bảng màu category (--c-*, --gateway,
 * --grad, summer đỏ) được định nghĩa cục bộ trong <style> phạm vi `.cflow` với
 * đúng giá trị light/dark của bản gốc; các biến khung (--surface/--ink/--line…)
 * ánh xạ về token semantic SV08 (rgb(var(--x))) để đồng bộ theme.
 *
 * KHÔNG có nút đổi theme (nav SV08 lo). CÓ nút "⎙ In / Xuất PDF" (window.print).
 */

import { useRef } from 'react';
import {
  KIND,
  BLK,
  terms,
  daicuongGroups,
  branches,
  branchClusters,
  headerContent,
  legendItems,
  stripHeading,
  branchesSection,
  noteCards,
  footerHtml,
  type Term,
  type ReqCourse,
  type OptGroup,
  type SummerCourse,
  type GradBox,
  type BranchKey,
} from '@/data/curriculum-flow';

// ── Scoped CSS: category palette (light/dark exact từ bản gốc) + biến khung
//    ánh xạ về token SV08. Chỉ ảnh hưởng trong .cflow.
const CFLOW_CSS = `
.cflow {
  /* Biến khung — ánh xạ về token semantic SV08 */
  --surface: rgb(var(--surface));
  --surface2: rgb(var(--surface-2));
  --ink: rgb(var(--ink));
  --ink-soft: rgb(var(--ink-5));
  --line: rgb(var(--line) / 0.14);
  --line-soft: rgb(var(--line) / 0.08);
  --accent: #6E97FF;
  --shadow: 0 1px 2px rgba(0,0,0,.3), 0 2px 8px rgba(0,0,0,.25);

  /* Bảng màu category — LIGHT defaults (bản gốc :root) */
  --gateway: #D9772B;
  --c-daicuong: #6B7A99; --c-daicuong-bg: #EEF1F6;
  --c-toan: #0891B2; --c-toan-bg: #E0F5FB;
  --c-coso: #3B7A8C; --c-coso-bg: #E4F0F2;
  --c-nen: #2B5CE6; --c-nen-bg: #E5ECFD;
  --c-se: #7A56B8; --c-se-bg: #EEE7F8;
  --c-ai: #C0392B; --c-ai-bg: #FBE9E7;
  --c-iot: #2E8B57; --c-iot-bg: #E4F3EA;
  --c-ic: #B8860B; --c-ic-bg: #F7EFDA;
  --c-fintech: #1F7A8C; --c-fintech-bg: #E0F0F3;
  --c-totnghiep: #1B2A4A; --c-totnghiep-bg: #E7EAF0;
  --grad: #6D28D9; --grad-bg: #F3EEFC;
  /* BB (bắt buộc) = xanh lá đậm; TC (tự chọn) = cam — LIGHT */
  --cc-req: #167C4A; --cc-opt: #B45309;
}

/* DARK — theo hệ thống (SV08 mặc định dark khi chưa set data-theme) */
:root:not([data-theme="light"]) .cflow {
  --accent: #6E97FF;
  --gateway: #E8985A;
  --c-daicuong: #9AA6BE; --c-daicuong-bg: #212a38;
  --c-toan: #5CC5DE; --c-toan-bg: #0C2A36;
  --c-coso: #6BB6C7; --c-coso-bg: #1a2e33;
  --c-nen: #6E97FF; --c-nen-bg: #1a2540;
  --c-se: #A98FE0; --c-se-bg: #241d33;
  --c-ai: #E8756A; --c-ai-bg: #331d1a;
  --c-iot: #5FBE86; --c-iot-bg: #172d20;
  --c-ic: #D6A94A; --c-ic-bg: #2d2510;
  --c-fintech: #56AEC0; --c-fintech-bg: #16292d;
  --c-totnghiep: #C8D1E0; --c-totnghiep-bg: #202836;
  --grad: #B79CF5; --grad-bg: #241A40;
  --cc-req: #52D191; --cc-opt: #F0A868;
}
/* DARK — data-theme tường minh */
:root[data-theme="dark"] .cflow {
  --accent: #6E97FF;
  --gateway: #E8985A;
  --c-daicuong: #9AA6BE; --c-daicuong-bg: #212a38;
  --c-toan: #5CC5DE; --c-toan-bg: #0C2A36;
  --c-coso: #6BB6C7; --c-coso-bg: #1a2e33;
  --c-nen: #6E97FF; --c-nen-bg: #1a2540;
  --c-se: #A98FE0; --c-se-bg: #241d33;
  --c-ai: #E8756A; --c-ai-bg: #331d1a;
  --c-iot: #5FBE86; --c-iot-bg: #172d20;
  --c-ic: #D6A94A; --c-ic-bg: #2d2510;
  --c-fintech: #56AEC0; --c-fintech-bg: #16292d;
  --c-totnghiep: #C8D1E0; --c-totnghiep-bg: #202836;
  --grad: #B79CF5; --grad-bg: #241A40;
  --cc-req: #52D191; --cc-opt: #F0A868;
}
/* LIGHT — data-theme tường minh (khớp :root[data-theme="light"] bản gốc) */
:root[data-theme="light"] .cflow {
  --accent: #2B5CE6;
  --gateway: #D9772B;
  --c-daicuong: #6B7A99; --c-daicuong-bg: #EEF1F6;
  --c-toan: #0891B2; --c-toan-bg: #E0F5FB;
  --c-coso: #3B7A8C; --c-coso-bg: #E4F0F2;
  --c-nen: #2B5CE6; --c-nen-bg: #E5ECFD;
  --c-se: #7A56B8; --c-se-bg: #EEE7F8;
  --c-ai: #C0392B; --c-ai-bg: #FBE9E7;
  --c-iot: #2E8B57; --c-iot-bg: #E4F3EA;
  --c-ic: #B8860B; --c-ic-bg: #F7EFDA;
  --c-fintech: #1F7A8C; --c-fintech-bg: #E0F0F3;
  --c-totnghiep: #1B2A4A; --c-totnghiep-bg: #E7EAF0;
  --grad: #6D28D9; --grad-bg: #F3EEFC;
  --cc-req: #167C4A; --cc-opt: #B45309;
}

.cflow { color: var(--ink); line-height: 1.5; }
.cflow * { box-sizing: border-box; }

.cflow .cf-header { border-bottom: 2px solid var(--ink); padding-bottom: 18px; margin-bottom: 8px; }
.cflow .cf-eyebrow { font-size: 12px; letter-spacing: .11em; text-transform: uppercase; color: var(--accent); font-weight: 700; margin: 0 0 6px; }
.cflow .cf-h1 { font-size: clamp(22px, 3vw, 30px); margin: 0 0 6px; letter-spacing: -.01em; text-wrap: balance; }
.cflow .cf-sub { color: var(--ink-soft); font-size: 15px; margin: 0; }
.cflow .cf-meta { display: flex; flex-wrap: wrap; gap: 8px 22px; margin-top: 14px; font-size: 13px; color: var(--ink-soft); }
.cflow .cf-meta b { color: var(--ink); font-variant-numeric: tabular-nums; }

.cflow .cf-toolbar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin: 20px 0; }
.cflow button.cf-tool { font: inherit; font-size: 13px; font-weight: 600; color: var(--ink); background: var(--surface);
  border: 1px solid var(--line); border-radius: 7px; padding: 7px 13px; cursor: pointer; transition: border-color .15s, background .15s; }
.cflow button.cf-tool:hover { border-color: var(--accent); }
.cflow button.cf-tool:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.cflow .cf-legend { display: flex; flex-wrap: wrap; gap: 8px 16px; margin: 4px 0 26px; font-size: 12.5px; }
.cflow .cf-lg { display: inline-flex; align-items: center; gap: 7px; color: var(--ink-soft); }
.cflow .cf-sw { width: 13px; height: 13px; border-radius: 3px; flex: none; border: 1px solid rgba(0,0,0,.12); }
.cflow .cf-lg.gate .cf-sw { background: transparent; border: 2px solid var(--gateway); }

.cflow .cf-board-scroll { overflow-x: auto; padding-bottom: 8px; }
.cflow .cf-board { display: grid; grid-template-columns: repeat(8, minmax(155px, 1fr)); gap: 12px; min-width: 1400px; }
.cflow .cf-term { display: flex; flex-direction: column; gap: 10px; }
.cflow .cf-term-head { position: sticky; top: 0; text-align: center; padding: 8px 6px; border-radius: 8px;
  background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow); z-index: 2; }
.cflow .cf-term-head .yr { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-soft); }
.cflow .cf-term-head .hk { font-size: 15px; font-weight: 700; color: var(--ink); }
.cflow .cf-term-head .tc { font-size: 11.5px; color: var(--ink-soft); font-variant-numeric: tabular-nums; margin-top: 2px; }

.cflow .cf-course { position: relative; background: var(--surface); border: 1px solid var(--line);
  border-left: 4px solid var(--kc, var(--line)); border-radius: 8px; padding: 6px 8px 7px;
  box-shadow: var(--shadow); transition: transform .12s, box-shadow .12s, border-color .12s; }
.cflow .cf-course:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,.35); }
.cflow .cf-course .code { font-size: 10.5px; font-weight: 700; letter-spacing: .02em; color: var(--kc, var(--ink)); font-variant-numeric: tabular-nums; }
.cflow .cf-course .name { font-size: 12px; line-height: 1.28; color: var(--ink); margin-top: 1px; }
.cflow .cf-course .foot { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; gap: 6px; }
.cflow .cf-course .foot .tc { font-size: 11px; color: var(--ink-soft); font-variant-numeric: tabular-nums; }
.cflow .cf-badge { font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em;
  padding: 2px 6px; border-radius: 4px; background: var(--kbg, var(--line-soft)); color: var(--kc, var(--ink-soft)); }
.cflow .cf-course.gate { border-color: var(--gateway); box-shadow: 0 0 0 1px var(--gateway) inset, var(--shadow); }
.cflow .cf-course.gate::after { content: "◇ GATEWAY"; position: absolute; top: -8px; right: 8px;
  font-size: 8.5px; font-weight: 700; letter-spacing: .05em; background: var(--gateway); color: #fff; padding: 1px 6px; border-radius: 4px; }
.cflow .cf-course .pre { font-size: 10.5px; color: var(--ink-soft); margin-top: 5px; padding-top: 5px; border-top: 1px dashed var(--line); }
.cflow .cf-course .pre b { color: var(--kc); font-weight: 600; }

.cflow .cf-sec-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; padding: 4px 8px; border-radius: 5px; margin-top: 4px; }
.cflow .cf-sec-req { background: var(--c-nen); color: #fff; }
.cflow .cf-sec-opt { background: transparent; color: var(--c-iot); border: 1px dashed var(--c-iot); margin-top: 10px; }
.cflow .cf-sec-summer { background: #C62828; color: #fff; margin-top: 8px; }
.cflow .cf-course.summer { --kc: #C62828; --kbg: #FBE3E3; border-color: #E39B9B; border-left-color: #C62828; background: #FDECEC; }
:root:not([data-theme="light"]) .cflow .cf-course.summer { --kbg:#3A1414; border-color:#5E2626; background:#2A1414; }
:root[data-theme="dark"] .cflow .cf-course.summer { --kbg:#3A1414; border-color:#5E2626; background:#2A1414; }
.cflow .cf-course.summer .code, .cflow .cf-course.summer .name { color: #C62828; }
:root:not([data-theme="light"]) .cflow .cf-course.summer .code, :root:not([data-theme="light"]) .cflow .cf-course.summer .name { color:#F08E8E; }
:root[data-theme="dark"] .cflow .cf-course.summer .code, :root[data-theme="dark"] .cflow .cf-course.summer .name { color:#F08E8E; }
.cflow .cf-badge.summer-b { background: #C62828; color: #fff; }

.cflow .cf-grad-box { border: 1.5px solid var(--grad); background: var(--grad-bg); border-radius: 9px; padding: 8px 10px 10px; margin-top: 4px; display: flex; flex-direction: column; gap: 7px; }
.cflow .cf-grad-box .gh { font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; color: var(--grad); }
.cflow .cf-grad-box .gh small { display: block; font-weight: 600; font-size: 10px; letter-spacing: 0; text-transform: none; color: var(--ink-soft); margin-top: 2px; }
.cflow .cf-pa { background: var(--surface); border: 1px solid var(--line); border-left: 3px solid var(--grad); border-radius: 7px; padding: 6px 8px; }
.cflow .cf-pa .pa-tag { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; color: #fff; background: var(--grad); padding: 1px 6px; border-radius: 4px; display: inline-block; margin-bottom: 4px; }
.cflow .cf-pa .pa-nm { font-size: 12px; color: var(--ink); line-height: 1.3; margin-top: 1px; }
.cflow .cf-pa .pa-nm b { color: var(--grad); font-weight: 700; font-variant-numeric: tabular-nums; }
.cflow .cf-pa .pa-tc { color: var(--ink-soft); font-variant-numeric: tabular-nums; }
.cflow .cf-pa .pa-cond { font-size: 10.5px; color: var(--ink-soft); margin-top: 4px; }
.cflow .cf-grad-or { text-align: center; font-size: 10px; font-weight: 800; color: var(--grad); letter-spacing: .1em; }
.cflow .cf-grad-rule { font-size: 10.5px; line-height: 1.42; color: var(--ink); background: var(--surface); border: 1px solid var(--line); border-radius: 6px; padding: 5px 8px; display:flex; flex-direction:column; gap:2px; }
.cflow .cf-grad-rule b { color: var(--grad); font-weight: 700; }

.cflow .cf-opt-group { background: var(--c-iot-bg); border: 1px dashed var(--line); border-left: 3px solid var(--c-iot); border-radius: 7px; padding: 6px 9px; }
.cflow .cf-opt-grp-name { font-size: 10.5px; font-weight: 700; color: var(--c-iot); text-transform: uppercase; letter-spacing: .03em; margin-bottom: 3px; }
.cflow .cf-opt-grp-name.gate { color: var(--gateway); }
.cflow .cf-opt-item { display: flex; justify-content: space-between; gap: 6px; font-size: 11.5px; color: var(--ink); padding: 1px 0; }
.cflow .cf-opt-item .opt-tc { color: var(--ink-soft); font-variant-numeric: tabular-nums; white-space: nowrap; }
.cflow .cf-opt-item .mod { color: var(--gateway); font-weight: 700; }

.cflow .cf-tag-req, .cflow .cf-tag-opt { display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; padding: 1px 5px; border-radius: 3px; margin-bottom: 4px; }
.cflow .cf-tag-req { background: var(--c-nen); color: #fff; }
.cflow .cf-tag-opt { background: transparent; color: var(--ink-soft); border: 1px dashed var(--ink-soft); }

.cflow .cf-strip { margin-top: 16px; background: var(--surface); border: 1px dashed var(--line); border-radius: 10px; padding: 14px 16px; box-shadow: var(--shadow); }
.cflow .cf-strip h3 { margin: 0 0 10px; font-size: 12.5px; display: flex; align-items: center; gap: 8px; font-weight: 700; flex-wrap: wrap; }
.cflow .cf-strip h3 span.note { font-weight: 400; color: var(--ink-soft); }
.cflow .cf-dc-scroll { overflow-x: auto; }
.cflow .cf-dc-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
.cflow .cf-dc-col { background: var(--c-daicuong-bg); border: 1px solid var(--line); border-radius: 8px; padding: 8px 10px; }
.cflow .cf-dc-h { font-size: 11.5px; font-weight: 700; color: var(--c-daicuong); text-transform: uppercase; letter-spacing: .02em; margin-bottom: 6px; padding-bottom: 5px; border-bottom: 1px solid var(--line); }
.cflow .cf-dc-i { font-size: 11.5px; color: var(--ink-soft); line-height: 1.5; margin: 2px 0; }
.cflow .cf-dc-i b { color: var(--ink); font-weight: 600; font-variant-numeric: tabular-nums; }
@media (max-width: 1180px){ .cflow .cf-dc-grid { min-width: 960px; } }

.cflow .cf-branches { margin-top: 40px; }
.cflow .cf-branches > h2 { font-size: 18px; margin: 0 0 6px; letter-spacing: -.01em; text-align: center; }
.cflow .cf-branch-scroll { overflow-x: auto; padding-bottom: 6px; }
.cflow .cf-branch-clusters { display: grid; grid-template-columns: 2fr 3fr; gap: 22px; min-width: 1180px; align-items: start; }
.cflow .cf-cluster { min-width: 0; }
.cflow .cf-cluster-title { font-size: 11.5px; font-weight: 800; letter-spacing: .02em; color: #fff; padding: 8px 13px; border-radius: 8px; margin-bottom: 11px; line-height: 1.32; display: flex; align-items: center; justify-content: space-between; gap: 10px; box-shadow: var(--shadow); }
.cflow .cf-cluster-title .ct-badge { font-size: 9px; font-weight: 800; letter-spacing: .05em; background: rgba(255,255,255,.22); padding: 2px 7px; border-radius: 4px; white-space: nowrap; flex: none; }
.cflow .cf-cluster-title.core { background: var(--c-nen); }
.cflow .cf-cluster-title.gate { background: var(--gateway); }
.cflow .cf-cluster-grid { display: grid; gap: 12px; align-items: start; }
.cflow .cf-branch { background: var(--surface); border: 1px solid var(--line); border-top: 4px solid var(--bc, var(--accent)); border-radius: 10px; padding: 0; box-shadow: var(--shadow); overflow: hidden; }
.cflow .cf-branch-head { padding: 10px 12px 9px; background: var(--bbg, var(--surface)); }
.cflow .cf-branch-head .bn { font-size: 12px; font-weight: 700; color: var(--bc); line-height: 1.25; }
.cflow .cf-branch-head .bd { font-size: 10px; color: var(--ink-soft); margin-top: 3px; line-height: 1.3; }
.cflow .cf-branch table { width: 100%; border-collapse: collapse; font-size: 10.5px; }
.cflow .cf-branch td { padding: 4px 12px; border-top: 1px solid var(--line-soft); vertical-align: top; }
.cflow .cf-branch td.c { font-weight: 700; color: var(--ink); white-space: nowrap; font-variant-numeric: tabular-nums; width: 1%; }
.cflow .cf-branch td.n { color: var(--ink); line-height: 1.28; }
.cflow .cf-branch td.u { text-align: right; color: var(--ink-soft); white-space: nowrap; font-variant-numeric: tabular-nums; }
.cflow .cf-branch tr.gw td { background: color-mix(in srgb, var(--gateway) 9%, transparent); }
.cflow .cf-gwtag { display: inline-block; font-size: 8.5px; font-weight: 700; letter-spacing: .04em; background: var(--gateway); color: #fff; padding: 1px 6px; border-radius: 4px; margin-left: 6px; vertical-align: middle; }

.cflow .cf-notes { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; margin-top: 34px; }
.cflow .cf-note { background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 15px 17px; box-shadow: var(--shadow); }
.cflow .cf-note h3 { margin: 0 0 8px; font-size: 13px; letter-spacing: .02em; display: flex; align-items: center; gap: 8px; }
.cflow .cf-note h3 .dot { width: 9px; height: 9px; border-radius: 50%; flex: none; }
.cflow .cf-note p, .cflow .cf-note li { font-size: 12.5px; color: var(--ink-soft); margin: 4px 0; }
.cflow .cf-note ul { margin: 4px 0 0; padding-left: 18px; }
.cflow .cf-note code { font-family: "Cascadia Code", "SFMono-Regular", Consolas, monospace; font-size: 11.5px; color: var(--ink); background: var(--line-soft); padding: 1px 5px; border-radius: 4px; }

.cflow .cf-footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid var(--line); font-size: 12px; color: var(--ink-soft); }

/* ── Hộp tích lũy tín chỉ theo khối (đóng khung rõ ràng cho SV) ─────────── */
.cflow .cf-credits { border: 1.5px solid var(--accent); border-radius: 11px; padding: 12px 14px 13px;
  margin: 18px 0 26px; background: color-mix(in srgb, var(--accent) 5%, var(--surface)); box-shadow: var(--shadow); }
.cflow .cf-credits .cc-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .05em;
  color: var(--accent); margin: 0 0 10px; display: flex; align-items: baseline; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.cflow .cf-credits .cc-total { font-size: 12px; font-weight: 700; color: var(--ink-soft); letter-spacing: 0; text-transform: none; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.cflow .cf-credits .cc-total .cc-tot-n { color: var(--ink); font-weight: 800; }
.cflow .cf-credits .cc-total .cc-tot-n b { color: var(--accent); font-size: 15px; font-variant-numeric: tabular-nums; }
/* chú giải BB / TC ở tiêu đề */
.cflow .cf-credits .cc-key { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; }
.cflow .cf-credits .cc-key .kdot { width: 11px; height: 11px; border-radius: 3px; flex: none; }
.cflow .cf-credits .cc-key.req { color: var(--cc-req); }
.cflow .cf-credits .cc-key.req .kdot { background: var(--cc-req); }
.cflow .cf-credits .cc-key.opt { color: var(--cc-opt); }
.cflow .cf-credits .cc-key.opt .kdot { background: var(--cc-opt); border: 1px dashed var(--cc-opt); background: transparent; }
.cflow .cf-cc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 8px; }
.cflow .cf-cc-cell { border: 1px solid var(--line); border-left: 4px solid var(--accent); border-radius: 8px;
  padding: 7px 10px 8px; background: var(--surface); }
.cflow .cf-cc-cell .cc-code { font-size: 10px; font-weight: 700; letter-spacing: .04em; color: var(--accent); font-variant-numeric: tabular-nums; display: flex; align-items: baseline; justify-content: space-between; gap: 6px; }
.cflow .cf-cc-cell .cc-code .cc-tot { font-size: 15px; font-weight: 800; color: var(--ink); }
.cflow .cf-cc-cell .cc-code .cc-tot small { font-size: 9px; font-weight: 600; color: var(--ink-soft); }
.cflow .cf-cc-cell .cc-name { font-size: 11px; font-weight: 600; color: var(--ink); margin-top: 2px; line-height: 1.25; }
.cflow .cf-cc-cell .cc-split { display: flex; gap: 5px; margin-top: 6px; }
.cflow .cf-cc-cell .cc-pill { flex: 1; border-radius: 6px; padding: 3px 6px; text-align: center; line-height: 1.1; }
.cflow .cf-cc-cell .cc-pill .pn { font-size: 14px; font-weight: 800; font-variant-numeric: tabular-nums; display: block; }
.cflow .cf-cc-cell .cc-pill .pl { font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; }
.cflow .cf-cc-cell .cc-pill.req { background: color-mix(in srgb, var(--cc-req) 16%, transparent); color: var(--cc-req); }
.cflow .cf-cc-cell .cc-pill.opt { background: transparent; color: var(--cc-opt); border: 1px dashed var(--cc-opt); }
.cflow .cf-cc-cell .cc-detail { font-size: 9px; color: var(--ink-soft); margin-top: 5px; line-height: 1.3; }

/* ── Chỉ hiển thị khi IN (tiêu đề mỗi trang PDF) ──────────────────────── */
.cflow .cf-print-only { display: none; }

/* ── IN / XUẤT PDF — 4 kỳ / trang, A4 ngang ──────────────────────────── */
@media print {
  /* CHỐNG TRANG TRẮNG THỪA: visibility:hidden vẫn chiếm chiều cao -> mọi phần
     KHÔNG chứa sơ đồ đang in đều display:none để chiều cao tài liệu co lại. */
  body.cflow-printing *:not(:has(.cflow.cf-printing)):not(.cflow.cf-printing):not(.cflow.cf-printing *) {
    display: none !important;
  }
  body.cflow-printing,
  body.cflow-printing :has(.cflow.cf-printing) {
    display: block !important; height: auto !important; min-height: 0 !important;
    margin: 0 !important; padding: 0 !important; background: #fff !important;
  }
  body.cflow-printing .cflow.cf-printing {
    position: static !important; width: 100% !important;
    padding: 0 !important; margin: 0 !important; background: #fff !important;
  }
}
@page { size: A4 landscape; margin: 7mm; }

@media print {
  .cflow.cf-printing { color: #000 !important; }
  .cflow.cf-printing .cf-toolbar { display: none !important; }
  .cflow.cf-printing .cf-print-only { display: block; }

  /* Header gọn lại khi in */
  .cflow.cf-printing .cf-header { border-color: #000; padding-bottom: 8px; margin-bottom: 6px; }
  .cflow.cf-printing .cf-h1 { font-size: 17px; }
  .cflow.cf-printing .cf-sub { font-size: 11px; }
  .cflow.cf-printing .cf-meta { font-size: 10px; margin-top: 6px; gap: 4px 14px; }
  .cflow.cf-printing .cf-legend { font-size: 9px; gap: 4px 10px; margin: 4px 0 8px; }

  /* Hộp tín chỉ: nền trắng, viền in rõ */
  .cflow.cf-printing .cf-credits { border-color: #444; background: #fff; box-shadow: none; margin: 8px 0 10px; break-inside: avoid; }
  .cflow.cf-printing .cf-cc-cell { border-color: #999; background: #fff; box-shadow: none; }

  /* BOARD: 4 cột / trang. In 2 trang, mỗi trang 4 kỳ. */
  .cflow.cf-printing .cf-board-scroll { overflow: visible !important; }
  .cflow.cf-printing .cf-board {
    display: grid !important; grid-template-columns: repeat(4, 1fr) !important;
    min-width: 0 !important; width: 100% !important; gap: 7px !important;
    align-items: start;
  }
  /* Kỳ 5 (phần tử thứ 5) bắt đầu TRANG MỚI -> 1-4 ở trang 1, 5-8 ở trang 2 */
  .cflow.cf-printing .cf-term:nth-child(5) { break-before: page; }
  /* Nhãn "trang 2/2" chèn trước kỳ 5 */
  .cflow.cf-printing .cf-term { break-inside: avoid; }

  .cflow.cf-printing .cf-course,
  .cflow.cf-printing .cf-term-head,
  .cflow.cf-printing .cf-note,
  .cflow.cf-printing .cf-branch,
  .cflow.cf-printing .cf-strip { box-shadow: none !important; }
  .cflow.cf-printing .cf-course { break-inside: avoid; }
  .cflow.cf-printing .cf-term-head { position: static !important; }

  /* Strip đại cương + mô đun + note: mỗi cụm sang trang mới, không cắt giữa */
  .cflow.cf-printing .cf-strip { break-before: page; break-inside: avoid; margin-top: 0; }
  .cflow.cf-printing .cf-branches { break-before: page; }
  .cflow.cf-printing .cf-branch-scroll { overflow: visible !important; }
  .cflow.cf-printing .cf-branch-clusters { min-width: 0 !important; }
  .cflow.cf-printing .cf-dc-scroll { overflow: visible !important; }
  .cflow.cf-printing .cf-dc-grid { min-width: 0 !important; }
  .cflow.cf-printing .cf-notes { break-before: page; }
}
@media (prefers-reduced-motion: reduce) { .cflow * { transition: none !important; } }
`;

// ── Helpers ─────────────────────────────────────────────────────────────────
function tcText(tc: number | 'ĐK'): string {
  if (tc === 'ĐK') return 'điều kiện';
  return `${tc} TC`;
}

// ── Sub-renderers ───────────────────────────────────────────────────────────
function CourseCard({ c }: { c: ReqCourse }) {
  const [kc, kbg, label] = c.k ? KIND[c.k] : ['var(--ink)', 'var(--line-soft)', ''];
  const badge = c.tc === 'ĐK' ? 'ĐK' : BLK[c.code] || label;
  return (
    <div className="cf-course" style={{ ['--kc' as string]: kc, ['--kbg' as string]: kbg }}>
      <div className="code">
        {c.code}
        {c.isnew ? ' ★' : ''}
      </div>
      <div className="name">{c.name}</div>
      <div className="foot">
        <span className="tc">{tcText(c.tc)}</span>
        <span className="cf-badge">{badge}</span>
      </div>
      {c.pre && (
        <div className="pre">
          Tiên quyết: <b>{c.pre}</b>
        </div>
      )}
    </div>
  );
}

const GATE_RE = /cửa ngõ|gateway|◇/i;

function OptGroupBlock({ g }: { g: OptGroup }) {
  const gate = GATE_RE.test(g.grp);
  return (
    <div className="cf-opt-group">
      <div className={`cf-opt-grp-name${gate ? ' gate' : ''}`}>{g.grp}</div>
      {g.items.map((it, i) => (
        <div className="cf-opt-item" key={i}>
          <span className="opt-nm">
            {it.mark ? `${it.mark} ` : ''}
            {it.name}
            {it.mod && <span className="mod">{it.mod}</span>}
          </span>
          {it.tc && <span className="opt-tc">{it.tc}</span>}
        </div>
      ))}
    </div>
  );
}

function SummerCard({ c }: { c: SummerCourse }) {
  return (
    <div className="cf-course summer">
      <div className="code">{c.code}</div>
      <div className="name">{c.name}</div>
      <div className="foot">
        <span className="tc">{c.tc === 'ĐK' ? 'điều kiện' : `${c.tc} TC`}</span>
        <span className="cf-badge summer-b">KỲ HÈ</span>
      </div>
    </div>
  );
}

function GradBoxBlock({ g }: { g: GradBox }) {
  return (
    <div className="cf-grad-box">
      <div className="gh">Tốt nghiệp · {g.tc}</div>
      <div className="cf-grad-rule">
        {g.rule.map((r, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: r }} />
        ))}
      </div>
      <div className="cf-pa">
        <span className="pa-tag">Phương án 1</span>
        <div className="pa-nm">
          <b>{g.pa1.code}</b>
          <br />
          {g.pa1.name} <span className="pa-tc">({g.pa1.tc})</span>
        </div>
      </div>
      <div className="cf-grad-or">— HOẶC —</div>
      <div className="cf-pa">
        <span className="pa-tag">Phương án 2</span>
        {g.pa2.items.map((it, i) => (
          <div className="pa-nm" key={i}>
            {it.code && (
              <>
                <b>{it.code}</b>
                <br />
              </>
            )}
            {it.name}
            {it.tc && <span className="pa-tc"> ({it.tc})</span>}
          </div>
        ))}
        <div className="pa-cond">{g.pa2.note}</div>
      </div>
    </div>
  );
}

function TermColumn({ t }: { t: Term }) {
  const reqTC = t.req.reduce((s, c) => s + (typeof c.tc === 'number' ? c.tc : 0), 0);
  const headTC = t.grad
    ? '10 TC · tốt nghiệp'
    : reqTC > 0
    ? `${reqTC} TC bắt buộc`
    : 'Chỉ tự chọn';

  return (
    <div className="cf-term">
      <div className="cf-term-head">
        <div className="yr">{t.yr}</div>
        <div className="hk">{t.hk}</div>
        <div className="tc">{headTC}</div>
      </div>

      {t.req.length > 0 && <div className="cf-sec-label cf-sec-req">Bắt buộc</div>}
      {t.req.map((c) => (
        <CourseCard c={c} key={c.code + c.name} />
      ))}

      {t.opt && t.opt.length > 0 && (
        <>
          <div className="cf-sec-label cf-sec-opt">Tự chọn</div>
          {t.opt.map((g, i) => (
            <OptGroupBlock g={g} key={i} />
          ))}
        </>
      )}

      {t.summer && t.summer.length > 0 && (
        <>
          <div className="cf-sec-label cf-sec-summer">
            {t.summerLabel || '☀ Kỳ hè (sau HK6)'}
          </div>
          {t.summer.map((c) => (
            <SummerCard c={c} key={c.code + c.name} />
          ))}
        </>
      )}

      {t.grad && <GradBoxBlock g={t.grad} />}
    </div>
  );
}

function BranchCard({ bkey }: { bkey: BranchKey }) {
  const b = branches.find((x) => x.key === bkey)!;
  const [bc, bbg] = KIND[b.key];
  return (
    <div className="cf-branch" style={{ ['--bc' as string]: bc, ['--bbg' as string]: bbg }}>
      <div className="cf-branch-head">
        <div className="bn">{b.name}</div>
        <div className="bd">{b.desc}</div>
      </div>
      <table>
        <tbody>
          {b.courses.map(([code, name, tc]) => {
            const isGate = !!b.gate && code === b.gate;
            return (
              <tr className={isGate ? 'gw' : ''} key={code}>
                <td className="c">{code}</td>
                <td className="n">
                  {name}
                  {isGate && <span className="cf-gwtag">◇ CỬA NGÕ</span>}
                </td>
                <td className="u">{tc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Kiểu dữ liệu khối tín chỉ (truyền từ Content.tsx) ────────────────────────
export interface CreditBlock {
  code: string;
  name: string;
  credits: number;
  reqCredits?: number;
  optCredits?: number;
  detail?: string;
}
interface CurriculumFlowProps {
  creditBlocks?: CreditBlock[];
  totalCredits?: number;
}

// In: bọc phần đang in bằng class để CSS @media print chỉ hiện sơ đồ này.
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
  // Dự phòng cho trình duyệt không bắn afterprint
  setTimeout(cleanup, 1500);
}

// ── Hộp tích lũy tín chỉ theo khối — tách rõ BẮT BUỘC / TỰ CHỌN ──────────────
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

// ── Main component ──────────────────────────────────────────────────────────
export default function CurriculumFlow({ creditBlocks, totalCredits }: CurriculumFlowProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  return (
    <div className="cflow" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CFLOW_CSS }} />

      <header className="cf-header">
        <p className="cf-eyebrow">{headerContent.eyebrow}</p>
        <h1 className="cf-h1">{headerContent.h1}</h1>
        <p className="cf-sub">{headerContent.sub}</p>
        <div className="cf-meta">
          {headerContent.meta.map((m, i) => (
            <span key={i}>
              {m.label}
              <b>{m.value}</b>
            </span>
          ))}
        </div>
      </header>

      {creditBlocks && creditBlocks.length > 0 && (
        <CreditBox blocks={creditBlocks} total={totalCredits} />
      )}

      <div className="cf-toolbar">
        <button
          className="cf-tool"
          type="button"
          onClick={() => printFlow(rootRef.current)}
        >
          ⎙ In / Xuất PDF
        </button>
      </div>

      <div className="cf-legend" aria-label="Chú giải màu">
        {legendItems.map((lg, i) => {
          if (lg.kind === 'swatch') {
            return (
              <span className="cf-lg" key={i}>
                <span className="cf-sw" style={{ background: lg.color }} />
                {lg.text}
              </span>
            );
          }
          if (lg.kind === 'tagReq') {
            return (
              <span className="cf-lg" key={i}>
                <span className="cf-tag-req" style={{ margin: 0 }}>
                  {lg.text}
                </span>{' '}
                {lg.suffix}
              </span>
            );
          }
          if (lg.kind === 'tagOpt') {
            return (
              <span className="cf-lg" key={i}>
                <span className="cf-tag-opt" style={{ margin: 0 }}>
                  {lg.text}
                </span>{' '}
                {lg.suffix}
              </span>
            );
          }
          // gate
          return (
            <span className="cf-lg gate" key={i}>
              <span className="cf-sw" />
              {lg.text}
            </span>
          );
        })}
      </div>

      <div className="cf-board-scroll">
        <div className="cf-board">
          {terms.map((t, i) => (
            <TermColumn t={t} key={i} />
          ))}
        </div>
      </div>

      <div className="cf-strip">
        <h3>
          <span
            className="cf-sw"
            style={{ width: 13, height: 13, borderRadius: 3, background: stripHeading.swatchColor }}
          />{' '}
          {stripHeading.main} <span className="note">{stripHeading.note}</span>
        </h3>
        <div className="cf-dc-scroll">
          <div className="cf-dc-grid">
            {daicuongGroups.map((g) => (
              <div className="cf-dc-col" key={g.L}>
                <div className="cf-dc-h">
                  {g.L} · {g.n}
                </div>
                {g.c.map((x, i) => {
                  const sp = x.indexOf(' ');
                  return (
                    <div className="cf-dc-i" key={i}>
                      <b>{x.slice(0, sp)}</b> {x.slice(sp + 1)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="cf-branches">
        <h2>{branchesSection.h2}</h2>
        <div className="cf-branch-scroll">
          <div className="cf-branch-clusters">
            {branchClusters.map((cl, i) => (
              <div className="cf-cluster" key={i}>
                <div className={`cf-cluster-title ${cl.tone}`}>
                  <span>{cl.title}</span>
                  <span className="ct-badge">{cl.badge}</span>
                </div>
                <div
                  className="cf-cluster-grid"
                  style={{ gridTemplateColumns: `repeat(${cl.cols}, minmax(0,1fr))` }}
                >
                  {cl.keys.map((k) => (
                    <BranchCard bkey={k} key={k} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cf-notes">
        {noteCards.map((n, i) => (
          <div className="cf-note" key={i}>
            <h3>
              <span className="dot" style={{ background: n.dotColor }} />
              {n.title}
            </h3>
            {n.paragraphs?.map((p, j) => (
              <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
            {n.list && (
              <ul>
                {n.list.map((li, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: li }} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <footer className="cf-footer" dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </div>
  );
}
