---
name: deep-plan
description: Produce an evidence-backed, discovery-first JASON-OS implementation plan with a standalone decision record, explicit audit checkpoints, and user approval before changes. Use for ambiguous, multi-system, or high-consequence work with several meaningful design decisions.
---

# Create a JASON-OS Deep Plan

Plan before implementation. The resulting decision record and plan are durable
artifacts; no implementation begins until the user approves the plan.

## Procedure

1. Create or select `.planning/<topic-slug>/` and gather context from relevant
   code, `AGENTS.md`, existing plans, research, and prior decisions. Verify
   filesystem claims rather than relying on memory or document summaries.
2. Write `DIAGNOSIS.md`: problem framing, evidence, existing constraints,
   unknowns, and research recommendations that require a user decision.
3. Run discovery in conversational batches. Ask only questions not answerable
   from evidence already gathered; offer a recommended default and tradeoff for
   each true decision. Synthesize between batches and state any inference.
4. Compile `DECISIONS.md` as a standalone table with numbered choices,
   rationale, and rejected alternatives where useful. Never leave a material
   decision as an unexamined `TBD`.
5. Write `PLAN.md`. Every step must name exact files or systems, implementation
   detail, dependencies, verification, and a `Done when` condition. Include an
   audit checkpoint at each meaningful phase boundary and identify safe
   parallelism.
6. Self-audit decision-to-plan coverage and verify the plan's factual
   assumptions. Use `convergence-loop` for complex or high-risk claim sets.
   Resolve accepted findings before presentation.
7. Show the diagnosis, decisions, and plan to the user. Ask for approval,
   changes, scope reduction, or rejection. After approval, route execution to
   the appropriate sequential or multi-agent approach.

## Boundaries

- Do not use this for a simple, fully specified change.
- Preserve the user as decision authority: research recommends; the user
  decides.
- Save durable decisions in the planning artifacts, not generated Codex state.
- If the request is really an unclear product direction, route to `brainstorm`
  first.

## Done when

`DIAGNOSIS.md`, `DECISIONS.md`, and `PLAN.md` agree, their assumptions have
been checked, and the user has explicitly approved or rejected the plan.
