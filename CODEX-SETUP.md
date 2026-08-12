# Operating JASON-OS with Codex

This repository is designed to run from GitHub Codespaces through the checked-in
`.devcontainer/` definition. It is a Codex migration in progress: Claude assets
remain available as preserved source material, while Codex-native workflows are
introduced and tested in batches.

For the migration boundary and the status of every asset, read:

- `.planning/codex-port/COMPATIBILITY_CONTRACT.md`
- `.planning/codex-port/MIGRATION_INVENTORY.md`

## Included in the container

- Node.js 22, matching `.nvmrc` and the package engine requirement
- Codex CLI `0.147.0`
- GitHub CLI
- Python 3
- Gitleaks `8.29.1`, used by the repository's pre-commit hook
- `ripgrep` and `jq`
- Automatic `npm ci` after container creation

Go and the Claude statusline are intentionally not part of this Codex container.

## First run in a Codespace

1. Reopen the repository in its dev container.
2. Prefer interactive authentication with `codex login`.
3. If API-key authentication is specifically needed, add `OPENAI_API_KEY` as a
   GitHub Codespaces secret and recreate the Codespace. Do not put it in a
   checked-in file, devcontainer config, or `.env` file.
4. Run `npm run schema:validate`.
5. Start Codex from the repository root, or open the repository in a
   Codex-capable client. Codex reads `AGENTS.md` before it works.

For GitHub operations, authenticate the CLI separately with `gh auth login` (or
provide a scoped `GH_TOKEN` Codespaces secret).

Authentication is intentionally not stored in Git. Do not add API keys to
`.env` files or commit local Codex state.

## Daily operating loop

1. Start at the repository root and state the desired outcome.
2. Let Codex read `AGENTS.md`; it carries the repository's durable constraints.
3. For a change, inspect the relevant source, make a focused edit, then verify
   it with the narrowest relevant check.
4. Review `git status` and the diff before committing or publishing.
5. Ask explicitly before a material external action: pushing, changing GitHub
   configuration, adding a dependency, enabling an integration, or rotating a
   credential.

Codex uses sandboxing and approvals rather than a broad always-allow list.
Approve only the specific escalation requested, and keep project-local Codex
configuration under `.codex/` when we introduce it. Project-local configuration
and hooks are loaded only after the project is trusted. After a fresh checkout or a
change under `.codex/hooks/`, run `/hooks` in Codex, inspect the exact
project-local definitions, and trust them deliberately. Hooks are skipped until
that review is complete.

## Claude-to-Codex quick reference

| Claude concept | Codex counterpart | What to do in JASON-OS now |
| --- | --- | --- |
| `CLAUDE.md` | `AGENTS.md` | Put durable Codex instructions in `AGENTS.md`; preserve `CLAUDE.md` during transition. |
| `.claude/settings.json` | `.codex/config.toml` and `.codex/hooks.json` | Do not copy settings JSON; port settings deliberately. |
| Slash-command workflow | Codex skill | A Claude skill is not a Codex skill until it is present under `.agents/skills/` and smoke-tested. |
| Claude subagent/team | Codex custom agent under `.codex/agents/` | Ask Codex to delegate to a named role; roles are TOML configuration, not Claude agent markdown. |
| Permission allow/deny list | Approval policy and sandbox | Prefer the narrowest access; review escalations as they occur. |
| Claude hook | Codex lifecycle hook | Rework and test the hook payload/output contract before enabling it. |
| Claude project memory | Codex memory plus tracked canonical content | Local-memory migration is deferred pending source data from the home computer. |
| Claude statusline | No planned equivalent | Intentionally excluded. |

## Skills during the transition

The existing 15 `.claude/skills/` directories are a migration source, not a
claim that Codex can invoke them today. Once a skill is ported, its Codex copy
will be placed in `.agents/skills/<name>/`, linked in the migration inventory,
and given a smoke-test record.

Until then, use normal Codex requests for work in this repository. Do not rely
on a Claude-style command name to imply that a Codex workflow exists.

## Custom agent roles

The initial project roles are under `.codex/agents/`. Ask Codex explicitly to
delegate independent work to a role such as `deep_research_searcher`,
`deep_research_verifier`, `contrarian_challenger`, or `dispute_resolver`.
Challenge and verification roles are read-only; research writers may write only
to their assigned research artifacts. Do not run concurrent agents on the same
file.

## Session, state, and memory

`SESSION_CONTEXT.md` remains the shared human-readable handoff artifact during
the transition. Do not write generated Codex state into `.claude/state/` unless
a later port decision explicitly makes that location shared.

The operator's local Claude-memory files are required input for the memory-data
port and are currently unavailable in this Codespace. This affects only memory
data migration; it does not block guidance, skills, hooks, agents, or shared
infrastructure work. When the source files are available, inventory them before
copying or transforming anything.

## GitHub and secrets

- **Interactive Codespace use:** `codex login`; no repository secret required.
- **Codespaces API-key use:** a Codespaces secret named `OPENAI_API_KEY`;
  recreate the Codespace after adding it.
- **Future Codex GitHub Action:** a separate Actions secret named
  `OPENAI_API_KEY`, supplied only to `openai/codex-action`; never expose it as
  a job-wide environment variable.
- **Existing SonarCloud workflow:** requires the separately managed Actions
  secret `SONAR_TOKEN`.
- GitHub-provided `GITHUB_TOKEN` is automatic; do not create or store one as a
  repository secret.

No GitHub variables are currently required. Add a variable only for a
non-sensitive, intentionally shared setting; secrets, access tokens, and API
keys are never variables.

## Deliberate follow-up decisions

- Which Claude Code skills, agents, hooks, and memory files should have Codex
  equivalents, and which should remain shared source material?
- What is the approved Codex memory promotion path after the local source
  files are available?
- Which external services need Codespaces secrets or MCP servers?
- Which recurring checks should become `npm` scripts or GitHub Actions?
