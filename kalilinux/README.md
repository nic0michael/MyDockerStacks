## 1. create Docker compose file
run these commands
```
sudo su -
nano compose.yaml
```

Put this in the file :
```
version: "3.3"
services:
  KaliLinux:
    image: kalilinux/kali-rolling:latest
    container_name: KaliLinux
    tty: true
    stdin_open: true
    restart: always

```
## 2. Strat the container in detached mode
Run this command:
```
docker compose up -d
```
## 3. Open Containers bash in terminal
```
docker exec KaliLinux bash
```
