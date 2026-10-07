// WCAG 2.2 contrast audit for the token pairs the UI actually uses.
// Resolves the DTCG references, converts OKLCH -> sRGB, and fails on any pair
// below its threshold (4.5:1 text, 3:1 UI boundaries / large text).

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const t = JSON.parse(readFileSync(resolve(root, "tokens/tokens.json"), "utf8"));

const get = (path) => path.split(".").reduce((n, k) => n?.[k], t);
function resolveColor(value, mode) {
  let v = String(value);
  const m = v.match(/^\{([^}]+)\}$/);
  if (m) {
    const tok = get(m[1]);
    const next = mode === "dark" && tok.$extensions?.mode?.dark ? tok.$extensions.mode.dark : tok.$value;
    return resolveColor(next, mode);
  }
  return v;
}
const token = (path, mode) => {
  const tok = get(path);
  return resolveColor(mode === "dark" && tok.$extensions?.mode?.dark ? tok.$extensions.mode.dark : tok.$value, mode);
};

function oklchToSrgb(str) {
  if (str.startsWith("#")) {
    const h = str.slice(1);
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  }
  const [, L, C, H] = str.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)/).map(Number);
  const l = L / 100, a = C * Math.cos((H * Math.PI) / 180), b = C * Math.sin((H * Math.PI) / 180);
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;
  const [L3, M3, S3] = [l_ ** 3, m_ ** 3, s_ ** 3];
  const lin = [
    4.0767416621 * L3 - 3.3077115913 * M3 + 0.2309699292 * S3,
    -1.2684380046 * L3 + 2.6097574011 * M3 - 0.3413193965 * S3,
    -0.0041960863 * L3 - 0.7034186147 * M3 + 1.707614701 * S3,
  ];
  return lin.map((c) => Math.min(1, Math.max(0, c)));
}
const luminance = (rgb) => {
  const [r, g, b] = rgb.map((c) => c); // linear already for oklch path
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const lum = (str) => {
  if (str.startsWith("#")) {
    const lin = oklchToSrgb(str).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return luminance(lin);
  }
  return luminance(oklchToSrgb(str));
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const pairs = [];
for (const mode of ["light", "dark"]) {
  const canvas = token("semantic.surface.canvas", mode);
  const raised = token("semantic.surface.raised", mode);
  const sunken = token("semantic.surface.sunken", mode);
  const highlight = token("semantic.surface.highlight", mode);
  for (const [bgName, bg] of [["canvas", canvas], ["raised", raised], ["sunken", sunken], ["highlight", highlight]]) {
    pairs.push([mode, `text.primary / ${bgName}`, token("semantic.text.primary", mode), bg, 4.5]);
    pairs.push([mode, `text.secondary / ${bgName}`, token("semantic.text.secondary", mode), bg, 4.5]);
    pairs.push([mode, `text.tertiary / ${bgName}`, token("semantic.text.tertiary", mode), bg, 4.5]);
    pairs.push([mode, `accent.solid / ${bgName}`, token("semantic.accent.solid", mode), bg, 4.5]);
  }
  pairs.push([mode, "text.positive / raised", token("semantic.text.positive", mode), raised, 4.5]);
  pairs.push([mode, "text.critical / raised", token("semantic.text.critical", mode), raised, 4.5]);
  pairs.push([mode, "border.strong / canvas (UI)", token("semantic.border.strong", mode), canvas, 3]);
  pairs.push([mode, "on-solid / accent.solid", token("semantic.accent.on-solid", mode), token("semantic.accent.solid", mode), 4.5]);
  pairs.push([mode, "on-solid / accent.strong", token("semantic.accent.on-solid", mode), token("semantic.accent.strong", mode), 4.5]);
}

let fail = 0;
for (const [mode, name, fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) fail++;
  console.log(`${ok ? "pass" : "FAIL"}  ${mode.padEnd(5)}  ${name.padEnd(30)} ${r.toFixed(2)}:1  (min ${min})`);
}
console.log(fail ? `\n${fail} pair(s) below threshold` : `\nAll ${pairs.length} pairs pass WCAG AA.`);
process.exit(fail ? 1 : 0);
