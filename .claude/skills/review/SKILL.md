---
name: review
description: Review recent code changes against project conventions and best practices.
disable-model-invocation: true
context: fork
agent: code-reviewer
---

## Changes to review

!`git diff HEAD`

## Changed files

!`git diff HEAD --name-only`

## Instructions

Review the changes above. If the diff is empty, check `git log --oneline -5` and review the most recent commit instead. Focus on the project conventions defined in your system prompt.
