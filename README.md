# webdriverio-101
Simulasi wdio | allure | docker | github actions | slack

Ilhams-MacBook-Pro:Desktop ilhamaditya$ docker ps
CONTAINER ID   IMAGE                                       COMMAND                  CREATED          STATUS                    PORTS                              NAMES
9bf80cba8a39   aerokube/selenoid-ui:latest-release         "/selenoid-ui"           6 minutes ago    Up 6 minutes (healthy)    0.0.0.0:8080->8080/tcp             webdriverio-101-selenoid-ui-1
5f3a9dec9741   frankescobar/allure-docker-service:latest   "/bin/sh -c '$ROOT/r…"   6 minutes ago    Up 6 minutes (healthy)    4040/tcp, 0.0.0.0:5050->5050/tcp   webdriverio-101-allure-1
1265d8d42c69   aerokube/selenoid:latest-release            "/usr/bin/selenoid -…"   6 minutes ago    Up 6 minutes              0.0.0.0:4444->4444/tcp             webdriverio-101-selenoid-1
797b4df1ad82   frankescobar/allure-docker-service:latest   "/bin/sh -c '$ROOT/r…"   45 minutes ago   Up 45 minutes (healthy)   4040/tcp, 5050/tcp                 mystifying_wozniak