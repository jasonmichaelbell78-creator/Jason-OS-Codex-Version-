# Codex Parity Rebuild — Decisions

| ID | Decision | Status and rationale |
| --- | --- | --- |
| D1 | Completion standard | **Accepted.** A component is complete only when it preserves its required workflow, is usable in normal work, and has component-level verification. A baseline, scaffold, stub, or untested adapter is not complete. |
| D2 | Partial-work rule | **Accepted.** Partial or omitted work is allowed only for a genuine, evidence-backed Codex limitation after an operator-approved entry is added to `EXCEPTION_REGISTER.md`. |
| D3 | Source preservation | **Accepted.** `.claude/` remains intact and authoritative until each Codex replacement is accepted. Source wording, gates, templates, outputs, and behavior are covered by a parity matrix before adaptation. |
| D4 | Visible names | **Accepted.** The visible title of every project skill is its original command name. `jason-os-skill-creator` is the permitted JASON-specific companion to Codex's built-in `skill-creator`. |
| D5 | Recovery boundary | **Accepted.** Do not merge draft PR #5. Rebuild on a new branch from `agent/codex-codespace-setup`; keep the draft branch untouched until the replacement passes all release gates. |
| D6 | Memory source handling | **Accepted process.** Treat `memory.zip`, `canonical memory.zip`, and the tracked canonical-memory files as three inputs. Build a per-file three-way reconciliation ledger; do not overwrite or discard a memory automatically. Each conflict resolution is reviewed before write. |
| D7 | Port-claim rule | **Accepted.** The migration inventory may use only `not-started`, `in-analysis`, `in-build`, `in-verification`, `accepted`, or `approved-exception`. It may not label an item `ported` before acceptance. |
| D8 | PR discipline | **Accepted.** No PR is created or made ready for review until all planned rebuild work and release checks are complete. The replacement PR is the sole publishable port candidate. |
| D9 | User authority | **Accepted.** The operator approves architecture, memory conflict resolutions, security boundaries, and every exception. Implementation sequencing, file naming, and test mechanics may be decided within these constraints. |
| D10 | GitHub governance gate | **Accepted.** Before reviewing, merging, rebasing, or replacing any PR—and before creating the parity-rebuild branch—establish and record the approved GitHub branch, review, CI, Actions, security, and merge settings. |
