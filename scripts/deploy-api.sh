#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE="apps/api/.env.prod"
REQUIRED_VARS=(
  "NODE_ENV"
  "PORT"
  "DATABASE_URL"
  "CORS_ORIGINS"
  "DISHES_WRITE_TOKEN"
  "SESSION_SECRET"
)

if [[ ! -f "$ENV_FILE" ]]; then
  echo "[deploy] ERROR: Missing $ENV_FILE"
  exit 1
fi

if grep -q "REPLACE_" "$ENV_FILE"; then
  echo "[deploy] ERROR: Placeholder values detected in $ENV_FILE (REPLACE_*)"
  exit 1
fi

for var_name in "${REQUIRED_VARS[@]}"; do
  if ! grep -q "^${var_name}=" "$ENV_FILE"; then
    echo "[deploy] ERROR: Missing required env var '${var_name}' in $ENV_FILE"
    exit 1
  fi
done

echo "[deploy] Env validation passed"

echo "[deploy] Stopping old API container"
docker compose -f docker-compose.prod.yml down --remove-orphans || true

echo "[deploy] Building API image and starting production service"
docker compose -f docker-compose.prod.yml up -d --build api

echo "[deploy] Service status"
docker compose -f docker-compose.prod.yml ps

echo "[deploy] Tail logs"
docker compose -f docker-compose.prod.yml logs --tail=80 api

echo "[deploy] Health check"
for _ in $(seq 1 30); do
  if curl -fsS "http://localhost:3000/health" >/dev/null; then
    echo "[deploy] Health check passed"
    exit 0
  fi
  sleep 2
done

echo "[deploy] Health check failed"
exit 1
