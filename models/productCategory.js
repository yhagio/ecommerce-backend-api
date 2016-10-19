module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.UUID,
    },
    category_id: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
        ProductCategory.belongsTo(models.Product);
        ProductCategory.belongsTo(models.Category);
      },
    },
  });

  return ProductCategory;
};
