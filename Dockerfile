FROM jplu/node

# Install app dependencies
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install --production

RUN adduser -D -g sudo nodeuser -u 1000 \
    && chown -R nodeuser /usr/src/app \
    && chown -R nodeuser /usr/src/app \
    && chmod -R 777 /root \
    && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

EXPOSE 3333
CMD [ "sudo", "-E", "-u", "nodeuser", "npm", "run", "prod" ]
