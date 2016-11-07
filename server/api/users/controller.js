const bcrypt = require('bcrypt');

const User = require('../../../models').User;
const signToken = require('../../auth/auth').signToken;
const validatePassword = require('../../utils/helpers').validatePassword;
const validateEmail = require('../../utils/helpers').validateEmail;

/**
 * saveUser: Create new user on signup
 * getSingleUser: Retrieve one user
 */

exports.saveUser = (req, res) => {
  const first_name = req.body.first_name ? req.body.first_name.trim() : '';
  const last_name = req.body.last_name ? req.body.last_name.trim() : '';
  const email = req.body.email ? req.body.email.trim() : '';
  const password = req.body.password ? req.body.password.trim() : '';

  if (!first_name || !last_name || !email || !password) {
    return res
      .status(400)
      .send({ error: 'All inputs are required.' });
  }

  if (first_name.length > 30 || last_name.length > 30) {
    return res
      .status(400)
      .send({ error: 'First and last names must be less than 30 characters.' });
  }

  const emailValidationError = validateEmail(email);
  if (emailValidationError.length > 0) {
    return res
      .status(400)
      .send({ error: emailValidationError }); // array of errors
  }

  const passwordValidationError = validatePassword(password);
  if (passwordValidationError.length > 0) {
    return res
      .status(400)
      .send({ error: passwordValidationError });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res
        .status(400)
        .send({ error: 'The email is already registered.' });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = {
        first_name,
        last_name,
        email,
        password: hash,
        is_admin: false,
      };

      User.create(newUser)
        .then((data) => {
          return res.json({
            token: signToken(data.id),
            user: {
              id: data.id,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
            },
          });
        })
        .catch((err) => {
          console.error('Error on saving user: ', err);
          return res.status(400).send({ error: err.message });
        });
    })
    .catch((err) => {
      return res.status(400).send({ error: err.message });
    });
};

exports.getSingleUser = (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        // if no user is found it was not
        // it was a valid JWT but didn't decode
        // to a real user in our DB. Either the user was deleted
        // since the client got the JWT, or
        // it was a JWT from some other source
        return res.status(401).send({ error: 'Unauthorized' });
      }
      // update req.user with fresh user from
      // stale token data & never send password back!
      return res.json({
        first_name: user.first_name,
        last_name: user.last_name,
        photo_url: user.photo_url,
        address: user.address,
        phone: user.phone,
        email: user.email,
      });
    })
    .catch((err) => {
      console.log('getSignedInUserData err!', err);
      return res.status(400).send({ error: err.message });
    });
};


