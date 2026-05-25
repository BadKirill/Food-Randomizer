#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="${1:-/tmp/food-randomizer-tests.log}"
nohup npm run test:headless >"$LOG_FILE" 2>&1 &
echo "Started headless tests in background. Log: $LOG_FILE"
