const express = require('express')
const routes = require('./routes/index.routes')
const { engine } = require("express-handlebars")

class App {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}))
        this.app.engine('handlebars', engine());
        this.app.set('views','./src/views')
        this.app.set('view engine', 'handlebars')
    }
    listen() {
        this.app.listen(this.port);
    }
    start() {
        this.app.use(routes)
    }
}

module.exports = App;