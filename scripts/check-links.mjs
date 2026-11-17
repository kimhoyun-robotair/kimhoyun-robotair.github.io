import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory()
    ? walk(path.join(directory, entry.name))
    : [path.join(directory, entry.name)]))).flat();
}
const files = (await walk(root)).filter((file) => file.endsWith('.html'));
const documents = new Map(await Promise.all(files.map(async (file) => [file, await readFile(file, 'utf8')])));
const errors = [];
let count = 0;
for (const [file, html] of documents) {
  const relative = path.relative(root, file);
  for (const tag of html.matchAll(/<(?:a|img|video|source|script|link)\b[^>]*>/g)) {
    for (const attribute of tag[0].matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) {
      const value = attribute[1].replaceAll('&amp;', '&');
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value)) continue;
      const url = new URL(value, `https://local.test/${relative}`);
      let target = path.join(root, decodeURIComponent(url.pathname));
      try {
        const info = await stat(target);
        if (info.isDirectory()) target = path.join(target, 'index.html');
        await stat(target);
        if (url.hash && documents.has(target)) {
          const id = decodeURIComponent(url.hash.slice(1));
          const ids = [...documents.get(target).matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
          if (!ids.includes(id)) errors.push(`${relative}: missing anchor ${value}`);
        }
        count++;
      } catch {
        errors.push(`${relative}: missing file ${value}`);
      }
    }
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Verified ${count} internal links and assets across ${files.length} HTML pages.`);
