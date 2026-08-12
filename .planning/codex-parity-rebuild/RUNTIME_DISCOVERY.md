# Runtime and State Discovery

**Status:** discovery in progress; no runtime component is accepted.

## Current Codex state

| Record | Current writer | Observed content | Required disposition |
| --- | --- | --- | --- |
| `commit-log.jsonl` | `track-commit.cjs` | append-only commit summaries | define schema, sanitization, rotation, recovery consumer, and test suite |
| `commit-tracker.json` | `track-commit.cjs` | last observed HEAD | define atomic/symlink-safe update, retention, and failure behavior |
| `compaction-handoff.json` | `save-compaction-snapshot.cjs` | branch, HEAD, session count, first 50 status lines | stale old-branch data exists; define full snapshot schema, freshness, ownership, recovery, and cleanup |

## Source-to-target findings

| Source behavior | Current Codex behavior | Required work |
| --- | --- | --- |
| Commit tracking captures metadata, redacts sensitive data, records failed commits and bounded hook output, rotates logs, and protects writes against symlink attacks. | Tracks only changed HEAD and a truncated subject with direct writes. | Rebuild contract, shared safe state helpers, normal/failure/duplicate/malformed/rotation/symlink fixtures. |
| Pre-compaction save captures task states, recent commits, Git state, session/team/plan context, notes, active audits, trigger, and recovery instruction. | Captures only session count, branch, HEAD, and up to 50 status lines. | Define Codex-owned task/team/plan state; rebuild snapshot, retention, redaction, atomic writes, and fixtures. |
| Compaction restore provides a structured recovery summary from the comprehensive snapshot. | Prints four summary lines if a snapshot is younger than 180 minutes. | Rebuild formatted recovery, stale/corrupt/missing handling, current-Git comparison, and integration fixture. |
| Settings guardian protects critical hook references on write and edit, emits warning audit entries, and scopes itself to guarded settings paths. | Blocks deletion of three files only. | Define protected Codex configuration set, update/edit semantics, warning audit state, malformed-payload and bypass fixtures. |
| Large-file gate blocks over 5 MB, warns over 500 KB, and records safe warning entries. | No Codex equivalent. | Investigate supported file-read interception and equivalent policy; no exception is proposed. |
| MCP health check, desktop label notification, and statusline are source behaviors. | No verified Codex equivalent. | Investigate practical Codex/Codespaces implementations before requesting an operator decision. |

## Shared helper scope

The preserved runtime relies on `git-utils`, `rotate-state`, `sanitize-input`,
`state-utils`, and `symlink-guard`. The current Codex adapters duplicate direct
filesystem writes and have no accepted equivalent of those guarantees. Shared
helper ownership and test coverage are therefore mandatory before any Codex
state writer is accepted.

## Immediate discovery work

1. Enumerate every source state file schema, writer, reader, retention rule,
   and recovery consumer.
2. Define one Codex-owned state directory contract and a shared safe helper
   layer that covers atomic writes, symlink safety, sanitization, rotation, and
   malformed state.
3. Map every source hook event payload and decision to installed Codex behavior
   with fixtures; investigate unsupported interception points rather than
   declaring them absent.
