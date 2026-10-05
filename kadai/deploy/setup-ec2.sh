#!/usr/bin/env bash
# One-time server setup for Ubuntu 22.04 / 24.04 on EC2.
# Run from the project folder on the instance:  bash deploy/setup-ec2.sh
set -euo pipefail

sudo apt-get update
sudo apt-get install -y nginx curl git

# Node.js 20 (needed only to build the app)
if ! command -v node >/dev/null || [ "$(node -v | cut -d. -f1 | tr -d v)" -lt 18 ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

# Small instances can run out of memory during the build, so add 2 GB swap if none exists
if [ "$(swapon --show | wc -l)" -eq 0 ]; then
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

sudo mkdir -p /var/www/kadai
sudo systemctl enable --now nginx
bash deploy/apply-nginx.sh

echo "Server ready. Now run: bash deploy/deploy.sh"
