const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

    author: {

        id: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: false
        },
        apellido: {
            type: String,
            required: false
        },
        edad: {
            type: String,
            required: false
        },
        alias: {
            type: String,
            required: false
        }, 
        avatar: {
            type: String,
            required: false
        }, 
    },
    text: {
        type: String,
        required: true
    },
    
})

module.exports = mongoose.model('Mensajes', Schema)