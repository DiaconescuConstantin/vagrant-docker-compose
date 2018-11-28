Execute and wait to finish:

    vagrant up

**Note:** docker compose will automatically start (docker-compose up -d -f /vagrant/docker-compose.yml)

App URL:

    http://localhost:8080

Mysql Adminer URL:

    http://localhost:8081

To check containers status:

    vagrant ssh
    cd /vagrant/
    docker-compose ps