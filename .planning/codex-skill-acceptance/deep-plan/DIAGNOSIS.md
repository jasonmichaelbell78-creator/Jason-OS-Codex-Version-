# Diagnosis: Complete Codex Deep-Plan Port

**Date:** 2026-08-12
**Status:** awaiting operator confirmation before discovery

## Requested outcome

Produce a complete, working Codex `deep-plan` skill whose core is interactive
decision discovery: Codex investigates facts, explains each real choice with
advantages, disadvantages, and a recommendation, and the operator makes every
material decision. The skill must not be activated merely because a plausible
`SKILL.md` exists.

## Alignment

This work is aligned with the active Codex parity rebuild. The parity matrix
already marks `deep-plan` as `in-analysis`, and the port analysis identifies
both `SKILL.md` and `REFERENCE.md` as required source assets. The new acceptance
gate now requires the candidate to remain under
`.planning/codex-skill-candidates/deep-plan/` until evidence, testing, and
explicit operator approval are complete.

## Authority split

### Operator-locked requirements

These are decisions already made by the operator and will not be reopened:

1. Deep-plan is an interactive Q&A, not a mechanism for Codex to make the
   operator's decisions.
2. Each material question presents the actual context, concrete options,
   advantages, disadvantages, and a reasoned recommendation.
3. Questions are answered by the operator unless the operator explicitly says
   `your call` for that specific question.
4. No material decision, dependency, test, companion file, or failure path may
   be deferred without explicit operator approval.
5. Diagnosis, decision, plan, audit, and acceptance documents are written to
   disk and also displayed in full inline for review.
6. Claude-specific paths, commands, tools, teams, and assumptions must be
   translated to verified Codex equivalents rather than copied blindly.
7. A file is not complete because it exists. The finished skill needs working
   files, behavioral evidence, and explicit acceptance.

### Verified filesystem facts

1. Preserved Claude source package:
   - `.claude/skills/deep-plan/SKILL.md`: 426 lines, 20,607 bytes.
   - `.claude/skills/deep-plan/REFERENCE.md`: 8,444 bytes.
2. Quarantined Codex candidate:
   - `SKILL.md`: 47 lines, 2,432 bytes.
   - `agents/openai.yaml`: 197 bytes.
   - No reference, scripts, state schema, fixtures, or behavioral tests.
3. The candidate removed most operational controls, including the warm-up,
   diagnosis confirmation gate, question floor, batched discovery rules,
   progress checks, incremental decision persistence, user-discovery pause,
   detailed self-audit, finding-by-finding disposition, compaction recovery,
   templates, and execution routing contract.
4. Its UI default prompt does not mention `$deep-plan`, contrary to the
   built-in Codex skill packaging standard.
5. It references `brainstorm` and `convergence-loop`; both are quarantined and
   therefore unavailable.
6. Source references that do not currently exist in this repository include
   `ROADMAP.md`, `.research/EXTRACTIONS.md`, and
   `.research/extraction-journal.jsonl`.
7. Source references that exist but remain Claude-specific include
   `CLAUDE.md`, `.claude/state/deep-plan.*.state.json`,
   `.claude/teams/research-plan-team.md`, and GSD/EnterPlanMode routing.
8. The only preserved deep-plan state file is
   `.claude/state/deep-plan.cross-repo-movement-reframe.state.json`; it is
   historical source evidence, not a Codex state contract.
9. The built-in Codex packaging standard supports a concise `SKILL.md`,
   one-level `references/`, optional deterministic scripts, and
   `agents/openai.yaml`. It requires real validation and recommends forward
   testing for complex skills.

## Reframe check

The task is not “expand the 47-line file.” It is a behavioral migration with an
acceptance contract. The correct unit of work is the whole package:

- trigger and routing behavior;
- interactive phase gates;
- question and recommendation format;
- durable artifacts and interruption recovery;
- research and verification dependencies;
- templates and UI metadata;
- normal, gate, resume, and failure tests;
- acceptance evidence and final tree hash.

## Behavioral source contract

The preserved Claude workflow establishes these behaviors that must be either
ported or explicitly changed by operator decision:

1. Warm-up explains the topic, phases, and expected effort.
2. Phase 0 reads project context before asking questions.
3. Phase 0 checks roadmap alignment, prior extraction/research, whether new
   research is needed, prior brainstorming, relevant systems, and reframing.
4. Diagnosis separates locked decisions, filesystem facts, research
   recommendations, and speculation.
5. Testable code-state claims are verified or marked unverified.
6. The diagnosis is shown and confirmed before discovery begins.
7. Discovery asks until ambiguity is exhausted, with no artificial ceiling.
8. Questions are grouped by meaningful category and asked in conversational
   batches.
9. Every real decision includes a recommendation; research recommendations
   re-enter discovery as questions rather than becoming decisions.
10. Answers and explicit inferences are persisted after every batch.
11. The operator receives progress checks and can correct scope.
12. The operator gets a final opportunity to revisit answers before the
    decision record is compiled.
13. `DECISIONS.md` is standalone, numbered, specific, and displayed inline.
14. `PLAN.md` maps every decision to exact files, dependencies, verification,
    audit checkpoints, and `Done when` conditions, and is displayed inline.
15. Self-audit checks decision coverage, diagnosis coverage, assumptions, and
    artifact consistency.
16. Self-audit findings return to the operator as choices; Codex does not
    silently repair a material decision.
17. Explicit approval is required before execution routing.
18. Interrupted work can resume without relying on conversation memory.

## Material discovery axes

The following choices cannot be answered from the filesystem alone and must be
resolved interactively before implementation:

1. Where incremental planning state lives and whether it is tracked across
   machines.
2. What exact project-direction sources replace a missing `ROADMAP.md`.
3. What deep-plan does when a useful dependent skill such as deep-research,
   brainstorm, or convergence-loop is unavailable.
4. Whether the historical question floor remains a numeric floor or becomes a
   strict completeness rule without a number.
5. How much visual phase structure and progress reporting to preserve.
6. How Codex performs diagnosis and plan verification before other assurance
   skills are accepted.
7. What execution-routing choices replace Claude-specific EnterPlanMode, GSD,
   and team mechanisms.
8. Which state, failure, and recovery cases must be enforced by deterministic
   scripts versus procedural instructions.
9. Whether historical process telemetry and post-execution retros remain part
   of deep-plan or move to a separate accepted workflow.

No choices for these axes have been preselected in this diagnosis.

## Research check

External domain research is not needed to begin discovery. The authoritative
materials are local: the preserved Claude package, built-in Codex packaging
standard, current Codex runtime configuration, parity records, and the
operator's corrections. If a later question depends on undocumented Codex
runtime behavior, that behavior must be verified before the decision is made.

## Diagnosis gate

Discovery must not begin until the operator confirms that this diagnosis frames
the problem correctly or supplies corrections. Confirmation authorizes Q&A;
it does not approve implementation or promotion.
