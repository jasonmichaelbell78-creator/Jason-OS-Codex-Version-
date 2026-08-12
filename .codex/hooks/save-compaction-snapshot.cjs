#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const root = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
const stateDir = path.join(root, ".codex", "state");
const output = path.join(stateDir, "compaction-handoff.json");
function git(args) { try { return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim(); } catch { return ""; } }
function sessionCount() { try { const text = fs.readFileSync(path.join(root, "SESSION_CONTEXT.md"), "utf8"); return Number(text.match(/Current Session Count(?:er)?[^0-9]*(\d+)/i)?.[1]) || null; } catch { return null; } }
try {
  fs.mkdirSync(stateDir, { recursive: true });
  const snapshot = {
    version: 1,
    createdAt: new Date().toISOString(),
    sessionCount: sessionCount(),
    branch: git(["branch", "--show-current"]),
    head: git(["log", "-1", "--oneline"]),
    status: git(["status", "--short"]).split("\n").filter(Boolean).slice(0, 50),
  };
  const temp = `${output}.${process.pid}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(snapshot, null, 2) + "\n", { mode: 0o600 });
  fs.renameSync(temp, output);
} catch { /* best-effort snapshot: never block compaction */ }
