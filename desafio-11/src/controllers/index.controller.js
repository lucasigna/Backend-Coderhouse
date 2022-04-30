const controller = {}
const generateProduct = require('./../utils/product.utils')

const db = require("../data/data")
const messages = require("../data/messages")

controller.getProducts = async (req, res) => {
    const resp = await db.getAll()
    res.json(resp)
}

controller.getProductsTest = async (req, res) => {
    const fakeProducts = []
    for (let i = 0; i < 5; i++) {
        fakeProducts.push(generateProduct())
    }
    res.json(fakeProducts)
}

controller.getProductForm = (req, res) => {
    res.render('postProduct.handlebars')
}

controller.getProductById = async (req, res) => {
    const resp = await db.getById(req.params.id)
    res.json(resp)
}

controller.postProduct = async (req, res) => {
    const {title,price,thumbnail} = req.body
    const prod = await db.save({
        title: title,
        price: price,
        thumbnail: thumbnail
    })
    res.json(prod)
}

controller.updateProduct = async (req, res) => {
    
    const { id } = req.params
    const {title,price,thumbnail} = req.body
    const resp = await db.updateById(
        id,
        {
            id: id,
            title: title,
            price: price,
            thumbnail: thumbnail
        }
    )
    res.json(resp);

}

controller.deleteProduct = async (req, res) => {
    const resp = await db.deleteById(req.params.id)
    res.json(resp)
}

controller.getMessages = async (req, res) => {
    const resp = await messages.getAll()
    res.json(resp)
}

controller.postMessage = async(req, res) => {
    const {mail,nombre,apellido,edad,alias,avatar,message} = req.body
    const msg = await messages.save({
        author: {
            id: mail, 
            nombre: nombre, 
            apellido: apellido, 
            edad: edad, 
            alias: alias,
            avatar: avatar
        },
        text: message
    })
    res.json(msg)
}

module.exports = controller