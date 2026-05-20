#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

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
