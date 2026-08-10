# Claude to Codex Migration Inventory

**Status:** ACTIVE — Phase 1 baseline
**Created:** 2026-08-10
**Contract:** [COMPATIBILITY_CONTRACT.md](COMPATIBILITY_CONTRACT.md)

## Inventory summary

| Surface | Count | Primary verdict |
| --- | ---: | --- |
| Skills | 15 | `adapt` |
| Specialist agents | 8 | `redesign` |
| Root Claude hook scripts | 11 | `adapt` |
| Claude settings file | 1 | `redesign` |
| Canonical-memory files | 12 tracked + local source set pending | `defer` |
| State directory | ephemeral | `adapt` |
| Sync/schema and label infrastructure | 1 subsystem | `shared` + targeted `adapt` |
| Team definition | 1 | `redesign` |
| Statusline command | 1 | `no-port` |
| Git hooks and shared scripts | 1 subsystem | `shared` |

Counts are based on the tracked repository at the Phase 1 baseline. Generated,
gitignored state is intentionally not enumerated as durable content.

## Skills

All existing skills already use AgentSkills-compatible frontmatter. That makes
their structure portable, but their bodies reference Claude tool names, Claude
commands, settings, state paths, or agent dispatch contracts. No skill is a
blind copy.

| Source skill | Target | Verdict | Principal adaptation | Test strategy |
| --- | --- | --- | --- | --- |
| `add-debt` | `.agents/skills/add-debt/` | `direct-port` — initial port | Replace slash-command wording; retain Markdown debt-log behavior. | Add one test debt item in a disposable fixture. |
| `brainstorm` | `.agents/skills/brainstorm/` | `adapt` — initial port | Use generic Codex multi-agent/fresh-pass challenge until custom roles land. | Run a three-direction prompt without writes outside a fixture. |
| `checkpoint` | `.agents/skills/checkpoint/` | `adapt` — initial port | Use `SESSION_CONTEXT.md`; external-memory mode and Codex state location remain deferred. | Write and resume a fixture handoff. |
| `convergence-loop` | `.agents/skills/convergence-loop/` | `adapt` — initial port | Map pass orchestration and agent result handling. | Verify a two-pass fixture claim set. |
| `deep-plan` | `.agents/skills/deep-plan/` | `adapt` — initial port | Replace Claude teams/tool terms with Codex planning and agents. | Produce a decision record without implementation. |
| `deep-research` | `.agents/skills/deep-research/` | `adapt` — initial port | Preserve plan, citations, confidence, and challenge contracts; dedicated roles/resume state remain deferred. | Run a bounded research fixture with citations. |
| `label-audit` | `.agents/skills/label-audit/` | `adapt` — initial read-only port | Keep schema semantics; catalog promotion awaits Codex hook/context design. | Validate fixture catalog records. |
| `pr-review` | `.agents/skills/pr-review/` | `adapt` — initial port | Preserve disposition, learning, debt, and verification rules; direct reviewer integration remains deferred. | Review a local fixture diff before GitHub automation. |
| `pre-commit-fixer` | `.agents/skills/pre-commit-fixer/` | `direct-port` — initial port | Update command/tool terminology; keep Husky repair recipes. | Exercise against a controlled failing hook fixture. |
| `repo-analysis` | `.agents/skills/repo-analysis/` | `adapt` — initial port | Preserve complete scoped coverage and evidence contract; Codex-specific report roles can follow. | Analyze a small public/fixture repository. |
| `session-begin` | `.agents/skills/session-begin/` | `adapt` — initial port | Establish Codex session start and recovery contract. | Validate clean/dirty checkout branches. |
| `session-end` | `.agents/skills/session-end/` | `adapt` — initial port | Retain lightweight closure only; do not restore absent SoNash metrics. | Verify summary and optional commit boundary in a fixture. |
| `skill-audit` | `.agents/skills/skill-audit/` | `adapt` — initial port | Teach Codex skill conventions and discovery. | Audit a fixture skill. |
| `skill-creator` | Codex built-in `skill-creator` + `.agents/skills/jason-skill-authoring/` | `adapt` — initial overlay | Retain Codex-native packaging guidance; put JASON-OS migration and governance workflow in a non-conflicting project overlay. | Scaffold and validate a disposable skill. |
| `todo` | `.agents/skills/todo/` | `direct-port` — initial port | Retain JSONL/CLI contract; replace invocation language. | Run existing todo tests and fixture mutation. |

## Agents and team orchestration

Claude markdown subagents express useful roles, not a portable configuration
format. Rebuild them as Codex agent roles and role prompts after the shared
workflow contracts are stable.

| Claude source | Codex target | Verdict | Dependency |
| --- | --- | --- | --- |
| `contrarian-challenger.md` | `.codex/agents/contrarian-challenger.toml` | `redesign` — initial port | `brainstorm`, `deep-research` |
| `deep-research-searcher.md` | `.codex/agents/deep-research-searcher.toml` | `redesign` — initial port | `deep-research`, approved web/MCP policy |
| `deep-research-verifier.md` | `.codex/agents/deep-research-verifier.toml` | `redesign` — initial port | claim/output schema |
| `deep-research-synthesizer.md` | `.codex/agents/deep-research-synthesizer.toml` | `redesign` — initial port | research output contract |
| `deep-research-final-synthesizer.md` | `.codex/agents/deep-research-final-synthesizer.toml` | `redesign` — initial port | research output contract |
| `deep-research-gap-pursuer.md` | `.codex/agents/deep-research-gap-pursuer.toml` | `redesign` — initial port | verifier and synthesis roles |
| `dispute-resolver.md` | `.codex/agents/dispute-resolver.toml` | `redesign` — initial port | verdict taxonomy |
| `otb-challenger.md` | `.codex/agents/otb-challenger.toml` | `redesign` — initial port | research orchestration |
| `teams/research-plan-team.md` | Skill-directed Codex subagent orchestration | `redesign` — initial guidance | Codex role definitions |

Acceptance requires result-shape validation, a concurrency limit, and explicit
handling of empty/failed agent results before any role is considered usable.

## Hooks and runtime configuration

Codex offers the lifecycle events needed for most of this set, including
session, tool, compaction, user-prompt, subagent, and stop events. The scripts
must nevertheless be treated as adapters because Claude and Codex hook payloads
and supported decisions are not assumed equivalent.

| Claude source | Intended Codex surface | Verdict | Required design/test |
| --- | --- | --- | --- |
| `settings.json` | `.codex/config.toml` + `.codex/hooks.json` | `redesign` — initial port | Project defaults and one reviewed pre-tool guard are present; remaining runtime behavior is deferred. |
| `block-push-to-main.js` | `PreToolUse` adapter + Husky backstop | `adapt` — initial port | Uses Codex hook JSON and payload shape; confirm target command parsing and failure behavior. |
| `check-mcp-servers.js` | Codex-native MCP configuration | `no-port` | Codex owns configured connection state; do not expose config from a hook. |
| `commit-tracker.js` | `PostToolUse` adapter | `adapt` — initial port | Baseline-first, bounded `.codex/state/` commit log; fixture-tested. |
| `compact-restore.js` | `PreCompact` + compact `SessionStart` adapters | `redesign` — initial port | Bounded `.codex/state/` snapshot; verify against current files after restore. |
| `large-file-gate.js` | Named filesystem-MCP `PreToolUse` adapter | `environment-specific` | No portable matcher exists for Codex built-in local reads; activate only with a defined filesystem MCP tool contract. |
| `plain-language-reminder.js` | `UserPromptSubmit` adapter | `adapt` — initial port | Uses Codex additional context; confirm supplemental context rendering. |
| `pre-compaction-save.js` | `PreCompact` adapter | `adapt` — initial port | Stores bounded, ignored Codex recovery state atomically. |
| `settings-guardian.js` | `PreToolUse` adapter | `adapt` — initial port | Blocks deletion of protected Codex runtime files; retains Claude files independently. |
| `label-notification.js` | No portable Codex/Codespaces equivalent | `no-port` | Desktop notification delivery is environment-specific. |
| `label-post-tool-use.js` | `PostToolUse` `apply_patch` adapter | `adapt` — active port | Extracts safe patch paths and uses isolated Codex state plus read-only derivation. |
| `label-user-prompt-submit.js` | `UserPromptSubmit` adapter | `adapt` — active port | Surfaces pending label failures from Codex state. |
| `hooks/lib/*.js` and `run-node.sh` | Shared helper or Codex adapter support | `adapt` | Verify paths, stdin, and error contract. |

## Memory, state, and synchronization

| Source | Target direction | Verdict | Decision required |
| --- | --- | --- | --- |
| `.claude/canonical-memory/` | Tracked, runtime-neutral canonical memory | `defer` | Port only after the operator provides the required home-computer local-memory source set; inventory before transformation. |
| `.claude/state/` | Codex-owned ephemeral state, location TBD | `adapt` | Determine which state remains shared and which is per-runtime. |
| `SESSION_CONTEXT.md` | Shared human-readable recovery artifact | `adapt` | Confirm its five-field format meets Codex recovery needs. |
| `.claude/sync/schema/` | Shared schema contract | `shared` | Extend enums only after validated Codex hook needs. |
| `.claude/sync/label/` | Shared labeling engine with runtime adapters | `adapt` — active port | Codex adapters own ephemeral queues/output; the shared tracked catalog remains the contract. |

## Shared infrastructure and intentional exclusions

| Source | Verdict | Rationale |
| --- | --- | --- |
| `scripts/lib/` | `shared` | Security and filesystem helpers are agent-runtime-neutral. |
| `.husky/` | `shared` | Git-level enforcement protects all runtime clients. |
| `.github/workflows/` | `shared` | Existing CI remains independent of Codex until optional automation is added. |
| `.devcontainer/` | `shared` | Already provisions the Codex-ready development environment. |
| `.claude/statusline-command.sh` | `no-port` | Codex has different UI surfaces; Go/statusline dependency is intentionally excluded. |
| Claude-local configuration, auth, and generated state | `no-port` | Credentials and machine state must never enter the repository. |
| Operator home-computer Claude-memory data | `defer` | Required migration input is unavailable in this Codespace. Do not recreate or infer it; resume only after the operator supplies it. |

## Phase 1 exit criteria

- [x] Compatibility contract is recorded.
- [x] Every currently tracked Claude-facing asset has a target verdict.
- [x] Explicit preservation, credentials, and shared-infrastructure rules exist.
- [ ] User reviews any disputed classifications before Phase 2 changes shared
  instruction files or creates Codex runtime configuration.
