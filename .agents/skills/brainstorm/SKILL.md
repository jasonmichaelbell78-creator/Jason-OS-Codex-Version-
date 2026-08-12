---
name: brainstorm
description: Explore a JASON-OS idea or design space before implementation planning by grounding it in repository context, generating multiple directions, challenging assumptions, and recording the user-selected direction. Use when what to build is unclear or several viable approaches exist.
---

# Brainstorm

Explore the design space before committing to implementation. Vague seed ideas
are welcome; no implementation code is written during this workflow.

## Critical rules

1. Do not impose arbitrary caps on questions, directions, research, or fresh
   challenge passes; use what the decision requires.
2. Generate at least three materially distinct directions before convergence.
3. Present a contrarian checkpoint before the user selects a direction.
4. Investigate unfamiliar or material claims with repository evidence or
   research; never fake grounding with a superficial search.
5. The user, not Codex, selects the final direction. A hybrid is allowed.
6. Persist the durable artifact incrementally; generated runtime state awaits
   the separate Codex state-ownership decision.

## Routing

Use this when what to build is unclear or several directions are viable. Route
clear implementation planning to `deep-plan`, a pure evidence question to
`deep-research`, and a clear bug or direct instruction to its normal workflow.

## Output

Write and display `.research/<topic-slug>/BRAINSTORM.md`, using a lowercase,
hyphenated slug of at most 50 characters. It records the landscape, directions,
anti-goals, tradeoffs, chosen path, rationale, rejected alternatives, and open
questions.

## Warm-up and Phase 0 — Context

Explain the process, invite incomplete ideas, and obtain confirmation to begin.
Then:

1. Read `AGENTS.md`, relevant plans, research, and repository systems.
2. Check for an existing brainstorm at the same slug and offer resume, fresh
   start, or a new name.
3. Gather repository evidence for codebase questions. For external unknowns,
   use research appropriate to the uncertainty; for material claim sets, use a
   fresh verification pass before relying on them.
4. Present the landscape, including prior work, constraints, and possible
   conflict with project direction. If exploration is unnecessary, offer a
   route to `deep-plan` instead.
5. Wait for the user to confirm the landscape or reframe it.

## Phase 1 — Diverge

Use Socratic exploration of problem, assumptions, constraints, alternatives,
success criteria, and anti-goals. Ask what directions the user sees, then add
grounded alternatives. For each direction, describe the practical vision,
dependencies, assumptions, and likely consequences. Help discover unknown
answers rather than skipping them. Explicitly ask what outcomes are unwanted.

Do not evaluate yet. Before Phase 2, show all directions and ask whether to add
or revisit any; require at least three directions.

## Phase 2 — Evaluate

For each direction, record strengths, weaknesses, assumptions, feasibility, and
anti-goal conflicts. Verify ungrounded technical premises before evaluating
them. Stress-test the leading direction(s) with a clearly labeled independent
contrarian pass; use the registered challenger role when its contract is
accepted, otherwise state that the critique is a local fresh pass. For a large
or unfamiliar decision, obtain independent evidence before convergence.

## Phase 3 — Converge

Present the evaluation summary. Require the user to choose a direction and
state why it wins. Capture open questions. If a hybrid is selected, describe it
back and obtain confirmation before recording it.

## Phase 4 — Crystallize

Write the artifact, show it inline, and run a convergence check on material
repository, feasibility, and capability claims before presenting it as settled.
Correct failed claims. Then offer: `deep-plan`, `deep-research`, research then
planning, direct implementation, or save-and-resume.

## Guardrails and recovery

Surface contradictions, hidden assumptions, anti-goal conflicts, and premature
convergence. If directions become unwieldy, cluster them before continuing. If
the user disengages, preserve the artifact and list the explored state.

Do not write generated Codex state under `.claude/state`. Until the state
contract is accepted, the artifact is the durable checkpoint; resume by opening
it and re-grounding against current Git reality.

## Done when

The user selected a direction with tradeoffs understood, `BRAINSTORM.md`
preserves the rationale and open questions, and the appropriate next workflow
was presented.
