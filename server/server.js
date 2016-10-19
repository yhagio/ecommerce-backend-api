const express = require('express');

const app = express();
const api = require('./api/api');
const auth = require('./auth/routes');

// Middlewares setup
require('./middlewares')(app);

// Routes
app.use('/api', api);
app.use('/auth', auth);

module.exports = app;
