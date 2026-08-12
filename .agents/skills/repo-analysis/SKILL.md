---
name: repo-analysis
description: Produce a comprehensive, evidence-backed analysis of a repository, including architecture, behavior, quality signals, risks, and complete scoped coverage. Use for understanding an unfamiliar local or external codebase before planning or migration.
---

# Analyze a Repository

Start with the user’s question and scope. For an external repository, obtain a
local copy or read-only source access before making claims.

## Procedure

1. Inventory the repository: instructions, manifest/tooling, source roots,
   tests, configuration, automation, documentation, and recent history when
   relevant. Record the exact revision or branch analyzed.
2. Map the architecture and execution paths from entry points through key
   modules, data/configuration boundaries, tests, and deployment or CI.
3. Examine every item in the agreed scope. Do not label a path irrelevant
   merely to reduce coverage; give each path an outcome: analyzed, excluded
   with a specific reason, unavailable, or requiring follow-up.
4. Validate important conclusions with source evidence and existing checks.
   Separate observed facts, plausible inferences, and unknowns.
5. Produce the requested report under `.planning/<topic-slug>/` unless the
   user specifies another durable destination. Include a scope ledger, system
   map, findings ranked by impact, evidence links/paths, risks, and questions.
6. Run a final coverage audit: compare the scope ledger with report claims and
   correct omissions before presenting results.

## Boundaries

- This is analysis, not implementation. Do not change the target repository
  unless the user separately authorizes it.
- Use `deep-research` for external-domain questions and `deep-plan` when the
  desired result is an implementation plan.

## Done when

The report identifies the analyzed revision, has complete scoped coverage, and
makes every material finding traceable to repository evidence.
