nginx.conf

```conf
server {
	# 监听端口
    listen 80;
    # 绑定域名 | 服务器IP地址
    server_name wiki.mvvm.io;

    location / {
    	# 静态页面 root 目录
        root /data/gogs/www/haohan/wiki;
        index index.html;
    }
}
```

## 代理

```conf
upstream name {
  # 代理地址
  server 127.0.0.1:8090;
}

server {
  listen 80;
  listen [::]:80;
  server_name mvvm.io www.mvvm.io;
  client_max_body_size 1024m;
  location / {
    # 这个name要和上面哪个name定义一致，可以自定义
    proxy_pass http://name;
    proxy_set_header HOST $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

## nginx启动/重启/停止

```shell
cd /usr/local/nginx/sbin
```

## 启动 

```shell
./nginx -c /usr/local/nginx/conf/nginx.conf 
```



## 重新加载配置并启动 

```shell
./nginx -s reload 
```



## 重启nginx 

```shell
./nginx -s reopen 
```



## 强制停止 

```shell
./nginx -s stop 
```



## 优雅停止

```shell
./nginx -s quit 
```

## 测试、检测配置

```shell
./nginx -t
```

