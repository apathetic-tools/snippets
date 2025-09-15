# Config Pattern for Astro

This [snippet](https://github.com/apathetic-tools/snippets) is by [Apathetic Tools](https://github.com/apathetic-tools), [LICENSE](../../LICENSE) MIT.

This is a common pattern for [Astro](https://astro.build/) projects but also more generally any framework project. It can help cleanup your framework configuration files tremeandously.

## Why?

One of the main advantages of this model is readability of diffs. You can segment your configuration into section files, so that diffs clearly apply only to those sections. You also make it clear if someone is modifying the meta information about your project, or the framework integration glue itself.

## Setup

Create a `config/` folder in your project. Common files may be:

`config/header.ts`
```ts
// sometimes we need a unilingual site name where i18n is not available
export const siteName = 'Apathetic Guide to IdleOn';

// The site Title, shown in the tab name and title bar, sometimes contains more than the name
// Ref: https://starlight.astro.build/reference/configuration/#title-required
export const title = {
	en: 'Apathetic Guide to IdleOn',
};

// Ref: https://starlight.astro.build/reference/configuration/#logo
export const logo = {};

// The meta description for search engines. A single combined string for all languages.
export const description = 'Gameplay guide to the IdleOn game.';
```

or `config/hosting.ts`
```ts
/// repo edit links
export const user = process.env.APP_USER ?? 'apathetic-idleon';
export const repo = process.env.APP_REPO ?? 'guide';
export const hostingSlug = user + '/' + repo;
export const source = process.env.APP_SOURCE ?? 'https://github.com/' + hostingSlug;
export const sourcePlat = process.env.APP_SOURCE_PLAT ?? 'GitHub';

/// site url
export const site = process.env.APP_SITE ?? 'https://' + user + '.github.io';
export const base = process.env.APP_BASE ?? '/';
export const siteUrl = process.env.APP_SITE_URL ?? site + base;
```

then for convenience and cleanliness, make a `config/index.ts` that exports them all:
```ts
export * from './header';
export * from './hosting';
export * from './social';
export * from './translation';
export * from './sidebar';
export * from './blog';
```
only include the files you have in your own site.

Finally, you can use this in any `.astro`, `.mdx`, or `astro.config.ts` file.

for example `astro.config.ts`
```ts
import {
  siteName, title, description, base, site, source,
  social, defaultLocale, locales,
  sidebarConfig, sidebarOptions,
  author, authorSlug, blogName, blogSlug
} from './config';
```

then use those variables.