# Nginx

## 安装与启动

### 安装

```shell
yum -y install gcc gcc-c++ automake pcre pcre-devel zlib zlib-devel openssl openssl-devel
wget http://nginx.org/download/nginx-1.16.1.tar.gz
tar -zxvf nginx-1.16.1.tar.gz
ln -s nginx-1.16.1 nginx
cd nginx
./configure --prefix=/usr/local/nginx --with-http_realip_module --with-http_ssl_module
make && make install
```


#### Debian

```shell
sudo wget https://nginx.org/keys/nginx_signing.key
sudo apt-key add nginx_signing.key

sudo vim /etc/apt/sources.list
> deb http://nginx.org/packages/mainline/debian/ bullseye nginx
> deb-src http://nginx.org/packages/mainline/debian/ bullseye nginx

sudo apt update
sudo apt install nginx

sudo nginx -v

cat /etc/nginx/nginx.conf
```

### 常用命令

```shell
cd /usr/local/nginx/sbin
## 启动
./nginx -c /usr/local/nginx/conf/nginx.conf
## 重新加载配置并启动
./nginx -s reload
## 重启nginx
./nginx -s reopen
## 强制停止
./nginx -s stop
## 优雅停止
./nginx -s quit
## 测试、检测配置
./nginx -t
```


### 配置文件

nginx 会自动将 `/etc/nginx/conf.d/` 路径下的 `.conf` 配置文件导入

```conf
include /etc/nginx/conf.d/*.conf;
```


### nginx server conf

```conf
server {
    listen                  443 ssl http2;
    listen                  [::]:443 ssl ipv6only=on http2;
    server_name             www.example.com;
    root                    /var/www/example.com/public;

    ## SSL
    ssl_certificate         /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key     /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;

    ## security
    ## include                 security.conf;
    ## security headers
    add_header X-XSS-Protection          "1; mode=block" always;
    add_header X-Content-Type-Options    "nosniff" always;
    add_header Referrer-Policy           "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy   "default-src 'self' http: https: ws: wss: data: blob: 'unsafe-inline'; frame-ancestors 'self';" always;
    add_header Permissions-Policy        "interest-cohort=()" always;
    ## HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" preload;

    ## . files
    location ~ /\.(?!well-known) {
        deny all;
    }

    ## logging
    access_log              /var/log/nginx/example.com.access.log;
    error_log               /var/log/nginx/example.com.error.log warn;

    ## reverse proxy
    location / {
        proxy_pass http://127.0.0.1:3000;
        ## include    proxy.conf;
        proxy_http_version                 1.1;
        proxy_cache_bypass                 $http_upgrade;

        ## Proxy headers
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        $connection_upgrade;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header Forwarded         $proxy_add_forwarded;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host  $host;
        proxy_set_header X-Forwarded-Port  $server_port;

        ## Proxy timeouts
        proxy_connect_timeout              60s;
        proxy_send_timeout                 60s;
        proxy_read_timeout                 60s;
    }

    ## additional config
    ## include general.conf;
    ## favicon.ico
    location = /favicon.ico {
        log_not_found off;
        access_log    off;
    }

    ## robots.txt
    location = /robots.txt {
        log_not_found off;
        access_log    off;
    }

    ## assets, media
    location ~* \.(?:css(\.map)?|js(\.map)?|jpe?g|png|gif|ico|cur|heic|webp|tiff?|mp3|m4a|aac|ogg|midi?|wav|mp4|mov|webm|mpe?g|avi|ogv|flv|wmv)$ {
        expires    7d;
        access_log off;
    }

    ## svg, fonts
    location ~* \.(?:svgz?|ttf|ttc|otf|eot|woff2?)$ {
        add_header Access-Control-Allow-Origin "*";
        expires    7d;
        access_log off;
    }

    ## gzip
    gzip            on;
    gzip_vary       on;
    gzip_proxied    any;
    gzip_comp_level 6;
    gzip_types      text/plain text/css text/xml application/json application/javascript application/rss+xml application/atom+xml image/svg+xml;
}

## 子域名重定向到www域
server {
    listen                  443 ssl http2;
    listen                  [::]:443 ssl http2;
    server_name             .example.com;

    ## SSL
    ssl_certificate         /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key     /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;
    return                  301 https://www.example.com$request_uri;
}

## 80 重定向到 443
server {
    listen      80;
    listen      [::]:80;
    server_name .example.com;
    ## include     letsencrypt.conf;
    ## ACME-challenge
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/_letsencrypt;
    }

    location / {
        return 301 https://www.example.com$request_uri;
    }
}
```

## 静态网页转发

访问 `http://www.baidu.com`  将会转发到服务器的 `/www/baidu` 路径下的 `index.html` 文件

```conf
server {

    listen 80;
    listen [::]:80;
    server_name www.baidu.com;

    location / {
        root /www/baidu;
        index index.html;
    }
  
}
```


#### listen

- `listen 80;` 监听ipv4的80端口
- `listen [::]:80;` 监听ipv6的80端口

#### server_name

`server_name www.baidu.com;` 

`server_name` 可以配置成域名或主机名

域名：配置通过 `www.baidu.com` 域名可以访问到 `/www/baidu/` 下面的文件

主机名：`$hostname` 如：`baidu-web` 则可以通过 `http://baidu-web` 访问 到  `/www/baidu/` 下面的文件

#### location

`location /` 请求指向目录。

`/` 是根目录，如果配置成 `/css` 则会根据 root 转发到 `/www/baidu/css` 

```conf
location /css {
    root /www/baidu;
    index index.html;
}
```

##### 修饰符

`location` 可以使用修饰符或正则表达式

```conf
location = /html/about.html {
  root  /www/pages;
}
  
location ^~ /fonts/ {
  root  /www/fonts;
}

location ~ \.(css|js|png|jpg|gif|ico) {
  root /www/static;
}
```

- `=` 严格匹配
- `^~` 普通字符匹配。使用前缀匹配
- `~` 区分大小写
- `~*` 不区分大小写

优先级从高到低依次为

1.  精确匹配（`=`）
2.  前缀匹配（`^~`）
3.  正则匹配（`~`和`～*`）
4.  不写

##### index

配置默认的文件

如过访问：`http://www.baidu.com` 等同于访问 `http://www.baidu.com/index.html` 


## HTTP 反向代理

假设我们已经有一个服务启动在 `8080` 端口，我们现在需要将此服务代理到 `http://www.baidu.com/api` 访问

```conf
server {
  
  listen 80;
  listen [::]:80;
  
  server_name www.baidu.com;

  location /api {
    proxy_pass http://127.0.0.1:8080/;
  }

}
```


#### location

如果 `proxy_pass` 只配置为 `/` 时访问 `http://www.baidu.com/api/users/1` 则会转发到 `http://127.0.0.1:8080/api/users/1`

如果 `proxy_pass` 只配置为 `/prod-api` 时访问 `http://www.baidu.com/api/users/1` 则会转发到`http://127.0.0.1:8080/prod-api/users/1`


#### proxy_pass

需要反向代理的地址

### 设置代理请求 Header


```conf
location /api {
    #nginx的主机地址
    proxy_set_header Host $http_host;
    #用户端真实的IP，即客户端IP
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    proxy_pass http://127.0.0.1:8080/;
}
```

- `$host`：nginx 主机IP
- `$http_host`：nginx 主机 IP 和端口
- `$proxy_host`：localhost:8088，proxy_pass 里配置的主机名和端口
- `$remote_addr`:用户的真实IP，即客户端IP


## HTTPS 配置

### 生成证书

1. 使用 `OpenSSL` 生成自签证书
2. 使用 云平台 购买的证书


### 配置 SSL

```conf
server {
    listen              443 ssl;
    listen              [::]:443 ssl;
    server_name         www.baidu.com;

    ssl_certificate     /etc/ssl/www.baidu.com.pem;
    ssl_certificate_key /etc/ssl/www.baidu.com.key;
    ## ssl_password_file /etc/ssl/www.baidu.com.pass;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols       TLSv1.1 TLSv1.2 TLSv1.3
    ssl_prefer_server_ciphers on;
    location / {
        proxy_pass http://localhost:8088;
    }
}
```

## 重定向

监听 80端口的 请求，重定向到 https 的

```conf
server {
  listen 80;
  listen [::]:80;

  server_name www.baidu.com;
  rewrite ^(.*)$ https://$host$1; ## 将所有HTTP请求通过rewrite指令重定向到HTTPS。
  location / {
    index index.html;
  }

}
```


### break

```conf
server {
  listen 80;
  listen [::]:80;

  server_name www.baidu.com;
  location / {
    rewrite ^/api/(.*)$ /prod-api/$1 break;
    rewrite ^/prod-api/(.*)$ /dev-api;
    root /www/baidu;
    index index.html;
  }

  location /dev-api {
    proxy_pass http://localhost:8088;
  }

}
```

1. 访问 `www.baidu.com/api/users/1` 匹配到 `rewrite ^/api/(.*)$ /prod-api/$1 break;` 遇到 break后不执行后续 rewrite 操作
2. 使用  `/prod-api/users/1` 去 `root` 路径下的 `/www/baidu/prod-api/users/1/index.html` 寻找文件


### last

```conf
server {
  listen 80;
  listen [::]:80;

  server_name www.baidu.com;
  location / {
    rewrite ^/api/(.*)$ /prod-api/$1 last;
    rewrite ^/prod-api/(.*)$ /dev-api;
    root /www/baidu;
    index index.html;
  }
  
  location /dev-api {
    proxy_pass http://localhost:8088;
  }

}
```


1. 访问 `www.baidu.com/api/users/1` 会匹配到 `rewrite ^/api/(.*)$ /prod-api/$1 last;`遇到 last 将不会执行后续的 `rewrite`
2. `/prod-api/users/1` 匹配到 `location /` 下的 `rewrite ^/prod-api/(.*)$ /dev-api;` 重定向后重新匹配 location
3. `/dev-api/users/1`  匹配到 `location /dev-api` 然后转发到 `http://localhost:8088/dev-api/users/1`

## 缓存


## 负载均衡

```conf
upstream baidu-cluster {
    ## 默认采用轮循机制
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
}

server {
  listen 80;
  listen [::]:80;
  
  server_name www.baidu.com;

  location /api {
    proxy_pass http://baidu-cluster;
  }

}
```


### 负载均衡策略

#### 轮循机制（round-robin）

默认策略，轮训分发

#### [最小连接](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#least_conn)（least-connected ）

将下一个请求分发给活动连接数最小的服务器

```conf
upstream baidu-cluster {
    least_conn;
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
}
```

#### [ip-hash](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#ip_hash)

根据客户端的 IP 作为 hash key，来自同一个 ip 的请求会被转发到相同的服务器

```conf
upstream baidu-cluster {
    ip_hash;
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
}
```

#### [hash](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#hash)

通用 hash。允许用户自定义 hash key，可以是字符串、变量或组合

例如：key可以是配对的源 IP 地址和端口，也可以是 URI。

```conf
upstream baidu-cluster {
    hash $request_uri consistent;
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
}
```

`consistent`参数启用 [ketama](http://www.last.fm/user/RJ/journal/2007/04/10/rz_libketama_-_a_consistent_hashing_algo_for_memcache_clients)一致哈希算法，如果在上游组中添加或删除服务器，只会重新映射部分键，从而最大限度地减少缓存失效。

#### [随机](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#random)(random）

```conf
upstream baidu-cluster {
    random two least_conn;
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
}
```

#### 权重（weight）

```conf
upstream baidu-cluster {
    server 127.0.0.1:8080 weight=3;
    server 127.0.0.1:8081;
}
```

> 每四个请求，会有三个请求分发到8080端口，一个请求分发到8081端口


#### 健康检查

在反向代理中，如果后端服务器在某个周期内响应失败次数超过规定值，nginx会将此服务器标记为失败，并在之后的一个周期不再将请求发送给这台服务器。

通过[fail_timeout](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#fail_timeout)来设置检查周期，默认为10秒。

通过[max_fails](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#max_fails)来设置检查失败次数，默认为1次。

在以下示例中，如果NGINX无法向服务器发送请求或在30秒内请求失败次数超过3次，则会将服务器标记为不可用30秒。

```conf
upstream baidu-cluster {
    server 127.0.0.1:8080 max_fails=3 fail_timeout=30s;
    server 127.0.0.1:8081;
}
```



## TCP 反向代理

```conf
## HTTP代理
http {
  server {
    listen 8002;
    proxy_pass http://localhost:8080/;
  }
}

## TCP代理
stream {
  server {
    listen 13306;
    proxy_pass localhost:3306;
  }
}
```


### TCP 负载均衡

```conf
stream {
  upstream mqtt-cluster {
    server 127.0.0.1:5432;
    server 127.0.0.1:5433;
    keepalive 8;
  }
  server {
    listen 15432;
    proxy_pass mqtt-cluster;
  }
}
```

- `keepalive` 连接池里空闲连接的数量。`keepalive_timeout` 默认60s。如果连接池里的连接空闲时间超过这个值，则连接关闭