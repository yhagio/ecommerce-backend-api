module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      // type: DataTypes.UUID,
      // defaultValue: DataTypes.UUIDV1,
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    stripe_customer_id: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Review);
        User.hasMany(models.Order);
        User.hasMany(models.OrderDetail);
        User.hasMany(models.CartItem);
        User.hasMany(models.Receipt);
      },
    },
  });


  //
  // Insert seed users
  // Insert admin user

  // const bcrypt = require('bcrypt');
  // const users = require('../seeders/users');

  // sequelize.sync().then(() => {
  //   User.findAndCountAll()
  //     .then((result) => {
  //       if (!result || result.count === 0) {
  //         if (process.env.ADMIN_EMAIL &&
  //             process.env.ADMIN_FNAME &&
  //             process.env.ADMIN_LNAME &&
  //             process.env.ADMIN_PASSWORD) {
  //           const hashed = bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(10));
  //           User.create({
  //             first_name: process.env.ADMIN_FNAME,
  //             last_name: process.env.ADMIN_LNAME,
  //             email: process.env.ADMIN_EMAIL,
  //             password: hashed,
  //             is_admin: true,
  //           });
  //         }

  //         for (let i = 0; i < users.length; i++) {
  //           const salt = bcrypt.genSaltSync(10);
  //           const hash = bcrypt.hashSync(users[i].password, salt);

  //           User.create({
  //             first_name: users[i].first_name,
  //             last_name: users[i].last_name,
  //             email: users[i].email,
  //             password: hash,
  //             is_admin: false,
  //           });
  //         }
  //       }
  //     });
  // }).catch((e) => {
  //   console.log('ERROR SYNCING WITH DB: ', e);
  // });
  //
  return User;
};
