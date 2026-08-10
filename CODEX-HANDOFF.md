# JASON-OS Codex handoff checkpoint

Checkpoint date: 2026-08-10

This file records the current Codex-version setup so work can move into a
GitHub Codespace without relying on the current chat session.

## Completed locally

- Cloned the original repository into `jason-os-codex-version`.
- Added a Codespaces definition under `.devcontainer/`.
- Added Codex CLI `0.147.0` to the container.
- Added Node.js 22, Python 3, GitHub CLI, Gitleaks `8.29.1`, `ripgrep`, and
  `jq`.
- Added checksum verification for the Gitleaks release asset.
- Updated the pre-commit hook from the removed `gitleaks protect` command to
  `gitleaks git --staged`.
- Added `AGENTS.md` and `CODEX-SETUP.md` with Codex-specific operating notes.
- Intentionally did not add Go or make the Claude statusline a container
  dependency.

## Validation completed

- Docker image build passed.
- Container smoke test passed for Node, Python, Codex, Gitleaks, `rg`, and `jq`.
- `npm ci --ignore-scripts --dry-run` passed.
- `npm run schema:validate` passed.

The original repository's broader Node test sweep still has pre-existing
failures in four test files; those are documented in the working-session
notes and are not part of the container setup change.

## Authentication boundary

- Run `codex login` directly inside the new Codespace.
- Run `gh auth login` separately for GitHub CLI operations.
- Do not copy `.codex`, `.claude` user state, API keys, local statusline config,
  or other credential files into Git.
- Recreate required GitHub Actions or Codespaces secrets through GitHub's
  settings; secret values are not stored in this repository.

## Publishing handoff

At checkpoint creation, the local `main` branch still tracks the original
repository's `origin/main`. The Codex setup files are not yet committed or
published to `jason-os-codex-version`.

After authenticating GitHub, create or select the new private repository and
publish this checkout. Then start the Codespace from that remote repository and
read this file, `AGENTS.md`, and `CODEX-SETUP.md` first.
