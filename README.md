![OVERTURE](client/src/img/logos/overture.logo.color.png)

### About
OVERTURE is based on the [DOREMUS model][1] that allows a detailed description of a musical work and the events associated with it (creation, execution, etc.). It allows the user to go through the musical database easily.

It connects with a virtuoso sparql endpoint and gets the data using SPARQL queries.

### SPARQL
The [SPARQL 1.1 Query Language][2] allows to query datasources of [RDF triples][3].


## Install
### Dependencies

- [Node.JS](https://nodejs.org/en/)
- An RDF store ([Virtuoso 7.2.1](http://www.openlinksw.com)
)
 - running in the local machine in port 8890 (sparql endpoint: http://localhost:8890/sparql).
 - the database should contain the GRAPH <http://data.doremus.org/vocabulary/key> with some Concepts if the user wants to see some changes when doing the query.

### Run (dev mode)
- Install some global packages

        npm install -g gulp gulp-cli nodemon typings

- In application folder

        npm install
        npm start

Build for production

        npm run build-dist

### Run (production mode)

Run production mode (UNIX)

        npm install --production
        npm run prod

Run production mode (Windows)

        set NODE_ENV=production
        node index

### Docker

Dependency: [jplu/node](https://github.com/jplu/docker-node). Clone, point the folder, build.

Build

    docker build -t doremus/overture .

Run

    docker run -p 5050:3333 -d --name  doremus_overture doremus/overture
    docker logs doremus_overture

Stop

    docker stop overture
    docker rm overture ##remove from images

[1]: https://drive.google.com/file/d/0B_nxZpGQv9GKZmpKRGl2dmRENGc/view
[2]: https://www.w3.org/TR/sparql11-query/
[3]: https://www.w3.org/TR/rdf11-concepts/
