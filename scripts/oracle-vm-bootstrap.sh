#!/usr/bin/env bash
set -euo pipefail

# Basic bootstrap for Oracle Linux/Ubuntu VM with Docker
if command -v apt-get >/dev/null 2>&1; then
  sudo apt-get update
  sudo apt-get install -y ca-certificates curl git
  curl -fsSL https://get.docker.com | sh
  sudo usermod -aG docker "$USER"
elif command -v dnf >/dev/null 2>&1; then
  sudo dnf -y update
  sudo dnf -y install git curl
  sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo || true
  sudo dnf -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  sudo systemctl enable --now docker
  sudo usermod -aG docker "$USER"
else
  echo "Unsupported Linux distribution for auto-bootstrap"
  exit 1
fi

echo "Bootstrap complete. Re-login to apply docker group membership."
