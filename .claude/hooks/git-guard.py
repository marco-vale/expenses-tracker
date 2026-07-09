#!/usr/bin/env python3
"""PreToolUse(Bash) guard enforcing this project's git rules.

- deny `git commit --amend` (never rewrite history)
- deny force-push (--force / --force-with-lease / --force-if-includes / -f / +refspec)
- ask before any `git push`

Committing on main is allowed here (single-branch project) and is NOT blocked.
Anything that isn't a git command passes straight through.
"""
import json
import re
import sys


def emit(decision, reason):
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": decision,
            "permissionDecisionReason": reason,
        }
    }))
    sys.exit(0)


try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(0)

cmd = (data.get("tool_input") or {}).get("command") or ""

if "git" not in cmd:
    sys.exit(0)

is_push = re.search(r"\bgit\b.*\bpush\b", cmd) is not None

# 1. Deny amend (history rewrite).
if re.search(r"\bgit\b.*\bcommit\b.*--amend\b", cmd):
    emit("deny", "Blocked: 'git commit --amend' rewrites history. Project rule: only add new commits.")

# 2. Deny force-push (flag forms + +refspec form).
if is_push and re.search(r"(--force(-with-lease|-if-includes)?\b|(^|\s)-f(\s|$)|\s\+\S+)", cmd):
    emit("deny", "Blocked: force-push is not allowed. Project rule: never force-push.")

# 3. Ask before any push.
if is_push:
    emit("ask", "Confirm: pushing to the remote requires your explicit approval (project rule).")

sys.exit(0)
