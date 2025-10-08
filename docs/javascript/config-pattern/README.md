# Config Pattern for Astro

Organize your [Astro](https://astro.build/) (or other framework) configuration files into a `config/` folder for cleaner diffs, easier readability, and better project structure.

This [snippet](https://github.com/apathetic-tools/snippets) was created by 😐 [Apathetic Tools](https://github.com/apathetic-tools) with thanks to [Astro Docs](https://github.com/withastro/docs) for their example.  
<sub>Guide licensed [CC BY-NC](../../../LICENSE-CONTENT) · Code snippets [MIT](../../../LICENSE)</sub>

## Why Use This Pattern?

One of the main advantages is improved **diff readability**. By segmenting configuration into separate section files, diffs clearly apply only to those areas. It also makes it obvious when someone is modifying:

- Meta information about the project
- Framework integration or "glue" logic

This structure reduces errors and simplifies collaboration.

## Setup

1. **Create a `config/` folder** in your project. Common section examples from one of our [own astro-starlight projects](https://github.com/apathetic-idleon/guide) include:

`config/header.ts`
```ts
// Sometimes we need a unilingual site name for when i18n is not available
export const siteName = 'Apathetic Guide to IdleOn';

// Site title shown in the tab name and title bar (may contain more than just the name)
// Ref: https://starlight.astro.build/reference/configuration/#title-required
export const title = {
	en: 'Apathetic Guide to IdleOn',
};

// Ref: https://starlight.astro.build/reference/configuration/#logo
export const logo = {};

// Meta description for search engines (combined string for all languages, usually unilingual)
export const description = 'Gameplay guide to the IdleOn game.';
```

`config/hosting.ts`
```ts
/// Repository edit links
export const user = process.env.APP_USER ?? 'apathetic-idleon';
export const repo = process.env.APP_REPO ?? 'guide';
export const hostingSlug = user + '/' + repo;
export const source = process.env.APP_SOURCE ?? 'https://github.com/' + hostingSlug;
export const sourcePlat = process.env.APP_SOURCE_PLAT ?? 'GitHub';

/// Site URL
export const site = process.env.APP_SITE ?? 'https://' + user + '.github.io';
export const base = process.env.APP_BASE ?? '/';
export const siteUrl = process.env.APP_SITE_URL ?? site + base;
```

2. Create a `config/index.ts` to export all sections for convenience:

```ts
// Config Pattern for Astro. Inspired by Apathetic Tools · MIT
// https://github.com/apathetic-tools/snippets/blob/main/docs/astro/config-pattern
export * from './header';
export * from './hosting';
export * from './social';
export * from './translation';
export * from './sidebar';
export * from './blog';
```
Only include the files you have in your own project.

## Usage

You can import the configuration in any `.astro`, `.mdx`, or `astro.config.mjs` (`.ts`, etc.) file. For example:

```ts
import {
  siteName, title, description, base, site, source,
  social, defaultLocale, locales,
  sidebarConfig, sidebarOptions,
  author, authorSlug, blogName, blogSlug
} from './config';
```

Then use the variables wherever needed in your project.

---

✅ This pattern helps make your configuration modular, readable, and easier to maintain as your Astro project grows.

**📚 Inspiration and Sources**
- [Astro Docs· astro.config.ts](https://github.com/withastro/docs/blob/main/astro.config.ts) · MIT

✨ *ChatGPT was used to help draft language, formatting, and code — plus we just love em dashes.*

<p align="center">
  <sub>😐 <a href="https://github.com/apathetic-tools">Apathetic Tools</a> © 
  Guide <a href="../../../LICENSE-CONTENT">CC&nbsp;BY-NC</a> · 
  Code <a href="../../../LICENSE">MIT</a></sub>
</p>