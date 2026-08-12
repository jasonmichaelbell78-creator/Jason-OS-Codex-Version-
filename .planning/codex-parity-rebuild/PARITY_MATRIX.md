# Codex Parity Rebuild — Parity Matrix

**Allowed states:** `not-started`, `in-analysis`, `in-build`, `in-verification`, `accepted`, `approved-exception`.

## Baseline coverage

| Asset group | Source count | Candidate Codex count | State | Acceptance evidence required |
| --- | ---: | ---: | --- | --- |
| Named workflows | 15 | 15 | in-analysis | section map, self-audit, safe component fixture |
| Shared skill support | 1 directory | undecided | in-analysis | dependency map and target ownership |
| Specialist roles | 8 | 8 | in-analysis | role contract map and structured-result fixture |
| Research-plan team | 1 | undecided | in-analysis | orchestration and failure-mode fixture |
| Settings | 1 | 2 config files | in-analysis | capability and runtime-behavior check |
| Lifecycle hooks | 11 | 8 adapters | in-analysis | per-hook contract and fixture suite |
| Hook runner/helper | 1 plus libraries | undecided | in-analysis | input/output and failure-behavior check |
| Memory | 3 inputs | undecided | in-analysis | reviewed three-way ledger and retrieval tests |
| State and label flow | 1 subsystem | partial candidate | in-analysis | ownership, queue/retry, schema tests |
| Statusline | 1 | none | in-analysis | evaluated alternative or approved exception |

## Workflow rows

| Source workflow | Candidate target | State | Source-section map | Component evidence |
| --- | --- | --- | --- | --- |
| add-debt | add-debt | accepted | source sections: purpose; use and exclusion boundaries; fields; header; ID, escaping, date; append-only and secret guards; upgrade triggers; confirmation | disposable log fixture passed |
| todo | todo | accepted | source sections: critical rules; boundaries; ledger and generated view; schema; menu; all eight operations; CLI mutation, integrity, and exit contracts; context; compaction; session integration boundary | pure mutation fixture and live-ledger validation passed |
| checkpoint | checkpoint | in-analysis | source sections: use and exclusion rules; reality inspection; shared handoff; task-state schema; safe commit consideration; MCP persistence; recovery; report | Codex state ownership and reviewed memory path pending |
| session-begin | session-begin | accepted | source sections: scope; duplicate rules; warm-up; handoff; branch and staleness checks; deferred infrastructure; hook warning gate; complete summary and goal selection; triage; compaction recovery; integration | Session 26 executed the full supported pre-flight; counter, handoff, branch/log comparison, warning gate, and summary were observed |
| session-end | session-end | in-analysis | pending | pending |
| brainstorm | brainstorm | in-analysis | pending | pending |
| convergence-loop | convergence-loop | in-analysis | pending | pending |
| deep-plan | deep-plan | in-analysis | pending | pending |
| skill-audit | skill-audit | in-analysis | pending | pending |
| skill-creator | built-in plus jason-os-skill-creator | in-analysis | pending | pending |
| deep-research | deep-research | in-analysis | pending | pending |
| repo-analysis | repo-analysis | in-analysis | pending | pending |
| label-audit | label-audit | in-analysis | pending | pending |
| pre-commit-fixer | pre-commit-fixer | in-analysis | pending | pending |
| pr-review | pr-review | in-analysis | pending | pending |

## Specialist-role rows

All eight source roles are `in-analysis`: `contrarian-challenger`, `deep-research-searcher`, `deep-research-verifier`, `deep-research-synthesizer`, `deep-research-final-synthesizer`, `deep-research-gap-pursuer`, `dispute-resolver`, and `otb-challenger`.

## Hook rows

All eleven source hooks are `in-analysis`: protected-branch push, MCP health, commit tracking, compaction restore, label notification, label post-tool-use, label user-prompt, large-file gate, plain-language reminder, pre-compaction save, and settings guardian. The runner helper is separately tracked as shared adapter support.
