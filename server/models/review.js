module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('reviews', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
  });

  return Review;
};
