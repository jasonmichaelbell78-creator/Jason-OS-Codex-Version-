#!/usr/bin/env node
"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

function fail(message) {
  process.stderr.write(`skill acceptance validation failed: ${message}\n`);
  process.exitCode = 1;
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function collectFiles(directory, base = directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`symlink is not allowed: ${absolute}`);
    if (entry.isDirectory()) files.push(...collectFiles(absolute, base));
    else if (entry.isFile()) {
      files.push({
        path: path.relative(base, absolute).split(path.sep).join("/"),
        sha256: sha256(fs.readFileSync(absolute)),
      });
    }
  }
  return files.sort((a, b) => a.path.localeCompare(b.path));
}

function treeHash(directory) {
  return sha256(JSON.stringify(collectFiles(directory)));
}

function loadJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    throw new Error(`cannot read valid JSON from ${file}: ${error.message}`);
  }
}

function validate(root) {
  const manifestPath = path.join(root, ".agents", "skills-acceptance.json");
  const manifest = loadJson(manifestPath);
  if (manifest.version !== 1) throw new Error("unsupported manifest version");
  if (!Array.isArray(manifest.accepted_skills)) throw new Error("accepted_skills must be an array");
  if (manifest.active_directory !== ".agents/skills") throw new Error("active_directory must be .agents/skills");
  if (manifest.candidate_directory !== ".planning/codex-skill-candidates") {
    throw new Error("candidate_directory must be .planning/codex-skill-candidates");
  }

  const activeRoot = path.join(root, manifest.active_directory || "");
  if (!fs.existsSync(activeRoot)) throw new Error(`active directory is missing: ${activeRoot}`);

  const activeNames = fs.readdirSync(activeRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter((entry) => fs.existsSync(path.join(activeRoot, entry.name, "SKILL.md")))
    .map((entry) => entry.name)
    .sort();
  const acceptedNames = manifest.accepted_skills.map((entry) => entry.name).sort();
  const duplicateNames = acceptedNames.filter((name, index) => acceptedNames.indexOf(name) !== index);
  if (duplicateNames.length) throw new Error(`duplicate manifest entries: ${[...new Set(duplicateNames)].join(", ")}`);

  const unaccepted = activeNames.filter((name) => !acceptedNames.includes(name));
  const missing = acceptedNames.filter((name) => !activeNames.includes(name));
  if (unaccepted.length) throw new Error(`active but not accepted: ${unaccepted.join(", ")}`);
  if (missing.length) throw new Error(`accepted but not active: ${missing.join(", ")}`);

  for (const entry of manifest.accepted_skills) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name || "")) throw new Error(`${entry.name || "entry"}: invalid skill name`);
    if (entry.operator_approved !== true) throw new Error(`${entry.name}: operator_approved must be true`);
    if (typeof entry.accepted_at !== "string" || !entry.accepted_at) throw new Error(`${entry.name}: accepted_at is required`);
    if (typeof entry.evidence !== "string" || !entry.evidence) throw new Error(`${entry.name}: evidence path is required`);
    if (!/^sha256:[a-f0-9]{64}$/.test(entry.tree_hash || "")) throw new Error(`${entry.name}: invalid tree_hash`);

    const skillDirectory = path.join(activeRoot, entry.name);
    const evidencePath = path.resolve(root, entry.evidence);
    const relativeEvidence = path.relative(root, evidencePath);
    if (relativeEvidence.startsWith("..") || path.isAbsolute(relativeEvidence)) throw new Error(`${entry.name}: evidence must stay inside the repository`);
    if (!fs.existsSync(evidencePath)) throw new Error(`${entry.name}: evidence file is missing: ${entry.evidence}`);

    const actual = `sha256:${treeHash(skillDirectory)}`;
    if (actual !== entry.tree_hash) throw new Error(`${entry.name}: accepted hash ${entry.tree_hash} does not match active tree ${actual}`);
  }

  return { active: activeNames.length, accepted: acceptedNames.length };
}

if (require.main === module) {
  const rootFlag = process.argv.indexOf("--root");
  const root = rootFlag >= 0 ? path.resolve(process.argv[rootFlag + 1]) : path.resolve(__dirname, "..");
  try {
    const result = validate(root);
    process.stdout.write(`skill acceptance validation passed: ${result.accepted} accepted, ${result.active} active\n`);
  } catch (error) {
    fail(error.message);
  }
}

module.exports = { collectFiles, treeHash, validate };
