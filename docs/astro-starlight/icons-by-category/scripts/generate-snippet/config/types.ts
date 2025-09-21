// types for fetchIconPages
export type FetchIconPage = {
	// for GitHub must be the RAW file.
	url: string;
	path: string;
	stripImports?: string[];
	stubTypes?: [string, string][];
};

// icon metadata type
export type IconMetadata = { url?: string; source?: string; desc?: string };

export type IconInfo = Record<string, IconMetadata>;

export type MarkDownBlob = string | string[] | { file: string };

// top-level group type
export type IconGroup = {
	group: string;
	header?: MarkDownBlob;
	footer?: MarkDownBlob;
	icons?: string[];
	subgroups?: IconGroup[];
};

export type IconGroups = IconGroup[];

// main config type
export type Config = {
	fetchIconPages: FetchIconPage[];
	iconsPerRow: number;
	svgWidth: number;
	svgHeight: number;
	svgViewBox: string;
	svgColor: string;
	rootPath: string;
	iconsPath: string;
	markdownPartialsPath: string;
	markdownPath: string;
	markdownPage?: {
		header?: MarkDownBlob;
		footer?: MarkDownBlob;
	};
	iconGroupStartLevel: number;
	iconInfo?: IconInfo;
	iconGroups?: IconGroups;
};
