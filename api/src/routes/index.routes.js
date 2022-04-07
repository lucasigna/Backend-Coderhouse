const express = require("express")
const routerProductos = express.Router()
const routerCarrito = express.Router()
const router = express.Router()
const controller = require("../controllers/index.controller")

//! Endpoints productos
routerProductos.get('/', controller.getProducts)
routerProductos.get('/:id', controller.getProductById)
routerProductos.post('/', controller.postProduct) // ADMIN
routerProductos.put('/:id', controller.updateProduct) // ADMIN
routerProductos.delete('/:id', controller.deleteProduct) // ADMIN

//! Endpoints carrito
routerCarrito.post('/', controller.createCart)
routerCarrito.delete('/:id', controller.deleteCart)
routerCarrito.get('/:id/productos', controller.getProductsInCart)
routerCarrito.post('/:id/productos', controller.addProductToCart)
routerCarrito.delete('/:id/productos/:id_producto', controller.removeProductFromCart)

router.get('*', (req, res) => {
    res.status(404).send({error: 404, description: 'Ruta no implementada'})
})

module.exports = {router,routerProductos,routerCarrito};