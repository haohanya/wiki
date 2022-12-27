https://caddy2.dengxiaolong.com/docs/install#fedora-redhat-centos

```shell
yum install yum-plugin-copr
yum copr enable @caddy/caddy
yum install caddy

caddy version

caddy start --config /etc/caddy/Caddyfile
caddy run --config /etc/caddy/Caddyfile

vim /etc/caddy/Caddyfile

caddy fmt /etc/caddy/Caddyfile
caddy adapt --config /etc/caddy/Caddyfile
caddy reload --config /etc/caddy/Caddyfile

systemctl daemon-reload
systemctl enable caddy

systemctl start caddy
systemctl stop caddy
systemctl status caddy
systemctl reload caddy
```

```Caddyfile
https://x.xxx.com {  
        encode gzip # gzip压缩  
        root * /usr/local/jar/wwwroot # web根目录  
        file_server browse # 启动静态资源  
        reverse_proxy /admin-apis/* localhost:8080        
        reverse_proxy /mini-apis/* localhost:8081        
        reverse_proxy /app-apis/* localhost:8082
}  
```