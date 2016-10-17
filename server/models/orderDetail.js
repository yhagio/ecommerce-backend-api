module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('orderDetails', {
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
  });

  OrderDetail.belongsTo(require('./index').orders);
  OrderDetail.belongsTo(require('./index').users);
  return OrderDetail;
};
