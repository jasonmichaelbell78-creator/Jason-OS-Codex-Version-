# Memory Reconciliation Ledger

**Status:** inventory and hash classification complete; no content disposition is approved.

**Inputs:** supplied `memory.zip` (local memory), supplied `canonical memory.zip`, and tracked `.claude/canonical-memory/`.

**Safety rule:** this ledger does not authorize a write, merge, exclusion, publication, or memory-loading change. Each non-identical row requires content and sensitivity review followed by explicit operator approval.

## Per-file hash classification

| File | Classification | Content disposition |
| --- | --- | --- |
| `MEMORY.md` | three-way-conflict | pending operator review |
| `feedback_ack_requires_approval.md` | local-only | pending operator review |
| `feedback_agent_config_revert_hazard.md` | local-only | pending operator review |
| `feedback_agent_hot_reload.md` | local-only | pending operator review |
| `feedback_agent_output_files_empty.md` | local-only | pending operator review |
| `feedback_agent_stalling_pattern.md` | local-only | pending operator review |
| `feedback_agent_teams_learnings.md` | local-and-tracked-identical | pending operator review |
| `feedback_branch_first_never_main.md` | local-only | pending operator review |
| `feedback_code_review_patterns.md` | local-and-tracked-identical | pending operator review |
| `feedback_commit_hook_state_files.md` | local-only | pending operator review |
| `feedback_convergence_loops_mandatory.md` | local-and-tracked-identical | pending operator review |
| `feedback_deep_plan_hook_discovery_process.md` | local-only | pending operator review |
| `feedback_deep_plan_no_preemptive_defaults.md` | local-only | pending operator review |
| `feedback_deep_plan_qa_format.md` | local-only | pending operator review |
| `feedback_deep_plan_research_check.md` | local-only | pending operator review |
| `feedback_deep_research_formula.md` | local-only | pending operator review |
| `feedback_deep_research_phases_mandatory.md` | local-only | pending operator review |
| `feedback_dont_over_surface.md` | local-only | pending operator review |
| `feedback_execution_failure_recovery.md` | local-and-tracked-identical | pending operator review |
| `feedback_explain_before_decide.md` | local-only | pending operator review |
| `feedback_grep_vs_understanding.md` | local-only | pending operator review |
| `feedback_interactive_gates.md` | local-only | pending operator review |
| `feedback_never_bulk_accept.md` | local-only | pending operator review |
| `feedback_never_defer_without_approval.md` | local-only | pending operator review |
| `feedback_no_agent_budgets.md` | local-only | pending operator review |
| `feedback_no_artificial_caps.md` | local-only | pending operator review |
| `feedback_no_blanket_count_labels.md` | local-only | pending operator review |
| `feedback_no_broken_widgets.md` | local-only | pending operator review |
| `feedback_no_file_out_of_scope_sync_scans.md` | local-only | pending operator review |
| `feedback_no_incomplete_agent_findings.md` | local-only | pending operator review |
| `feedback_no_mvp_defer_later.md` | local-only | pending operator review |
| `feedback_no_preexisting_rejection.md` | local-and-tracked-identical | pending operator review |
| `feedback_no_premature_next_steps.md` | local-only | pending operator review |
| `feedback_no_research_caps.md` | local-only | pending operator review |
| `feedback_no_session_end_assumptions.md` | local-only | pending operator review |
| `feedback_no_silent_skill_failures.md` | local-only | pending operator review |
| `feedback_no_stale_ci_assumption.md` | local-only | pending operator review |
| `feedback_no_unnecessary_brainstorming.md` | local-only | pending operator review |
| `feedback_parallel_agents_for_impl.md` | local-and-tracked-identical | pending operator review |
| `feedback_per_skill_self_audit.md` | local-only | pending operator review |
| `feedback_permission_over_aliases.md` | local-only | pending operator review |
| `feedback_plain_language_structure.md` | local-only | pending operator review |
| `feedback_pr_review_paste_only.md` | local-only | pending operator review |
| `feedback_pr_review_state_files.md` | local-only | pending operator review |
| `feedback_pr_timing.md` | local-only | pending operator review |
| `feedback_pre_analysis_before_port.md` | local-only | pending operator review |
| `feedback_precommit_fixer_report.md` | local-only | pending operator review |
| `feedback_project_scoped_over_global.md` | local-only | pending operator review |
| `feedback_scope_drift_deep_research.md` | local-only | pending operator review |
| `feedback_skills_in_plans_are_tool_calls.md` | local-only | pending operator review |
| `feedback_skills_not_primary_mechanism.md` | local-only | pending operator review |
| `feedback_sonarcloud_mark_as_safe.md` | local-only | pending operator review |
| `feedback_statusline_rebuild_safety.md` | local-only | pending operator review |
| `feedback_testing_with_writes.md` | local-only | pending operator review |
| `feedback_todo_graduation.md` | local-only | pending operator review |
| `feedback_user_action_steps.md` | local-only | pending operator review |
| `feedback_verify_not_grep.md` | supplied-and-tracked-identical; absent from local archive | no tracked change needed; pending operator confirmation of retention |
| `feedback_workflow_chain.md` | local-only | pending operator review |
| `feedback_worktree_guidance.md` | local-only | pending operator review |
| `feedback_write_rejection_hard_stop.md` | local-only | pending operator review |
| `project_cross_locale_config.md` | local-only | pending operator review |
| `project_jason_os.md` | local-only | pending operator review |
| `project_sync_mechanism_principles.md` | local-only | pending operator review |
| `reference_pr_review_integrations.md` | local-only | pending operator review |
| `session-end-learnings.md` | three-way-conflict | pending operator review |
| `t3_convergence_loops.md` | local-only | pending operator review |
| `user_communication_preferences.md` | local-and-tracked-identical | pending operator review |
| `user_creation_mindset.md` | local-only | pending operator review |
| `user_decision_authority.md` | local-and-tracked-identical | pending operator review |
| `user_expertise_profile.md` | three-way-conflict | approved: local-memory version is authoritative; tracked profile and index updated |

## Required next review

1. Inspect every non-identical record for sensitivity, provenance, and whether it is shared canonical knowledge, local-only context, generated state, or obsolete material.
2. For each conflict, prepare a concrete keep/merge/exclude proposal with source excerpts and rationale.
3. Present the complete review set to the operator before changing tracked memory, an archive, retrieval behavior, or any runtime instruction.
