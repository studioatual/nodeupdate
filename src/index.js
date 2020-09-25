const express = require('express')
const routes = require('./routes')

class Server {
    constructor() {
        this.server = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }

    start(port) {
        this.server.listen(port)
    }
}

module.exports = new Server()