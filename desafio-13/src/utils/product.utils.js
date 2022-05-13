const {faker} = require("@faker-js/faker")
faker.locale = "es";

const generateProduct = () => {
  return {
    id: faker.datatype.number({min:1,max:100}),
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.abstract(),
  };
}

module.exports = generateProduct