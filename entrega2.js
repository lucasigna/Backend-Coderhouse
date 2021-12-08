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
        console.log('Objeto guardado!');
        console.log('Contenido del archivo:');
        console.log(collection);
        return id;
    }

    async getById(id){
        await fs.promises.readFile(`./${this.fileName}.txt`,'utf-8')
        .then( contenido => {
            let collection = JSON.parse(contenido)
            for (const ob of collection) {
                if(ob.id == id) {
                    console.log(ob);
                    return ob
                }
            }
            return null
        })
        .catch( err => console.log(err));
    }

    async getAll(){
        await fs.promises.readFile(`./${this.fileName}.txt`,'utf-8')
        .then( contenido => {
            console.log(JSON.parse(contenido));
            return JSON.parse(contenido)
        })
        .catch( err => console.log(err));
    }
    
    async deleteById(id){
        let collection = []
        await fs.promises.readFile(`./${this.fileName}.txt`,'utf-8')
        .then( contenido => {
            let col = JSON.parse(contenido)
            for (const ob of col) {
                if(ob.id != id) {
                    collection.push(ob)
                }
            }
        })
        .catch( err => console.log(err));
        await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(collection));
        console.log('Objeto eliminado!');
    }
    
    async deleteAll(){
        await fs.promises.writeFile(`./${this.fileName}.txt`, '');
        console.log('Todos los objetos fueron eliminados');
    }

}

const content = new Contenedor('productos');

const producto = {
    title: 'producto 1',
    price: 3000,
    thumbnail: 'foto.jpg'
}
// Creo esta función asincrónica para que se ejecuta una función por vez, y no todas a la vez.
const main = async () => {
    await content.save(producto);
    await content.save(producto);
    await content.save(producto);
    await content.getById(1);
    await content.getAll();
    await content.deleteById(1);
    await content.deleteAll();
}

main()