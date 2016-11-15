module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    body: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate(models) {
        Review.belongsTo(models.Product);
        Review.belongsTo(models.User);
      },
    },
  });

  // sequelize.sync().then(() => {
  //   Review.findAndCountAll()
  //     .then((result) => {
  //       if (!result || result.count === 0) {
  //         Review.create({
  //           product_id: 1,
  //           user_id: 1,
  //           body: 'Sample review body comment!',
  //           rating: 3,
  //         });
  //       }
  //     });
  // }).catch((e) => {
  //   console.log('ERROR SYNCING WITH DB: ', e);
  // });

  return Review;
};
