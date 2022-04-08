const fs = require('fs');

const _knex = require('knex')

const config = {
    client: 'better-sqlite3',
    connection: () => ({
      filename: "./src/db/ecommerce.sqlite"
    }),
    useNullAsDefault: true,
};

const knexSQLite = _knex(config);

const createTable = async(knex,table) => {
    try {
      const exist = await knex.schema.hasTable(table);
      console.log(exist);
      if (!exist) {
            await knex.schema.createTable(table, (table) => {
            table.increments("id").primary().notNullable(),
            table.string("mail", 100),
            table.string("message", 500),
            table.timestamp("timestamp");
        });
        console.log("Tabla creada!");
      } else {
        console.log("La tabla ya existe");
      }
    } catch (error) {
      console.log(error);
    }
  }

class Contenedor {

    constructor(knex,table) {
        this.knex = knex;
        this.table = table;
    }

    async save(message){

        try{
            await createTable(this.knex,this.table);
            const response = await this.knex.insert(message).from(this.table);
            message.id = response[0]
            console.log("Mensaje agregado");
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        return message

    }

    async getAll(res){
        try {
            await createTable(this.knex,this.table);
            const messages = await this.knex.select().from(this.table);
            console.log(messages);
            return messages
        } catch (error) {
            console.log(error);
            return {error: error}
        }
    }

}

const messages = new Contenedor(knexSQLite,'mensajes');

module.exports = messages