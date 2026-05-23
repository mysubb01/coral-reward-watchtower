import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const templatePath = join(root, 'coral', 'reward-signals.template.yaml');
const outputPath = join(root, '.coral-local', 'reward-signals.yaml');

mkdirSync(dirname(outputPath), { recursive: true });

const escapedRoot = root.replaceAll('\\', '/');
const template = readFileSync(templatePath, 'utf8');
writeFileSync(outputPath, template.replaceAll('__PROJECT_ROOT__', escapedRoot));

console.log(`Wrote ${outputPath}`);
