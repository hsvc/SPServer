# SPServer

### Build Setup(For making DockerFile)

`서버 생성시 1) 공인 IP 설정 2) ACG 설정(1-65535)`
```
apt install git
apt install git clone "https://github.com/hsvc/SPServer"
cd SPServer
apt install npm
apt-get install nodejs-legacy
npm install forever -g
npm install python-shell --save
npm install
npm install --save multer

forever start app.js//putty를 종료해도 접속할 수 있도록
forever list//forever 로 돌리고 있는 리스트
forever stop 0//서버 종료
# [서버주소]:3000

pip3 install tensorflow
pip3 install scipy==1.1.0
pip3 install imageio 
apt-get install zip unzip
```

### Environment

node.js 8.16.1
python 3.5.2
scipy 1.1.0

# SPServer

### DockerFile
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
