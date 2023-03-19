# Caddy

https://caddy2.dengxiaolong.com/docs/install#fedora-redhat-centos

```shell
yum install yum-plugin-copr
yum copr enable @caddy/caddy
yum install caddy
\

caddy version

# 后台允许：caddy start --config /etc/caddy/Caddyfile
# 守护进程：caddy run --config /etc/caddy/Caddyfile

vim /etc/caddy/Caddyfile

# caddy fmt /etc/caddy/Caddyfile
# caddy adapt --config /etc/caddy/Caddyfile
# caddy reload --config /etc/caddy/Caddyfile

systemctl daemon-reload
systemctl enable caddy

systemctl start caddy
systemctl stop caddy
systemctl status caddy
systemctl reload caddy
systemctl restart caddy
```

```Caddyfile
sk.biomedical-wh.com {  

        handle /mini-apis/* {  
          reverse_proxy /mini-apis/* localhost:8081  
        }  
        
        handle /app-apis/* {  
          reverse_proxy /app-apis/* localhost:8082  
        }  
  
        handle /admin-apis/* {  
          reverse_proxy /admin-apis/* localhost:8080  
        }  
        
        root * /usr/local/jar/wwwroot  
          reverse_proxy /admin-apis/* localhost:8080  
          reverse_proxy /mini-apis/* localhost:8081  
          reverse_proxy /app-apis/* localhost:8082  
        file_server browse  
        
}
```

如果不生效则使用 fmt 命令格式化后覆盖

```
(common_headers) {
    encode {
	gzip
    }
    tls {
        on_demand
    }
}


http://sk.biomedical-wh.com, sk.biomedical-wh.com {
	import common_headers
        handle /mini-apis/* {
                reverse_proxy /mini-apis/* localhost:8081
        }

        handle /app-apis/* {
                reverse_proxy /app-apis/* localhost:8082
        }

        handle /admin-apis/* {
                reverse_proxy /admin-apis/* localhost:8080
        }

        root * /usr/local/jar/wwwroot
	file_server
}

```