require('dotenv').config()
const ProductosModel = require('../models/productos.modules')
const CarritosModel = require('../models/carritos.modules')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, (error) => { 
    if(error) {
        console.log("Error: ", error)
    }
    console.log('Conectado a MongoDB!') 
})


class Productos {

    constructor(){}

    async save(product){
        try{
            product['id'] = makeId();
            const response = await ProductosModel.create([product])
            if(response) {
                return {producto: response, message: "Producto guardado"}
            }
            return {Error: 'Producto no cargado'}
        } catch(err) {
            return {error: err.message}
        }
    }

    async getById(id) {
        const response = await ProductosModel.findOne({ id: id })
        if(response) {
            return response
        }
        return {Error: 'Producto no encontrado'}
    }

    async updateById(id,newData){
        const actualProd = await ProductosModel.findOne({ id: id })
        if(newData.name === undefined) {
            newData.name = actualProd.name
        }
        if(newData.timestamp === undefined) {
            newData.timestamp = actualProd.timestamp
        }
        if(newData.description === undefined) {
            newData.description = actualProd.description
        }
        if(newData.price === undefined) {
            newData.price = actualProd.price
        }
        if(newData.code === undefined) {
            newData.code = actualProd.code
        }
        if(newData.photo === undefined) {
            newData.photo = actualProd.photo
        }
        if(newData.stock === undefined) {
            newData.stock = actualProd.stock
        }
        const updatedProd = await ProductosModel.findOneAndUpdate({ id: id }, newData)
        if(updatedProd){
            return {producto: newData, message: "Producto actualizado"}
        }
        
        return {
            error: "¡Producto no encontrado!"
        }
    }

    async getAll(){
        try{
            const response = await ProductosModel.find()
            if(response){
                return response
            }
        } catch(err){
            return {error: err.message}
        }
    }
    
    async deleteById(id){

        const response = await ProductosModel.findOneAndDelete({ id: id })
        if (response) {
            return {producto: response, message: "Producto eliminado"}
        }
        return {error: "Producto no encontrado"}

    }

}

const makeId = () => {
    let result           = ''
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < 60; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

class Carts {

    constructor(){}

    async createCart(){
        const id = makeId()
        const cart = {
            id: id,
            timestamp: new Date().getTime(),
            products: []
        }
        const response = await CarritosModel.create([cart])
        return {success: "Carrito creado", id: id}
    }

    async deleteCart(id){
        const response = await CarritosModel.findOneAndDelete({ id: id })
        if (response) {
            return {producto: response, message: "Carrito eliminado"}
        }
        return {error: "Carrito no encontrado, no se pudo eliminar"}
    }

    async getProductsInCart(id){
        const response = await CarritosModel.findOne({ id: id })
        if(response) {
            return response.products
        }
        return {Error: 'Carrito no encontrado'}
    }

    async addProductToCart(id, product){
        const response = await CarritosModel.findOne({ id: id })
        if(response) {
            response.products.push(product)
        } else {
            return {Error: 'Carrito no encontrado'}
        }
        const newData = {
            id: id,
            timestamp: response.timestamp,
            products: response.products
        }
        const updatedCart = await CarritosModel.findOneAndUpdate({ id: id }, newData)
        if(updatedCart){
            return {carrito: newData, message: "Producto agregado"}
        }
        
        return {
            error: "Producto no agregado!"
        }
    }

    async removeProductFromCart(id, productId){
        let productos = []
        const response = await CarritosModel.findOne({ id: id })
        if(response) {
            let wasFounded = false
            for (const product of response.products) {
                if(product.id != productId){
                    productos.push(product)
                }
                if(product.id == productId){
                    wasFounded = true
                }
            }
            if(!wasFounded) {
                return {error: "Producto no encontrado"}
            }
        
        } else {
            return {Error: 'Carrito no encontrado'}
        }
        const newData = {
            id: id,
            timestamp: response.timestamp,
            products: productos
        }
        const updatedCart = await CarritosModel.findOneAndUpdate({ id: id }, newData)
        if(updatedCart){
            return {carrito: newData, message: "Producto eliminado"}
        }
        
        return {
            error: "Producto no eliminado!"
        }
    }

}

const db = new Productos()
const carts = new Carts()

module.exports = {db,carts}