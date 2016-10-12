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

const Todo = sequelize.define('todos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: Sequelize.STRING
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
app.route('/api/todos')
  .get((req, res) => {
    Todo.findAll().then((todos) => {
      res.json(todos);
    });
  });

// Start listening
app.listen(app.get('port'), () => {
  console.log('Sever started http://localhost:%s', app.get('port'));
});
