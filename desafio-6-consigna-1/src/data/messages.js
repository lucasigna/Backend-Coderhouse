const fs = require('fs');

class Contenedor {

    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(objeto){
        let collection = [];
        await fs.promises.readFile(`./src/data/${this.fileName}.txt`,'utf-8')
        .then( contenido => {
            collection = JSON.parse(contenido)
            console.log(collection);
        })
        .catch( err => console.log(err));
        collection.push(objeto);
        await fs.promises.writeFile(`./src/data/${this.fileName}.txt`, JSON.stringify(collection));
        return objeto
    }

    async getAll(res){
        let result = {error: "Algo salió mal"}
        await fs.promises.readFile(`./src/data/${this.fileName}.txt`,'utf-8')
        .then( contenido => {
            result = JSON.parse(contenido)
        })
        .catch( err => console.log(err));
        return result
    }

}

const messages = new Contenedor('mensajes');

module.exports = messages