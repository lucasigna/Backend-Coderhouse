const express = require("express")
const routes = require("./routes/index.routes")
const path = require("path")

class App {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.app.use(express.json()); // Línea para evitar error en método post
        this.app.use(express.urlencoded({extended: true}))
        this.app.use( express.static(path.resolve(__dirname, "../public")) )
    }
    listen() {
        this.app.listen(this.port);
    }
    start() {
        this.app.use(routes)
    }
}
  
module.exports = App;