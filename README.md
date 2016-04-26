# DOREMUS Web App

### About
DOREMUS Web App is based on the [DOREMUS model][1] that allows a detailed description of a musical work and the events associated with it (creation, execution, etc.). It allows the user to go through the musical database easily.

It connects with a virtuoso sparql endpoint and gets the data using SPARQL queries.

### SPARQL
The [SPARQL 1.1 Query Language][2] allows to query datasources of [RDF triples][3].

### How to run:

1. Go to the folder where the application is
2. npm install
3. npm start

### Dependencies:

Server needs to connect with an RDF store running in the local machine in port 8890 (sparql endpoint: http://localhost:8890/sparql).

This database should contain the GRAPH <http://data.doremus.org/vocabulary/key> with some Concepts if the user wants to see some changes when doing the query.

### RDF Store:
Virtuoso 7.2.1 (http://www.openlinksw.com)

[1]: https://drive.google.com/file/d/0B_nxZpGQv9GKZmpKRGl2dmRENGc/view
[2]: https://www.w3.org/TR/sparql11-query/
[3]: https://www.w3.org/TR/rdf11-concepts/
