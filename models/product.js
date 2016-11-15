module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
        Product.hasMany(models.Review);
        Product.hasMany(models.ProductCategory);
        Product.belongsToMany(models.Category, { through: models.ProductCategory });
        Product.hasMany(models.CartItem);
      },
    },
  });

  // Seed products
  // const products = require('../seeders/products');
  // sequelize.sync().then(() => {
  //   Product.findAndCountAll()
  //     .then((result) => {
  //       if (!result || result.count === 0) {
  //         for (let i = 0; i < products.length; i++) {
  //           Product.create({
  //             name: products[i].name,
  //             description: products[i].description,
  //             price: products[i].price,
  //           });
  //         }
  //       }
  //     });
  // }).catch((e) => {
  //   console.log('ERROR SYNCING WITH DB: ', e);
  // });
  
  return Product;
};
