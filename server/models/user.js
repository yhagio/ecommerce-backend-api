module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    photo_url: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  });

  return User;
};
