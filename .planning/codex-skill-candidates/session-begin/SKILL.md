---
name: session-begin
description: Start a JASON-OS work session by reading the shared handoff, checking repository state, detecting duplicate starts, and presenting the next goals. Use at the beginning of a session or when the user asks to resume JASON-OS work.
---

# Session Begin Pre-Flight

Run a short, read-first pre-flight that loads the handoff, validates the
working context, surfaces warnings, and hands control back for goal selection.
Do not make unrelated repairs while orienting the session. If three or more
actionable findings surface, present a triage list and wait for direction.

## Critical rules

1. Check duplicate-start conditions before doing anything that changes state.
2. Never increment the session counter twice in the same conversation or after
   compaction.
3. Announce `Session #N started on <branch>` after the one allowed increment.
4. Treat stale handoff documentation as a user decision: report concrete drift
   and ask whether to update or defer it.
5. If a supported check fails, report it and ask whether to fix, defer, or
   ignore it; do not decide unilaterally.

## When to use and stop conditions

Use this at the start of a work session or when explicitly resuming JASON-OS
work. Do not use it to close a session (`session-end`) or take a mid-session
snapshot (`checkpoint`). If the user says `skip` or asks to work mid-flight,
stop the checklist, state what was completed and what remains, and move to
goal selection.

## Procedure

1. Check duplicate-start conditions before changing anything:
   - Has this skill already completed in the current conversation?
   - Does `SESSION_CONTEXT.md` show it was updated today?
   - Has the session counter already been incremented in this conversation?

   If any answer is yes, report the existing session number and ask what the
   user wants to work on. Do not increment again. After compaction, re-read the
   handoff before deciding whether the increment already occurred.

2. Read `SESSION_CONTEXT.md`, then run:

   ```bash
   git branch --show-current
   git status --short
   git log --oneline -15
   ```

3. Compare the current branch and recent commits with the handoff's Quick
   Status and Next Session Goals. If they disagree, report the concrete drift
   and ask whether to update or defer it; do not fix it automatically.

4. Check `.claude/state/hook-warnings-log.jsonl` only if it exists. Report a
   warning only when ten or more entries are from the last seven days.

5. Increment the `Current Session Counter` in `SESSION_CONTEXT.md` exactly
   once, update its date, and announce `Session #N started on <branch>`.

6. Present this pre-flight summary: branch, working-tree state, relevant hook
   warning count, health-script status, deferred infrastructure, and every Next
   Session Goal without truncation. Then ask which surfaced goal to pursue, or
   whether the user wants something else. State that the pre-flight is complete.

## Deferred checks

The health-script, cross-session-gap, consolidation, warning-acknowledgment,
technical-debt-index, automatic-memory, and secrets-decryption pipelines are
not yet accepted for Codex. State that they are deferred rather than implying a
passing check. Restore each only after its own runtime contract and validation
exist.

## Compaction and handoff

`SESSION_CONTEXT.md` is the shared human-readable recovery artifact during the
transition. Do not write generated Codex state into `.claude/state/`. If
compaction interrupts this pre-flight, re-read the handoff, check the counter,
and resume at the last unfinished step.

## Boundaries

- Do not use, recreate, or migrate local Claude-memory data outside the
  reviewed reconciliation workflow.

## Done when

The counter changed once, the user received the factual pre-flight summary,
and the next task is selected or explicitly deferred.
