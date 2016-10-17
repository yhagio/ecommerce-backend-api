module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    id: {
      // type: DataTypes.INTEGER,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      // autoIncrement: true,
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
  });

  Product.hasMany(require('./index').reviews);

  // sequelize.sync().then(() => {
  //   Product.findAndCountAll()
  //     .then((result) => {
  //       console.log('RESULT COUNT: ', result.count);
  //       if (!result || result.count === 0) {
  //         Product.create({
  //           name: 'Smaple Course',
  //           description: 'Sample Description',
  //           price: 12.5,
  //         });
  //       }
  //     });
  // }).catch((e) => {
  //   console.log('ERROR SYNCING WITH DB: ', e);
  // });

  return Product;
};
