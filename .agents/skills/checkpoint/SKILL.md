---
name: checkpoint
description: Create a recoverable JASON-OS handoff for a long, risky, or interrupted task by updating the shared session context and recording only approved repository state. Use before risky operations, after a major milestone, or when the user asks to preserve progress.
---

# Checkpoint a JASON-OS Task

Save enough accurate context for a later Codex session to resume without
guessing. This is a mid-session save, not a closure workflow.

## Procedure

1. Inspect current reality:

   ```bash
   git branch --show-current
   git status --short
   git log -1 --oneline
   ```

2. Update `SESSION_CONTEXT.md` Quick Recovery with the current branch, task,
   completed work, next step, and whether uncommitted work exists. Preserve
   details that a new session cannot infer from Git alone.

3. For a multi-step task, propose a compact task-state record under the future
   Codex-owned state location. Do not create one until the state-location
   decision is made. Until then, keep the durable recovery information in
   `SESSION_CONTEXT.md` and the relevant plan or research artifact.

4. Report what was saved and identify any uncommitted changes. Offer a commit
   only when the work is at a safe boundary; do not commit or push without the
   user's explicit request.

## Boundaries

- Do not write generated Codex state into `.claude/state/` during the
  transition.
- The former `--mcp` external-memory mode is deferred. Do not create MCP
  memories or substitute invented local memories while the operator's source
  memory files are unavailable.
- Do not use this skill to close a session; use `session-end` for closure.

## Done when

`SESSION_CONTEXT.md` accurately explains the current task and its next step,
and the user has received a summary of the saved state.
