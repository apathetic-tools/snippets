# Git – Per Repository User

This [snippet](https://github.com/apathetic-tools/snippets) is by [Apathetic Tools](https://github.com/apathetic-tools), [LICENSE](../LICENSE) MIT.

You can configure git to use a different user per repository. This can be important if you have multiple accounts, say between github and gitlab, or even multiple accounts on github, say for work or personal.

After checking out a project, edit `.git/config`, after the `[core]` section but before the `[remote "origin"]` insert the following:
```
[user]
	name = <username>
	email = <email>
```

## Github anonymous email

If you like you can use your github user email to mask your real email address.

On github, click to top right `user profile picture` menu → `Settings` → `Access` sidebar group` → `Emails`.

Turn on `Keep my email addresses private`, it should mention in the paragraph your new private email address. You can use it in the configuration above instead of your real email address. It will only apply to any commits you make from this point on, not previous ones.

It also has instructions for using it globally for all of git if that is what you want, but that may not make sense if you ever work on repos not hosted on github.