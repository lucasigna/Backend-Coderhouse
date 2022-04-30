require('dotenv').config()
const _knex = require('knex')

const config = {
  client: "mysql2",
  connection: {
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: process.env.DATABASE,
  },
};

const knexMariaDB = _knex(config);

const createTable = async(knex,table) => {
    try {
      const exist = await knex.schema.hasTable(table)
      if (!exist) {
            await knex.schema.createTable(table, (table) => {
            table.increments("id").primary().notNullable(),
            table.string("title", 100),
            table.float("price"),
            table.string("thumbnail", 500);
        });
        console.log("Tabla creada!");
      } else {
        console.log("La tabla ya existe");
      }
    } catch (error) {
      console.log(error);
    }
  }

class Database {

    constructor(knex,table) {
        this.knex = knex;
        this.table = table;
    }

    async save(product){

        try{
            await createTable(this.knex,this.table);
            const response = await this.knex.insert(product).from(this.table);
            product.id = response[0]
            console.log("Producto agregado");
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        return product

    }

    async getById(id){

        try {
            await createTable(this.knex,this.table);
            const product = await this.knex.select().from(this.table).where('id', id);
            console.log('Producto encontrado');
            return product
        } catch (error) {
            console.log(error)
            return {error: error}
        }

    }

    async updateById(id,newData){

        try {
            const actualData = await this.getById(id)
            if(newData.title === undefined) {
                newData.title = actualData.title
            }
            if(newData.price === undefined) {
                newData.price = actualData.price
            }
            if(newData.thumbnail === undefined) {
                newData.thumbnail = actualData.thumbnail
            }
            await createTable(this.knex,this.table);
            await this.knex.from(this.table).update(newData).where("id", id);
            console.log('Producto actualizado!');
            return {
                id: id,
                title: newData.title,
                price: newData.price,
                thumbnail: newData.thumbnail,
                message: "¡Producto actualizado!"
            }
        } catch (error) {
            console.log(error);
            return {error: error}
        }

    }

    async getAll(){
        try {
            await createTable(this.knex,this.table);
            const products = await this.knex.select().from(this.table);
            console.log(products);
            return products
        } catch (error) {
            console.log(error);
            return {error: error}
        }
    }
    
    async deleteById(id){
        try {
            await createTable(this.knex,this.table);
            await this.knex.del().from(this.table).where("id", id);
            console.log("Producto borrado!");
            return {success: "Producto borrado!"}
        } catch (error) {
            console.log(error);
            return {error: error}
        }
    }

}

const db = new Database(knexMariaDB,"productos")

module.exports = db;