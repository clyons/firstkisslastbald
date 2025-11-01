#!/usr/bin/env node
'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SOURCE_ROOT = PROJECT_ROOT;
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'dist');
const FOOTER_PATH = path.join(PROJECT_ROOT, 'footer.shtml');
const INCLUDE_PATTERN = /([ \t]*)<!--#include virtual="\/footer.shtml" -->/g;
const SKIP_DIRECTORIES = new Set(['.git', '.github', 'dist', 'node_modules', 'scripts']);

async function main() {
  const footerMarkup = await loadFooter();
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await processDirectory(SOURCE_ROOT, OUTPUT_DIR, footerMarkup);
  console.log(`Inlined footer markup into: ${OUTPUT_DIR}`);
}

async function loadFooter() {
  const rawFooter = await fs.readFile(FOOTER_PATH, 'utf8');
  return rawFooter.trimEnd();
}

async function processDirectory(sourceDir, outputDir, footerMarkup) {
  await fs.mkdir(outputDir, { recursive: true });
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    if (shouldSkipEntry(entry)) {
      continue;
    }

    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(outputDir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(sourcePath, targetPath, footerMarkup);
    } else if (entry.isFile()) {
      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      if (entry.name.endsWith('.html')) {
        await writeInlinedHtml(sourcePath, targetPath, footerMarkup);
      } else {
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  }
}

function shouldSkipEntry(entry) {
  return SKIP_DIRECTORIES.has(entry.name) || entry.name.startsWith('.git');
}

async function writeInlinedHtml(sourcePath, targetPath, footerMarkup) {
  const originalHtml = await fs.readFile(sourcePath, 'utf8');
  const updatedHtml = inlineFooter(originalHtml, footerMarkup);
  await fs.writeFile(targetPath, updatedHtml, 'utf8');
}

function inlineFooter(html, footerMarkup) {
  const footerLines = footerMarkup.split('\n');
  let replacements = 0;

  const updated = html.replace(INCLUDE_PATTERN, (_, indent) => {
    replacements += 1;
    const inlinedFooter = footerLines.map((line) => indent + line).join('\n');
    return `${inlinedFooter}\n`;
  });

  if (replacements === 0) {
    return html;
  }

  return updated;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
