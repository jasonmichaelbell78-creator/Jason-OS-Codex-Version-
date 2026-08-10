# Codex Codespaces setup

This repository is designed to run from GitHub Codespaces through the checked-in
`.devcontainer/` definition.

## Included in the container

- Node.js 22, matching `.nvmrc` and the package engine requirement
- Codex CLI `0.147.0`
- GitHub CLI
- Python 3
- Gitleaks `8.29.1`, used by the repository's pre-commit hook
- `ripgrep` and `jq`
- Automatic `npm ci` after container creation

Go and the Claude statusline are intentionally not part of this Codex container.

## First run

1. Reopen the repository in its dev container.
2. Authenticate with `codex login`, or add `OPENAI_API_KEY` under the Codespace
   **Secrets** settings and recreate the Codespace.
3. Run `npm run schema:validate`.

For GitHub operations, authenticate the CLI separately with `gh auth login` (or
provide a scoped `GH_TOKEN` Codespaces secret).

Authentication is intentionally not stored in Git. Do not add API keys to
`.env` files or commit local Codex state.

## Deliberate follow-up decisions

- Which Claude Code skills, agents, hooks, and memory files should have Codex
  equivalents, and which should remain shared source material?
- Should project-local Codex configuration live in `.codex/`, or should all
  configuration remain in the Codespace user's `CODEX_HOME`?
- Which external services need Codespaces secrets or MCP servers?
- Which recurring checks should become `npm` scripts or GitHub Actions?
