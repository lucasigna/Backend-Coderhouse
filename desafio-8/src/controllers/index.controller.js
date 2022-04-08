const controller = {}

const db = require("../data/data")
const messages = require("../data/messages")

controller.getProducts = async (req, res) => {
    const resp = await db.getAll()
    res.json(resp)
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
    const {mail,message} = req.body
    const msg = await messages.save({
        mail: mail,
        timestamp: new Date().getTime(),
        message: message
    })
    res.json(msg)
}

module.exports = controller