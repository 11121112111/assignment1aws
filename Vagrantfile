Vagrant.configure("2") do |config|
  # Increase boot timeout to handle slower startup times
  config.vm.boot_timeout = 600

  # Define the VM for the web server
  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/bionic64"
    web.vm.network "forwarded_port", guest: 80, host: 8080
    web.vm.provision "shell", path: "provision_web.sh"
  end

  # Define the VM for the application server
  config.vm.define "app" do |app|
    app.vm.box = "ubuntu/bionic64"
    app.vm.network "forwarded_port", guest: 3000, host: 3001
    app.vm.provision "shell", path: "provision_app.sh"
  end

  # Define the VM for the database server
  config.vm.define "db" do |db|
    db.vm.box = "ubuntu/bionic64"
    db.vm.network "forwarded_port", guest: 3306, host: 3307
    db.vm.provision "shell", path: "provision_db.sh"
  end
end
