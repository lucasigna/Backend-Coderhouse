const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

    id: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: true
    }, 
    photo: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }, 
    stock: {
        type: Number,
        required: true
    } 

})

module.exports = mongoose.model('Productos', Schema) // Productos es el nombre de la tabla en mongo