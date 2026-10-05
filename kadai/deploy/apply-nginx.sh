#!/usr/bin/env bash
# Renders deploy/nginx.conf with NGINX_PORT from .env.production and reloads Nginx.
set -euo pipefail
cd "$(dirname "$0")/.."

PORT=80
if [ -f .env.production ]; then
  v=$(grep -E '^NGINX_PORT=' .env.production | tail -1 | cut -d= -f2 | tr -d '[:space:]"' || true)
  [ -n "$v" ] && PORT=$v
fi
case "$PORT" in ''|*[!0-9]*) echo "NGINX_PORT must be a number, got '$PORT'" >&2; exit 1;; esac

sed "s/__PORT__/$PORT/g" deploy/nginx.conf | sudo tee /etc/nginx/sites-available/kadai >/dev/null
sudo ln -sf /etc/nginx/sites-available/kadai /etc/nginx/sites-enabled/kadai
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
echo "Nginx is serving on port $PORT (allow it in the EC2 security group if it is not 80 or 443)."
