const path = require('path')
const { createEngine } = require('express-react-views')
const express = require('express')
const routes = require('./routes')

class Server {
    constructor() {
        this.server = express()
        this.server.set('views', path.resolve(__dirname, 'views'))
        this.server.set('view engine', 'js')
        this.server.engine('js', createEngine())
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }

    config({ api_port,  }) {

    }

    start(port) {
        this.server.listen(port)
    }
}

module.exports = new Server()