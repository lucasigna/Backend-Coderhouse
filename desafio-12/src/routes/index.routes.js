const express = require("express")
const router = express.Router()
const controller = require("../controllers/index.controller")

router.get('/api/productos',controller.getProducts)
router.get('/api/productos-test',controller.getProductsTest)
router.get('/api/productos/:id',controller.getProductById)
router.get('/api/productoForm',controller.getProductForm)
router.post('/api/productos',controller.postProduct)
router.put('/api/productos/:id',controller.updateProduct)
router.delete('/api/productos/:id',controller.deleteProduct)
router.get('/api/mensajes',controller.getMessages)
router.post('/api/mensajes',controller.postMessage)

module.exports = router;