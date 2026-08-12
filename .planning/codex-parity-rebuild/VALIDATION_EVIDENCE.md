# Codex Parity Rebuild — Validation Evidence

This record contains only checks actually run. Aggregate success never replaces per-component evidence.

| Date | Scope | Check | Result | Evidence / limitation |
| --- | --- | --- | --- | --- |
| 2026-08-12 | GitHub governance | Active `Protect Main` ruleset read via GitHub API | pass | PR-only, no bypass, resolved threads, strict required checks, and four named checks verified. |
| 2026-08-12 | GitHub governance | GitHub UI confirmation by operator | confirmed | Actions default permissions and manual Dependabot policy confirmed; API token has insufficient permission to read those settings. |
| 2026-08-12 | Governance baseline | `git diff --check`, Gitleaks, label-catalog commit checks | pass | Commit `62f4da0`. |

## In-progress component evidence

- `checkpoint`: recovery and state contract mapped; generated Codex state ownership and external-memory persistence remain pending the dedicated state and memory phases.


- `add-debt`: disposable fixture passed; preserved rows, next ID, single append, and pipe escaping verified.
- `todo`: pure mutation fixture passed all add, edit, progress, complete, archive, and delete operations plus ID-edit rejection and regression guards; the live ledger passed read-only integrity validation (37 records, last ID T37).

## Pending validation

- One fixture or read-only integration check per skill.
- Contract fixture suite per hook and agent role.
- Clean-checkout runtime behavior for supported Codex hooks.
- Memory ledger review and retrieval/update/recovery tests.
- Full release checks listed in the accepted rebuild plan.
