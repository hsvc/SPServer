# Street Painter

![ㅍㅍㅌ](https://user-images.githubusercontent.com/29014659/63372059-336fdf80-c33a-11e9-8d54-d7a7d16347a2.jpg)

## Introduction

This is a repository for team - project done in Head Start Silicon Valley 2019 program.
Our is to develop a service for amateur painters which can help them with coloring their sketch.
If user inputs a sketch the system returns a 3 fully colored painting that has a similar feeling with Monet, Cezanne, Gogh.

## Getting Started

This is a description for opening **back-end server**. The **android application** is available in [here](https://github.com/hsvc/AppSketch).

### Prerequisites

You'll need a **docker** for our back-end.

* [Windows](https://docs.docker.com/docker-for-windows/install/)
* [Mac](https://docs.docker.com/docker-for-mac/install/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
### Installing  

**Dockerfile build**

```
cd "dockerfile_dir"
sudo docker build -t app .
```
**Opt 1) Run via 'container - Daemom'**
```
sudo docker run --name nodeweb -d -p 3000:3000 app
# if you want to stop "docker stop nodeweb -container"
```

**Opt 2) Run via 'container - container bash shell'**
```
sudo docker run -i -t app /bin/bash
# if you want to get out of bash "ctrl+p+q"
```
## Built With

* [GCP](https://cloud.google.com/gcp/?utm_source=google&utm_medium=cpc&utm_campaign=na-US-all-en-dr-bkws-all-all-trial-b-dr-1007179&utm_content=text-ad-none-any-DEV_c-CRE_114825958447-ADGP_Hybrid%20%7C%20AW%20SEM%20%7C%20BKWS%20%7C%20US%20%7C%20en%20%7C%20BMM%20~%20Google%20Platform%20Cloud-KWID_43700010161835515-kwd-101618149257&utm_term=KW_%2Bgoogle%20%2Bplatform%20%2Bcloud-ST_%2Bgoogle%20%2Bplatform%20%2Bcloud&gclid=CjwKCAjwtO7qBRBQEiwAl5WC22vmkj6L5R0D7KSf491x4R4gQaW7JAz3YnV_Sm0IhUcuVONA_bvK4BoC2SoQAvD_BwE) - The cloud we used to train Cycle-GAN model
* [Node.JS](https://nodejs.org/en/docs/) - Back-end
* [Android Studio](https://developer.android.com/docs) - Application development
* [Docker](https://docs.docker.com/) - Back-end environment management & deployment

## Contributing

* [Ji-Hye Shin](https://github.com/jihyyeshin) - Android application development
* [Jin-Gyeong Park](https://github.com/sand116) - Back-end development
* [Young-Ki Kim](https://github.com/kimyoungi99) - Model training

## Reference

* GAN - [Paper](https://arxiv.org/abs/1406.2661)
* Cycle-GAN - [Paper](https://arxiv.org/abs/1703.10593)
* Cycle-GAN - [Code](https://github.com/xhujoy/CycleGAN-tensorflow)
