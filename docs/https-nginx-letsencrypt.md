# API HTTPS Setup (Nginx + Let's Encrypt)

This guide exposes your API on HTTPS `443` and keeps app port `3000` internal.

## 1) DNS
- Create an `A` record:
  - `api.your-domain.com -> <your_server_public_ip>`

## 2) Keep API internal in Docker
- `docker-compose.prod.yml` should bind API only on localhost:
  - `127.0.0.1:3000:3000`

## 3) Install Nginx + Certbot on server
```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

## 4) Nginx reverse proxy config
Create `/etc/nginx/sites-available/food-randomizer-api`:

```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and test:
```bash
sudo ln -sf /etc/nginx/sites-available/food-randomizer-api /etc/nginx/sites-enabled/food-randomizer-api
sudo nginx -t
sudo systemctl reload nginx
```

## 5) Issue TLS certificate
```bash
sudo certbot --nginx -d api.your-domain.com --redirect -m you@your-domain.com --agree-tos --no-eff-email
```

This updates Nginx to HTTPS and HTTP->HTTPS redirect.

## 6) Firewall / OCI security list
- Open inbound:
  - TCP `80` from `0.0.0.0/0`
  - TCP `443` from `0.0.0.0/0`
- Do not expose `3000` publicly (remove `0.0.0.0/0 -> 3000` rule).

## 7) API CORS for mobile
Set in `apps/api/.env.prod`:

```env
CORS_ORIGINS="https://api.your-domain.com"
```

If you use web clients on other domains, add them comma-separated.

## 8) Mobile env
Set in `apps/mobile/.env.prod`:

```env
EXPO_PUBLIC_API_BASE_URL=https://api.your-domain.com
EXPO_PUBLIC_ALLOW_CLEARTEXT_HTTP=false
```

## 9) Verify
```bash
curl -v https://api.your-domain.com/health
```

Expected: HTTP `200` and JSON `{ "status": "ok", ... }`.
