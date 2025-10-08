# Windows Development Setup

This [snippet](https://github.com/apathetic-tools/snippets) was created by 😐 [Apathetic Tools](https://github.com/apathetic-tools), with thanks to the [Astro Docs](https://github.com/withastro/docs) for much inspiration.  
<sub>Guide licensed [CC BY-NC](../../../LICENSE-CONTENT) · Code snippets [MIT](../../../LICENSE)</sub>

## The Paved Road

Developers typically have very personalized preferences, but when working with others, it’s more important to have a **known working setup** that results in consistent code for the team.  

Don’t argue over developer setups — provide a "paved road" that maximizes the developer experience (DX).


## Software
- [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install)

  Linux is the de facto standard for production servers. Running development in WSL ensures consistency with production environments and gives a good balance between Windows and Linux tooling.

- [Ubuntu-latest for WSL (via ms store)](https://apps.microsoft.com/detail/9pdxgncfsczv)

  Provides a stable Linux environment with minimal setup required. Works reliably out of the box.

- [VSCode](https://apps.microsoft.com/detail/xp9khm4bk9fz7q)

  A popular, accessible editor. While VIM and other editors are powerful, VSCode is easier for most developers to onboard quickly.

## Where to put project code

- Prefer an **SSD** for your project files — it significantly affects build times, especially with dependency-heavy environments like JavaScript or PHP.
- Store projects **inside the WSL filesystem** for maximum speed.  
  Example structure: `/home/<your-user>/code/<your-project>` or shorthand `cd ~/code/<your-project>`.

## Accessing WSL from Windows Explorer

- You can access WSL paths via: `\\wsl.localhost\`.  
  Example: `\\wsl.localhost\Ubuntu\home\<wsl-user>\code\<project-repo>`  
- Pin this path in Windows Explorer for convenience.  
- Some programs (e.g., TortoiseGit) may require marking it as a safe path since it behaves like a network location.

## Projects and VSCode

### VSCode Workspace shortcut

Create a workspace file (`workspace.code-workspace`) to allow opening a project quickly in a dedicated VSCode window:
```json
{
	"folders": [
		{
			"path": ".",
		},
	],
}
```

- Double-clicking this file in Windows Explorer opens the project in VSCode.
- You may be prompted to reopen in WSL — a simple two-click solution.

---

### Git ignore

Recommended *partial* `.gitignore` for a Windows + WSL project:
```gitignore
# Inspired by Apathetic Tools · MIT
# https://github.com/apathetic-tools/snippets/blob/main/docs/windows/development-setup

# build output
dist/

# Environment variables
.env
.env.production
!.env.example

# IDE configs
.vscode/*
.idea/
.vimrc
.nanorc
.stackblitzrc
sandbox.config.json

# Allow Local workspace settings
!.vscode/extensions.json
!.vscode/launch.json
!.vscode/settings.json

# OS files
.DS_Store
Thumbs.db
```

---

### VSCode Project Configuration

Include the following in your project `.vscode` folder:
- `.vscode/extensions.json`: recommended extensions
- `.vscode/launch.json`: shortcuts to start dev/build processes
- `.vscode/settings.json`: editor defaults, linting, formatting, etc.

---

### Recommended VSCode Extensions

`.vscode/extensions.json`:
```json
{
  "recommendations": [    
    "editorconfig.editorconfig",    
    "ms-vscode-remote.remote-wsl",    
    "bierner.github-markdown-preview"
  ],
  "unwantedRecommendations": []
}
```

  - [editorconfig.editorconfig](https://marketplace.visualstudio.com/items?itemName=editorconfig.editorconfig): `.editorconfig` consistent editor defaults
  - [ms-vscode-remote.remote-wsl](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl): WSL remote development
  - [bierner.github-markdown-preview](https://marketplace.visualstudio.com/items?itemName=bierner.github-markdown-preview): enhanced GitHub markdown preview pack

#### Per-workspace extensions:
Install extensions globally but disable them. Then right-click → **Enable (in workspace)** to scope them to your project only.


## Project and Editor Defaults
Provide consistent editor defaults using `.editorconfig`:
```editorconfig
# EditorConfig is awesome: https://EditorConfig.org

# Inspired by Apathetic Tools · MIT
# https://github.com/apathetic-tools/snippets/blob/main/docs/windows/development-setup

# top-most EditorConfig file
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = tab
insert_final_newline = true
trim_trailing_whitespace = false

[{.*,*.md,*.mdx,*.json,*.toml,*.yml,}]
indent_style = space
```

- Ensures consistent formatting across multiple editors.
- Focus on consistency rather than personal preferences.

---

✅ Following this guide will provide a solid, consistent development environment on Windows with WSL and VSCode.

**📚 Inspiration and Sources**
- [Astro Docs · .gitignore](https://github.com/withastro/docs/blob/main/.gitignore) · MIT
- [Astro Docs · .editorconfig](https://github.com/withastro/docs/blob/main/.editorconfig) · MIT
- [VSCode · .editorconfig](https://github.com/microsoft/vscode/blob/main/.editorconfig) · MIT

✨ *ChatGPT was used to help draft language, formatting, and code — plus we just love em dashes.*

<p align="center">
  <sub>😐 <a href="https://github.com/apathetic-tools">Apathetic Tools</a> © 
  Guide <a href="../../../LICENSE-CONTENT">CC&nbsp;BY-NC</a> · 
  Code <a href="../../../LICENSE">MIT</a></sub>
</p>