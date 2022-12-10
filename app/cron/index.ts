import { writeFileSync, readFileSync } from 'fs';
import path from 'path';
const file = path.join(process.cwd(), 'files', 'cron.json');

export async function getStoredCrons() {
  // const rawFileContent = await fs.readFile('cron.json', { encoding: 'utf-8' });
  // const rawFileContent = await fs.readFile('cron.json', { encoding: 'utf-8' });
  // const data = JSON.parse(rawFileContent);
  const rawFileContent = readFileSync(file, { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);

  const storedCrons = data.jobs ?? [];
  return storedCrons;
}

export function storeCron(jobs: any) {
  return writeFileSync(file, JSON.stringify({ jobs: jobs || [] }));
}
