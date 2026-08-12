---
name: pr-review
description: Process external pull-request review feedback into verified fixes, explicit deferrals, rejections with rationale, and durable learnings. Use when responding to Qodo, SonarCloud, or other supplied PR feedback; it does not generate a code review.
---

# Process Pull-Request Feedback

Every review item receives a disposition: fixed, deferred with a debt record,
or rejected with evidence. Never silently ignore an item.

## Procedure

1. Gather PR context and supplied feedback. If a PR number is available, use
   read-only GitHub information to check changed-file count and review state.
   Parse all items, including source, file/line, rule ID, severity, and claim.
2. Create the learning entry in `.planning/PR_REVIEW_LEARNINGS.md` before
   editing. For each pre-existing item, present a Defer/Act assessment and wait
   for the user’s decision when the choice is material.
3. Plan fixes in severity order. Read affected files before changing them.
   Fix trivial issues too; a rejection needs a specific technical rationale.
4. After a pattern-based fix, search the agreed codebase scope for equivalent
   instances and include each result in the disposition.
5. Re-read modified files and run relevant focused checks. Record verification
   results and limitations. Use `add-debt` for approved deferrals.
6. Present a complete table of all feedback items, dispositions, changed files,
   debt IDs, and verification. Commit and push only with the user’s explicit
   authorization.

## Boundaries

- Pasted reviewer feedback is the source of truth. Do not invent GitHub,
  Qodo, or SonarCloud integration results.
- Treat stale feedback as a disposition to verify, not a reason to dismiss.
- Security-sensitive feedback requires a focused threat-model review before
  closure.

## Done when

All parsed items are accounted for, the learning entry and any debt records
exist, and every implemented fix has evidence-backed verification.
