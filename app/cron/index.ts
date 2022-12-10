import fs from 'fs/promises';

export async function getStoredCrons() {
  const rawFileContent = await fs.readFile('cron.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);

  const storedCrons = data.jobs ?? [];
  return storedCrons;
}

export function storeCron(jobs: any) {
  return fs.writeFile('cron.json', JSON.stringify({ jobs: jobs || [] }));
}
