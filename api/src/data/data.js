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
        return product
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
                if(newData.name === undefined) {
                    newData.name = ob.name
                }
                if(newData.timestamp === undefined) {
                    newData.timestamp = ob.timestamp
                }
                if(newData.description === undefined) {
                    newData.description = ob.description
                }
                if(newData.price === undefined) {
                    newData.price = ob.price
                }
                if(newData.code === undefined) {
                    newData.code = ob.code
                }
                if(newData.photo === undefined) {
                    newData.photo = ob.photo
                }
                if(newData.stock === undefined) {
                    newData.stock = ob.stock
                }
                this.db[i] = newData
                return {
                    id: id,
                    timestamp: newData.timestamp,
                    name: newData.name,
                    description: newData.description,
                    code: newData.code,
                    photo: newData.photo,
                    price: newData.price,
                    stock: newData.stock,
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

const makeId = () => {
    let result           = ''
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < 60; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

class Carts {

    constructor(){
        this.carts = []
    }

    createCart(){
        const id = makeId()
        const cart = {
            id: id,
            timestamp: new Date().getTime(),
            products: []
        }
        this.carts.push(cart)
        return {success: "Carrito creado", id: id}
    }

    deleteCart(id){
        for (const cart of this.carts) {
            if(cart.id == id){
                this.carts.splice(this.carts.indexOf(cart),1) // Elimino el carrito
                return {success: "Carrito eliminado"}
            }
        }
        return {error: "Carrito no encontrado, no se pudo eliminar"}
    }

    getProductsInCart(id){
        for (const cart of this.carts) {
            if(cart.id == id){
                return cart.products
            }
        }
        return {error: 'Carrito no encontrado'}
    }

    addProductToCart(id, product){
        for (const cart of this.carts) {
            if(cart.id == id){
                cart.products.push(product)
                return {success: "Producto agregado"}
            }
        }
        return {error: "Carrito no encontrado, no se cargó el producto"}
    }

    removeProductFromCart(id, productId){
        for (const cart of this.carts) {
            if(cart.id == id){
                for (const product of cart.products) {
                    if(product.id == productId){
                        cart.products.splice(cart.products.indexOf(cart),1) // Elimino el producto
                        return {success: "Producto eliminado"}
                    }
                }
                return {error: "Producto no encontrado"}
            }
        }
        return {error: "Carrito no encontrado"}
    }

}

const db = new Database()
const carts = new Carts()

module.exports = {db,carts}