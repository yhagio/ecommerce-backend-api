module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
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
  }, {
    classMethods: {
      associate(models) {
        Order.hasMany(models.OrderDetail);
        Order.belongsTo(models.User, { foreignKey: 'user_id' });
      },
    },
  });

  return Order;
};
