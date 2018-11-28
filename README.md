Execute and wait to finish:

    vagrant up

**Note:** docker compose will automatically start (docker-compose up -d -f /vagrant/docker-compose.yml)

Open a browser with:

    http://localhost:8080

To check containers status:

    vagrant ssh
    cd /vagrant/
    docker-compose ps