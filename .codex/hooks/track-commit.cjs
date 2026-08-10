#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => { raw += chunk; if (raw.length > 1024 * 1024) process.exit(0); });
process.stdin.on("error", () => process.exit(0));
process.stdin.on("end", () => {
  try {
    const payload = JSON.parse(raw);
    const command = payload?.tool_input?.command;
    if (typeof command !== "string" || !/\bgit\s+(commit|cherry-pick|merge|revert)\b/i.test(command)) return;
    const root = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
    const stateDir = path.join(root, ".codex", "state");
    const marker = path.join(stateDir, "commit-tracker.json");
    const log = path.join(stateDir, "commit-log.jsonl");
    const head = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
    let prior = "";
    try { prior = JSON.parse(fs.readFileSync(marker, "utf8")).head || ""; } catch { /* first observation */ }
    fs.mkdirSync(stateDir, { recursive: true });
    fs.writeFileSync(marker, JSON.stringify({ head, updatedAt: new Date().toISOString() }) + "\n", { mode: 0o600 });
    if (!prior || prior === head) return;
    const subject = execFileSync("git", ["log", "-1", "--format=%s"], { cwd: root, encoding: "utf8" }).trim().slice(0, 200);
    fs.appendFileSync(log, JSON.stringify({ timestamp: new Date().toISOString(), head: head.slice(0, 12), subject }) + "\n", { mode: 0o600 });
  } catch { /* tracking is advisory and must not disrupt a completed tool call */ }
});
