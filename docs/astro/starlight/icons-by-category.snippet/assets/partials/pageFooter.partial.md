
## How to use built-in Icons

Quickly find where to use built-in Starlight icons:
- 🖼️ [Icons Reference](https://starlight.astro.build/reference/icons)  
- 🛠️ [Icon Component](https://starlight.astro.build/components/icons/)  
- 📋 [Aside Component](https://starlight.astro.build/components/asides/)  
- 📝 [Aside in Markdown](https://starlight.astro.build/guides/authoring-content/#asides)  
- 🎴 [Cards Component](https://starlight.astro.build/components/cards/)  
- 🌟 [Hero Component](https://starlight.astro.build/reference/frontmatter/#hero)  

## Using Custom Icons

### 🚀  Astro Icons integration

The [Astro Icons](https://www.astroicon.dev/) integration lets you:

- 🏠 Use local custom icons  
- 🌐 Any icon from [Iconify Icon Sets](https://icon-sets.iconify.design/) or [Icônes](https://icones.js.org/)  

> ⚠️ Note: These icons **won’t automatically work** with built-in Starlight components. Use them in your own components or the alternative [Icon component](https://www.astroicon.dev/guides/components).  

- 🔄 You *can* override Starlight components to replace built-in icons with your custom icons using [component overrides](https://starlight.astro.build/guides/overriding-components/).

### 📦 Starlight Markdown Blocks integration

The [Starlight Markdown Blocks](https://delucis.github.io/starlight-markdown-blocks/) integration overrides the starlight Aside component and changed it to allow:

- 🏠 Use local custom icons  
- 🛠️ Use any Icon component including alternatives
- ✏️ Use **text strings**, including **UTF-8 Emoji** 

## 😎 Using UTF-8 Emoji as Icons

- ✅ Emoji can stand in for icons in markdown or *Starlight Markdown Blocks* Asides
- ⚠️ Appearance may differ across platforms; use SVGs for a **consistent look**  

See our [UTF-8 Emoji Icon List Snippet](../../../../docs/utf8-emoji-icons-by-category.snippet) for inspiration.

---

🎉 With these options, your site will be visually polished in no time!

> **Inspired by / Attribution:**  
> This snippet was inspired by the following MIT-licensed sources:
> - [withastro/starlight: Icon Reference](https://starlight.astro.build/reference/icons/)
> - [withastro/starlight: Icons.ts](https://github.com/withastro/starlight/blob/main/packages/starlight/components/Icons.ts)
> - [withastro/starlight: file-tree-icons.ts](https://github.com/withastro/starlight/blob/main/packages/starlight/user-components/file-tree-icons.ts)