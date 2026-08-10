#!/usr/bin/env node
"use strict";
const protectedFiles = [
  ".codex/config.toml",
  ".codex/hooks.json",
  ".codex/hooks/block-push-to-protected-branch.cjs",
];
let raw = "";
function deny(reason) {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: reason } }) + "\n");
}
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => { raw += chunk; if (raw.length > 1024 * 1024) process.exit(0); });
process.stdin.on("error", () => process.exit(0));
process.stdin.on("end", () => {
  try {
    const command = JSON.parse(raw)?.tool_input?.command;
    if (typeof command !== "string") return;
    for (const file of protectedFiles) {
      if (command.includes(`*** Delete File: ${file}`)) {
        deny(`Deleting ${file} is blocked by the JASON-OS Codex settings guardian. Modify it through a reviewed change instead.`);
        return;
      }
    }
  } catch { /* malformed payload must not block work */ }
});
