# Git – Per Repository User

Configure Git to use a different user per repository — useful if you have multiple GitHub or GitLab accounts, or separate work/personal GitHub accounts.

This [snippet](https://github.com/apathetic-tools/snippets) was created by 😐 [Apathetic Tools](https://github.com/apathetic-tools).  
<sub>Guide licensed [CC BY-NC](../../../LICENSE-CONTENT) · Code snippets [MIT](../../../LICENSE)</sub>

## Setup

After checking out a repository, edit `.git/config` and add a `[user]` section after `[core]` but before `[remote "origin"]`:
```ini
[user]
	name = <username>
	email = <email>
```

This ensures commits from this repository use the specified username and email, overriding your global Git configuration.

## Using a GitHub Anonymous Email

GitHub lets you mask your real email address for privacy:

1. Click your profile picture → **Settings** → **Emails**.
2. Enable **Keep my email addresses private**.
3. Use the provided private GitHub email in your per-repo `[user]` section above.

> [!WARNING]
> This applies only to future commits in this repository. Previous commits remain unchanged.

If desired, you can also apply this globally for all repositories, but that may not be ideal if you work on non-GitHub repos with a different identity.

---

✅ With this, you can safely maintain multiple Git identities per repository.

**📚 Inspiration and Sources** 

- Various *blog* and *forum* posts over the years

✨ *ChatGPT was used to help draft language, formatting, and code — plus we just love em dashes.*

<p align="center">
  <sub>😐 <a href="https://github.com/apathetic-tools">Apathetic Tools</a> © 
  Guide <a href="../../../LICENSE-CONTENT">CC&nbsp;BY-NC</a> · 
  Code <a href="../../../LICENSE">MIT</a></sub>
</p>