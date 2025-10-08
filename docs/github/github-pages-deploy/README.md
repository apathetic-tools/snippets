# Github Pages Deploy

Deploy from any repo to any repo or server using Github Pages and custom deploy tasks.

This [snippet](https://github.com/apathetic-tools/snippets) was created by 😐 [Apathetic Tools](https://github.com/apathetic-tools) with thanks to [peaceiris](https://github.com/peaceiris) for their GitHub action.  
<sub>Guide licensed [CC BY-NC](../../../LICENSE-CONTENT) · Code snippets [MIT](../../../LICENSE)</sub>

## Setup dummy repos for testing

> [!IMPORTANT]  
> **Strongly recommended:** set up a dummy org/repos before attempting this on your production repos.  
That way you can safely experiment, troubleshoot, and mirror your final configuration.

Example setup:
- Org: `<someorg>`
- Repos:
  - `website-files`
  - `someorg.github.io`

Notes:
- For `someorg.github.io`, you may need to create a branch or trigger an action so it “wakes up”. Configure **Pages** under `Settings → Pages`.
- `website-files` does *not* need Pages enabled — just commit a dummy `dist/index.html` or `README.md` to test file copy and build triggers.
- The goal: confirm files are copied and a build runs, not to build a full site yet.

## Deploy within a single repo

This is the most common scenario. It’s simple, well supported, and flexible.

Options (from easiest to most customizable):
- **GUI method** — Configure under `Settings → Pages`. No keys or config files needed.
- **Workflow method** — Use a `.github/workflows/deploy.yml` with `GITHUB_TOKEN` and one of:
  - Framework-specific actions (e.g. [Astro GitHub Pages](https://docs.astro.build/en/guides/deploy/github/))
  - [actions/deploy-pages](https://github.com/marketplace/actions/deploy-github-pages-site)
  - [peaceiris/actions-gh-pages](https://github.com/marketplace/actions/github-pages-action)
  - [tschaub/gh-pages](https://github.com/tschaub/gh-pages?tab=readme-ov-file#github-pages-project-sites) 

## Deploy across repos or servers

Why you might need this:
- Source repo is private (unsupported by official methods on some accounts).
- You want to use `<org>.github.io` but keep your code in a different repo (avoids renaming repos later if you switch to a custom domain).
- You need to push to another server or service.

> [!NOTE]
> Official actions don’t support this at most account levels.  

Instead, use **SSH authentication** (*not* personal access tokens).

Options (from easiest to hardest):
- [peaceiris/actions-gh-pages](https://github.com/marketplace/actions/github-pages-action) with SSH keys ✅ (recommended)  
- [tschaub/gh-pages](https://github.com/tschaub/gh-pages) + [webfactory/ssh-agent](https://github.com/marketplace/actions/webfactory-ssh-agent)  
- [tschaub/gh-pages](https://github.com/tschaub/gh-pages) + manual SSH config ❌ (not recommended, brittle and error-prone)

We haven't researched if/how to do this with Github Apps, but it is not required at this time.

---

### Generating SSH keys (required)

All cross-repo/server methods require SSH keys.

**Best practices:**
- Generate fresh keys for this purpose only.  
- Do *not* reuse existing SSH keys.  
- Do *not* associate them with your GitHub account.  
- Do *not* use Personal Access Tokens (they expire).  

#### Step 1 — Create key pair

No passphrase (GitHub Secrets cannot handle prompts):

```bash
ssh-keygen -t ed25519 -a 100 -f path/to/keyfile -N "" -C "github-actions"
```

For older servers (not GitHub) that don’t support Ed25519:
```bash
ssh-keygen -t rsa -b 4096 -o -f path/to/keyfile -N "" -C "github-actions"
```

Output:
- Private key: <keyfile>
- Public key: <keyfile>.pub

If the private key contents doesn’t say `BEGIN OPENSSH PRIVATE KEY`, back it up and convert:
```bash
ssh-keygen -p -f path/to/your/key -m pem
```

#### Step 2 — Add private key as GitHub secret

Environment secrets are safer than repo/org secrets as they be explicitly requested by deploy actions.

In source repo:
1. Go to `Settings → Environments → github-pages → Environment secrets`.
2. Add secret:
    - Name: `ACTIONS_DEPLOY_KEY`
    - Value: contents of `<keyfile>` (not .pub)
3. Save.

> ℹ️ Ensure the file ends with a newline and uses Linux **LF** line endings.

#### Step 3 — Add public key as deploy key

In destination repo (if on GitHub):
1. Go to `Settings → Security → Deploy keys`.
2. Add new key:
    - Value: contents of `<keyfile>.pub`
    - Enable: **Write access**

For non-GitHub servers or services: add the public key to the server’s SSH access config. We unfortunately can't provide instruction for every service.

✅ At this point you have valid SSH keys, and they are configured. Test them in a dummy environment before production.

---

### Example: Using peaceiris/actions-gh-pages with SSH (recommended)

Documentation: 
- [peaceiris/actions-gh-pages](https://github.com/marketplace/actions/github-pages-action) with SSH keys

**Pros:**
- Single action that does everything (checkout → commit → push)
- GitHub Actions–native: built-in support for deploy_key, external_repository, Jekyll toggle, etc.
- Fewer moving parts → less chance of config errors
- Great default behavior for common GitHub Pages use cases

**Cons:**
- Opinionated defaults — less flexible if you need unusual workflows
- GitHub Actions only (not portable to other CI/CD)

Here’s an example working `.github/workflows/deploy.yml`:
```yml
# Deploy across repos or servers using peaceiris/actions-gh-pages over SSH
# Deploy inspired by Apathetic Tools · MIT
# https://github.com/apathetic-tools/snippets/blob/main/docs/github/github-pages-deploy
# See also: https://github.com/marketplace/actions/github-pages-action

name: Deploy to GitHub Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: [ main ]
  
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Allow this job to clone the repo and create a page deployment
# We only need read because ssh deploy key will have the write at the destination.
# If using `actions/deploy-pages` and `GITHUB_TOKEN`  to deploy to branch on the same repo you need write.
permissions:
  contents: read 
  # pages: write # since we are ssh pushing, don't need this
  # id-token: write # since we are ssh pushing, don't need this

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Single deploy job since we're just deploying
  deploy:
    runs-on: ubuntu-latest    
    # If you stored the secret in the environment
    environment: github-pages
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v4

      # - name: Build site
      #   run: pnpm run build
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: peaceiris/actions-gh-pages@v4
        with:
          deploy_key: ${{ secrets.ACTIONS_DEPLOY_KEY }}
          publish_branch: gh-pages
          publish_dir: ./dist
          enable_jekyll: true # false if using index.html
          external_repository: <user/org>/<deployment repo>
        if: ${{ github.ref == 'refs/heads/main' }} # only deploy if main branch changed
```

In production you will likely want to make a separate build job, then run deploy.

---

#### Alternative: tschaub/gh-pages + webfactory/ssh-agent

Documentation: 
- [tschaub/gh-pages)](https://github.com/tschaub/gh-pages?tab=readme-ov-file#github-pages-project-sites)
- [webfactory/ssh-agent](https://github.com/marketplace/actions/webfactory-ssh-agent)


**Pros:**
- CLI tool that can run anywhere (local scripts, other CI/CD, not just GitHub Actions)
- More granular control over deployment flow (what to publish, when, and how)
- Long track record outside of Actions

**Cons:**
- Requires stitching multiple 3rd-party actions together
- More moving parts → more opportunities for configuration and debugging headaches
- Steeper learning curve than peaceiris

See our [example working workflow](assets/examples/deploy-tschaub-webfactory.yml).

There is some troubleshooting steps in there to help you as you get things working. You can safely remove them once you have everything working.

---

#### Alternative: tschaub/gh-pages + manual SSH configuration (Not Recommended)

> [!WARNING]
> We cannot recommend this approach. Use only if you have a very specific reason and are prepared for extensive troubleshooting.

Documentation: 
- [tschaub/gh-pages](https://github.com/tschaub/gh-pages?tab=readme-ov-file#github-pages-project-sites)
- [Max Schmitt Github Actions SSH Key blog post](https://maxschmitt.me/posts/github-actions-ssh-key) by Max Schmitt

**Pros:**
- Maximum control — no reliance on 3rd-party actions to manage SSH
- Does not handoff SSH keys to 3rd party actions or programs
- Useful if you want to understand the internals of how deploys work
- Alternative to *webfactory/ssh-agent*

**Cons:**
- Very brittle and error-prone in GitHub Actions
- Difficult to get SSH agent working reliably (`$SSH_AUTH_SOCK` issues, agent propagation)
- No working example in this guide — we couldn’t get it stable despite extensive attempts

In our attempts, `$SSH_AUTH_SOCK` never propagated correctly. The blog post uses `SSH_AUTH_SOCK: /tmp/ssh_agent.sock` and `ssh-agent -a $SSH_AUTH_SOCK` so you may have more luck going back to that.

Nevertheless, see our [broken example draft workflow](assets/examples/deploy-tschaub-manual.yml) to get you started.

If you figure it out please let us know.

## Troubleshooting

We can’t offer case-by-case debugging, but:
- Dummy repos are your best friend.
- Errors are usually due to secrets formatting (newlines, LF/CRLF issues) or SSH agent setup.
- Don’t hesitate to ask a search engine or AI assistant for error-specific troubleshooting.

✅ With this, you can deploy Github Pages from any repo to any repo or server.

---

**📚 Inspiration and Sources**
- [GitHub Pages docs](https://docs.github.com/en/pages)
- [actions/deploy-pages](https://github.com/marketplace/actions/deploy-github-pages-site)
- [Astro Github Pages deploy guide](https://docs.astro.build/en/guides/deploy/github/)
- [peaceiris/actions-gh-pages](https://github.com/marketplace/actions/github-pages-action)
- [tschaub/gh-page](https://github.com/tschaub/gh-pages?tab=readme-ov-file#github-pages-project-sites)
- [webfactory/ssh-agent](https://github.com/marketplace/actions/webfactory-ssh-agent)
- [Github Community discussion #42772](https://github.com/orgs/community/discussions/42772#discussioncomment-14360018)
- [Max Schmitt: Github Actions SSH Key](https://maxschmitt.me/posts/github-actions-ssh-key)

✨ *ChatGPT was used to help draft language, formatting, and code — plus we just love em dashes.*

<p align="center">
  <sub>😐 <a href="https://github.com/apathetic-tools">Apathetic Tools</a> © 
  Guide <a href="../../../LICENSE-CONTENT">CC&nbsp;BY-NC</a> · 
  Code <a href="../../../LICENSE">MIT</a></sub>
</p>