---
name: skill-audit
description: Audit project-local Codex skills for trigger quality, workflow correctness, safety boundaries, packaging, and validation evidence. Use before accepting a new or materially revised skill.
---

# Audit Codex Skills

Audit the selected `.agents/skills/` directories against Codex skill
conventions and JASON-OS project rules.

## Procedure

1. Establish the audit scope and read each `SKILL.md`, its `agents/openai.yaml`,
   and only the bundled resources it references.
2. Check trigger metadata: accurate name, focused description, no duplicate or
   misleading activation claims.
3. Check behavior: required inputs, ordered workflow, output contract,
   tool/permission limits, error handling, and explicit user-approval
   boundaries for mutations or external actions.
4. Check packaging: valid YAML frontmatter, no placeholder text, links to real
   files, concise instructions, and no unnecessary auxiliary documents.
5. Run the Codex skill validator when its dependency is available; otherwise
   perform and report a manual structural check. Forward-test high-risk skills
   only against safe fixtures or read-only tasks.
6. Write findings by severity with evidence, recommended corrections, and any
   validation limitation. Do not silently alter audited skills; make changes
   only when the user asks for remediation.

## JASON-OS checks

- Skills must not write credentials, generated Codex auth state, or inferred
  local-memory content.
- Preserve `.claude/` while the port remains in progress.
- Project-local functionality belongs in `.codex/`; runtime-neutral helpers
  remain shared outside agent directories.

## Done when

Every audited skill has a documented outcome and the report distinguishes
validated defects from recommendations or untested assumptions.
