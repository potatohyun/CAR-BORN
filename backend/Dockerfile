FROM openjdk:17-jdk-alpine

EXPOSE 443

ADD ./build/libs/carborn-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
