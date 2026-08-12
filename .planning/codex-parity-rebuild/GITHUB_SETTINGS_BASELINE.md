# GitHub Settings Baseline

**Recorded:** 2026-08-12
**Repository:** `jasonmichaelbell78-creator/Jason-OS-Codex-Version-`
**Authority:** operator-configured GitHub UI settings, verified where the GitHub API token exposes the setting.

## Main branch policy

The active `Protect Main` ruleset targets only `refs/heads/main`. It has no bypass actors, including for the repository administrator.

- Pull requests are required before merge.
- Required approving reviews: **0**. This is deliberate for a solo maintainer: GitHub does not allow a pull-request author to approve their own request.
- All conversation threads must be resolved before merge.
- Stale-approval dismissal and most-recent-push approval are disabled because no independent approval is required.
- Required status checks are strict: the PR branch must be current with `main` before the required checks can satisfy the rule.
- Required checks: `SonarCloud Code Analysis`, `Dependency Review`, `Analyze JavaScript/TypeScript`, and `Scan`.
- Branch deletion and non-fast-forward updates are prohibited.
- Merge, squash, and rebase merge methods remain allowed; repository auto-merge is disabled.

## Workflow and dependency policy

- Dependabot updates require manual review by default. `DEPENDABOT_AUTOMERGE` is absent or `false`; automatic Dependabot merging is not enabled.
- The operator confirmed the repository Actions configuration has the intended least-privilege default and does not grant unneeded pull-request creation or approval authority.

## Verification and limitations

The ruleset was read through the GitHub API on 2026-08-12 and confirmed active. The active token received HTTP 403 for Actions permissions, Actions variables, secrets, classic branch-protection details, and security-alert configuration; those settings were confirmed by the operator in the GitHub UI rather than inferred from the API response. No secrets are recorded here.

## Follow-up audit

Before release, verify a real draft PR is blocked until all four named checks pass and until every conversation is resolved. Do not use a direct push to `main` as a routine test.
