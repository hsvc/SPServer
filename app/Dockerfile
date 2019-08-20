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
