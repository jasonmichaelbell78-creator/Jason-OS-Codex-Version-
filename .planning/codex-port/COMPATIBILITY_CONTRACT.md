# Codex Compatibility Contract

**Status:** ACTIVE — Phase 1 baseline
**Created:** 2026-08-10
**Scope:** Port the portable JASON-OS operating-system layer from Claude Code
to Codex without deleting or weakening the existing Claude implementation.

## Purpose

JASON-OS is becoming runtime-portable. This contract defines the transition
rules before any Claude behavior is reproduced in Codex. It prevents a
mechanical directory rename from silently changing security, state, or
operator behavior.

## Source-of-truth rules

1. **Preserve `.claude/` during the transition.** It remains the working
   Claude implementation and is not deleted, moved, or rewritten as a side
   effect of the Codex port.
2. **Place Codex-native runtime configuration in `.codex/`.** This includes
   Codex configuration, hooks, agent-role configuration, and Codex-only
   helpers. Project-local Codex configuration is trusted only after review.
3. **Keep runtime-neutral assets shared.** Node helpers in `scripts/`, Husky
   hooks, schema contracts, planning records, and research artifacts are not
   copied merely to give each agent runtime a private version.
4. **Maintain one authoritative copy of each portable workflow.** Until a
   workflow is deliberately converted to a shared source, `.claude/skills/`
   remains authoritative and the Codex version is a tested adaptation. Every
   divergence must be recorded in `MIGRATION_INVENTORY.md`.
5. **Never migrate credentials or user state.** Authentication files, API
   keys, local memories, statusline configuration, and generated runtime state
   are recreated through approved platform configuration, never committed.
6. **Do not enable automation before its local behavior is verified.** GitHub
   Actions, MCP servers, scheduled work, and automatic state mutation require
   a separately approved rollout after local smoke tests.
7. **Defer local-memory data migration until source material is available.**
   The operator's home-computer Claude-memory files are required input. Do not
   infer missing memories, manufacture replacements, or create a second source
   of truth while they are unavailable.

## Target architecture

```
repository root
├── AGENTS.md                     # durable, runtime-neutral Codex guidance
├── CLAUDE.md                     # Claude compatibility guidance during transition
├── .claude/                      # retained Claude implementation
├── .codex/                       # Codex-native implementation (introduced in phases)
│   ├── config.toml               # project defaults; no credentials
│   ├── hooks.json                # lifecycle-hook wiring
│   ├── skills/                   # Codex adaptations of portable workflows
│   └── agents/                   # role configuration and role prompts
├── scripts/                      # shared, runtime-neutral Node helpers
├── .planning/codex-port/         # migration decisions and evidence
└── .github/                      # CI and optional Codex automation
```

`AGENTS.md` is the Codex instruction entrypoint. It should hold concise,
durable repository rules, setup commands, security constraints, and verification
expectations. Claude-only UI and command semantics do not belong there.

## Port classifications

| Verdict | Meaning | Required evidence before promotion |
| --- | --- | --- |
| `shared` | Already runtime-neutral; preserve one implementation. | Existing validation remains green. |
| `direct-port` | Structure can be carried over with limited wording/path changes. | Codex discovery and one intended invocation succeed. |
| `adapt` | Same behavior, but runtime events, tools, state, or permissions differ. | Contract test plus a realistic Codex smoke test. |
| `redesign` | Intent transfers but the Claude feature has no safe one-to-one mapping. | User-approved design and acceptance criteria. |
| `defer` | Valuable but blocked on a prerequisite or a later product decision. | Explicit revisit trigger and safe manual alternative. |
| `no-port` | Intentionally Claude- or machine-specific. | Documented rationale; no dangling reference. |

## Non-negotiable compatibility guarantees

- Existing Git protections stay active: Husky and Gitleaks remain the
  hard enforcement layer independent of the agent runtime.
- Codex must not gain broader write, network, or push authority than the
  corresponding JASON-OS policy permits.
- Hook conversions must consume Codex hook input and produce Codex-supported
  output; a Claude hook script is never considered ported merely because its
  command can be launched by Codex.
- State files have a single writer per record type. Any change to a tracked
  schema or state location requires schema/versioning review.
- Every port batch is independently reviewable, testable, and reversible.

## Explicit non-goals for the first Codex port

- Deleting `.claude/`, `CLAUDE.md`, or current research/planning artifacts.
- Copying `settings.json` into `.codex/` unchanged.
- Importing `~/.claude`, `~/.codex`, API keys, or generated authentication
  state into Git.
- Porting the Claude statusline or requiring Go.
- Enabling a Codex GitHub Action, external MCP server, or unattended task
  before its secret/authentication boundary and local behavior are reviewed.

## Delivery gates

1. **Inventory gate:** every existing Claude-facing asset has a verdict,
   target, dependency record, and test strategy.
2. **Operator gate:** Codex operating guidance explains the supported workflow
   to a new repository user without relying on Claude terminology.
3. **Workflow gate:** each Codex skill batch is discoverable and passes its
   smoke test before the next batch starts.
4. **Enforcement gate:** each migrated hook has an adapter/contract test and
   cannot weaken push, secret, or filesystem protections.
5. **Integration gate:** GitHub or MCP automation has least privilege,
   documented secrets, and a rollback path.
6. **Transition gate:** a compatibility matrix verifies both runtimes where
   dual support remains promised; only then may a Claude component be retired
   by explicit user decision.

## Initial sequencing

1. Phase 1 — compatibility contract and complete migration inventory.
2. Phase 2 — Codex operator guide and minimal `AGENTS.md` alignment.
3. Phase 3 — session/state and planning workflow skills.
4. Phase 4 — research, audit, and review workflow skills.
5. Phase 5 — hook adapters, agents, teams, memory, and MCP decisions.
6. Phase 6 — optional GitHub Codex automation, validation matrix, and
   transition decisions.

The inventory is the operational record for this contract:
[`MIGRATION_INVENTORY.md`](MIGRATION_INVENTORY.md).
