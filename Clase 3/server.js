const express = require("express");
const fs = require('fs');

class Contenedor {

    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(objeto){
        let id = 1;
        let collection = [];
        await fs.promises.readFile(`./${this.fileName}.txt`,'utf-8')
        .then( contenido => {
            collection = JSON.parse(contenido)
            id = collection[collection.length - 1].id + 1;
        })
        .catch( err => console.log(err));
        objeto['id'] = id;
        collection.push(objeto);
        await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(collection));
        return id;
    }

    async getById(id,res){
        await fs.promises.readFile(`./${this.fileName}.txt`,'utf-8')
        .then( contenido => {
            let collection = JSON.parse(contenido)
            for (const ob of collection) {
                if(ob.id == id) {
                    res.send(ob);
                }
            }
            res.send({ message: "No se encontró el producto" });
        })
        .catch( err => console.log(err));
    }

    async getAll(res){
        await fs.promises.readFile(`./${this.fileName}.txt`,'utf-8')
        .then( contenido => {
            res.send(JSON.parse(contenido))
        })
        .catch( err => console.log(err));
    }

}

const content = new Contenedor('productos');

class App {
  constructor(port) {
    this.app = express();
    this.port = port;
    this.app.use(express.json()); // Línea para evitar error en método post
  }
  listen() {
    this.app.listen(this.port);
  }
  start() {
    this.app.get("/productos", (req, res) => {
        // Devuelve todos los productos
        content.getAll(res)
    });

    this.app.get("/productoRandom", async(req, res) => {
        // Obtiene un producto
        const id = Math.floor(Math.random() * (3 + 1 - 1)) + 1;
        content.getById(parseInt(id),res)
        
    });
  }
}

module.exports = App;