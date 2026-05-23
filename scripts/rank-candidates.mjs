import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const rows = readFileSync(join(root, 'data', 'reward-signals.jsonl'), 'utf8')
  .trim()
  .split('\n')
  .map((line) => JSON.parse(line))
  .sort((a, b) => b.fit_score - a.fit_score);

for (const row of rows) {
  console.log(`${row.fit_score} ${row.verdict.padEnd(7)} ${row.id}`);
  console.log(`  ${row.reward_type}: ${row.reward_value}`);
  console.log(`  next: ${row.next_action}`);
}
