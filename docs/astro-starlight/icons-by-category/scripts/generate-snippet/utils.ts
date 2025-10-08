// Script generated with help from ChatGPT (OpenAI GPT-5)
// License: MIT — free to use, modify, and distribute

export function normalizeFileName(name: string): string {
	return name.replace(/[^a-z0-9_-]/gi, '_');
}
