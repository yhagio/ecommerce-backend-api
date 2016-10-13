const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

// Database
const pg = require('pg');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://hagio:password@localhost:5432/postpg', {
  dialect: 'postgres',
  port: 5432,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

const Product = sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.FLOAT
  },
  description: {
    type: Sequelize.STRING
  }
});

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  photo_url: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  }
});

const Review = sequelize.define('reviews', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: Sequelize.STRING
  },
  user_id: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER
  }
});

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

app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Routes
app.route('/api/products')
  .get((req, res) => {
    Product.findAll().then((products) => {
      res.json(products);
    });

  });

app.route('/api/admin/products')
  .post((req, res) => {
    const productObject = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    };

    Product.create(productObject).then((data) => {
      res.json(data);
    }).catch((err) => {
      console.log('Error on post: ', err);
    });
  });

// Start listening
app.listen(app.get('port'), () => {
  console.log('Sever started http://localhost:%s', app.get('port'));
});
