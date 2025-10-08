// Script generated with help from ChatGPT (OpenAI GPT-5)
// License: MIT — free to use, modify, and distribute

// https://starlight.astro.build/reference/icons/#all-icons
/// https://github.com/withastro/starlight/blob/main/docs/src/content/docs/reference/icons.mdx?plain=1
//// https://github.com/withastro/starlight/blob/main/docs/src/components/icons-list.astro
///// https://github.com/withastro/starlight/blob/main/packages/starlight/components/Icons.ts
///// https://github.com/withastro/starlight/blob/main/packages/starlight/user-components/file-tree-icons.ts

import { readFileSync, writeFileSync } from 'fs';
import path from 'node:path';
import { join } from 'path';
import { normalizeFileName } from './utils.ts';
import { Icons } from './.cache/components/Icons.ts';

import type { IconGroup, MarkDownBlob } from './config/index.ts';
import { config } from './config/index.ts';
const {
	rootPath,
	markdownPartialsPath,
	iconsPath,
	markdownPath,
	iconsPerRow,
	svgWidth,
	svgHeight,
	markdownPage,
	iconGroupStartLevel,
	iconInfo,
	iconGroups,
} = config;

// Paths
const OUTPUT_FILE = path.resolve(rootPath, markdownPath);

// Helper: split array into chunks
function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
	const chunks: T[][] = [];
	for (let i = 0; i < arr.length; i += chunkSize) {
		chunks.push(arr.slice(i, i + chunkSize));
	}
	return chunks;
}

// Helper: Generate filename from icon key
function iconFileName(iconKey: string) {
	return normalizeFileName(iconKey) + '.svg';
}

// Helper: Turn strings into array of strings.
function normalizeMarkDownBlob(value?: MarkDownBlob): string {
	if (!value) return '';

	if (typeof value === 'string') {
		return value;
	}

	if (Array.isArray(value)) {
		return value.join('\n');
	}

	if ('file' in value) {
		try {
			const inFile = path.resolve(rootPath, markdownPartialsPath, value.file);
			return readFileSync(inFile, 'utf8');
		} catch (err) {
			console.warn(`⚠️ Could not read file: ${value.file}`, err);
			return '';
		}
	}

	return '';
}

// Keep track of which icons are included
const usedIcons = new Set<string>();
let totalIconsIncluded = 0; // new counter

// Generate markdown table for icons
function generateTable(icons?: string[], markdownLines: string[] = []) {
	if (!icons || icons.length === 0) return;

	// Filter valid icons
	const filteredIcons = icons.filter((iconKey) => {
		// in case we call this function with a custom icon subset list
		if (!(iconKey in Icons)) {
			console.warn(`⚠️ Icon "${iconKey}" not found in Icons source of truth`);
			return false;
		}
		return true;
	});

	// track usage
	filteredIcons.forEach((iconKey) => {
		if (usedIcons.has(iconKey)) {
			console.warn(`⚠️ Icon "${iconKey}" added to an additional group.`);
		}
		usedIcons.add(iconKey);
		totalIconsIncluded++;
	});

	if (filteredIcons.length === 0) return;

	const rows = chunkArray(filteredIcons, iconsPerRow);

	// Table header
	if (iconsPerRow-1) {
	markdownLines.push('| ' + ' | '.repeat(iconsPerRow-1).trim() + ' |');
	markdownLines.push('|:' + ' :|: '.repeat(iconsPerRow-1).replace(/ /g, '---') + ':|');
	}

	for (const row of rows) {
		const paddedRow = [...row];
		while (paddedRow.length < iconsPerRow) paddedRow.push('');

		// Row 1: images
		markdownLines.push(
			'| ' +
				paddedRow
					.map((iconKey) => {
						if (!iconKey) return ' ';
						const filename = iconFileName(iconKey);
						const relativePath = join(iconsPath, filename).replace(/\\/g, '/');
						return `<div style="text-align:center"><img src="./${relativePath}" width="${svgWidth}" height="${svgHeight}" alt="${iconKey} icon"></div>`;
					})
					.join(' | ') +
				' |'
		);

		// Row 2: names with optional url and source
		markdownLines.push(
			'| ' +
				paddedRow
					.map((iconKey) => {
						if (!iconKey) return ' ';

						let displayName = iconKey;

						if (iconInfo) {
							const info = iconInfo[iconKey];
							if (info.url) displayName = `<a href="${info.url}">${displayName}</a>`;

							let before = '';
							let after = '';
							if (info.desc) {
								before += '&nbsp;&nbsp;&nbsp;&nbsp;';
								after += ` <sup title="${info.desc}">ℹ</sup>`;
							}
							if (info.source) {
								before += '&nbsp;&nbsp;&nbsp;&nbsp;';
								after += ` <sup><a href="${info.source}">🔗</a></sup>`;
							}

							displayName = before + displayName + after;
						}

						return `<div style="text-align:center">${displayName}</div>`;
					})
					.join(' | ') +
				' |'
		);
	}

	markdownLines.push(''); // extra line after table
}

// Recursive processing of groups/subgroups
function processGroup(
	group: IconGroup,
	markdownLines: string[] = [],
	headerLevel = iconGroupStartLevel
) {
	if (!group || !group.group) return;

	markdownLines.push(`${'#'.repeat(headerLevel)} ${group.group || 'Unnamed Group'}\n`);

	const header = normalizeMarkDownBlob(group.header);
	if (header.length) markdownLines.push(header, '');

	if (group.icons?.length) generateTable(group.icons, markdownLines);

	if (group.subgroups?.length) {
		for (const subgroup of group.subgroups) {
			processGroup(subgroup, markdownLines, headerLevel + 1);
		}
	}

	const footer = normalizeMarkDownBlob(group.footer);
	if (footer.length) markdownLines.push(footer, '');
}

// Build final markdown
const markdownLines: string[] = [];

// Page header
const pageHeader = normalizeMarkDownBlob(markdownPage?.header);
if (pageHeader) markdownLines.push(pageHeader, '');

// Process top-level groups
if (iconGroups?.length) {
	for (const group of iconGroups) {
		processGroup(group, markdownLines);
	}
}

// Add Uncategorized icons at the bottom
const allIconKeys = Object.keys(Icons);
const uncategorizedIcons: string[] = allIconKeys.filter((iconKey) => !usedIcons.has(iconKey));
if (uncategorizedIcons.length > 0) {
	markdownLines.push('## Uncategorized\n');
	generateTable(uncategorizedIcons, markdownLines);
}

// Page footer
const pageFooter = normalizeMarkDownBlob(markdownPage?.footer);
if (pageFooter) markdownLines.push(pageFooter, '');

// Write markdown file
writeFileSync(OUTPUT_FILE, markdownLines.join('\n'), 'utf-8');
console.log(`Markdown written to ${OUTPUT_FILE} — ${totalIconsIncluded} icons included`);
