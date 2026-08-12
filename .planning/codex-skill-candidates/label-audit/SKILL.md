---
name: label-audit
description: Audit JASON-OS label catalogs for drift, incomplete records, and cross-file patterns, then present a validated dry-run findings report. Use after broad changes or when catalog quality needs review.
---

# Audit Label Catalogs

The catalog format and validators are shared infrastructure. Codex hook
adapters and specialist derivation roles are not yet ported, so this initial
skill is read-only by default.

## Procedure

1. Confirm the scope: all records, recent paths, a path pattern, stubs,
   pending records, sections, or composite candidates. Resolve ambiguity before
   processing a broad scope.
2. Read `.claude/sync/label/docs/CATALOG_SHAPE.md` and the relevant catalog
   records. Inventory every targeted file or record and give each an outcome;
   never silently skip one.
3. Derive a dry-run assessment from source files and catalog invariants. For
   high-impact or ambiguous findings, use a fresh independent pass and preserve
   both candidate rationales.
4. Run the existing label catalog validation commands/tests appropriate to the
   selected files. Report validator failures exactly; do not bypass them.
5. Present a summary of clean records, drift, `needs_review` items, missing or
   unreachable targets, and possible composites. Include a proposed preview
   patch only when the user asks for it.

## Boundaries

- Do not promote, overwrite, or atomically write catalog records in this
  initial Codex port. That depends on the later hook/event and ownership
  design.
- The `.claude/sync/label/` engine remains preserved shared infrastructure;
  do not rewrite it merely to suit this skill.

## Done when

The user receives a complete scoped, validator-backed dry-run report with all
uncertain fields clearly marked for arbitration.
