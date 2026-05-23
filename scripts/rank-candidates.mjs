import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const rows = readFileSync(join(root, 'data', 'reward-signals.jsonl'), 'utf8')
  .trim()
  .split('\n')
  .map((line) => JSON.parse(line))
  .sort((a, b) => b.fit_score - a.fit_score);
const evidence = readJsonl('evidence.jsonl');
const actions = readJsonl('actions.jsonl');

for (const row of rows) {
  const evidenceCount = evidence.filter((item) => item.candidate_id === row.id).length;
  const nextAction = actions
    .filter((item) => item.candidate_id === row.id)
    .sort((a, b) => a.priority - b.priority)[0];

  console.log(`${row.fit_score} ${row.verdict.padEnd(7)} ${row.id}`);
  console.log(`  ${row.reward_type}: ${row.reward_value} (${evidenceCount} evidence rows)`);
  console.log(`  next: ${nextAction ? `${nextAction.owner} / ${nextAction.action}` : row.next_action}`);
}

function readJsonl(fileName) {
  return readFileSync(join(root, 'data', fileName), 'utf8')
    .trim()
    .split('\n')
    .map((line) => JSON.parse(line));
}
