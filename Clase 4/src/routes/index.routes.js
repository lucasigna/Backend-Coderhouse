const express = require("express")
const router = express.Router()
const controller = require("../controllers/index.controller")

router.get('/api/productos',controller.getProducts)
router.get('/api/productos/:id',controller.getProductById)
router.post('/api/productos',controller.postProduct)
router.put('/api/productos/:id',controller.updateProduct)
router.delete('/api/productos/:id',controller.deleteProduct)

module.exports = router;