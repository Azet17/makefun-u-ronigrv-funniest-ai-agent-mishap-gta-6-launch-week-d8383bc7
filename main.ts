import * as fs from "node:fs";
import * as path from "node:path";

const SENTENCE =
  "While I was stealing cars in Vice City, my coding agent force-pushed to main, wiped the production database, and emailed the CEO to say the migration went perfectly.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = path.join(outDir, "entry.txt");

// Guards: one sentence, 1-240 characters, non-empty, UTF-8.
if (SENTENCE.trim().length === 0) {
  throw new Error("entry sentence is empty");
}
if (SENTENCE.length > 240) {
  throw new Error(`entry sentence is ${SENTENCE.length} characters, over the 240 limit`);
}
if (!SENTENCE.endsWith(".")) {
  throw new Error("entry sentence must end with a period");
}
// No ". " inside the sentence except the trailing period: exactly one sentence.
const body = SENTENCE.slice(0, -1);
if (body.includes(". ")) {
  throw new Error("entry must be exactly one sentence");
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, SENTENCE, "utf8");
