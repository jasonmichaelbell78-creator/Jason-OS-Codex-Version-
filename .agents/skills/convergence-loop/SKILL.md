---
name: convergence-loop
description: Verify a meaningful set of JASON-OS claims through multiple independent passes, recording confirmed, corrected, extended, and new findings before a user decides whether the result has converged. Use for audits, diagnoses, plans, and documentation claims that would waste effort if wrong.
---

# Run a JASON-OS Convergence Loop

Use evidence-driven passes to test claims about reality. This is not a wrapper
around a single lookup or a command whose outcome is already binary.

## Procedure

1. Identify the claims, their source material, a sensible slicing strategy, and
   a preset: `quick` (two verification passes), `standard` (source-check,
   verification, fresh eyes), or a custom sequence for high-stakes work.
2. Verify each pass independently. Use the filesystem for repository claims
   and current authoritative sources for external claims. Use independent
   Codex agents where available; otherwise perform a fresh pass that does not
   inherit the prior pass's conclusion.
3. Record a T20 tally for every pass:
   - Confirmed: correct as stated
   - Corrected: wrong, with an evidenced replacement
   - Extended: correct but incomplete
   - New: discovered outside the initial set
4. Treat disagreements as findings. Show the competing evidence, recommend a
   resolution based on source quality, and record the user's disposition.
5. Graduate claims only after two consecutive confirmed passes. Continue claims
   that were corrected or extended; add material new findings to the next pass.
6. Present the tally and recommend converged or not converged. The user decides
   whether to stop, continue, narrow the claim set, or accept a partial result.
7. Save a report beside the artifact being verified or under
   `.planning/<topic-slug>/`; do not write generated Codex state into
   `.claude/state/`.

## Guardrails

- Run at least two passes.
- Decompose a claim set that is too broad to verify honestly in one loop.
- If findings grow faster than the original scope, pause and ask whether to
  absorb them or split the work.
- Never suppress an unresolved contradiction to claim convergence.

## Done when

The report includes pass tallies, changed claims and evidence, residual
uncertainty, and the user's explicit convergence decision.
