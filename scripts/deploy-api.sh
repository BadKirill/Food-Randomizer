#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[deploy] Building API image and starting production service"
docker compose -f docker-compose.prod.yml up -d --build api

echo "[deploy] Service status"
docker compose -f docker-compose.prod.yml ps
