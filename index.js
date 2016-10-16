const express = require('express');
const api = require('./server/api/api');
const auth = require('./server/auth/routes');

// Setting
const app = express();

app.set('port', process.env.PORT || 8000);

// Middlewares setup
require('./server/config/middlewares')(app);

// Routes
app.use('/api', api);
app.use('/auth', auth);

// Start listening
app.listen(app.get('port'), () => {
  console.log('Sever started http://localhost:%s', app.get('port'));
});
