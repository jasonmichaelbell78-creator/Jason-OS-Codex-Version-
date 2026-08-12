---
name: add-debt
description: Record a JASON-OS technical-debt item in the Markdown debt log. Use when the user wants to preserve a limitation, shortcut, risk, or deferred remediation that is not a cross-session todo, bug report, or feature request.
---

# Log JASON-OS Technical Debt

Use the current lightweight debt log until JASON-OS adopts a dedicated debt
system.

## Procedure

1. Gather or propose the title, severity (`S0`–`S3`), category, and notes.
   Explain the issue, why it is debt, and what resolution would look like.
2. Ask the user to confirm the proposed row before writing it.
3. Ensure `.planning/DEBT_LOG.md` has its standard table header. Determine the
   next unused `D<N>` identifier, escape pipes in user-supplied content, and
   append exactly one row with today's date.
4. Echo the saved row.

## Boundaries

- Use `todo` for cross-session tasks; use a GitHub issue for a bug or feature
  request.
- Do not edit or delete prior debt rows through this skill.
- Do not include secrets, tokens, or credentials in a debt note.
- This Markdown log is temporary by design. Redesign it only when a dedicated,
  guarded debt-intake system is approved.

## Done when

One confirmed, correctly escaped row is appended and shown to the user.
