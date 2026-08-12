#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { treeHash, validate } = require("./validate-codex-skills.cjs");

function writeManifest(root, entries) {
  fs.writeFileSync(path.join(root, ".agents", "skills-acceptance.json"), JSON.stringify({
    version: 1,
    active_directory: ".agents/skills",
    candidate_directory: ".planning/codex-skill-candidates",
    accepted_skills: entries,
  }, null, 2));
}

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "jason-os-skill-gate-"));
  fs.mkdirSync(path.join(root, ".agents", "skills"), { recursive: true });
  fs.mkdirSync(path.join(root, ".planning", "codex-skill-acceptance"), { recursive: true });
  writeManifest(root, []);
  return root;
}

const empty = fixture();
assert.deepEqual(validate(empty), { active: 0, accepted: 0 });

const rogue = fixture();
fs.mkdirSync(path.join(rogue, ".agents", "skills", "rogue"));
fs.writeFileSync(path.join(rogue, ".agents", "skills", "rogue", "SKILL.md"), "---\nname: rogue\n---\n");
assert.throws(() => validate(rogue), /active but not accepted: rogue/);

const accepted = fixture();
const skillDirectory = path.join(accepted, ".agents", "skills", "verified");
const evidence = path.join(accepted, ".planning", "codex-skill-acceptance", "verified.md");
fs.mkdirSync(skillDirectory);
fs.writeFileSync(path.join(skillDirectory, "SKILL.md"), "---\nname: verified\n---\n");
fs.writeFileSync(evidence, "# Accepted\n");
writeManifest(accepted, [{
  name: "verified",
  operator_approved: true,
  accepted_at: "2026-08-12",
  evidence: ".planning/codex-skill-acceptance/verified.md",
  tree_hash: `sha256:${treeHash(skillDirectory)}`,
}]);
assert.deepEqual(validate(accepted), { active: 1, accepted: 1 });

fs.appendFileSync(path.join(skillDirectory, "SKILL.md"), "changed after acceptance\n");
assert.throws(() => validate(accepted), /does not match active tree/);

process.stdout.write("skill acceptance validator tests passed: empty, rogue, accepted, hash drift\n");
