// Copies the Sveltia CMS editor (pinned in package.json) into public/admin before each build,
// so /admin serves it from our own domain. The copied files are build output (see .gitignore).
// Usage: runs automatically as npm's "prebuild" and "predev" steps.
import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const from = path.resolve('node_modules/@sveltia/cms/dist');
const to = path.resolve('public/admin');
const skipMaps = (src) => !src.endsWith('.map');

await mkdir(to, { recursive: true });
await rm(path.join(to, 'chunks'), { recursive: true, force: true });
await cp(path.join(from, 'sveltia-cms.js'), path.join(to, 'sveltia-cms.js'));
await cp(path.join(from, 'chunks'), path.join(to, 'chunks'), { recursive: true, filter: skipMaps });
console.log('Copied Sveltia CMS into public/admin');
