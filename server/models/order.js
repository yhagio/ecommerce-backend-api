module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
    },
  });

  Order.hasMany(require('./index').orderDetails);
  Order.belongs(require('./index').users);

  return Order;
};
