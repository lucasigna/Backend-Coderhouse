require('dotenv').config()
const MensajesModel = require('../models/mensajes.modules')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, (error) => { 
    if(error) {
        console.log("Error: ", error)
    }
    console.log('Conectado a MongoDB!') 
})

class Contenedor {

    constructor() {}

    async save(message){

      try{
          const response = await MensajesModel.create([message])
          if(response) {
              return {mensaje: response, message: "Mensaje guardado"}
          }
          return {Error: 'Mensaje no cargado'}
      } catch(err) {
          return {error: err.message}
      }

    }

    async getAll(res){
      try{
          const response = await MensajesModel.find()
          if(response){
              return response
          }
      } catch(err){
          return {error: err.message}
      }
    }

}

const messages = new Contenedor();

module.exports = messages