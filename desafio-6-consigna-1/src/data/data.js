class Database {

    constructor(){
        this.db = []
    }

    save(product){
        if(this.db.length > 0){
            product['id'] = this.db[this.db.length - 1].id + 1;
        } else {
            product['id'] = 1;
        }
        this.db.push(product);
    }

    getById(id){
        for (const ob of this.db) {
            if(ob.id == id) {
                return ob
            }
        }
        return {error: 'Producto no encontrado'}
    }
    updateById(id,newData){
        for (const ob of this.db) {
            if(ob.id == id) {
                const i = this.db.indexOf(ob)
                if(newData.title === undefined) {
                    newData.title = ob.title
                }
                if(newData.price === undefined) {
                    newData.price = ob.price
                }
                if(newData.thumbnail === undefined) {
                    newData.thumbnail = ob.thumbnail
                }
                this.db[i] = newData
                return {
                    id: id,
                    title: newData.title,
                    price: newData.price,
                    thumbnail: newData.thumbnail,
                    message: "¡Producto actualizado!"
                }
            }
        }
        return {
            error: "¡Producto no encontrado!"
        }
    }

    getAll(){
        return this.db
    }
    
    deleteById(id){
        let collection = []
        let length = 0
        let isDeleted = false
        for (const ob of this.db) {
            if(ob.id != id) {
                collection.push(ob)
                length++
            }
        }
        length != this.db.length ? isDeleted = true : isDeleted = false
        this.db = collection
        if (isDeleted) {
            return {message: "Producto eliminado"}
        } else {
            return {error: "Producto no encontrado"}
        }
    }

}

const db = new Database()

module.exports = db;