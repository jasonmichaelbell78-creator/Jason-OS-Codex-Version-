---
name: deep-research
description: Run a structured JASON-OS research investigation with an approved plan, source citations, confidence levels, independent challenge, and durable findings. Use for substantial external research before a decision or implementation plan.
---

# Run Deep Research

Use this for consequential research, not a quick fact lookup or codebase-only
question. Research outputs belong only in `.research/<topic-slug>/`.

## Procedure

1. Check whether the topic already has a research directory; offer resume,
   refresh, or abort. Define the question, scope, decision it informs, and
   decomposition into non-overlapping subquestions.
2. Present a plan: sources to seek, research passes, expected outputs, and
   the proposed use of independent passes. Wait for user approval before
   external research or artifact creation unless the user explicitly requests
   automatic execution.
3. Collect and save evidence with direct links, publication dates where
   relevant, claim-level confidence, and a clear distinction between facts and
   inferences. Prefer primary sources for technical, regulatory, product, and
   financial claims.
4. Run an independent contrarian pass and an out-of-the-box pass. Recheck
   contested or decision-critical claims against their sources. Record gaps and
   failures rather than silently filling them with assumptions.
5. Write `RESEARCH_OUTPUT.md` with the question, scope, findings, citations,
   confidence, disagreements, open gaps, and recommended next step. Keep any
   supporting claims and source records in the same topic directory.
6. Present a concise synthesis and route the result to brainstorming or deep
   planning only after the user decides to do so.

## Boundaries

- Do not modify consumer-owned plans, code, or canonical memory as part of
  research.
- Codex-specific research roles and automated resume state are not yet ported;
  use independent fresh passes and explicitly report incomplete passes.
- Never claim verification that did not occur. If web access is unavailable,
  state the limitation and ask whether local-only research is acceptable.

## Done when

The topic directory contains a cited, confidence-labeled report and all
material counterarguments or research gaps have an explicit disposition.
