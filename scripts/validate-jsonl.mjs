import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const files = ['data/reward-signals.jsonl', 'data/evidence.jsonl', 'data/actions.jsonl'];

JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

for (const file of files) {
  const path = join(root, file);
  const lines = readFileSync(path, 'utf8').trim().split('\n');

  lines.forEach((line, index) => {
    try {
      JSON.parse(line);
    } catch (error) {
      throw new Error(`${file}:${index + 1} is invalid JSON: ${error.message}`);
    }
  });

  console.log(`${file}: ${lines.length} rows ok`);
}
