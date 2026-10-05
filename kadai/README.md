# Kadai - frontend-only e-commerce store (Vite + React)

Everything runs in the browser: product catalogue, search, filters, sorting, product pages,
cart, coupons, wishlist, checkout with validation, order history. Data is saved in
`localStorage`. No backend, no database, no secret keys.

## Ports (.env)
| Variable | Used by | Default |
|---|---|---|
| `PORT` | `npm run dev` | 5173 |
| `PREVIEW_PORT` | `npm run preview` | 4173 |
| `HOST` | dev and preview listen address | 0.0.0.0 |
| `NGINX_PORT` (in `.env.production`) | Nginx on EC2 | 80 |

The dev and preview servers exit with an error if their port is taken (`strictPort`), so you
never end up on a different port than you expect. On EC2, if `NGINX_PORT` is not 80 or 443,
allow that port in the instance's security group, then run `bash deploy/deploy.sh`.

## Configuration (.env)
Store settings live in `.env` (see `.env.example`): store name, tagline, currency, locale,
free-shipping threshold, shipping fee, coupons (`CODE:PERCENT,CODE:PERCENT`) and support email.
`.env.production` overrides `.env` during `npm run build`, which is what the EC2 deploy uses.
Vite reads these at **build time**, so rebuild (`bash deploy/deploy.sh`) after changing them.
Anything starting with `VITE_` ends up readable in the browser, so never store secrets here.

## Run locally
    npm install
    npm run dev          # http://localhost:5173

## Deploy on AWS EC2 (Ubuntu 22.04 / 24.04)
1. Launch a `t3.small` with 20 GB storage. Security group: 22 (your IP), 80 and 443 (anywhere).
2. Copy the project to the instance, e.g. `scp -i key.pem -r kadai ubuntu@<EC2_IP>:~/`
   (or `git clone` your repo).
3. On the instance:
       cd ~/kadai
       bash deploy/setup-ec2.sh     # once: nginx, Node 20, swap, site config
       bash deploy/deploy.sh        # build + publish (repeat after each change)
4. Open `http://<EC2_IP>`.
5. Optional HTTPS: attach an Elastic IP, point a DNS A record at it, set `server_name` in
   `/etc/nginx/sites-available/kadai`, then
       sudo apt install -y certbot python3-certbot-nginx
       sudo certbot --nginx -d yourdomain.com

## Project layout
    src/config.js               reads the VITE_ values from .env
    src/data/products.js        catalogue (edit to add products)
    src/context/StoreContext    cart, wishlist, coupons, orders (persisted)
    src/pages/                  Home, Shop, Product, Cart, Checkout, Success, Orders, Wishlist
    src/components/             Header, Footer, ProductCard, Toast
    deploy/                     nginx.conf (template), apply-nginx.sh, setup-ec2.sh, deploy.sh
