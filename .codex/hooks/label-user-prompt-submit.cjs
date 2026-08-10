#!/usr/bin/env node
"use strict";
const path = require("node:path");
const repoRoot = path.resolve(__dirname, "..", "..");
process.env.JASON_OS_LABEL_RUNTIME = "codex";
const warningHook = require(path.join(repoRoot, ".claude", "sync", "label", "hooks", "user-prompt-submit-label.js"));
try {
  const { code, output } = warningHook.evaluate();
  if (output) process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: output } }) + "\n");
  process.exit(code);
} catch (error) {
  process.stderr.write(`[codex-label-warning] evaluation failed: ${error?.name || "Error"}\n`);
  process.exit(2);
}
