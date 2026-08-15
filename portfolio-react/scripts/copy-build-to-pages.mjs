import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(scriptDir, '..');
const repoRoot = resolve(appDir, '..');
const distDir = resolve(appDir, 'dist');

const files = [
  ['index.html', 'index.html'],
  ['assets', 'assets'],
  ['img/hero-home.png', 'img/hero-home.png'],
  ['img/igo-profile-office.png', 'img/igo-profile-office.png'],
  ['img/igo-brand-signature.png', 'img/igo-brand-signature.png'],
  ['img/osf-academy-concept.png', 'img/osf-academy-concept.png'],
  ['img/balf360-dashboard.png', 'img/balf360-dashboard.png'],
  ['img/balf360-certificate.png', 'img/balf360-certificate.png'],
  ['img/tab-saver-interface.png', 'img/tab-saver-interface.png'],
  ['img/tab-saver-export.png', 'img/tab-saver-export.png'],
  ['img/tab-saver-links.png', 'img/tab-saver-links.png'],
];

if (!existsSync(distDir)) {
  throw new Error('A pasta dist nao existe. Rode npm run build antes.');
}

for (const [source, destination] of files) {
  const sourcePath = resolve(distDir, source);
  const destinationPath = resolve(repoRoot, destination);

  if (!existsSync(sourcePath)) {
    throw new Error(`Arquivo gerado nao encontrado: ${sourcePath}`);
  }

  if (existsSync(destinationPath)) {
    rmSync(destinationPath, { recursive: true, force: true });
  }

  mkdirSync(dirname(destinationPath), { recursive: true });
  cpSync(sourcePath, destinationPath, { recursive: true });
}

console.log('Arquivos publicados atualizados na raiz do repositorio.');
