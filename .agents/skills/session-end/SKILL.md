---
name: session-end
description: Prepare a JASON-OS work session for handoff by reconciling the shared context with Git, updating next goals, and presenting a pre-commit summary. Use when the user is ending work, changing projects, or explicitly asks to close a session.
---

# End a JASON-OS Session

Close a session deliberately. Context preservation is mandatory; committing and
pushing are separate user-authorized actions.

## Procedure

1. Detect duplicate closure. If the current conversation already completed this
   workflow or `SESSION_CONTEXT.md` contains a current closure summary, report
   that fact and avoid duplicating the entry.

2. Reconstruct the session from Git and the conversation:

   ```bash
   git status --short
   git log --oneline -10
   git diff --stat HEAD~5..HEAD
   ```

3. Update all five `SESSION_CONTEXT.md` fields:
   - Current Session Counter
   - Uncommitted Work
   - Last Updated
   - Quick Status
   - Next Session Goals

   Keep the record factual. If a plan advanced, update its status in the same
   pass. Do not invent memory-derived learnings while the local memory source
   set is unavailable.

4. Present the pre-commit summary: changed files, relevant validation results,
   unresolved warnings, and proposed next goals.

5. Commit only if the user explicitly approves the displayed scope. Push only
   if the user separately gives explicit approval. If either is not approved,
   leave the working tree unchanged after the context update and state that
   clearly.

## Boundaries

- Do not delete `.claude/state/` files. Existing state has a Claude ownership
  contract until a later adapter decision says otherwise.
- The former metrics, review, and automatic-learning pipeline remains deferred.
- Do not include credentials, generated authentication state, or local memory
  content in a commit.

## Done when

The handoff record reflects reality and the user has reviewed the commit/push
decision. A commit or push is optional and requires the stated approval.
