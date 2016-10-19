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

  // Category.hasMany('Product');

  sequelize.sync().then(() => {
    Category.findAndCountAll()
      .then((result) => {
        console.log('RESULT COUNT: ', result.count);
        if (!result || result.count === 0) {
          Category.create({
            name: 'Beginner',
          });
        }
      });
  }).catch((e) => {
    console.log('ERROR SYNCING WITH DB: ', e);
  });

  return Category;
};