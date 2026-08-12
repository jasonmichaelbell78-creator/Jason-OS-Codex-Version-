# Codex Parity Rebuild — Plan

## Definition of done

The Codex implementation is usable for everyday JASON-OS work with the same
named workflows and required outcomes as the preserved Claude implementation.
Every source component has an accepted parity record or an operator-approved,
evidence-backed exception with a documented alternative. All component tests,
integration tests, documentation checks, and release review pass. Only then is
the replacement PR opened or made ready.

## Phase 0 — Freeze the flawed baseline and establish the rebuild boundary

### Phase 0A — Establish GitHub governance before PR work

1. Perform a read-only settings audit, including the default branch, branch protection or rulesets, required checks, review requirements, merge methods, auto-merge policy, branch-deletion policy, Actions permissions, security features, and repository/Dependabot secrets. Confirm inaccessible settings in the GitHub UI rather than treating an API permission error as evidence that protection is absent.
2. Present the exact proposed settings and their consequences to the operator for approval. In particular, resolve the default-branch target, protected branch policy, required CI checks, and whether Dependabot may ever auto-merge.
3. Apply only the approved settings and save the resulting configuration and verification evidence in `GITHUB_SETTINGS_BASELINE.md`.
4. Keep all four current PRs unchanged while this gate is incomplete. The `pr-review` skill is not relied on; PR #3, #4, and #2 will receive separate manual reviews and validations after this gate, and PR #5 remains frozen.

Done when: the operator has accepted the recorded GitHub settings baseline and the repository can enforce the PR/CI policy required for the rebuild.

Audit checkpoint: independently verify the actual GitHub settings, a protected branch's rejected direct push, and one required-check scenario.

1. Keep PR #5 draft and do not trust or enable its hooks as a completed
   runtime.
2. Create `agent/codex-parity-rebuild` from the current default branch after
   plan approval. Preserve `agent/codex-port-phase-1` unchanged for comparison
   and rollback evidence.
3. Carry only the approved visible-name correction into the rebuild; do not
   copy Phase 1 stubs as source of truth.
4. Create `PORT_ANALYSIS.md`, `PARITY_MATRIX.md`, `EXCEPTION_REGISTER.md`, and
   `VALIDATION_EVIDENCE.md` in this planning directory.

Done when: the rebuild has an isolated branch, the old draft cannot be merged
accidentally, and every asset has a row in the parity matrix.

Audit checkpoint: compare the matrix asset count against the complete Claude
inventory and confirm no asset is silently omitted.

## Phase 1 — Discover before adapting

For every source skill, role, hook, helper, settings behavior, memory file, and
team artifact:

1. Record its source path, callers, downstream dependencies, inputs, outputs,
   write authority, safety gates, state files, templates, and validation rules
   in `PORT_ANALYSIS.md`.
2. Record a section-by-section source-coverage map in `PARITY_MATRIX.md`.
3. Verify current Codex capabilities and installed-version behavior using
   official documentation plus local fixtures. Do not infer a limitation from
   the Phase 1 stub.
4. For each apparent mismatch, choose an equivalent implementation or add a
   fully explained candidate exception. Candidate exceptions do not become
   approved until the operator signs them off.

Done when: every asset has a verified target design and no unexamined Claude
dependency remains.

Audit checkpoint: independently re-read the source inventory and matrix;
every source file and behavior must have a corresponding row.

## Phase 2 — Reconcile the supplied memory archives safely

1. Inventory all 69 `memory.zip` files, all 12 `canonical memory.zip` files,
   and all tracked `.claude/canonical-memory/` files with hashes, type, origin,
   and sensitivity review.
2. Build a three-way ledger: local-memory version, supplied canonical version,
   and tracked version. Identify exact duplicates, complementary content,
   conflicts, and files that must remain local-only.
3. Preserve the canonical-memory workflow rather than blindly moving files:
   decide the runtime-neutral canonical record, the Codex retrieval path, and
   the explicit promotion/sync mechanism from evidence gathered in Phase 1.
4. Present every proposed memory write or exclusion as a review set before it
   is applied. Never manufacture missing memories or copy credentials/state.
5. Implement the accepted memory path and test targeted retrieval, normal
   session startup, updates, duplicate prevention, and recovery after
   compaction.

Done when: every supplied memory file has a recorded disposition, accepted
canonical content is available to both workflows through the designed path,
and tests demonstrate that the context is usable without indiscriminate prompt
loading.

Audit checkpoint: hash and content reconciliation review; operator approves
all conflict resolutions.

## Phase 3 — Rebuild all 15 skills to parity

1. Port each skill from its preserved Claude body, retaining its original name,
   trigger, ordered workflow, user-decision gates, templates, state contract,
   failure behavior, and done criteria.
2. Replace only Claude-specific tool calls or runtime paths, recording the
   exact substitute and rationale in the parity matrix.
3. Give each skill a dedicated self-audit derived from the shared skill-audit
   base and tailored to its own invariants.
4. Add a component fixture or safe read-only integration test for every skill;
   run the intended workflow once in Codex and save the evidence.
5. Work in dependency-aware groups, but do not advance a group until every
   member meets its own acceptance gate:
   - foundation: `add-debt`, `todo`, `checkpoint`, `session-begin`,
     `session-end`;
   - planning and assurance: `brainstorm`, `convergence-loop`, `deep-plan`,
     `skill-audit`, `jason-os-skill-creator`;
   - research and analysis: `deep-research`, `repo-analysis`, `label-audit`;
   - remediation and review: `pre-commit-fixer`, `pr-review`.

Done when: all 15 skills pass their self-audit and component test, have a
completed source-coverage row, and retain their original visible name.

Audit checkpoint: a fresh coverage pass verifies every source section,
template, and safety gate is retained or has an approved exception.

## Phase 4 — Rebuild specialist agents and team orchestration

1. Translate all eight full Claude role contracts into Codex role definitions,
   including scope, allowed writes, output schema, citations, handoff, failure,
   and stop conditions.
2. Implement the research-plan team/orchestration contract: role selection,
   concurrency control, file ownership, result validation, retry/fill-in
   behavior, and synthesis handoff.
3. Add fixtures for success, empty result, malformed result, failed agent,
   overlapping write target, and incomplete coverage. An aggregate agent report
   never substitutes for one structured result per assigned item.
4. Run an end-to-end deep-research/deep-plan exercise that uses the roles and
   preserves the same authority boundaries as the source workflow.

Done when: each role and the team orchestration pass contract and integration
tests; no role remains a prompt-only stub.

Audit checkpoint: compare each source role section and the source team
procedure against the resulting Codex behavior and validation evidence.

## Phase 5 — Rebuild hooks and runtime behavior

1. For all 11 source hooks plus shared helpers, write a contract record with
   event payload, matcher, allow/block behavior, state location, retention,
   malformed-input behavior, timeout/failure behavior, and security boundary.
2. Implement a fixture suite for every hook: normal allow, intended block,
   malformed payload, unavailable dependency, duplicate/resume state, and
   regression behavior. Add integration tests against the installed Codex
   client where supported.
3. Rebuild push protection, settings protection, commit tracking, compaction
   save/restore, plain-language context, and both label hooks only when their
   full contracts pass.
4. Investigate and present complete alternatives for the MCP health check,
   large-file gate, label notification, and statusline. If Codex has no safe
   equivalent, record the evidence and alternative in `EXCEPTION_REGISTER.md`
   and obtain explicit operator approval before marking it an exception.
5. Review the final hook definitions through `/hooks`; the operator decides
   whether to trust them. Keep Husky and Gitleaks as runtime-independent hard
   enforcement.

Done when: every hook source behavior has a tested Codex equivalent or an
operator-approved exception; enabled hooks are trusted only after review.

Audit checkpoint: run the hook suite from a clean checkout and inspect actual
Codex event results, not merely script syntax.

## Phase 6 — Integrate labels, state, documentation, and daily operation

1. Complete the label workflow, including catalog promotion and specialist
   derivation, with ownership, queue, retry, and schema validation tests.
2. Finalize state ownership so each record type has one writer and compaction,
   session recovery, and memory paths cooperate rather than compete.
3. Rewrite `AGENTS.md`, `CODEX-SETUP.md`, the compatibility contract, and the
   migration inventory to reflect only accepted behavior. Remove the stale
   `.codex/skills/` architecture reference or make it match the accepted
   discovery model.
4. Publish a complete operator guide: first run, normal session, hook trust,
   memory behavior, recovery, troubleshooting, and every approved exception.

Done when: a fresh Codespaces checkout can follow the guide and complete a
normal JASON-OS session using the rebuilt workflows.

Audit checkpoint: a clean-room walkthrough validates the guide, discovery,
state recovery, labels, and the published parity matrix.

## Phase 7 — Release only after full acceptance

1. Run the full component suite, integration suite, schema validation, secret
scan, diff check, and a fresh end-to-end workflow rehearsal.
2. Reconcile `PARITY_MATRIX.md`, `EXCEPTION_REGISTER.md`, and
   `VALIDATION_EVIDENCE.md`; no row may remain `in-analysis`, `in-build`, or
   `in-verification` when the replacement PR is prepared.
3. Present the final evidence and a component-by-component acceptance checklist
   to the operator. Do not hide incomplete rows inside aggregate totals.
4. Only after acceptance, open or make ready the replacement PR. Then close or
   supersede draft PR #5 with a clear explanation of why it was not merged.

Done when: the operator accepts the full matrix and the replacement PR is the
only publishable migration candidate.

Audit checkpoint: independent final review confirms every claimed completion
has source coverage, tests, and accepted evidence.
