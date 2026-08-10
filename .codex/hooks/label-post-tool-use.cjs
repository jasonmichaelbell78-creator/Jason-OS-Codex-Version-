#!/usr/bin/env node
"use strict";
const path = require("node:path");
const repoRoot = path.resolve(__dirname, "..", "..");
process.env.JASON_OS_LABEL_RUNTIME = "codex";
const labelHook = require(path.join(repoRoot, ".claude", "sync", "label", "hooks", "post-tool-use-label.js"));
function extractChangedPaths(payload) {
  const command = payload?.tool_input?.command;
  if (typeof command !== "string") return [];
  const paths = new Set();
  for (const match of command.matchAll(/^\*\*\* (?:Add|Update) File: (.+)$/gm)) {
    const file = match[1].trim().replace(/\\/g, "/");
    if (!file || path.posix.isAbsolute(file) || file.split("/").includes("..")) continue;
    paths.add(file);
  }
  return [...paths];
}
function handle(payload) {
  const code = labelHook.drainPendingQueue();
  for (const filePath of extractChangedPaths(payload)) {
    try { labelHook.processCurrentEdit({ tool_input: { file_path: filePath } }); }
    catch (error) { process.stderr.write(`[codex-label-hook] current edit skipped: ${error?.name || "Error"}\n`); }
  }
  return code;
}
let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => { raw += chunk; });
process.stdin.on("error", () => process.exit(0));
process.stdin.on("end", () => {
  try { process.exit(handle(raw.trim() ? JSON.parse(raw) : {})); }
  catch (error) { process.stderr.write(`[codex-label-hook] queue sweep failed: ${error?.name || "Error"}\n`); process.exit(2); }
});
module.exports = { extractChangedPaths, handle };
