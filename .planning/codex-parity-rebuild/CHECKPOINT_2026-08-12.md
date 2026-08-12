# Codex Parity Rebuild Checkpoint — 2026-08-12

## Resume objective

Continue the exhaustive Claude-to-Codex port-plan discovery. Do not begin a
component implementation or call the rebuilt plan complete until every
currently answerable decision is resolved, the global dependency census and
two-way gap inventory are complete, and the operator approves the complete
plan inline.

## Authoritative state

- Branch: `agent/codex-parity-rebuild`
- Discovery state: `PORT_PLAN_DISCOVERY_STATE.json`
- Current decision batch: 11
- Recorded top-level decisions: 48
- Decision 46 is only partially resolved. Q46.1 through Q46.6 are approved;
  the remaining named workflow routes still require individual decisions.
- Decision 48 requires a blocking end-to-end gap inventory before plan
  approval and a repeated implementation comparison before final completion.
- The existing `PLAN.md`, `PARITY_MATRIX.md`, `PORT_ANALYSIS.md`, and
  `VALIDATION_EVIDENCE.md` are prior-plan evidence. They are not the final
  rebuilt plan and their old completion, deferral, and ordering claims are not
  authoritative unless revalidated through the current discovery decisions.

## Trust boundary now in place

- All 15 unaccepted project skill ports are quarantined under
  `.planning/codex-skill-candidates/`.
- `.agents/skills/` contains no active project skill; its README explains the
  quarantine.
- `.agents/skills-acceptance.json` contains zero accepted skills.
- `scripts/validate-codex-skills.cjs`, its test suite, package scripts, and the
  unconditional Husky pre-commit check enforce the current skill boundary.
- No quarantined candidate may be invoked to port, test, or approve another
  candidate.
- The quarantine is not yet universal: existing Codex hooks, agents, settings,
  and other load-bearing surfaces still require the planned universal registry
  transition and clean-runtime restart.

## Decisions added at this stopping point

The operator approved the complete recommendation set from Q46.1–Q46.6:

1. Build a complete separate `create-audit` workflow.
2. Build a complete `skill-ecosystem-audit` orchestrator covering its eight
   audit dimensions, shared rules, synthesis, review, and remediation.
3. Build a complete `hook-ecosystem-audit` workflow.
4. Build a standalone complete `pr-retro` workflow that consumes PR learnings
   and routes proposed memory or workflow promotions through operator approval.
5. Build a complete reusable `systematic-debugging` workflow.
6. Implement `quick-fix` as a bounded explicit mode of `pre-commit-fixer`, not
   as a duplicate standalone skill.

No other missing route was decided by this approval.

## Approved governing rules that must survive resumption

- No deferral, omission, replacement, reduced scope, or postponed dependency
  without the operator's explicit approval.
- Partial files, prose, fixtures, or scaffolds are not completed components.
- The operator is the sole acceptance authority and reviewer.
- Deep-plan is an interactive decision workflow: present options, pros, cons,
  and a recommendation; the operator decides.
- Show every newly created plan or report Markdown document fully inline as
  well as saving it in the repository.
- Preserve `.claude/` as source evidence. Do not casually rewrite it.
- Never commit or publish `memory.zip` or `canonical memory.zip`; they are
  local-only reconciliation inputs.
- Do not port the Claude statusline and do not create a Codex replacement.
- Commit and push after each accepted component; open one PR only after the
  entire port is accepted.
- The broader research and roadmap continuation is a separate post-port
  project, but an item may cross that boundary only through an explicit
  operator decision.

## Verified discoveries to retain

- The preserved `.claude/` tree contains 137 tracked files; the transitive
  census must also cover root scripts, Husky, schemas, plans, research
  artifacts, tools, callers, and generated or runtime state contracts.
- `.claude/sync/label/` contains 47 files. Its existing test suite reports 150
  tests with 146 passing and four unreliable negative tests; chmod-based
  failure injection does not reliably make rename-over fail on Linux. The port
  must use deterministic I/O fault injection and prove rollback.
- Label catalogs are absent and three label hooks are dormant. Label completion
  requires real backfill, operator arbitration, catalog promotion, atomic hook
  activation, and live verification.
- Shared runtime-neutral schema and label code will target root-level `sync/`
  while `.claude/` remains preserved for comparison.
- Real source MCP routes are Context7, Memory MCP, and SonarCloud. Configuration
  or authentication health must be reported separately from a real live tool
  preflight. Sequential-thinking and episodic permission entries are
  evidence-only unless a real route is discovered.
- The installed Codex runtime had no MCP servers configured at discovery time.
- Missing GSD behavior will be implemented within complete deep-plan support
  for projects, milestones, phases, dependencies, durable state, and execution
  handoff.
- `add-debt` must become a bounded structured debt system rather than retain its
  current append-only stub.
- Codex has no documented equivalents for Claude Notification,
  WorktreeCreate, or WorktreeRemove hook events. Approved replacements and
  limitations are recorded in Decisions 38–41; source outcomes still require
  layered enforcement and live verification.

## Exact next work

Resume Decision 46 with the next individually reasoned route batch. At minimum,
the unresolved inventory includes:

- `synthesize`, `extract`, and `recall`
- `port`, `context-sync`, and `sync-back`
- `analyze`, `website-analysis`, `document-analysis`, and `media-analysis`
- `doc-optimizer`, `example-formatter`, `migration-skill`, `superpowers`, and
  `task-next`

First distinguish real callable routes from examples, placeholders, historical
references, and separate-product references. Then present each real capability
to the operator with source evidence, dependencies, scope, alternatives, pros,
cons, and a recommendation. Do not bucket the routes together and do not infer
a deferral.

After all route decisions are resolved:

1. Complete the asset-and-behavior dependency census for the entire transitive
   port surface.
2. Produce the pre-plan gap inventory and prove zero unexplained items in both
   directions.
3. Rebuild the complete dependency-ordered execution plan.
4. Save the plan and gap report and show both documents fully inline.
5. Obtain explicit operator approval before any acceptance implementation
   begins.

## Restart procedure

1. Run `git status -sb` and confirm this branch matches its remote checkpoint.
2. Read this file and `PORT_PLAN_DISCOVERY_STATE.json` before relying on older
   planning documents.
3. Confirm the 15 skill candidates remain quarantined and the acceptance
   validator passes.
4. Continue with Decision 46's next route batch; do not invoke any quarantined
   project skill.

## Stop condition

This checkpoint saves discovery progress only. The port plan is not approved,
the universal quarantine is not complete, and no quarantined component is
accepted or available for use.
