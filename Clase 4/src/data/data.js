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
                this.db[i] = newData
                return {
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