---
name: jason-os-skill-creator
description: Create or revise project-local JASON-OS Codex skills using evidence, a focused workflow, packaging checks, and safe validation. Use in addition to Codex’s built-in skill-creator when the work must follow this repository’s migration and governance rules.
---

# Author JASON-OS Codex Skills

Codex’s built-in `skill-creator` remains the canonical packaging guide. Use this
project overlay when creating or revising a skill in `.agents/skills/`.

## Procedure

1. Establish the user need, concrete trigger examples, scope, expected output,
   mutation authority, and failure behavior. Inspect analogous project skills,
   relevant plans, and real scripts before designing a new workflow.
2. State the intended skill name and boundary. Prefer a small focused skill;
   use a new name only when its trigger and workflow do not overlap an existing
   one. Do not take on an existing native Codex skill name without a documented
   compatibility decision.
3. Initialize the skill with the Codex `skill-creator` scaffold, then write a
   concise `SKILL.md` and matching `agents/openai.yaml`. Add scripts or
   references only when they reduce repeated work or capture project-specific
   facts.
4. Include precise conditions for invocation, ordered procedure, user approval
   points, security limits, durable output location, and completion criteria.
   Keep Claude-specific wording and state paths out of the Codex skill unless
   intentionally reading preserved shared artifacts.
5. Validate structure and frontmatter. Run the standard skill validator when
   available; otherwise report a manual check and any unavailable dependency.
   For a material workflow, forward-test against a fixture or read-only task.
6. Run `git diff --check` and `npm run schema:validate` when changes can affect
   shared schema or synchronized artifacts. Present the skill diff and
   validation evidence for user acceptance; do not commit or publish without
   explicit authorization.

## JASON-OS boundaries

- Preserve `.claude/` during the port; do not copy its runtime configuration
  blindly.
- Never embed credentials, generated auth state, or inferred local-memory data.
- Record material migration decisions in `.planning/codex-port/`.

## Done when

The skill is concise, locally packaged, safety-bounded, validated to the degree
available, and accepted by the user.
