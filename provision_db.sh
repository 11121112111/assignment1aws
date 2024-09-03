#!/bin/bash

sudo apt-get update
sudo apt-get install -y mysql-server
sudo mysql_secure_installation
sudo systemctl start mysql
sudo systemctl enable mysql
# mysql -u root -p -e "CREATE DATABASE db;"
# mysql -u root -p -e "CREATE USER 'user'@'%' IDENTIFIED BY 'password';"
# mysql -u root -p -e "GRANT ALL PRIVILEGES ON db.* TO 'user'@'%';"
# mysql -u root -p -e "FLUSH PRIVILEGES;"
