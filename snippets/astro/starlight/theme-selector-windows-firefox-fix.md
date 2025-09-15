# Config Pattern for Astro

This [snippet](https://github.com/apathetic-tools/snippets) is by [Apathetic Tools](https://github.com/apathetic-tools), [LICENSE](../../../LICENSE) MIT.

This is a CSS fix for the theme selector menu in windows firefox for [Astro](https://astro.build/) projects using the [Starlight](https://starlight.astro.build/) integration/theme.


## Problem

In Firefox on windows, all starlight default themes have a problem with the theme selector menu in the header when displayed in dark mode. The `select` element background is white and the checked/hover option has white text on a white background, making it illegibile.

## Upstream Issues + Discussions

https://github.com/withastro/starlight/issues/3426
https://github.com/withastro/starlight/discussions/3180

## Workaround

in your `astro.config.ts`, add a `customCss` key to your Starlight integration if you don't already have one:

```ts
export default defineConfig({
    integrations: [
        starlight({
            customCss: [
                './src/styles/global.css',
            ],
    })],
});
```

You could use a different file if you like, but it works well if you have other css layers configured there.

If you have tailwind configured, your `src/styles/global.css` may look like:
```css
@layer base, starlight, our-theme-menu, theme, components, utilities;

@import '@astrojs/starlight-tailwind';
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);

@import './theme-menu-layer.css' layer(our-theme-menu);
```

If you don't, you likely only need to import the `./theme-menu-layer.css` file.

Here is the workaround. You may need to test it more extensively with your colour set, especially on different screen widths, mobile, and other browsers.

`src/styles/theme-menu-layer.css`
```css
/*
// Problem: The dark mode theme menu in the top right doesn't render properly in Firefox on Windows
// 
// Starlight Theme Menu Component, MIT: 
// Source: https://github.com/withastro/starlight/blob/main/packages/starlight/components/ThemeSelect.astro
*/ 

@layer our-theme-menu {
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
}
```

## Only target firefox

You could potentially wrap the rules in brittle hacky firefox+windows only rules:

```css
@-moz-document url-prefix() {
  @media screen and (-moz-platform: windows) {
    /* put the theme workaround code here */
  }
}
```