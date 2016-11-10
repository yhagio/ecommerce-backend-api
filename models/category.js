module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        Category.hasMany(models.ProductCategory);
        Category.belongsToMany(models.Product, { through: models.ProductCategory });
      },
    },
  });

  /*
  Seed categories
  const categories = require('../seeders/categories');

  sequelize.sync().then(() => {
    Category.findAndCountAll()
      .then((result) => {
        // console.log('RESULT COUNT: ', result.count);
        if (!result || result.count === 0) {
          for (let i = 0; i < categories.length; i++) {
            Category.create({
              name: categories[i].name,
            });
          }
        }
      });
  }).catch((e) => {
    console.log('ERROR SYNCING WITH DB: ', e);
  });
  */
  return Category;
};
