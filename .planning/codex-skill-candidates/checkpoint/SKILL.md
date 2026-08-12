---
name: checkpoint
description: Create a recoverable JASON-OS handoff for a long, risky, or interrupted task by updating the shared session context and recording only approved repository state. Use before risky operations, after a major milestone, or when the user asks to preserve progress.
---

# Session Checkpoint

Save current state so work can recover after compaction, interruption, or a
failure. This is a mid-session save, not a session-closure workflow.

## When to use

- Before a risky operation or a large file operation.
- Before or during a complex multi-step task.
- At a major milestone or safe recovery point.
- Periodically during extended work, or when a session is becoming long.

## Do not use this skill for

- Full session closure: use `session-end`.
- Work outside the checkpoint/recovery scope.

## Default checkpoint procedure

1. Inspect current reality:

   ```bash
   git branch --show-current
   git status --short
   git log -1 --oneline
   ```

2. Update `SESSION_CONTEXT.md` Quick Recovery with the current branch, task,
   completed work, next step, modified files, and whether uncommitted work
   exists. Preserve details that a later session cannot infer from Git alone.
   Include key decisions and blockers when they affect safe resumption.

3. For a multi-step task, prepare the state information that the future
   Codex-owned task record must contain: task name, start and update times,
   completed and pending steps, current branch, and resumption notes. Do not
   write a generated state record until the state-ownership decision is made.
   Until then, keep this durable information in `SESSION_CONTEXT.md` and the
   relevant plan or research artifact.

4. Report what was saved and identify any uncommitted changes. At a safe
   boundary, offer a commit; do not stage, commit, or push without the user's
   explicit request.

## Deferred external-memory and state paths

The Claude source supported an optional MCP-memory checkpoint and generated
handoff/task records under `.claude/state/`. Neither is a Codex equivalent yet:

- Do not write generated Codex state into `.claude/state/`.
- Do not create MCP memories or infer local memory. The supplied archives must
  complete their reviewed three-way reconciliation before a memory path is
  designed and approved.
- The later state-ownership phase must define a Codex record location, fields,
  retention, compaction interaction, and recovery fixture before this workflow
  can claim full parity.

If a user requests external-memory persistence now, explain this boundary and
offer the shared handoff plus relevant tracked plan or research artifact.

## Recovery

After an interruption or compaction:

1. Read `SESSION_CONTEXT.md`.
2. Read the relevant active plan, research artifact, or decision record.
3. Check `git log` and `git status` against the handoff.
4. When Codex-owned state is later accepted, read the corresponding handoff and
   task records as an additional source; do not let them override Git reality.

## Done when

`SESSION_CONTEXT.md` accurately explains the current task and its next step,
and the user has received a summary of the saved state.
