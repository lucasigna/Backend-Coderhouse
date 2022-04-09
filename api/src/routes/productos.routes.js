const express = require("express")
const routerProductos = express.Router()
const controller = require("../controllers/index.controller")
const validationMiddleware = require("../middlewares/validationMiddleware")

//! Endpoints productos
routerProductos.get('/', controller.getProducts)
routerProductos.get('/:id', controller.getProductById)
routerProductos.post('/', validationMiddleware, controller.postProduct) // ADMIN
routerProductos.put('/:id', validationMiddleware, controller.updateProduct) // ADMIN
routerProductos.delete('/:id', validationMiddleware, controller.deleteProduct) // ADMIN

module.exports = routerProductos;