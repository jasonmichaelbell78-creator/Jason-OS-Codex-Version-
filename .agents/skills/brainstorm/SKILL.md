---
name: brainstorm
description: Explore a JASON-OS idea or design space before implementation planning by grounding it in repository context, generating multiple directions, challenging assumptions, and recording the user-selected direction. Use when what to build is unclear or several viable approaches exist.
---

# Brainstorm a JASON-OS Direction

Explore before committing. Do not implement code during this workflow.

## Procedure

1. Establish the topic, success criteria, constraints, and anti-goals. Vague
   ideas are valid input; help shape them rather than skipping unknowns.
2. Ground the discussion in repository reality: read `AGENTS.md`, inspect
   relevant code and plans, and find related research. When a claim matters and
   is not locally verifiable, research it before relying on it.
3. Generate at least three materially different directions. For each, describe
   the approach, benefits, costs, dependencies, and assumptions.
4. Run a contrarian checkpoint on the leading directions. If multi-agent work
   is available, obtain an independent challenge; otherwise perform a clearly
   labeled fresh-pass critique. Surface anti-goal conflicts explicitly.
5. Ask the user to select a direction. The user may choose a hybrid, but Codex
   must not make the final direction choice by delegation.
6. Capture the chosen direction, rationale, alternatives rejected, and open
   questions in `.research/<topic-slug>/BRAINSTORM.md`. Show the artifact in
   the conversation, then route to `deep-plan`, `deep-research`, or direct
   implementation as appropriate.

## Boundaries

- Do not use a brainstorm when direction is clear and only implementation
  planning remains; route to `deep-plan`.
- Do not declare technical claims grounded without checking the repository or
  an appropriate current source.
- Avoid arbitrary ceilings on exploration, but obtain a user check-in before
  expanding into a materially larger problem.
- Use `convergence-loop` for a claim set that could affect the chosen direction.

## Done when

The user has selected a direction with its tradeoffs understood, and the
durable brainstorm artifact identifies the appropriate next workflow.
