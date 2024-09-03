#!/bin/bash

sudo apt-get update
sudo apt-get install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
sudo apt-get install -y git
# git clone https://github.com/your-repo/your-project.git
# cd your-project
# sudo cp -r /path/to/your/web/files/* /var/www/html/
    