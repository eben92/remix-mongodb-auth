// import fs from 'fs';
// import { writeFileSync, readFileSync, readFile } from 'fs';

// const readHTMLFile = (path: any) => {
//  return readFile(path, { encoding: 'utf-8' }, function (err:any, json:any) {
//     if (err) {

//       throw err;
//     } else {
//       return json
//     }
//   });
// };

// export async function getStoredCrons() {
//   // const rawFileContent = await fs.readFile('cron.json', { encoding: 'utf-8' });
//   const rawFileContent = await fs.readFile('cron.json', { encoding: 'utf-8' });
//   // const data = JSON.parse(rawFileContent);
//   // const rawFileContent = readHTMLFile(file);
//   const data = JSON.parse(rawFileContent);

//   const storedCrons = data.jobs ?? [];
//   return storedCrons;
// }

// export async function getStoredNotes() {
//   const rawFileContent = await fs.readFile('notes.json', { encoding: 'utf-8' });
//   const data = JSON.parse(rawFileContent);

//   const storedNotes = data.notes ?? [];
//   return storedNotes;
// }

// export function storeCron(jobs: any) {
//   // return writeFileSync(file, JSON.stringify({ jobs: jobs || [] }));
// }

import fs from 'fs/promises';
import path from 'path';
const file = path.join(process.cwd(), './files/cron.json');
const vc = path.join(process.cwd(), './___vc');
const apis = path.join(process.cwd(), './api');

export async function getStoredCrons() {
  console.log(process.cwd(), 'my dirr');

  try {
    const files = await fs.readdir(process.cwd());
    for (const file1 of files) console.log(file1, 'filess');

    const api = await fs.readdir(apis);
    for (const file2 of api) console.log(file2, 'apiii');

    const vcc = await fs.readdir(vc);
    for (const file3 of vcc) console.log(file3, 'vcccc');
  } catch (err) {
    console.error(err);
  }

  const rawFileContent = await fs.readFile(file, { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);

  const storedNotes = data.jobs ?? [];
  return storedNotes;
}

export function storeCron(jobs: any) {
  return fs.writeFile(file, JSON.stringify({ jobs: jobs || [] }));
}
