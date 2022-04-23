const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

    id: {
        type: String,
        required: true
    },
    timestamp:{
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: false
    }

})

module.exports = mongoose.model('Carritos', Schema) // Productos es el nombre de la tabla en mongo