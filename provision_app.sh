#!/bin/bash

sudo apt-get update
sudo apt-get install -y nodejs npm
sudo apt-get install -y git
git clone https://github.com/your-repo/your-project.git
cd your-project
npm install
# npm start
# npm install -g pm2
# pm2 start app.js
