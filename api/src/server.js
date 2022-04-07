require('dotenv').config()
const express = require('express')
const {router,routerProductos,routerCarrito} = require('./routes/index.routes')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('./src/public'))
app.use(cors())
app.use(router)
app.use("/api/productos", routerProductos)
app.use("/api/carrito", routerCarrito)

app.listen(process.env.PORT, () => console.log(`Server started on port http://localhost:${process.env.PORT}`))
