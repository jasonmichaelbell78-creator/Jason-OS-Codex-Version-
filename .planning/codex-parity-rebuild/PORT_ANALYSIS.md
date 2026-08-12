# Codex Parity Rebuild — Port Analysis

**Status:** Phase 1 discovery in progress
**Source authority:** preserved `.claude/` implementation
**Rule:** a listed target is only a candidate until its source coverage, Codex capability, dependencies, safety gates, and verification evidence are recorded.

## Complete source inventory

| Surface | Source components | Candidate Codex surface | Discovery state |
| --- | ---: | --- | --- |
| Named workflows | 15 `SKILL.md` bodies | `.agents/skills/` | in analysis |
| Shared skill support | `.claude/skills/shared/` | shared documentation or skill-local references | in analysis |
| Specialist roles | 8 Markdown role contracts | `.codex/agents/*.toml` | in analysis |
| Team orchestration | `teams/research-plan-team.md` | `deep-research` and `deep-plan` orchestration | in analysis |
| Runtime configuration | `.claude/settings.json` | `.codex/config.toml`, `.codex/hooks.json` | in analysis |
| Lifecycle hooks | 11 scripts | Codex hooks or accepted exception | in analysis |
| Hook runner/helper | `hooks/run-node.sh` and shared hook libraries | runtime-neutral helper or adapter | in analysis |
| Canonical memory | tracked set plus supplied archives | runtime-neutral canonical path | blocked on reconciliation review |
| State and labels | `.claude/state/`, sync schema, label engine | explicit per-runtime ownership | in analysis |
| Statusline | `statusline-command.sh` | alternative or approved exception | in analysis |

## Named-workflow discovery queue

| Workflow | Claude source lines | Candidate target | Current state |
| --- | ---: | --- | --- |
| add-debt | 93 | `.agents/skills/add-debt/` | in analysis |
| checkpoint | 173 | `.agents/skills/checkpoint/` | in analysis |
| session-begin | 245 | `.agents/skills/session-begin/` | in analysis |
| pre-commit-fixer | 287 | `.agents/skills/pre-commit-fixer/` | in analysis |
| convergence-loop | 300 | `.agents/skills/convergence-loop/` | in analysis |
| label-audit | 343 | `.agents/skills/label-audit/` | in analysis |
| brainstorm | 346 | `.agents/skills/brainstorm/` | in analysis |
| todo | 350 | `.agents/skills/todo/` | in analysis |
| skill-creator | 379 | Codex `skill-creator` plus `.agents/skills/jason-os-skill-creator/` | in analysis |
| deep-plan | 426 | `.agents/skills/deep-plan/` | in analysis |
| deep-research | 428 | `.agents/skills/deep-research/` | in analysis |
| session-end | 442 | `.agents/skills/session-end/` | in analysis |
| pr-review | 501 | `.agents/skills/pr-review/` | in analysis |
| repo-analysis | 596 | `.agents/skills/repo-analysis/` | in analysis |
| skill-audit | 598 | `.agents/skills/skill-audit/` | in analysis |

## Dependency-aware order

1. Foundation: `add-debt`, `todo`, `checkpoint`, `session-begin`, `session-end`.
2. Planning and assurance: `brainstorm`, `convergence-loop`, `deep-plan`, `skill-audit`, `skill-creator`.
3. Research and analysis: `deep-research`, `repo-analysis`, `label-audit`.
4. Remediation and review: `pre-commit-fixer`, `pr-review`.
5. Roles, orchestration, hooks, state/labels, documentation, and release evidence follow their source-contract analysis.

## Discovery method

For each component, record its callers, downstream dependencies, inputs, outputs, write authority, state files, templates, safety gates, failure behavior, and checks. Compare every source section to a target behavior in `PARITY_MATRIX.md`; place genuine gaps in `EXCEPTION_REGISTER.md` for operator approval rather than silently omitting them.
