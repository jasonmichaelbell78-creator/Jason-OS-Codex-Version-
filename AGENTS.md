# JASON-OS Codex instructions

JASON-OS is a portable operating-system layer for coding agents. This repository
is the Codex-run variant; keep Codex-specific setup and instructions explicit and
do not put credentials in the repository.

## Runtime transition

- `.claude/` remains the preserved Claude implementation while Codex support is
  developed. Do not delete, move, or casually rewrite it.
- Keep Codex-native runtime configuration under `.codex/` only when a ported
  capability requires it. Do not copy Claude `settings.json` directly.
- Shared Node helpers, Husky hooks, schemas, plans, and research artifacts stay
  outside either runtime directory unless a deliberate architecture decision
  says otherwise.
- The port contract and asset-by-asset status live in
  `.planning/codex-port/`. Consult them before porting a Claude capability.
- Local Claude-memory data from the operator's home computer is unavailable in
  this Codespace. Do not infer, recreate, or migrate it; the memory-data port
  is deferred until the operator supplies that source material.

## Setup

- Use the repository dev container when working in GitHub Codespaces.
- The container installs the Codex CLI, GitHub CLI, Python 3, Gitleaks,
  `ripgrep`, and `jq`.
- Go and the Claude statusline are intentionally not required by this variant.
- Run `npm ci` after a fresh checkout or dependency-lockfile change.
- Run `npm run schema:validate` to validate the synchronization schema.
- Authenticate Codex interactively with `codex login`, or provide
  `OPENAI_API_KEY` as a GitHub Codespaces secret. Never commit `.env` files,
  tokens, or generated auth state.

## Operating Codex here

- `AGENTS.md` is the durable Codex instruction entrypoint. `CODEX-SETUP.md`
  is the operator guide and current Claude-to-Codex difference reference.
- Until a workflow appears under `.agents/skills/` and passes its smoke test,
  a same-named `.claude/skills/` workflow is Claude-only; do not claim that it
  is already available as a Codex skill.
- Prefer the narrowest approval, sandbox, filesystem, and network access that
  completes the task. Treat escalation prompts as an operator decision.
- Use `git status` before and after changes. Run `npm run schema:validate`
  after schema-related work and after each port batch.

## Repository boundaries

- Do not modify unrelated user changes or rewrite generated lockfiles without
  an explicit dependency change.
