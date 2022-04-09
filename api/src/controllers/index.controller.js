const controller = {}

const {db,carts} = require("../data/data")

//! Endpoints productos

// Me permite listar todos los productos disponibles (disponible para usuarios y administradores)
controller.getProducts = (req, res) => {
    const resp = db.getAll()
    res.json(resp)
}

// Me permite obtener un producto por su id (disponible para usuarios y administradores)
controller.getProductById = (req, res) => {
    const resp = db.getById(req.params.id)
    res.json(resp)
}

// Para incorporar productos al listado (disponible para administradores)
controller.postProduct = (req, res) => {

    const {timestamp,name,description,code,photo,price,stock} = req.body
    const prod = db.save({
        timestamp: timestamp,
        name: name,
        description: description,
        code: code,
        photo: photo,
        price: price,
        stock: stock
    })
    res.json(prod)

}

// Actualiza un producto por su id (disponible para administradores)
controller.updateProduct = (req, res) => {
    
    const { id } = req.params
    const {timestamp,name,description,code,photo,price,stock} = req.body
    const resp = db.updateById(
        id,
        {
            id: id,
            timestamp: timestamp,
            name: name,
            description: description,
            code: code,
            photo: photo,
            price: price,
            stock: stock
        }
    )
    res.json(resp);

}

// Borra un producto por su id (disponible para administradores)
controller.deleteProduct = (req, res) => {

    const resp = db.deleteById(req.params.id)
    res.json(resp)
    
}

//! Endpoints carrito

// Crea un carrito y devuelve su id.
controller.createCart = (req, res) => {
    const resp = carts.createCart()
    res.json(resp)
}

// Vacía un carrito y lo elimina.
controller.deleteCart = (req, res) => {
    const {id} = req.params
    const resp = carts.deleteCart(id)
    res.json(resp)
}

// Me permite listar todos los productos guardados en el carrito
controller.getProductsInCart = (req, res) => {
    const {id} = req.params
    const resp = carts.getProductsInCart(id)
    res.json(resp)
}

// Para incorporar productos al carrito por su id de producto
controller.addProductToCart = (req, res) => {
    
    const { id } = req.params
    const {timestamp,name,description,code,photo,price,stock} = req.body
    const prod = {
        timestamp: timestamp,
        name: name,
        description: description,
        code: code,
        photo: photo,
        price: price,
        stock: stock
    }
    const resp = carts.addProductToCart(id, prod)
    res.json(resp)

}

// Eliminar un producto del carrito por su id de carrito y de producto
controller.removeProductFromCart = (req, res) => {
    const { id, id_producto } = req.params
    const resp = carts.removeProductFromCart(id, id_producto)
    res.json(resp)
}

module.exports = controller