// const path = require('path');
const express = require('express');
const routes = require('./server/routes/routes');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const compression = require('compression');
// const helmet = require('helmet');
// const cors = require('cors');

// Database
// const pg = require('pg');
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('postgres://hagio:password@localhost:5432/postpg', {
//   dialect: 'postgres',
//   port: 5432,
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.log('Unable to connect to the database:', err);
//   });

// const Product = sequelize.define('products', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   name: {
//     type: Sequelize.STRING
//   },
//   price: {
//     type: Sequelize.FLOAT
//   },
//   description: {
//     type: Sequelize.STRING
//   }
// });

// const User = sequelize.define('users', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   username: {
//     type: Sequelize.STRING
//   },
//   email: {
//     type: Sequelize.STRING
//   },
//   password: {
//     type: Sequelize.STRING
//   },
//   first_name: {
//     type: Sequelize.STRING
//   },
//   last_name: {
//     type: Sequelize.STRING
//   },
//   address: {
//     type: Sequelize.STRING
//   },
//   photo_url: {
//     type: Sequelize.STRING
//   },
//   phone: {
//     type: Sequelize.STRING
//   }
// });

// const Review = sequelize.define('reviews', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   product_id: {
//     type: Sequelize.STRING
//   },
//   user_id: {
//     type: Sequelize.STRING
//   },
//   body: {
//     type: Sequelize.STRING
//   },
//   rating: {
//     type: Sequelize.INTEGER
//   }
// });

// sequelize.sync().then(() => {
//   Todo.create({
//     text: 'Hello PG!!!'
//   });
// }).catch((e) => {
//   console.log('ERROR SYNCING WITH DB', e);
// });

// Setting
const app = express();

app.set('port', process.env.PORT || 8000);

// Middlewares setup
require('./server/config/middlewares')(app);

// Routes
app.use('/', routes);

// app.route('/api/products')
//   .get((req, res) => {
//     Product.findAll()
//     .then((products) => {
//       return res.json(products);
//     })
//     .catch((err) => {
//       return res.json({ error: err.message });
//     });
//   });

// app.route('/api/admin/products')
//   .post((req, res) => {
//     const productObject = {
//       name: req.body.name,
//       price: req.body.price,
//       description: req.body.description
//     };

//     // TODO: Check if Admin and if the product is already in database (same name)
//     // Validate the inputs
//     Product.create(productObject).then((data) => {
//       return res.json(data);
//     }).catch((err) => {
//       console.error('Error on post: ', err);
//       return res.json({ error: err.message });
//     });
//   });

// app.route('/api/admin/products/:product_id')
  // .put((req, res) => {
  //   // TODO: Check admin, inputs, params

  //   Product.findById(req.params.product_id)
  //   .then((product) => {
  //     const projectData = {
  //       name: req.body.name || product.name,
  //       price: req.body.price || product.price,
  //       description: req.body.description || product.description
  //     };

  //     product.update(projectData)
  //     .then((data) => {
  //       return res.json(data);
  //     }) 
  //     .catch((error) => {
  //       console.error('Error on update: ', error);
  //       return res.json({ error: error.message });
  //     });

  //   })
  //   .catch((err) => {
  //     console.error('Error on finding a product: ', err);
  //     return res.json({ error: err.message });
  //   });
  // })
  // .delete((req, res) => {
  //   // TODO: Check admin, inputs, params
  //   Product.findById(req.params.product_id)
  //   .then((product) => {
  //     product.destroy()
  //     .then((data) => {
  //       return res.json(data);
  //     }) 
  //     .catch((error) => {
  //       console.error('Error on delete: ', error);
  //       return res.json({ error: error.message });
  //     });
  //   })
  //   .catch((err) => {
  //     console.error('Error on finding a product: ', err);
  //     return res.json({ error: err.message });
  //   });
  // });

// const app = require('./server/server');
// const config = require('./server/config/config');

// Start listening
app.listen(app.get('port'), () => {
  console.log('Sever started http://localhost:%s', app.get('port'));
});
