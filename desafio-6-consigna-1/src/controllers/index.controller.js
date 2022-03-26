const controller = {}

const db = require("../data/data")
const messages = require("../data/messages")

controller.getProducts = (req, res) => {
    const resp = db.getAll()
    res.json(resp)
}


controller.getProductForm = (req, res) => {
    res.render('postProduct.handlebars')
}

controller.getProductById = (req, res) => {
    const resp = db.getById(req.params.id)
    res.json(resp)
}

controller.postProduct = (req, res) => {
    const {title,price,thumbnail} = req.body
    const prod = db.save({
        title: title,
        price: price,
        thumbnail: thumbnail
    })
    res.json(prod)
}

controller.updateProduct = (req, res) => {
    
    const { id } = req.params
    const {title,price,thumbnail} = req.body
    const resp = db.updateById(
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

controller.deleteProduct = (req, res) => {
    const resp = db.deleteById(req.params.id)
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