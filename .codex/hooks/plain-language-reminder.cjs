#!/usr/bin/env node
"use strict";

const additionalContext = [
  "JASON-OS communication tenet:",
  "Talk to the user as a collaborator in plain language.",
  "Lead with the outcome and explain why alongside what; use lists or tables only when they make the relationship clearer.",
  "Give rationale and tradeoffs for any meaningful option.",
].join("\n");

process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: "UserPromptSubmit",
    additionalContext,
  },
}) + "\n");
