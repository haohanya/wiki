

## nginx server conf

```conf
server {
    listen                  443 ssl http2;
    listen                  [::]:443 ssl http2;
    server_name             www.example.com;
    root                    /var/www/example.com/public;

    # SSL
    ssl_certificate         /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key     /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;

    # security
    # include                 security.conf;
    # security headers
    add_header X-XSS-Protection          "1; mode=block" always;
    add_header X-Content-Type-Options    "nosniff" always;
    add_header Referrer-Policy           "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy   "default-src 'self' http: https: ws: wss: data: blob: 'unsafe-inline'; frame-ancestors 'self';" always;
    add_header Permissions-Policy        "interest-cohort=()" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # . files
    location ~ /\.(?!well-known) {
        deny all;
    }

    # logging
    access_log              /var/log/nginx/example.com.access.log;
    error_log               /var/log/nginx/example.com.error.log warn;

    # reverse proxy
    location / {
        proxy_pass http://127.0.0.1:3000;
        # include    proxy.conf;
        proxy_http_version                 1.1;
        proxy_cache_bypass                 $http_upgrade;

        # Proxy headers
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        $connection_upgrade;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header Forwarded         $proxy_add_forwarded;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host  $host;
        proxy_set_header X-Forwarded-Port  $server_port;

        # Proxy timeouts
        proxy_connect_timeout              60s;
        proxy_send_timeout                 60s;
        proxy_read_timeout                 60s;
    }

    # additional config
    # include general.conf;
    # favicon.ico
    location = /favicon.ico {
        log_not_found off;
        access_log    off;
    }

    # robots.txt
    location = /robots.txt {
        log_not_found off;
        access_log    off;
    }

    # assets, media
    location ~* \.(?:css(\.map)?|js(\.map)?|jpe?g|png|gif|ico|cur|heic|webp|tiff?|mp3|m4a|aac|ogg|midi?|wav|mp4|mov|webm|mpe?g|avi|ogv|flv|wmv)$ {
        expires    7d;
        access_log off;
    }

    # svg, fonts
    location ~* \.(?:svgz?|ttf|ttc|otf|eot|woff2?)$ {
        add_header Access-Control-Allow-Origin "*";
        expires    7d;
        access_log off;
    }

    # gzip
    gzip            on;
    gzip_vary       on;
    gzip_proxied    any;
    gzip_comp_level 6;
    gzip_types      text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;
}

# 子域名重定向到www域
server {
    listen                  443 ssl http2;
    listen                  [::]:443 ssl http2;
    server_name             .example.com;

    # SSL
    ssl_certificate         /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key     /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;
    return                  301 https://www.example.com$request_uri;
}

# 80 重定向到 443
server {
    listen      80;
    listen      [::]:80;
    server_name .example.com;
    # include     letsencrypt.conf;
    # ACME-challenge
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/_letsencrypt;
    }

    location / {
        return 301 https://www.example.com$request_uri;
    }
}
```