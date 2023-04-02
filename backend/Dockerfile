FROM openjdk:17-jdk-alpine

WORKDIR /tmp

# 현재 backdend build libs jar 파일을 새로운 docker image의 /tmp/app.jar 생성
COPY ./build/libs/carborn-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
