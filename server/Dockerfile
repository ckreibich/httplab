From fedora:32
MAINTAINER Christian Kreibich <christian@corelight.com>

EXPOSE 80/tcp

RUN dnf install -y node npm
RUN npm install node-static socket.io
RUN mkdir -p /opt/webserver

COPY http.js /opt/webserver
COPY index.html /opt/webserver
COPY jquery.js /opt/webserver

WORKDIR /opt/webserver

ENTRYPOINT ["node", "http.js"]
