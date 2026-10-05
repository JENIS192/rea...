#!/usr/bin/env bash
# Build the app and publish it to Nginx. Run after every code change.
set -euo pipefail
cd "$(dirname "$0")/.."

npm ci
npm run build

sudo rm -rf /var/www/kadai/*
sudo cp -r dist/* /var/www/kadai/
bash deploy/apply-nginx.sh   # re-applies NGINX_PORT from .env.production

PORT=$(grep -E '^NGINX_PORT=' .env.production 2>/dev/null | tail -1 | cut -d= -f2 | tr -d '[:space:]"')
PORT=${PORT:-80}
SUFFIX=$([ "$PORT" = 80 ] || echo ":$PORT")
echo "Deployed. Open http://$(curl -s http://checkip.amazonaws.com)$SUFFIX"
