#!/usr/bin/env node
"use strict";

// Codex PreToolUse hook. Denies direct Bash pushes to protected branches.
const PROTECTED_BRANCHES = ["main", "master"];
const MAX_INPUT_BYTES = 1024 * 1024;
let input = "";

function deny(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: reason,
      },
    }) + "\n"
  );
}

process.stdin.setEncoding("utf8");
process.stdin.on("error", () => process.exit(0));
process.stdin.on("data", (chunk) => {
  input += chunk;
  if (input.length > MAX_INPUT_BYTES) process.exit(0);
});
process.stdin.on("end", () => {
  try {
    const payload = JSON.parse(input);
    const command = payload?.tool_input?.command;
    if (typeof command !== "string" || !/\bgit\s+push\b/i.test(command)) return;

    const normalized = command.replace(/#.*/g, "").replace(/\s+/g, " ").trim();
    for (const branch of PROTECTED_BRANCHES) {
      const direct = new RegExp(`\\bgit\\s+push\\b[^|;&]*(?:\\s|^)(?:refs/heads/)?${branch}(?=\\s|$)`, "i");
      const refspec = new RegExp(`\\bgit\\s+push\\b[^|;&]*:\\s*(?:refs/heads/)?${branch}(?=\\s|$)`, "i");
      if (direct.test(normalized) || refspec.test(normalized)) {
        deny(`Direct push to ${branch} is blocked. Push a feature branch and open a pull request instead.`);
        return;
      }
    }
  } catch {
    // A malformed lifecycle payload must not block work.
  }
});
