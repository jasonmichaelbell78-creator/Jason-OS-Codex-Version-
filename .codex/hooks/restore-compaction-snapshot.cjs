#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
try {
  const root = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
  const file = path.join(root, ".codex", "state", "compaction-handoff.json");
  const handoff = JSON.parse(fs.readFileSync(file, "utf8"));
  const ageMinutes = Math.floor((Date.now() - Date.parse(handoff.createdAt)) / 60000);
  if (!Number.isFinite(ageMinutes) || ageMinutes > 180) process.exit(0);
  const lines = [
    "JASON-OS compaction recovery (verify against current files before acting):",
    `Saved ${ageMinutes} minutes ago on branch ${handoff.branch || "unknown"}.`,
    `HEAD: ${handoff.head || "unknown"}.`,
    `Recorded changes: ${(handoff.status || []).length}.`,
  ];
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: lines.join("\n") } }) + "\n");
} catch { /* no valid handoff is normal */ }
