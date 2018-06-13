# Server-side application

## Installation

Requires [Node.js](https://nodejs.org/) and [Docker Compose](https://docs.docker.com/compose/install/) to run.

To install the dependencies and start the server run the following commands:

```sh
$ cd server
$ docker-compose build
$ docker-compose up -d
```

## Run seeds files
```sh
$ npm install -g node-mongo-seeds
$ seed
```