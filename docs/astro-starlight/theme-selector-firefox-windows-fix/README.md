# Theme Selector fix for Firefox on Windows

Fix theme selector menu rendering issues in **Firefox on Windows** when using dark mode with [Starlight](https://starlight.astro.build/).

This [snippet](https://github.com/apathetic-tools/snippets) was created by 😐 [Apathetic Tools](https://github.com/apathetic-tools).  
<sub>Guide licensed [CC BY-NC](../../../LICENSE-CONTENT) · Code snippets [MIT](../../../LICENSE)</sub>

## Problem

In Firefox on Windows, the default Starlight theme has a bug in dark mode:

- The theme selector `<select>` menu has a **white background**.  
- Checked and hover states render with **white text on white background**, making them illegible.

You can observe the issue on sites such as the [official Astro Docs site](https://docs.astro.build/) or the [Starlight preview site](https://astro.new/latest/preview/starlight-basics/), though behavior may vary depending on your setup.

On Firefox on Windows, if the problem is occurring, it should look something like:

![**Before** fix: white text on white background in theme selector](./theme-selector-firefox-windows-fix-assets/theme-selector-bad-colors.png)

## Upstream References
- [Firefox bug #1810958](https://bugzilla.mozilla.org/show_bug.cgi?id=1810958)
- [Starlight discussion #3180](https://github.com/withastro/starlight/discussions/3180)
- [Starlight issue #3426](https://github.com/withastro/starlight/issues/3426)  

## Workaround

> [!TIP]
> Apply this workaround only if you need it immediately. The Firefox team may fix [this problem](https://bugzilla.mozilla.org/show_bug.cgi?id=1810958) (+2y open), or Starlight team may provide an official workaround in the future — follow the [discussion #3180](https://github.com/withastro/starlight/discussions/3180) for updates.

1. Add a `customCss` key to your Starlight integration in `astro.config.mjs` (`.ts`, etc.) if you don’t already have one:

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      customCss: ['./src/styles/global.css'],
    }),
  ],
});
```

2. Import a new `theme-menu-layer.css` file in your `global.css`. 

If using [Tailwind](https://docs.astro.build/en/guides/styling/#tailwind), adjust your `src/styles/global.css` like this:

```css
/* Insert `our-theme-menu` after `starlight` and before `theme` in your own layer list */
@layer base, starlight, our-theme-menu, theme, components, utilities;

@import '@astrojs/starlight-tailwind';
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);

/* Import our theme fix */
@import './theme-menu-layer.css' layer(our-theme-menu);
```

If you don't use Tailwind, simply import `./theme-menu-layer.css` from your `global.css` stylesheet.

3. Create the workaround CSS at `src/styles/theme-menu-layer.css`:
`src/styles/theme-menu-layer.css`
```css
/* 
 * Fix: Dark mode theme selector menu in Firefox on Windows. Inspired by Apathetic Tools · MIT
 * https://github.com/apathetic-tools/snippets/blob/main/docs/astro-starlight/theme-selector-firefox-windows-fix
 * Ref: https://github.com/withastro/starlight/blob/main/packages/starlight/components/ThemeSelect.astro
 */
@layer our-theme-menu;

[data-theme='dark'] starlight-theme-select {
	& select,
	& select option,
	& select option:checked {
		background-color: var(--sl-color-gray-6);
		color: var(--sl-color-text);
	}
	
	& select option:hover {
		background-color: var(--sl-color-accent-high);
		color: var(--sl-color-text-invert);
	}
}
```

⚠️ Test across multiple browsers, screen widths, and themes to ensure consistency with your color palette.

On Firefox on Windows, the fix should now look something like:

![**After** fix: dark background with readable text in theme selector](./theme-selector-firefox-windows-fix-assets/theme-selector-fixed-colors.png)

## Optional: Restrict Fix to Firefox Only

> [!WARNING]  
> Targeting Firefox or Windows only is non-standard and may break whenever Firefox updates.

To restrict the fix to Firefox on Windows (more brittle), wrap the rules:

```css
@-moz-document url-prefix() {
  @media screen and (-moz-platform: windows) {
    /* Insert the theme menu fix here */
  }
}
```

---

✅ With this applied, the theme selector will be legible again in Firefox on Windows dark mode.

**📚 References and Credits**

- [Starlight · ThemeSelect.astro](https://github.com/withastro/starlight/blob/main/packages/starlight/components/ThemeSelect.astro)
- [Firefox bug #1810958](https://bugzilla.mozilla.org/show_bug.cgi?id=1810958)
- [Starlight issue #3426](https://github.com/withastro/starlight/issues/3426)  
- [Starlight discussion #3180](https://github.com/withastro/starlight/discussions/3180)

> ✨ *ChatGPT was used to help draft language, formatting, and code — plus we just love em dashes.*

<p align="center">
  <sub>😐 <a href="https://github.com/apathetic-tools">Apathetic Tools</a> © 
  Guide <a href="../../../LICENSE-CONTENT">CC&nbsp;BY-NC</a> · 
  Code <a href="../../../LICENSE">MIT</a></sub>
</p>
