// Script generated with help from ChatGPT (OpenAI GPT-5)
// License: MIT — free to use, modify, and distribute

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { normalizeFileName } from './utils.ts';
import { Icons } from './.cache/components/Icons.ts';
import { config } from './config/index.ts';
const { rootPath, iconsPath, svgWidth, svgHeight, svgViewBox, svgColor } = config;

// Utility to safely create a folder
async function ensureDir(dir: string) {
	await mkdir(dir, { recursive: true });
}

// Write an SVG string to a file
async function writeSvgFile(outDir: string, filename: string, svgContent: string) {
	const filePath = path.join(outDir, filename);
	await writeFile(filePath, svgContent, 'utf8');
	console.log(`✅ Wrote ${filePath}`);
}

async function main() {
	const outDir = path.resolve(rootPath, iconsPath);
	await ensureDir(outDir);

	const iconEntries = Object.entries(Icons);
	for (const [name, svg] of Object.entries(Icons)) {
		// Convert name to a safe filename
		const filename = normalizeFileName(name) + '.svg';
		const svgContent = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="${svgViewBox}" fill="${svgColor}">${svg}</svg>`;
		await writeSvgFile(outDir, filename, svgContent);
	}

	console.log(`🎉 All ${iconEntries.length} SVGs generated in ${outDir}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
