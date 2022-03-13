const express = require('express')
const routes = require('./routes/index.routes')

class App {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))
        this.app.set('views','./views')
        this.app.set('view engine', 'pug')
    }
    listen() {
        this.app.listen(this.port);
    }
    start() {
        this.app.use(routes)
    }
}

module.exports = App;