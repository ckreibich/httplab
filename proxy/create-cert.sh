#! /bin/sh
#
# Quick wrapper that generates suitable cert/private key. This is
# pretty cookie-cutter and in this case bases on
# https://www.eclipse.org/jetty/documentation/current/http2-configuring-haproxy.html

keytool -genkeypair -dname "cn=Name, ou=Unit, o=Org, c=US" \
        -keyalg RSA -keystore keystore.p12 -storetype pkcs12 \
        -storepass storepwd -ext SAN=DNS:example.com -noprompt \
        -validity 3650

keytool -exportcert -keystore keystore.p12 -storetype pkcs12 \
        -storepass storepwd -rfc -file certificate.pem

openssl pkcs12 -in keystore.p12 -nodes -nocerts -out private_key.pem -passin pass:storepwd

cat certificate.pem private_key.pem >domain.pem
