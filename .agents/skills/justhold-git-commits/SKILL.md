---
name: justhold-git-commits
description: >-
  Write JustHold git commits as a step narrative — many small conventional
  commits that show how we got here. Use when the user asks to commit, split
  commits, write a commit message, or review commit history style.
license: MIT
metadata:
  author: 1chooo
  version: "1.0.0"
---

# JustHold Git Commits

Also follow the always-on rule `.cursor/rules/git-commits.mdc`.

## Principle

We are not afraid of many commits. Each commit is a **step**. Reading `git log` should reconstruct the path that brought us here — not a single opaque dump.

## When to use

- User asks to commit, amend (only if allowed), or draft commit messages
- Splitting a large diff into reviewable steps
- Matching existing JustHold commit voice before opening a PR

## Format

```
type(scope): imperative summary

Optional body: why this step matters, or what remains intentional.
```

| Piece | Convention |
|-------|------------|
| Type | `feat` `fix` `refactor` `style` `docs` `test` `chore` |
| Scope | Usually `web`, `tokens`, `agents`, `mobile` |
| Subject | Imperative, concise, no trailing period |
| Body | 1–2 sentences of **why** / intent — not a file inventory |

## Splitting workflow

When the working tree mixes concerns:

1. Group by **one step** (one UI surface, one API layer, one docs pass).
2. Stage only that group; commit with a message that names the step.
3. Repeat until the tree is clean.
4. Prefer a short chain over one mega-commit.

**Example chains from this repo:**

- Member top-nav: nav items → account menu → header chrome → drop sidebar → docs
- Drop desktop intros: Overview → Holdings → Big Money → Tools → Public (each its own commit)
- Sans headings: tokens/shared → member → admin → vault/tools

## Message checklist

- [ ] Subject alone makes the step clear in `git log --oneline`
- [ ] Body answers "why this step?" when non-obvious
- [ ] No unrelated files in the same commit
- [ ] Still only commit when the user explicitly asks

## Anti-patterns

| Avoid | Prefer |
|-------|--------|
| `update stuff` / `misc fixes` | Named step + scope |
| One commit for 5 pages | One commit per page/step |
| Body that lists every file | Body that states intent |
| Squashing away intermediate steps before PR (unless asked) | Keep the narrative |

## Examples

**Good**

```
feat(web): return asset category from stock quote API

Expose the category already resolved by lookupSymbol so Big Money can
autofill investment category from the same quote request used for price.
```

```
refactor(web): drop Tools page desktop intro

Start with the tool cards; nav already labels the page.
```

**Bad**

```
chore: cleanup
```

```
refactor(web): remove headers and fix layout and update docs
```
