# Contributing to Starlight Icons by Category ✨

This snippet builds an auto-generated reference of Starlight’s built-in icons, grouped by category.  
Use these tools to update the icon data or regenerate the final snippet README.

## Folder structure

icons-by-category/
  README.md       -- the auto-generated snippet
  CONTRIBUTING.md -- this document
  assets/
    icons/        -- where downloaded SVGs from Starlight live
    partials/
      pageHeader.partial.md -- text above the starlight icon categories
      pageFooter.partial.md -- text below the starlight icon categories
  scripts/
    generate-snippet/
      .cache/          -- where downloaded copies of starlight's icon lists go
      config/
        config.ts      -- general config settings
        iconGroups.ts  -- defines icon categories and what icons belong to them
        iconInfo.ts    -- each icon's `url` (product or company page), `source` (svg source), `desc` (short description)
        fetch-icons.ts -- download icon lists into `icons-by-category/scripts/generate-snippet/.cache`
        save-icons.ts  -- save icons from `.cache/` to `./assets/icons/`
        generate-markdown.ts -- generate `/README.md` from all parts

> [!WARNING]
> Do not edit `/README.md` directly; it will be overwritten the next time you run `pnpm run generate`.

## Setup

```bash
pnpm install
```

## Commands summary

`pnpm run <command>`

| Command | Action |
|---------|--------|
| `pnpm run rebuild` | Full update: fetch → save → generate |
| `pnpm run fetch` | Download icon lists into `/scripts/generate-snippet/.cache/` |
| `pnpm run save` | Save icons from `.cache/` to `./assets/icons/` |
| `pnpm run generate` | Generate `README.md` from all parts |
| `pnpm run clean` | Remove old icons from `./assets/icons/` |
| `pnpm run format` | Format code |

## Update and rebuild entire snippet

```bash
pnpm run rebuild
```

## Download updated icon lists into `/scripts/generate-snippet/.cache/`

Saves `Icons.ts` and `file-tree-icons.ts` into `/scripts/generate-snippet/.cache`.

```bash
pnpm run fetch
```

## Save icons into `/assets/icons`

> [!TIP]  
> You must run `clean` to remove unused icons from the folder first.

```bash
pnpm run save
```

## Generate README

Will pull all the parts together to generate the final `/README.md` file.

```bash
pnpm run generate
```

## Clean out old icons

Removes existing icons from `/assets/icons/` prior to saving new ones. Does **not** clean out `/scripts/generate-snippet/.cache`. If it re-writes the same icons, then they will not show up as changed in git.

```bash
pnpm run clean
```

## Format code

```bash
pnpm run format
```

---

> [!WARNING]
> This snippet is partially generated. Follow the instructions above to update icons or text, then submit a pull request! 🎉

> ✨ *ChatGPT was used to help draft language, formatting, and code — plus we just love em dashes.*

<p align="center">
  <sub>😐 <a href="https://github.com/apathetic-tools">Apathetic Tools</a> © 
  Guide <a href="../../../LICENSE-CONTENT">CC&nbsp;BY-NC</a> · 
  Code <a href="../../../LICENSE">MIT</a></sub>
</p>
