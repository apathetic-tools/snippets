// Script generated with help from ChatGPT (OpenAI GPT-5)
// License: MIT — free to use, modify, and distribute

// Fetches files defined in config.ts and optionally strips/stubs imports
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, basename } from 'node:path';
import { config } from './config/index.ts';

async function fetchFile(url: string): Promise<string> {
	console.log(`⬇️  Fetching ${url}`);
	const res = await fetch(url);
	if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
	return res.text();
}

function applyStripsAndStubs(
	content: string,
	stripImports?: string[],
	stubTypes?: [string, string][]
): string {
	let modified = content;

	// Remove imports we don't want
	if (stripImports) {
		for (const imp of stripImports) {
			const regex = new RegExp(
				`import\\s+(type\\s+)?\\{?[^}]*\\}?\\s*from\\s*['"]${imp}['"];?`,
				'g'
			);
			modified = modified.replace(regex, '');
		}
	}

	// Add stub definitions for TS types if needed
	if (stubTypes) {
		const stubs = stubTypes.map(([name, type]) => `type ${name} = ${type};`).join('\n');
		modified = stubs + '\n' + modified;
	}

	return modified;
}

async function main() {
	for (const page of config.fetchIconPages) {
		const { url, path, stripImports, stubTypes } = page;

		// Determine output path
		let outPath: string;
		if (path.endsWith('/')) {
			const filename = basename(new URL(url).pathname);
			outPath = path + filename;
			await mkdir(path, { recursive: true });
		} else {
			outPath = path;
			await mkdir(dirname(outPath), { recursive: true });
		}

		const content = await fetchFile(url);
		const modified = applyStripsAndStubs(content, stripImports, stubTypes);

		console.log(`📝 Writing file: ${outPath} (from path: ${path})`);
		await writeFile(outPath, modified, 'utf8');
	}

	console.log('✅ All files updated.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
