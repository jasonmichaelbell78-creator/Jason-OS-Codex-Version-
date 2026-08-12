# Codex Skill Acceptance Gate

**Status:** active quarantine; zero project-local skills accepted.

## Purpose

A `SKILL.md` file proves only that a port candidate exists. It does not prove
the workflow is complete, safe, or usable in Codex. Project-local skills remain
non-discoverable until evidence and operator approval establish that they are
ready.

## Repository boundary

- Active skills: `.agents/skills/<name>/`
- Quarantined candidates: `.planning/codex-skill-candidates/<name>/`
- Acceptance manifest: `.agents/skills-acceptance.json`
- Validator: `scripts/validate-codex-skills.cjs`
- Validator tests: `scripts/validate-codex-skills.test.cjs`

The pre-commit hook runs the validator without a skip option. It rejects an
active skill that has no accepted manifest entry, an accepted entry whose files
are missing, or any file tree changed after acceptance.

## Quarantined inventory

All 15 project-local ports are candidates, not available workflows:

1. `add-debt`
2. `brainstorm`
3. `checkpoint`
4. `convergence-loop`
5. `deep-plan`
6. `deep-research`
7. `jason-os-skill-creator`
8. `label-audit`
9. `pr-review`
10. `pre-commit-fixer`
11. `repo-analysis`
12. `session-begin`
13. `session-end`
14. `skill-audit`
15. `todo`

## Required acceptance packet

Each candidate needs one durable packet under
`.planning/codex-skill-acceptance/<name>/ACCEPTANCE.md`. It must contain:

1. Complete source inventory: skill body, references, scripts, agents, hooks,
   state contracts, callers, and relevant preserved Claude files.
2. Requirement mapping: every source behavior mapped to a Codex behavior.
3. Granular dispositions: direct port, Codex adaptation, merge, or rejection,
   each with evidence and operator-approved rationale.
4. Runtime verification: every referenced Codex feature and path proven to
   exist and behave as assumed.
5. Full candidate files shown inline to the operator for review.
6. Structural validation and packaging checks.
7. Behavioral evidence for normal operation, approval gates,
   interruption/resume, and failure handling where applicable.
8. Cross-component verification for every dependency and consumer.
9. Zero unresolved material decisions, hidden omissions, or unapproved
   deferrals.
10. Explicit operator acceptance after the evidence is presented.

## Promotion procedure

1. Revise and test only the quarantined candidate.
2. Complete its acceptance packet and present the entire packet inline.
3. Resolve every operator decision and accepted audit finding.
4. Obtain explicit operator approval for that exact candidate tree.
5. Move the candidate into `.agents/skills/<name>/`.
6. Calculate its deterministic tree hash and add the acceptance-manifest entry.
7. Run `npm run skills:test`, `npm run skills:validate`, relevant behavioral
   tests, `git diff --check`, and repository validation.
8. Restart Codex so the session skill catalog reflects the promoted tree.

## Change invalidation

Any change inside an accepted skill changes its tree hash. The validator then
fails until the revised skill completes another review and receives new
operator acceptance. Updating the manifest without that approval violates the
repository instructions even if the hash is mechanically valid.

## Completion rule

A skill is available only when its package is in `.agents/skills/`, its current
tree matches an explicitly approved manifest entry, its acceptance evidence
exists, and the validator passes. Every other status is incomplete.
