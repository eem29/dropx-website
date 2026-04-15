/**
 * screenshot.mjs — DropX screenshot tool
 * Usage:
 *   node screenshot.mjs http://localhost:3000
 *   node screenshot.mjs http://localhost:3000 label-name
 *   node screenshot.mjs http://localhost:3000 mobile --width=375
 */
import puppeteer from 'puppeteer';
import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';

const url    = process.argv[2] || 'http://localhost:3000';
const label  = process.argv[3] || 'screenshot';
const widthArg = process.argv.find(a => a.startsWith('--width='));
const width  = widthArg ? parseInt(widthArg.split('=')[1]) : 1280;
const height = width === 375 ? 812 : 900;

const outDir = resolve('screenshots');
await mkdir(outDir, { recursive: true });

const ts   = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const file = resolve(outDir, `${label}-${ts}.png`);

const browser = await puppeteer.launch({ headless: true });
const page    = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
await page.screenshot({ path: file, fullPage: true });
await browser.close();

console.log(`Saved: ${file}`);
