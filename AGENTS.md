# JASON-OS Codex instructions

JASON-OS is a portable operating-system layer for coding agents. This repository
is the Codex-run variant; keep Codex-specific setup and instructions explicit and
do not put credentials in the repository.

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

## Repository boundaries

- Preserve the existing `.claude/` system while the Codex port is developed;
  migrate behavior deliberately rather than deleting the source system.
- Keep Codex instructions in `AGENTS.md` and Codex configuration under
  `.codex/` when project-local configuration is required.
- Do not modify unrelated user changes or rewrite generated lockfiles without
  an explicit dependency change.
