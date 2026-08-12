---
name: session-end
description: Prepare a JASON-OS work session for handoff by reconciling the shared context with Git, updating next goals, presenting a pre-commit summary, and optionally committing and pushing with explicit approval. Use when the user is ending work, changing projects, or explicitly asks to close a session.
---

# Session End Pipeline

Close a work session deliberately so the next one starts from accurate context.
This is full closure; use `checkpoint` for a mid-session save.

## Critical rules

1. Update all five `SESSION_CONTEXT.md` fields: counter, uncommitted work, last
   updated date, quick status, and next-session goals.
2. Show the complete pre-commit summary before committing or pushing.
3. Record any check failure, continue safe remaining closure steps, and include
   it in the summary.
4. Honor `--no-push`: preserve context and complete local closure, but skip the
   push.
5. Do not commit or push unless the user explicitly approves the displayed
   scope. A commit approval does not imply push approval.

## Duplicate detection and recovery

Before acting, determine whether this conversation already completed closure or
whether the handoff already contains a current closure summary. If so, warn that
re-running would duplicate it and do not repeat the pipeline without direction.

If compaction removed conversation context, reconstruct it from Git first:

```bash
git log --oneline -20
git diff --stat HEAD~10
```

Treat optional state records only as secondary evidence; Git and the tracked
handoff are authoritative.

## Phase 1 — Context preservation

1. Review the session:

   ```bash
   git status --short
   git log --oneline -10
   git diff --stat HEAD~5..HEAD
   ```

2. Update all five handoff fields with current, concise reality. The quick
   status explains what changed, active plan phase, and blockers. Next goals
   remove completed work and name what is actually unlocked next.
3. If this session advanced an active plan, update its plan and parity/analysis
   records in the same pass. Do not invent automatic-memory learnings.

## Phase 2 — Best-effort compliance review

Where corresponding validated Codex state exists, summarize current-session
agent activity, override use, hook warnings, and commit patterns. If a source
does not exist, skip it silently and state the deferred infrastructure in the
pre-commit summary. Do not read, delete, or repurpose `.claude/state` as Codex
state during the transition.

Metrics, review synchronization, health scoring, automatic learning capture,
and external-memory persistence remain deferred until their own contracts pass.

## Phase 3 — Pre-commit review and closure

1. Show all changes with `git status --short`, validation results, deferred or
   failed checks, and proposed next goals.
2. Identify files outside the expected closure scope. The usual closure output
   is `SESSION_CONTEXT.md` plus an active plan and parity/analysis record when
   this session changed them; do not silently stage unrelated work.
3. Ask whether the displayed scope is ready to commit, and separately whether
   to push. For `--no-push`, record that push is skipped.
4. After explicit approval, use `node scripts/session-end-commit.js` for the
   approved closure scope. Verify that it updated or recognized the handoff and
   that a new commit appears, unless it reports a completed no-change closure.
5. If that script fails, report the failure and present the exact fallback
   commit scope for user approval; do not use a broad add-all command.

## Cleanup and boundaries

- Preserve in-progress task records and warn rather than deleting them.
- Never commit credentials, generated auth state, or local-memory content.
- Do not use this skill while actively working; finish at a safe boundary.
- `session-begin` consumes this handoff; `checkpoint` is the non-closing
  neighbor for interruptions.

## Done when

- The five-field handoff reflects reality.
- Any advanced plan/parity record is current.
- The user saw the pre-commit summary.
- The approved commit and push decision was executed, or its deliberate
  omission is recorded.
