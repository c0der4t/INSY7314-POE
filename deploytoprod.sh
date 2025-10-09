#!/bin/bash

docker compose build
docker save stoinksapi:latest | ssh -o StrictHostKeyChecking=no root@168.119.165.47 'docker load'
docker save stoinksfrontend:latest | ssh -o StrictHostKeyChecking=no root@168.119.165.47 'docker load'
scp -o StrictHostKeyChecking=no docker-compose.yml root@168.119.165.47:/tmp/stoinks
ssh -o StrictHostKeyChecking=no root@168.119.165.47 'cd /tmp/stoinks && docker compose up -d --no-build'
