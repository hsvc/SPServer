# SPServer

### Build Setup(For making DockerFile)
```
FROM ubuntu:18.04
LABEL jingyeong <sandsand1166@gmail.com>
RUN apt-get update
Run apt-get -y upgrade
RUN apt install -y git
RUN git clone "https://github.com/hsvc/SPServer"
RUN cd /SPServer
RUN apt-get install -y nodejs
RUN apt install -y npm
RUN npm install forever -g
RUN npm install --save python-shell
RUN npm install
RUN npm install --save multer
RUN apt-get install -y python3.6
RUN apt-get install -y python3-pip
RUN pip3 install tensorflow
RUN pip3 install scipy==1.1.0
RUN pip3 install imageio
RUN apt-get install zip unzip

WORKDIR SPServer

CMD ["node","app.js"]
EXPOSE 3000

```

> 서버 생성시 1) 공인 IP 설정 2) ACG 설정(1-65535)


### dockerfile build 

```
cd dockerfile있는 곳
sudo docker build -t app .
```
### run container - Daemon으로 실행
```
sudo docker run --name nodeweb -d -p 3000:3000 app
# docker stop nodeweb -container 종료 
```

### run container - container bash shell 실행
```
sudo docker run -i -t app /bin/bash
#bash에서 나가고 싶을 시 ctrl+p+q
```
