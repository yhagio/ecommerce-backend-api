// const User = require('../models').users;
const signToken = require('./auth').signToken;

exports.signin = (req, res) => {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  console.log('exports.signin ', req.user.id);

  const token = signToken(req.user.id);
  res.json({
    token,
    user: {
      username: req.user.username,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      address: req.user.address,
      phone: req.user.phone,
      photo_url: req.user.photo_url,
      email: req.user.email,
    },
  });
};
