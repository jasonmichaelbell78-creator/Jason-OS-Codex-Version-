---
name: pre-commit-fixer
description: Diagnose and safely remediate a JASON-OS pre-commit failure. Use after a failed git commit or when the user asks to investigate Gitleaks, schema-enum, or label-catalog pre-commit checks; always present the proposed fix before recommitting.
---

# Fix a JASON-OS Pre-commit Failure

Classify the actual hook output, make only the approved focused fix, and never
hide a failed check.

## Procedure

1. Capture the failed commit output. To reproduce only the current secret
   check without committing, run:

   ```bash
   gitleaks git --staged --redact --no-banner
   ```

2. Classify every failure. Current repository checks include:
   - Gitleaks secrets detection
   - schema/enums drift when schema files are staged
   - label-catalog validation when catalog files are staged

3. Separate findings introduced by the current change from verified
   pre-existing failures. Present counts, affected files, and a focused fix
   proposal. If more than 15 errors or ten files are involved, ask whether to
   narrow scope, fix all, or defer.

4. For a secret finding, stop at the report. The user must remove the secret
   from staging or explicitly provide the exact `SKIP_REASON` for a confirmed
   false positive. Never invent a skip reason or autofix secret handling.

5. For an accepted non-secret fix, edit only relevant working-tree or staged
   files, then re-run the applicable check. After two failed attempts in the
   same category, stop and ask for direction.

6. Present the final report: fixed, deferred, pre-existing, modified files,
   and any residual risk. Recommit only after explicit user approval; a push
   always requires separate explicit approval.

## Guardrails

- Do not use `SKIP_CHECKS` autonomously.
- Do not fix generated, vendored, or `node_modules` files.
- Treat a newly introduced failure after a fix as a regression and report it
  rather than automatically chasing it.
- Route an agreed architectural follow-up to `add-debt`.

## Done when

The applicable check passes, or the user has explicitly chosen a documented
defer/stop path and seen the exact remaining failure.
