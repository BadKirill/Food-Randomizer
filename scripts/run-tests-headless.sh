#!/usr/bin/env bash
set -euo pipefail

npm run test:unit
npm run test:integration
npm run test:e2e:critical
npm run test:contract:mobile-api
