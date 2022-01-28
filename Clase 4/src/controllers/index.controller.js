const controller = {}

const db = require("../data/data")

controller.getProducts = (req, res) => {
    const resp = db.getAll()
    res.json(resp)
}

controller.getProductById = (req, res) => {
    const resp = db.getById(req.params.id)
    res.json(resp)
}

controller.postProduct = (req, res) => {
    const {title,price,thumbnail} = req.body
    db.save({
        title: title,
        price: price,
        thumbnail: thumbnail
    })
    res.json({
        title: title,
        price: price,
        thumbnail: thumbnail,
        message: "¡Producto agregado!"
    });
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

module.exports = controller