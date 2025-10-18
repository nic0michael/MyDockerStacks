## Official links

https://js.wiki/

https://js.wiki/get-started

https://docs.requarks.io/install

https://docs.requarks.io/install/docker

## Installation Instructions
Run these commands:
```bash
sudo su -

mkdir /opt/stacks/wikijs/ -p

cd /opt/stacks/wikijs/

nano compose.yaml
```

Put this in the file:
```yaml
version: "3.8"
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_USER: ${POSTGRES_USER}
    logging:
      driver: none
    restart: unless-stopped
    volumes:
      - db-data:/var/lib/postgresql/data
  wiki:
    image: ghcr.io/requarks/wiki:2
    depends_on:
      - db
    environment:
      DB_TYPE: postgres
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: ${POSTGRES_USER}
      DB_PASS: ${POSTGRES_PASSWORD}
      DB_NAME: ${POSTGRES_DB}
    restart: unless-stopped
    ports:
      - 9880:3000
volumes:
  db-data: null
networks: {}


```
Run thisa command:
```bash
nano .env
```
Put this in the file:
```
POSTGRES_DB=wiki
POSTGRES_PASSWORD=wikijsrocks
POSTGRES_USER=wikijs
```

## Starting the WIKI Server
Run this command:
```bash
docker compose up -d
```
## Opening the site in the browser:
**[http://your-server-ip:9880/](http://your-server-ip:9880/)**

**[http://tiger.loseyourip.com:9880/](http://tiger.loseyourip.com:9880/)**
