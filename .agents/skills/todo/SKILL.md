---
name: todo
description: Manage JASON-OS cross-session ideas, tasks, and insights stored in the protected JSONL todo ledger. Use when the user wants to list, add, edit, complete, reprioritize, archive, or permanently delete a JASON-OS todo.
---

# Manage JASON-OS Todos

Treat `.planning/todos.jsonl` as the canonical ledger and `.planning/TODOS.md`
as its generated view.

## Procedure

1. Start by showing the current active table. For more than 20 active entries,
   show the top ten by priority and offer the full table.
2. Ask whether to view/filter, add, complete, edit, update progress, delete,
   reprioritize, or archive completed items.
3. For an add, propose title, description, priority, tags, and contextual
   branch/files. Ask the user to confirm or revise the proposal before saving.
4. Execute every mutation through `scripts/planning/todos-cli.js`; never edit
   either todo file directly. The CLI locks the ledger, validates integrity,
   applies a regression guard, and regenerates the Markdown view.
5. Surface a non-zero CLI result and investigate before retrying. Confirm the
   CLI's reported result after success.

## Commands

```bash
# Read-only integrity check
node scripts/planning/todos-cli.js validate

# Add or edit: provide JSON only after user confirmation
node scripts/planning/todos-cli.js add --data '<json>'
node scripts/planning/todos-cli.js edit --id T29 --data '<json-patch>'

# Status operations
node scripts/planning/todos-cli.js complete --id T29
node scripts/planning/todos-cli.js progress --id T29 --text 'halfway done'
node scripts/planning/todos-cli.js reprioritize --id T29 --priority P1
node scripts/planning/todos-cli.js archive --id T29
```

## Safety rules

- Show the table before every action.
- Confirm permanent deletion and bulk archive explicitly before calling the
  CLI. Never reuse deleted IDs.
- Treat `P0` as critical, `P1` as high, `P2` as normal, and `P3` as someday.
- Use `cancel` to abandon an in-progress action; use `exit` or `done` to leave
  without a pending mutation.

## Done when

The requested ledger operation completed through the CLI, the generated view is
current, and the user has seen the resulting item or count.
