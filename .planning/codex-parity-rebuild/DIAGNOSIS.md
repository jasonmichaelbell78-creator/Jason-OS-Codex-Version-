# Codex Parity Rebuild — Diagnosis

## Problem

The current Codex Phase 1 branch is an unpublished baseline, not a usable
preservation of JASON-OS. It changed the displayed workflow vocabulary,
compressed all 15 skills, reduced all eight specialist roles to stubs, and
wired reduced hook adapters without the promised per-component acceptance
evidence. That result cannot be merged as a complete port.

The governing requirement for the rebuild is: preserve the existing workflow
unless a Codex limitation is genuine, investigated, recorded, and explicitly
approved by the operator. A component is not "ported" until it is usable in
normal work and has its own verification evidence.

## Evidence

- The 15 preserved Claude skill bodies are about 5,500 lines; their Phase 1
  Codex counterparts are about 680 lines.
- The eight preserved specialist-agent roles are 102–410 lines each; every
  Phase 1 Codex role is six lines.
- Eight hook adapters exist, but major source hooks were materially reduced and
  do not have a Codex-specific repeatable contract-test suite.
- The Phase 1 PR is draft #5 on `agent/codex-port-phase-1`; it is not merged
  into the default branch.
- `memory.zip` contains 69 files from the former local Claude memory. The
  supplied `canonical memory.zip` contains 12 curated files. Those 12 names
  match the tracked `.claude/canonical-memory/` set, but every corresponding
  file differs in content, so an automatic overwrite would lose information.
- `npm run schema:validate` currently passes 14/14. This verifies the shared
  schema only; it is not proof of skill, hook, agent, or memory parity.

## Non-negotiable constraints

1. Preserve `.claude/` as the source implementation until a replacement is
   proven and explicitly accepted.
2. Preserve original skill names as the visible Codex names. The description is
   for explanation, not renaming.
3. Never merge or advertise a partial component as complete.
4. Every actual exception needs an evidence-backed reason, a usable alternative
   where possible, and operator approval in an exception register.
5. Do not import credentials, authentication material, or generated runtime
   state from either archive.
6. Keep the Phase 1 draft intact as evidence; rebuild on a new branch from the
   current default branch rather than layering more work onto the flawed port.
7. Do not enable project hooks until their contract tests pass and the operator
   has reviewed their exact definitions through `/hooks`.

## Scope

The rebuild covers every Claude-facing surface listed in the current migration
inventory: 15 skills, eight specialist roles, research-team orchestration,
settings/runtime behavior, 11 hooks and helpers, label flow, canonical and
local-memory integration, user guidance, and the delivery/validation process.
Shared Husky, schema, scripts, and CI remain one shared implementation unless
their analysis proves a necessary Codex-facing change.

## Genuine capability questions to investigate before requesting exceptions

- safe Codex equivalent for the large-file read gate;
- MCP-availability health check without exposing configuration or credentials;
- non-desktop delivery for label notifications;
- replacement for statusline information that is usable in Codex/Codespaces;
- supported memory-loading and targeted-memory retrieval mechanism;
- exact current hook payload and decision contracts for the installed Codex
  version.

No exception is approved merely because the Phase 1 implementation omitted it.
