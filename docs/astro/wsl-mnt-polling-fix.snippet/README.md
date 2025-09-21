# WSL /mnt Polling Fix

Fix hot-reloading issues in Astro projects under WSL when working from the Windows-mounted `/mnt` filesystem.

This [snippet](https://github.com/apathetic-tools/snippets) is by 😐 [Apathetic Tools](https://github.com/apathetic-tools) · [MIT License](../../LICENSE).

When using the [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install) with the [Astro web framework](https://astro.build/), hot reloading may fail if your project is stored on the Windows filesystem (`/mnt/...`) instead of the WSL filesystem. 
You’ll typically notice this when running `pnpm run dev`.

> ⚡ **Recommendation:** For best performance, run your project from the WSL filesystem. It avoids this issue entirely and is much faster. See [Windows Development Setup](../windows/development-setup) for details.

If you still want to work from `/mnt/...`, you can apply this Vite polling fix. It enables polling only when the project is running under WSL and located on the Windows-mounted filesystem.

---

## Setup


Install [`is-wsl`](https://www.npmjs.com/package/is-wsl) with your preferred  package manager to detect whether you’re inside WSL:


```bash
pnpm add is-wsl
```

Then update your `astro.config.mjs` (or `.ts`, etc.):

```js
import { defineConfig } from 'astro/config';
import isWsl from 'is-wsl';

export default defineConfig({
    vite: {
        server: {
            watch: {
                // Workaround for WSL + /mnt/ watch issues (prefer WSL fs instead). Inspired by Apathetic-Tools · MIT
                // https://github.com/apathetic-tools/snippets/blob/main/docs/astro/wsl-mnt-polling-fix
                // https://github.com/withastro/astro/issues/6043#issuecomment-1409498718
                // https://github.com/microsoft/WSL/issues/4739#issuecomment-2153546812
                ...((isWsl && process.cwd().startsWith('/mnt'))
                    ? { usePolling: true, interval: 1000 }
                    : {}),
            },
        },
    },
});
```

✅ With this in place, hot reloading should work again on projects in WSL running under `/mnt/...`.

---

> **Inspired by / Attribution:**  
> This snippet was inspired by the following sources:
> - withastro/astro: [issues/6043#issuecomment-1409498718](https://github.com/withastro/astro/issues/6043#issuecomment-1409498718)
> - microsoft/wsl: [issues/4739#issuecomment-2153546812](https://github.com/microsoft/WSL/issues/4739#issuecomment-2153546812)
>
> ✨ *ChatGPT was used to help draft language, formatting, and code — plus we just love em dashes.*