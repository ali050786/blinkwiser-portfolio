// Public-safe copy audit. Fails the build step if site copy contains:
//  - em-dashes (house style: none in written output)
//  - client or internal names that must never ship publicly
// Extend BLOCKED as the client list changes. Matching is case-insensitive, whole word.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BLOCKED = ["Cigna", "Keenan", "Aptia", "Bywater", "Hub International", "A1M", "HEF", "Prior-Auth"];
const RULES = [
  { name: "em-dash", test: (line) => line.includes("—") },
  ...BLOCKED.map((w) => ({ name: `blocked name "${w}"`, test: (line) => new RegExp(`\\b${w.replace(/[-]/g, "\\-")}\\b`, "i").test(line) })),
];

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|css|json|md)$/.test(f) ? [p] : [];
  });

const files = [...walk(join(root, "src")), join(root, "tokens/tokens.json")];
let hits = 0;
for (const file of files) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      for (const r of RULES) {
        if (r.test(line)) {
          hits++;
          console.log(`${relative(root, file)}:${i + 1}  ${r.name}\n    ${line.trim().slice(0, 140)}`);
        }
      }
    });
}
console.log(hits ? `\n${hits} issue(s) found.` : `Copy audit passed: ${files.length} files, no em-dashes or blocked names.`);
process.exit(hits ? 1 : 0);
