# Memory Reconciliation Review Report

**Status:** complete evidence review; no unapproved record has been promoted.

## What was compared

Three inputs were compared record-by-record: local `memory.zip`, supplied
`canonical memory.zip`, and tracked `.claude/canonical-memory/`. The local
archive has 68 records plus its index; the tracked and supplied indexes name
the same 10 records. This is not an import-ready difference: the 58 additional
local records have different ages, scopes, and runtime assumptions.

No direct credential signature was found. `session-end-learnings.md` describes
a historical secret-leak incident, which is useful safety evidence but makes an
automatic history import inappropriate.

## Recommendation A — promote as active, portable operator guidance

These are durable preferences or general safety disciplines. They do not depend
on the earlier Windows/Claude implementation, a past PR, or a named project
phase. “Promote” means add only the local-only files below to tracked canonical
memory and then add them to `MEMORY.md`; it does not alter either supplied ZIP.

| Record | Why it belongs in active memory |
| --- | --- |
| `user_creation_mindset.md` | Establishes the operator’s craft-first scope preference, so it prevents inappropriate MVP/shipping framing in any runtime. |
| `feedback_ack_requires_approval.md` | Protects explicit operator control before acknowledging warnings or changing state. |
| `feedback_branch_first_never_main.md` | Preserves a repository-safety preference that applies independently of Claude. |
| `feedback_convergence_loops_mandatory.md` | General quality rule for meaningful claims; already tracked identically. |
| `feedback_dont_over_surface.md` | Keeps responses proportionate when the operator asks for a narrow answer. |
| `feedback_explain_before_decide.md` | Requires plain-language choices and tradeoffs before technical decisions. |
| `feedback_grep_vs_understanding.md` | Captures the distinction between string search and evidence-based analysis. |
| `feedback_interactive_gates.md` | Requires waiting at real decision points instead of treating prompts as automatic consent. |
| `feedback_never_bulk_accept.md` | Prevents ambiguous input being converted into multiple approvals. |
| `feedback_never_defer_without_approval.md` | Directly enforces the operator’s no-deferrals rule. |
| `feedback_no_agent_budgets.md` | Prevents artificial research cutoffs from being mistaken for quality limits. |
| `feedback_no_artificial_caps.md` | Requires complete candidate/finding coverage rather than an arbitrary truncated list. |
| `feedback_no_blanket_count_labels.md` | Prevents shallow frequency labels from substituting for meaningful analysis. |
| `feedback_no_incomplete_agent_findings.md` | Requires individual verification of coverage gaps rather than accepting summaries as complete. |
| `feedback_no_mvp_defer_later.md` | Reinforces the operator’s stated preference for completeness over staged shortcuts. |
| `feedback_no_preexisting_rejection.md` | Requires presenting a fix-or-track choice rather than dismissing work as pre-existing; already tracked identically. |
| `feedback_no_premature_next_steps.md` | Stops the agent from silently expanding “proceed” into a different task. |
| `feedback_no_research_caps.md` | Generalizes the operator’s rejection of arbitrary research ceilings. |
| `feedback_no_session_end_assumptions.md` | Prevents invented cleanup/commit assumptions when ending a session was not requested. |
| `feedback_no_silent_skill_failures.md` | Requires failures to be detected, mitigated, and reported. |
| `feedback_no_unnecessary_brainstorming.md` | Avoids reopening decisions the operator has already made. |
| `feedback_parallel_agents_for_impl.md` | Captures the preference for parallel implementation with verification; already tracked identically. |
| `feedback_plain_language_structure.md` | Requires readable, non-jargon structure for a no-code orchestrator. |
| `feedback_project_scoped_over_global.md` | Preserves the safer default of project-scoped tooling changes. |
| `feedback_testing_with_writes.md` | Requires new tests for code changes, not merely running old tests. |
| `feedback_user_action_steps.md` | Requires prompting for operator-owned actions such as authentication rather than burying them in prose. |
| `feedback_workflow_chain.md` | Records the preferred workflow sequence when the operator has not selected another one. |
| `feedback_write_rejection_hard_stop.md` | Requires recovering from a rejected write rather than falsely continuing with missing artifacts. |
| `t3_convergence_loops.md` | Supplies the reusable rationale for convergence loops beyond the existing operational feedback record. |

## Recommendation B — preserve as historical source, not active Codex guidance

These files should remain untouched in the supplied archive. They may contain
valuable lessons, but making them active memory would mislead Codex by treating
past Claude behavior, Windows constraints, old project state, or deprecated
integration choices as current instructions.

| Record | Why it should not be promoted unchanged |
| --- | --- |
| `feedback_agent_config_revert_hazard.md` | Names `.claude/settings.json`; the hazard is real but must be rewritten around Codex configuration before it can guide this runtime. |
| `feedback_agent_hot_reload.md` | Describes Claude session-start loading behavior, not verified Codex behavior. |
| `feedback_agent_output_files_empty.md` | Is a Windows Developer Mode limitation of an earlier agent mechanism. |
| `feedback_agent_stalling_pattern.md` | The general lesson is useful, but its numeric threshold is an unverified historical heuristic. |
| `feedback_agent_teams_learnings.md` | Already tracked identically, but cost ratios and team sizing are historical observations, not durable operating limits. |
| `feedback_commit_hook_state_files.md` | References Claude state paths and a historic review log; needs current repository validation. |
| `feedback_deep_plan_hook_discovery_process.md` | Is a specific historical planning recipe; adoption needs a current architecture decision. |
| `feedback_deep_plan_no_preemptive_defaults.md` | Is tied to an older deep-plan interaction format and should be reconciled with the current plan workflow. |
| `feedback_deep_plan_qa_format.md` | Mandates a Claude skill format that has not been approved as a Codex runtime rule. |
| `feedback_deep_plan_research_check.md` | Refers to a specific old Phase 0/Step 3 workflow. |
| `feedback_deep_research_formula.md` | Rejects one historic agent-allocation formula; it is context, not a reusable numeric rule. |
| `feedback_deep_research_phases_mandatory.md` | Names past verification phases and needs mapping to the current Codex skills. |
| `feedback_execution_failure_recovery.md` | Already tracked identically; it is safe history, but no duplicate promotion is needed. |
| `feedback_no_broken_widgets.md` | Is product/UI guidance, not a general memory rule for this repository. |
| `feedback_no_file_out_of_scope_sync_scans.md` | Is scoped specifically to the sync-mechanism project. |
| `feedback_no_stale_ci_assumption.md` | Sound principle, but its CI procedure should live with the CI/PR workflow once verified. |
| `feedback_per_skill_self_audit.md` | A design proposal for a specific skill estate, requiring an explicit architecture decision. |
| `feedback_permission_over_aliases.md` | Reflects an earlier shell/permission environment and needs current tooling evidence. |
| `feedback_pr_review_paste_only.md` | Conflicts with potential current GitHub connector capabilities; must be decided in the PR-review workflow. |
| `feedback_pr_review_state_files.md` | Requires runtime state-file design, not a memory-only import. |
| `feedback_pr_timing.md` | Is a workflow policy that needs confirmation against the current PR process. |
| `feedback_pre_analysis_before_port.md` | Is a porting procedure and belongs in a verified port workflow. |
| `feedback_precommit_fixer_report.md` | Names a particular skill report and wait state; use only after current skill validation. |
| `feedback_scope_drift_deep_research.md` | Useful historical caution, but its examples and remedy are tied to one past initiative. |
| `feedback_skills_in_plans_are_tool_calls.md` | Assumes slash-command semantics that differ between Claude and Codex. |
| `feedback_skills_not_primary_mechanism.md` | Is a sound architectural principle but needs design approval before becoming a runtime mandate. |
| `feedback_sonarcloud_mark_as_safe.md` | Depends on a current external integration and UI state that can change. |
| `feedback_statusline_rebuild_safety.md` | Is specific to a Claude Windows executable/shim implementation. |
| `feedback_todo_graduation.md` | Depends on a historical plan and todo-state migration that must be checked against current records. |
| `feedback_worktree_guidance.md` | Describes tools and file behavior that need confirmation in the present Codespace environment. |
| `project_cross_locale_config.md` | Contains locale paths and an older state-file design; it is reference material, not portable active memory. |
| `project_jason_os.md` | Its detailed project status is dated and includes now-stale next steps. |
| `project_sync_mechanism_principles.md` | Records a prior project’s exclusive scope and must not override the operator’s current scope. |
| `reference_pr_review_integrations.md` | Names external reviewers and an old skill discrepancy; verify immediately before use instead of storing as current fact. |

## Records requiring a specific decision

| Record | Evidence | Recommendation and tradeoff |
| --- | --- | --- |
| `MEMORY.md` | Local index names 68 records; supplied and tracked indexes name the same 10. | Keep the current index until record-level approvals are complete. Replacing it now would falsely present rejected, historical, and unresolved records as active memory. After approval, regenerate it solely from the files actually tracked. |
| `session-end-learnings.md` | Local has 5 session sections, supplied has 6, and tracked has 7; all normalized contents differ. | Do not select a winner automatically. A deliberate merge could preserve all history but needs de-duplication and a review of the secret-incident narrative; retaining tracked only avoids that risk but loses source history. |
| `feedback_verify_not_grep.md` | Supplied and tracked copies are byte-identical; local archive has no copy. | Retain tracked unchanged. It needs confirmation of retention only, not a merge. |
| `user_expertise_profile.md` | The operator explicitly approved the local-memory wording. | Completed in `734af66`; no further action. |

## Approval boundary

Approving Recommendation A authorizes exactly the listed local-only records to
be added to tracked canonical memory and included in a regenerated index.
Recommendation B remains archive-only. The two unresolved conflicts remain
unchanged until separately decided.
