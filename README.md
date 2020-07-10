![OVERTURE](/src/img/logos/overture.logo.color.png)

### About
OVERTURE is based on the [DOREMUS model][1] that allows a detailed description of a musical work and the events associated with it (creation, execution, etc.). It allows the user to go through the musical database easily.

It connects with a Virtuoso SPARQL endpoint and gets the data using SPARQL queries.

### Demo

The application is online at http://overture.doremus.org.

Some interesting page to visit for go deep in the richness of DOREMUS data are available [here](./EXAMPLES.md).

### SPARQL
The [SPARQL 1.1 Query Language][2] allows to query datasources of [RDF triples][3].


## Install
### Dependencies

- [Node.JS](https://nodejs.org/en/)

### Run (dev mode)
- Install some global packages

        npm install -g nodemon typings

- In application folder

        npm install
        npm start

Build for production

        npm run build

The project contains two main folders: `server` that contains the Node.JS/Express application, and `src` that contains the Angular app that runs on the client.

### Run (production mode)

Run production mode (UNIX)

        npm install --production
        npm run prod

Run production mode (Windows)

        npm install --production
        set NODE_ENV=production
        node index

### Docker

Build

    docker build -t doremus/overture .

Run

    docker run -d -p 5050:3333 --restart=unless-stopped  -v /var/nodejs/overture/config:/config --name overture doremus/overture

<!-- docker run -d -p 5050:3333 -v /Users/pasquale/git/overture/config:/config --name overture doremus/overture -->

Stop

    docker stop overture
    docker rm overture # remove from available containers
    docker rmi doremus/overture # remove from images

[1]: https://drive.google.com/file/d/0B_nxZpGQv9GKZmpKRGl2dmRENGc/view
[2]: https://www.w3.org/TR/sparql11-query/
[3]: https://www.w3.org/TR/rdf11-concepts/
