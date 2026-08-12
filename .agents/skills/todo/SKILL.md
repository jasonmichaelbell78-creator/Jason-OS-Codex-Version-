---
name: todo
description: Manage JASON-OS cross-session ideas, tasks, and insights stored in the protected JSONL todo ledger. Use when the user wants to list, add, edit, complete, reprioritize, archive, or permanently delete a JASON-OS todo.
---

# Todo — Cross-Session Task Management

Capture, review, and act on ideas across sessions. Every todo retains the
context that explains why it exists.

## Critical rules

1. Show the current todo table before prompting for every menu action.
2. `.planning/todos.jsonl` is the source of truth. `.planning/TODOS.md` is a
   generated view and must never be edited directly.
3. Every JSONL mutation must use `scripts/planning/todos-cli.js`. Do not
   read-and-write the ledger directly: the CLI locks it, strictly parses it,
   applies a regression guard, writes atomically, and regenerates the view.
4. Confirm permanent deletion and bulk archive before executing them.
5. For a new todo, propose the title, description, priority, tags, and context;
   the user decides whether that proposal is saved or revised.
6. On a nonzero CLI result, surface the error and investigate. Never retry a
   mutation blindly.

## Use and boundaries

Use this skill for cross-session ideas, tasks, and insights, including explicit
`todo` requests. Do not use it for roadmap dependency resolution, session
recovery, phase-planning systems, or technical debt: use the owning workflow
instead.

## Storage and schema

- Ledger: `.planning/todos.jsonl`.
- Generated view: `.planning/TODOS.md`.
- Mutation boundary: `scripts/planning/todos-cli.js`.
- Renderer: `scripts/planning/render-todos.js`; the CLI invokes it after each
  successful mutation, so do not invoke it separately after a CLI mutation.

Each record has an auto-assigned `T<N>` ID, title, description, priority
(`P0`–`P3`), status, optional progress and tags, captured context, and created,
updated, and optional completion timestamps. Valid statuses are `pending`,
`in-progress`, `blocked`, `completed`, and `archived`. IDs removed by deletion
are never reused.

## Start and menu

Read the ledger. If it is missing or empty, say that there are no todos and ask
whether the user wants to add one. Otherwise show the active table, sorted by
priority and then status. When more than 20 entries are active, show the top
ten by priority and offer the complete table.

Then offer:

1. View or filter todos
2. Add a todo
3. Complete a todo
4. Edit a todo
5. Update progress
6. Delete a todo
7. Reprioritize a todo
8. Archive completed todos

After a completed action, return to this menu unless the user says `exit` or
`done`. `cancel` abandons only the current pending action and returns to the
menu; `exit` and `done` leave without saving a pending mutation. On exit, state
the active and completed counts.

## 1. View or filter

Show the full active table, then offer filters by priority, status, or tag; an
`all` view includes archived records. The active table uses ID, title, priority,
status, progress, tags, and created date. Completed records use completion
date; archived records are normally collapsed in the generated view.

Done when the user has seen the requested view.

## 2. Add a todo

1. Show the current table.
2. Capture the current branch, files discussed or modified, and the
   conversation context that prompted the todo.
3. Propose an actionable title, full description, `P0`–`P3` priority with brief
   rationale, tags, and captured context.
4. Ask whether the proposal looks right or should be changed. If the user says
   to decide, save the stated proposal.
5. Only after confirmation, call:

   ```bash
   node scripts/planning/todos-cli.js add --data '<json>'
   ```

6. Report the CLI summary, including the assigned ID.

## 3. Complete a todo

1. Show the non-completed table and ask for an ID or number.
2. Run `node scripts/planning/todos-cli.js complete --id T29`.
3. Report the CLI summary.

## 4. Edit a todo

1. Show the table, identify the record, and show its full details.
2. Ask what should change.
3. After confirmation, use a patch containing only changed fields:

   ```bash
   node scripts/planning/todos-cli.js edit --id T29 --data '<json-patch>'
   ```

   The patch must not contain `id`; the CLI updates `updatedAt`. Use the
   dedicated progress operation for progress text.
4. Report the result and ask whether anything else should change.

## 5. Update progress

1. Show the table, emphasizing active and in-progress work.
2. Ask for the record and status text.
3. Run:

   ```bash
   node scripts/planning/todos-cli.js progress --id T29 --text 'halfway done'
   ```

4. Report the result.

## 6. Delete a todo

1. Show the table and identify the record.
2. Say exactly that deletion is permanent and cannot be undone; wait for clear
   confirmation.
3. Only then run `node scripts/planning/todos-cli.js delete --id T29`.
4. Report the result. The CLI regression guard must confirm that exactly the
   requested record was removed and no other record was lost.

## 7. Reprioritize

1. Show the table sorted by its current priority.
2. Ask for one record or `bulk`.
3. For one record, ask for `P0`, `P1`, `P2`, or `P3`, then run:

   ```bash
   node scripts/planning/todos-cli.js reprioritize --id T29 --priority P1
   ```

4. For bulk work, walk through the selected records conversationally and call
   the CLI once per confirmed record, so every update receives its own guard.

## 8. Archive completed

1. Show completed records only. If there are none, say so.
2. Ask whether to archive all completed records or selected IDs.
3. For all records, state the count and obtain explicit confirmation before:

   ```bash
   node scripts/planning/todos-cli.js archive --completed
   ```

4. For selected records, use the supported single-ID or bulk-ID archive form.
5. Report the result.

## CLI safety contract

The CLI acquires an advisory lock, strictly parses every line, validates shape
and unique monotonic IDs before mutation, applies an in-memory operation,
verifies the expected record-set change, validates again, atomically writes the
ledger, and regenerates the Markdown view. Exit code `0` is success; `1` is a
user or validation error; `2` is a fatal integrity, lock, or regression-guard
failure. A read-only integrity check is:

```bash
node scripts/planning/todos-cli.js validate
```

## Operational integration

The ledger itself survives compaction. If compaction interrupts this workflow,
re-invoke it and resume from the on-disk ledger; do not reconstruct pending data
from memory. Session-start and session-end surfaces may summarize open todos
only after their own Codex hook and workflow contracts are accepted.

## Done when

The requested operation completed through the CLI, the generated view is
current, and the user has seen the resulting item, table, or count.
