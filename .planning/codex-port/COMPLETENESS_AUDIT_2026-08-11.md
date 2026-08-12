# Codex Port Completeness Audit — 2026-08-11

## Scope and method

This read-only audit compares the preserved Claude implementation with the
current Codex Phase 1 files, the migration inventory, compatibility contract,
operator guide, Git history, and current validation output. It does not assess
unrelated repository work.

Two independent passes were completed:

1. Documentary pass: the inventory, contract, deferred-runtime record, and
   operator guide.
2. Implementation pass: source/target file counts, line counts, hook wiring,
   Git evidence, and the current schema-validation result.

## Findings

### 1. Skills are present but not parity ports — corrected

All 15 Claude skills have a Codex-named counterpart, but every counterpart is a
short baseline rather than a full workflow adaptation. The preserved Claude
skill bodies total approximately 5,500 lines; the Codex bodies total about 680
lines. Every inventory entry is explicitly labelled an "initial port" and its
per-skill fixture or smoke test is described as future work. No per-skill smoke
test record is present.

Status: incomplete. The skills must not be described as fully ported or parity
equivalents.

### 2. Specialist-agent roles are stubs — corrected

All eight Claude role files have a Codex TOML counterpart, but each target is
six lines. The Claude source roles range from 102 to 410 lines. The inventory
requires result-shape validation, concurrency limits, and failed-result
handling before a role is considered usable; no such acceptance evidence was
found.

Status: incomplete redesign, not a finished role port.

### 3. Team orchestration is unimplemented — confirmed

The Claude research-plan team has only a target direction (skill-directed
Codex subagent orchestration). No corresponding team implementation or
acceptance evidence exists.

Status: deferred redesign.

### 4. Hook parity is incomplete and partially unverified — corrected

Eight Codex hook adapters are wired, but their source counterparts are often
substantially larger (for example, commit tracking: 583 Claude lines versus 28
Codex lines; pre-compaction save: 481 versus 24). Some reduction may be
intentional because hook APIs differ, but semantic parity has not been shown.
The inventory itself calls for adapter/contract tests; no Codex-specific test
suite or repeatable fixture evidence was found in the Phase 1 commit.

The hooks are also inactive until the operator deliberately reviews and trusts
them through `/hooks`.

Status: baseline adapters only; require individual contract tests and explicit
acceptance before calling them ported.

### 5. Intentionally absent runtime capabilities — confirmed

These items are explicitly not available in the Codex environment:

- MCP-server availability checking (no-port)
- desktop label notifications (no-port)
- large-file read gate without a named filesystem-MCP contract
- Claude statusline / Go dependency
- Codex GitHub Action or other unattended automation

These are deliberate exclusions, not silently missing files. The large-file
gate is a capability gap that needs a specific filesystem-MCP design to close.

### 6. Memory, automatic learning, and some session behavior remain deferred — confirmed

The operator's local Claude-memory source set is unavailable and must not be
recreated. The tracked canonical-memory set also has no Codex consumption or
promotion path. The Codex session skills explicitly defer the former external
memory mode, health script, automatic-memory pipeline, and former metrics
pipeline.

Status: blocked only for the supplied local-memory source; the other runtime
decisions need design and implementation.

### 7. Label workflow is only partly portable — confirmed

Codex has label queue/prompt adapters, but the Codex `label-audit` skill states
that catalog promotion, adapters, and specialist derivation roles are not yet
ported. The initial skill is read-only.

Status: partial.

### 8. Documentation and delivery-gate drift — corrected

The compatibility contract's architecture diagram still names `.codex/skills/`,
while the implementation uses `.agents/skills/`. The operator guide says that
each ported skill will have a smoke-test record, but no such records exist.
The Phase 1 exit checklist still has an unchecked user-review gate.

Status: documentation and acceptance criteria are incomplete.

### 9. Phase 1 is not published — confirmed

The implementation is on `agent/codex-port-phase-1` in draft PR #5, not merged
into the repository's current default branch.

Status: deliberately unpublished pending review; not available to users of the
default branch.

## Evidence that did pass

- `npm run schema:validate`: 14/14 passed on 2026-08-11.
- Current Codex skill metadata has been corrected locally to retain the original
  command names; the JASON overlay is `jason-os-skill-creator`.
- `git diff --check` passed after the metadata correction.

These checks do not establish workflow, agent, or hook parity.

## T20 tally

| Pass | Confirmed | Corrected | Extended | New |
| --- | ---: | ---: | ---: | ---: |
| Documentary | 5 | 2 | 3 | 0 |
| Implementation | 4 | 3 | 3 | 1 |

## Conclusion

Not converged as a claim of a completed Codex port. It is accurate to call the
current work an unpublished Phase 1 discovery and runtime baseline. A parity
port needs an approved, skill-by-skill migration plan with source-preservation
diffs, documented unavoidable deviations, and individual acceptance tests.
