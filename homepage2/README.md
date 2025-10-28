
![](https://gethomepage.dev/assets/homepage_demo_clip.webp)

## Websites
**[Homepage Configs](https://gethomepage.dev/configs/)**

**[GitHub](https://github.com/gethomepage/homepage?utm_source=chatgpt.com)**



---

## Installation Procedure
Run these commands in the terminal:
```sh
sudo su -

mkdir /opt/stacks/homepage -p

cd /opt/stacks/homepage 

nano compose.yaml

```
Put this is the file:
```yaml

services:
  homepage:
    image: ghcr.io/benphelps/homepage:latest
    container_name: homepage
    ports:
      - 3000:3000
    volumes:
      - ./config:/app/config # Make sure your local config directory exists
      - /var/run/docker.sock:/var/run/docker.sock:ro # (optional) For docker integrations
networks: {}
```
---

## Config Bookmarks

```sh
mkdir config -p

nano config/bookmarks.yaml 
```
Put this in the file:
```yaml
---
# For configuration options and examples, please see:
# https://gethomepage.dev/latest/configs/bookmarks

- Homelab:
    - Proxmox:
        - abbr: PX
          href: https://upupa.loseyourip.com:8006/

- Docker-Managers:
    - Dockge87:
        - abbr: DG
          href: http://tiger.loseyourip.com:5001
    - Portainer87:
        - abbr: PT
          href: http://tiger.loseyourip.com:9000/#!/auth
    - Dockge88:
        - abbr: D8
          href: http://10.154.2.88:5001/compose/homepage

- Dockumentation:
    - Wiki.JS88:
        - abbr: YT
          href: http://10.154.2.88:9880/
    - Orale-Cloud:
        - abbr: YT
          href: https://onyoni.duckdns.org/devops/


```
---

## Edit Settings
Run this command:
```sh
nano config/settings.yaml
```
Put this in the file:
```yaml
---
# For configuration options and examples, please see:
# https://gethomepage.dev/latest/configs/settings

title: Your Homelab deserves this Homepage # <----- add this line

providers:
  openweathermap: openweathermapapikey
  weatherapi: weatherapiapikey

background:
  image: https://images.unsplash.com/photo-1502790671504-542ad42d5189?auto=format&fit=crop&w=2560&q=80
  blur: sm # sm, "", md, xl... see https://tailwindcss.com/docs/backdrop-blur
  saturate: 50 # 0, 50, 100... see https://tailwindcss.com/docs/backdrop-saturate
  brightness: 50 # 0, 50, 75... see https://tailwindcss.com/docs/backdrop-brightness
  opacity: 50 # 0-100

```


## Edit Services
Run this command:
```sh
nano config/service.yaml
```
Put this in the file:
```yaml
---
# For configuration options and examples, please see:
# https://gethomepage.dev/latest/configs/services

- My First Group:
    - My First Service:
        href: http://localhost/
        description: Homepage is awesome

- My Second Group:
    - My Second Service:
        href: http://localhost/
        description: Homepage is the best

- My Third Group:
    - My Third Service:
        href: http://localhost/
        description: Homepage is 😎
- Top Services:
    - Proxmox:
        icon: proxmox.png # icons found here https://github.com/walkxcode/dashboard-icons
        href: https://upupa.loseyourip.com:8006/
        description: Proxmox VE
```

---

## Start Homepage
Run these commands:
```sh
docker compose pull

# Start in Detached Mode
docker compose up -d
```

## Open this in the Browser
**[your-servers-ip-address:3000/](http://10.154.2.88:3000/)**

**[http://10.154.2.88:3000/](http://10.154.2.88:3000/)**
