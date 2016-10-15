const express = require('express');
const routes = require('./server/routes/routes');

// Setting
const app = express();

app.set('port', process.env.PORT || 8000);

// Middlewares setup
require('./server/config/middlewares')(app);

// Routes
app.use('/', routes);

// Start listening
app.listen(app.get('port'), () => {
  console.log('Sever started http://localhost:%s', app.get('port'));
});
