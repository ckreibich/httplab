From fedora:32
MAINTAINER Christian Kreibich <christian@corelight.com>

EXPOSE 80/tcp 443/tcp 444/tcp

ENV BACKEND_HTTP11=127.0.0.1:8080
ENV BACKEND_HTTP2=127.0.0.1:8081

RUN dnf install -y haproxy java-1.8.0-openjdk-headless

COPY create-cert.sh /etc/haproxy/
COPY haproxy.cfg /etc/haproxy/

WORKDIR /etc/haproxy
RUN ./create-cert.sh

ENTRYPOINT ["haproxy", "-d", "-f", "/etc/haproxy/haproxy.cfg"]
