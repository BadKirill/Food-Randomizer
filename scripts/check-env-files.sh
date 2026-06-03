#!/usr/bin/env bash
set -euo pipefail

tracked_env_files="$(git ls-files | grep -E '(^|/)\.env(\.|$)' | grep -vE '(^|/)\.env\.example$' || true)"

if [[ -n "$tracked_env_files" ]]; then
  echo "Tracked env files are not allowed. Keep only .env.example files in Git."
  echo "$tracked_env_files"
  exit 1
fi

if git ls-files | grep -E '(^|/)\.env\.example$' | xargs grep -nE 'REPLACE_|Qw45|kdDL|postgresql://[^<]*:[^<]*@10\.|SESSION_SECRET=.*[A-Za-z0-9+/]{24,}' >/tmp/env-example-secret-hits 2>/dev/null; then
  echo "Potential secret-like value found in an .env.example file:"
  cat /tmp/env-example-secret-hits
  exit 1
fi

echo "Env file safety check passed"
