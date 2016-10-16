/*const express = require('express');
const api = require('./server/api/api');
const auth = require('./server/auth/routes');

// Setting
const app = express();

app.set('port', process.env.PORT || 8000);

// Middlewares setup
require('./server/config/middlewares')(app);

// Routes
app.use('/api', api);
app.use('/auth', auth);*/
const app = require('./server/server');
const config = require('./server/config/config');

// Start listening
app.listen(config.port, () => {
  console.log('Sever started http://localhost:%s', config.port);
});
