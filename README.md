# SPServer

### Build Setup(For making DockerFile)
```
apt install git
apt install git clone "https://github.com/hsvc/SPServer"
cd SPServer
apt install npm
apt-get install nodejs-legacy
npm install forever -g
npm install

forever start app.js//putty를 종료해도 접속할 수 있도록
forever list//forever 로 돌리고 있는 리스트
# [서버주소]:3000
```

> 서버 생성시 1) 공인 IP 설정 2) ACG 설정(1-65535)
