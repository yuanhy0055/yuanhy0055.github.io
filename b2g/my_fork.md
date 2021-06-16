## Video on Demand
- Prepare (LOCAL)
```
#!/bin/bash

cd zlib-1.2.11/
./configure --prefix=/AVC2

cd openssl-1.0.2l/
./config --prefix=/AVC2 --openssldir=/AVC2/openssl

tar xf pcre-8.42.tar.gz
./configure --prefix=/AVC2
```

- Begin NGINX
```
tar xf nginx-1.16.0.tar.gz
cd nginx-1.16.0/
./configure --prefix=/usr/local/nginx --add-module=../nginx-rtmp-module --with-http_ssl_module  --with-pcre=../pcre-8.42 --with-openssl=../openssl-1.0.2l --with-zlib=../zlib-1.2.11
./configure --prefix=/AVC2/nginx --add-module=$HOME/NGX/nginx-rtmp-module --with-http_ssl_module  --with-pcre=$HOME/NGX/pcre-8.42 --with-openssl=$HOME/NGX/openssl-1.0.2l --with-zlib=$HOME/NGX/zlib-1.2.11
```

- 推流 push stream
```
ffmpeg -re -f video4linux2 -i /dev/video0 -vcodec libx264 -vprofile baseline -acodec aac -strict -2 -f flv -pix_fmt yuv420p rtmp://11.1.1.49/show/AOS

ffmpeg -re -f video4linux2 -i /dev/video0 -vcodec libx264 -vprofile baseline -acodec aac -ar 44100 -strict -2 -ac 1 -f flv -s 640x360 -q 10 rtmp://11.1.1.49:9999/live/test

ffmpeg -re -i scene1.mp4 -vcodec libx264 -vprofile baseline -acodec aac -ar 44100 -strict -2 -ac 1 -f flv -s 640x360 -q 10 rtmp://11.1.1.49:9999/live/test
```
---

- Refer of original  
https://www.cnblogs.com/xl2432/p/11090613.html

## KE-BIAO
1. 在FT2000上编译NGINX+RTMP ------ OK
2. ~~ 编译、试用SRS ... ...
2. 阅读DDK书 - 建立书的环境
3. aosp - 按CM的配置再构造一个机型
4. 想编译VLC for AOS
---
## This Page is My project from Others
* forked from [cyanogen/vncflinger](https://github.com/cyanogen/vncflinger)
* vncserver for Droid [cyanogen/tigervnc](https://github.com/cyanogen/tigervnc)
* [不忘初心 方得始终](https://terenceli.github.io/)
---