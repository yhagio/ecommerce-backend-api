const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    photo_url: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Review);
        User.hasMany(models.Order);
        User.hasMany(models.OrderDetail);
      },
    },
  });


  sequelize.sync().then(() => {
    User.findAndCountAll()
      .then((result) => {
        console.log('RESULT COUNT: ', result.count);
        if (!result || result.count === 0) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt);

          User.create({
            first_name: process.env.ADMIN_FNAME,
            last_name: process.env.ADMIN_LNAME,
            email: process.env.ADMIN_EMAIL,
            password: hash,
            is_admin: true,
          });
        }
      });
  }).catch((e) => {
    console.log('ERROR SYNCING WITH DB: ', e);
  });

  return User;
};
