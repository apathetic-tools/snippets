import { Config } from './types.ts';
import { iconInfo } from './iconInfo.ts';
import { iconGroups } from './iconGroups.ts';

export const config: Config = {
	fetchIconPages: [
		{
			url: 'https://raw.githubusercontent.com/withastro/starlight/refs/heads/main/packages/starlight/components/Icons.ts',
			path: '.cache/components/',
		},
		{
			url: 'https://raw.githubusercontent.com/withastro/starlight/refs/heads/main/packages/starlight/user-components/file-tree-icons.ts',
			path: '.cache/user-components/',
			stripImports: ['./rehype-file-tree.ts'],
			stubTypes: [['Definitions', 'any']],
		},
	],
	iconsPerRow: 4,
	svgWidth: 32,
	svgHeight: 32,
	svgViewBox: '0 0 24 24',
	svgColor: '#666666',
	rootPath: '../..',
	iconsPath: './assets/icons',
	markdownPartialsPath: './assets/partials',
	markdownPath: './README.md',
	markdownPage: {
		header: { file: 'pageHeader.partial.md' },
		footer: { file: 'pageFooter.partial.md' },
	},
	iconGroupStartLevel: 3,
	iconInfo,
	iconGroups,
};

export default config;
