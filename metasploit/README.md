## 1. Prerequisites
Before you start the docker compose file run this command:
```
sudo su -

#Create a network
docker network create --subnet=172.18.0.0/16 msf
```
## 2. Create the compose.yaml file
Run these commands :
```
nano compose.yaml
```

Put this in the file
```
version: '3'
services:
  ms:
    image: metasploitframework/metasploit-framework:latest
    environment:
      DATABASE_URL: postgres://postgres:pplixpp2@172.24.0.2:5432/msf?pool=200&timeout=5
#      DATABASE_URL: postgres://postgres:pplixpp2@db:5432/msf?pool=200&timeout=5
    links:
      - db
    ports:
      - 4444:4444
    volumes:
      - ./msf:/home/msf/.msf4
      - ./data:/tmp/data

  db:
    image: postgres:11-alpine
#    image: postgres:15
#    container_name: meta-db
#    ports:
#      - "127.0.0.1:5432:5432"
    volumes:
      - ./db:/var/lib/postgresql/data
      - ./docker/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d
    environment:
      POSTGRES_PASSWORD: pplixpp2
      POSTGRES_USER: postgres
      POSTGRES_DB: msf
#      POSTGRES_HOST_AUTH_METHOD: trust
```

## 3. Start the Container (in detached mode):
Run this command :
```
docker compose up -d
```
## 4. Running Metasploit fremework from the terminal
Run these commands :
```
# get Containers bash terminal
docker exec -it metasploit bash

# Run Metasploit Framework Console
./msfconsole
```

