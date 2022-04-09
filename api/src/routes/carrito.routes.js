const express = require("express")
const routerCarrito = express.Router()
const controller = require("../controllers/index.controller")

//! Endpoints carrito
routerCarrito.post('/', controller.createCart)
routerCarrito.delete('/:id', controller.deleteCart)
routerCarrito.get('/:id/productos', controller.getProductsInCart)
routerCarrito.post('/:id/productos', controller.addProductToCart)
routerCarrito.delete('/:id/productos/:id_producto', controller.removeProductFromCart)

module.exports = routerCarrito;