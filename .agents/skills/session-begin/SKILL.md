---
name: session-begin
description: Start a JASON-OS work session by reading the shared handoff, checking repository state, detecting duplicate starts, and presenting the next goals. Use at the beginning of a session or when the user asks to resume JASON-OS work.
---

# Start a JASON-OS Session

Run a short, read-first pre-flight. Do not make unrelated repairs while
orienting the session.

## Procedure

1. Check duplicate start conditions before changing anything:
   - Has this skill already completed in the current conversation?
   - Does `SESSION_CONTEXT.md` show it was updated today?
   - Has the session counter already been incremented in this conversation?

   If any answer is yes, report the existing session number and ask what the
   user wants to work on. Do not increment again.

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

6. Present a concise summary: branch, working-tree state, relevant warning
   count, deferred infrastructure, and every Next Session Goal. Ask which goal
   to pursue.

## Boundaries

- The current health-script and automatic memory pipelines are deferred.
- Do not use, recreate, or migrate local Claude-memory data; its source files
  are unavailable until supplied by the operator.
- If three or more independent actionable problems surface, present a triage
  list and wait for direction rather than widening the session-start task.
- `SESSION_CONTEXT.md` is the shared handoff artifact during the transition;
  do not write generated Codex state into `.claude/state/`.

## Done when

The counter changed once, the user received the factual pre-flight summary,
and the next task is selected or explicitly deferred.
