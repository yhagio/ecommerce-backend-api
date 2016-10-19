module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        OrderDetail.belongsTo(models.Order, { foreignKey: 'order_id' });
        OrderDetail.belongsTo(models.User, { foreignKey: 'user_id' });
      },
    },
  });

  return OrderDetail;
};
