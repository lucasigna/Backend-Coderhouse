const express = require("express")
const router = express.Router()
const controller = require("../controllers/index.controller")

//! Endpoints productos
router.get('/api/productos', controller.getProducts)
router.get('/api/productos/:id', controller.getProductById)
router.post('/api/productos', controller.postProduct) // ADMIN
router.put('/api/productos/:id', controller.updateProduct) // ADMIN
router.delete('/api/productos/:id', controller.deleteProduct) // ADMIN

//! Endpoints carrito
router.post('/api/carrito', controller.createCart)
router.delete('/api/carrito/:id', controller.deleteCart)
router.get('/api/carrito/:id/productos', controller.getProductsInCart)
router.post('/api/carrito/:id/productos', controller.addProductToCart)
router.delete('/api/carrito/:id/productos/:id_producto', controller.removeProductFromCart)

router.get('*', (req, res) => {
    res.status(404).send({error: 404, description: 'Ruta no implementada'})
})

module.exports = router;