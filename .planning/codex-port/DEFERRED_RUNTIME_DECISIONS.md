# Deferred Codex Runtime Decisions

**Status:** ACTIVE — deliberate deferrals after initial runtime port

## Initial Codex runtime now active after hook trust

- `.codex/config.toml`: `on-request` approvals and `workspace-write` sandbox.
- `.codex/hooks/block-push-to-protected-branch.cjs`: denies direct pushes to
  `main` or `master`.
- `.codex/hooks/plain-language-reminder.cjs`: supplies the portable
  conversational/plain-language tenet as concise context.
- `.codex/hooks/save-compaction-snapshot.cjs` and `restore-compaction-snapshot.cjs`:
  maintain a bounded recovery handoff under `.codex/state/`.
- `.codex/hooks/track-commit.cjs`: tracks commits in bounded, ignored Codex state.
- `.codex/hooks/settings-guardian.cjs`: prevents deletion of protected Codex runtime files.
- Label PostToolUse and UserPromptSubmit adapters: maintain a Codex-specific
  pending-job queue and catalog feedback loop.

## Deferred or intentionally non-ported hooks

| Claude behavior | Decision | Reason and re-entry condition |
| --- | --- | --- |
| MCP-server availability check | `no-port` | Codex owns MCP configuration and connection state. Do not shell out from a lifecycle hook or expose configuration details. Revisit only if a concrete project MCP health contract is approved. |
| Compaction restore and pre-compaction save | `ported` | Bounded `.codex/state/` snapshot and compact-session restore are active; verify against current files after restore. |
| Commit tracker | `ported` | Uses bounded ignored Codex state; a baseline and duplicate-log fixture test passed. |
| Large-file gate | `environment-specific` | Codex supports named MCP read-tool matchers, but no portable matcher for built-in local reads. Enable only for a concrete filesystem-MCP contract. |
| Settings guardian | `ported` | Active `apply_patch` guard blocks deletion of protected Codex runtime files; allow and deny paths were tested. |
| Label notification | `no-port` | Desktop notifications have no portable Codespaces/Codex runtime equivalent. |
| Label PostToolUse and prompt hooks | `ported` | Codex `apply_patch` paths and prompt context now use isolated Codex state and a read-only `codex exec` derivation process. |

## Required before another stateful hook is enabled

1. Document exact Codex input/output event fields for the target client version.
2. Use `.codex/` rather than `.claude/state/` for generated runtime state.
3. Define bounded retention, symlink safety, and failure behavior.
4. Add a focused fixture test for allow, block, malformed input, and resume or
   duplicate behavior as applicable.
5. Review the hook through `/hooks` after every definition change.

Local-memory data remains outside this decision: its port waits for the source
files from the operator’s home computer and must not be inferred.
