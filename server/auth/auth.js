const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const bcrypt = require('bcrypt');

const config = require('../config');
const checkToken = expressJwt({ secret: config.secrets.jwt });
const User = require('../../models').User;

// Decode user's token
exports.decodeToken = () => {
  return (req, res, next) => {
    // [OPTIONAL]
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    // console.log('req.query:', req.query);
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }
    // this will call next if token is valid
    // and send error if it is not. It will attached
    // the decoded token to req.user
    checkToken(req, res, next);
  };
};

exports.getFreshUser = () => {
  return (req, res, next) => {
    User.findById(req.user.id)
      .then((user) => {
        if (!user) {
          // if no user is found it was not
          // it was a valid JWT but didn't decode
          // to a real user in our DB. Either the user was deleted
          // since the client got the JWT, or
          // it was a JWT from some other source
          // console.log('getFreshUser then')
          res.status(401).send({ error: 'Unauthorized' });
        } else {
          // update req.user with fresh user from
          // stale token data
          req.user = user;
          // console.log('getFreshUser then \n', req.user);
          next();
        }
      })
      .catch((err) => {
        // console.log('getFreshUser catch \n', err);
        next(err);
      });
  };
};

// Authenticate the user
exports.verifyUser = () => {
  return (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // if no email or password then send
    if (!email || !password) {
      res.status(400).send({ error: 'You need a email and password' });
      return;
    }

    // look user up in the DB so we can check
    // if the passwords match for the email
    User.findAll({
      where: {
        email,
      },
    })
    .then((user) => {
      console.log('Finding User:', user);
      if (!user[0]) {
        res.status(401).send({ error: 'No user with the given email' });
      } else {
        // checking the passowords here
        if (!bcrypt.compareSync(password, user[0].password)) {
          res.status(401).send({ error: 'Incorrect password' });
        } else {
          // if everything is good,
          // then attach to req.user
          // and call next so the controller
          // can sign a token from the req.user._id
          req.user = user[0];
          next();
        }
      }
    })
    .catch((err) => {
      next(err);
    });
  };
};

// exports.getSignedInUserData = () => {
//   return (req, res) => {
//     User.findById(req.user.id)
//       .then((user) => {
//         if (!user) {
//           // if no user is found it was not
//           // it was a valid JWT but didn't decode
//           // to a real user in our DB. Either the user was deleted
//           // since the client got the JWT, or
//           // it was a JWT from some other source

//           // res.status(401).send('Unauthorized');
//           return res.json({ error: 'Unauthorized' });
//         }
//           // update req.user with fresh user from
//           // stale token data
//         return res.json({
//           first_name: user.first_name,
//           last_name: user.last_name,
//           photo_url: user.photo_url,
//           address: user.address,
//           phone: user.phone,
//           email: user.email,
//         });
//       })
//       .catch((err) => {
//         console.log('getSignedInUserData err!', err);
//         return res.json({ error: err.message });
//       });
//   };
// };

// Sign token on signup
exports.signToken = (id) => {
  return jwt.sign(
    { id },
    config.secrets.jwt,
    { expiresIn: config.expireTime }
  );
};
