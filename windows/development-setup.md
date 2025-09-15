# Windows Development Setup

This [snippet](https://github.com/apathetic-tools/snippets) is by [Apathetic Tools](https://github.com/apathetic-tools), [LICENSE](../LICENSE) MIT.

## Paved Road

Developers typically have very personalized preferences, but when working with others, it is more important that developers have a known working setup that results in consistent code for the team. Don't spend arguments on developer setups, just ship a "paved road" that includes as much of the developer experience (DX) as possible.

## Software
- [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install)

Linux is the de facto standard for production server environments, so running your development environment on it will maximize consistensy of results. WSL provides a good middleground of both worlds.

- [Ubuntu-latest for WSL (via ms store)](https://apps.microsoft.com/detail/9pdxgncfsczv)

Ubuntu is a good out of the box linux environment that should "just work" with minimal setup, unlike other popular choises.

- [VSCode](https://apps.microsoft.com/detail/xp9khm4bk9fz7q)

VSCode is a popular choice that is accessible to the most developers. VIM (and its derivatives), while fantastic, are not. 

## Where to put project code

We highly recommend putting your project code on an SSD, it will significantly affect build times during dev, especially with high number of dependencies or package managers, like you find in Javascript or PHP projects.

You should also see great speed increases for keeping your files inside the WSL filesystem which is separate from the windows one. We recommend each project as a subfolder of a directory in home. So `/home/<your user>/code/<your project>`, or `cd ~/code/<your project>` where `~` is shorthand for your user home directory.

## Accessing WSL from Windows Explorer

You can access your WSL from the host windows environment, for example in `Windows Explorer` by using the path: `\\wsl.localhost\`. For example you might pin the following folder in Windows Explorer: `\\wsl.localhost\Ubuntu\home\<wsl user>\code\<project repo>`.

Certain programs (e.g. `TortoiseGit`) may require you to "safe" the `\\wsl.localhost` path as it looks like a network path.

## Projects and VSCode

If you pick VSCode, then we suggest your project include a few things:

### Workspace shortcut

`workspace.code-workspace` ([ours](../workspace.code-workspace))
```
{
	"folders": [
		{
			"path": ".",
		},
	],
}

All this does is make it so that in `Windows Explorer` you can double click this file and have a separate vscode window with your project open. A popup may ask you to re-open in WSL, but that's a two-click solution that gets people going quickly.

```

### Git ignore

`.gitignore` ([ours](../.gitignore))
```git
# environment variables
.env
.env.production
!.env.example

.vscode/* # we want to encourage vscode usage
.idea/
.vimrc
.nanorc
.stackblitzrc
sandbox.config.json

# Add local workspace settings
!.vscode/extensions.json
!.vscode/launch.json
!.vscode/settings.json

# macOS-specific files
.DS_Store
```

### VSCode project configurtation
Notice how we are specifically allowing checking of three files in the `.vscode` IDE folder:
- `.vscode/extensions.json`: provides a list of recommended vscode extensions you use for your project
- `.vscode/launch.json`: shortcut for starting your development server or build, if applicable
- `.vscode/settings.json`: Use this to configure vscode to work out of the box with your various linting and formatting tools integrated into your project.

### VSCode recommended extensions

We recommend almost every windows project have the following recommended extensions:
`.vscode/extensions.json`
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

  - [editorconfig.editorconfig](https://marketplace.visualstudio.com/items?itemName=editorconfig.editorconfig): `.editorconfig` consistent defaults
  - [ms-vscode-remote.remote-wsl](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl): WSL remote editing / shells
  - [bierner.github-markdown-preview](https://marketplace.visualstudio.com/items?itemName=bierner.github-markdown-preview): github markdown preview enhancer pack

### How to enable per-workspace extensions
We recommend you direct developers to install extensions, but "disable" them immediately. Then right click them and "Enable (in workspace)". That way the extension will only run in this workspace.

## Project and Editor Defaults

A good way to provide good editor defaults to a wide range of editors is `.editorconfig`, supported often with plugins for a wide range of IDEs. Your defaults don't matter so much, just that you have them, so you can get on with working on the project and have everything inside your project files consistent.

Our recommended `.editorconfig` ([ours](../.editoronfig))
```
# EditorConfig is awesome: https://EditorConfig.org

# derived from withastro/docs MIT
# https://github.com/withastro/docs/blob/main/.editorconfig
# derived from microsoft/vscode MIT
# https://github.com/microsoft/vscode/blob/main/.editorconfig

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