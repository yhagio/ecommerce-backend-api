const bcrypt = require('bcrypt');
const Mailgun = require('mailgun-js');

const User = require('../../../models').User;
const Receipt = require('../../../models').Receipt;
const signToken = require('../../auth/auth').signToken;
const validatePassword = require('../../utils/helpers').validatePassword;
const validateEmail = require('../../utils/helpers').validateEmail;
const generatePassword = require('../../utils/helpers').generatePassword;
const generateEmailTemplate = require('../../utils/helpers').generateEmailTemplate;

/**
 * saveUser: Create new user on signup
 * getSingleUser: Retrieve one user
 */

exports.saveUser = (req, res) => {
  const first_name = req.body.firstName ? req.body.firstName.trim() : '';
  const last_name = req.body.lastName ? req.body.lastName.trim() : '';
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

  User.findAll({
    where: { email }
  })
    .then((user) => {
      if (user.length > 0) {
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
          // console.error('Error on saving user: ', err);
          return res.status(400).send({ error: err.message });
        });
    })
    .catch((err) => {
      return res.status(400).send({ error: err.message });
    });
};

// Retrieve the authenticated user
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
      // console.log('>>>>>\n', user)
      Receipt.findAll({
        where: {
          user_id: req.user.id,
        },
      })
      .then((receipts) => {
        if (receipts.length > 0) {
          // console.log('<><><><><><>Receipt: \n\n', receipt[0]);
          const purchasedProductIds = [];
          receipts.forEach((receipt) => {
            purchasedProductIds.push(receipt.product_id);
          });

          return res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            purchasedProductIds,
          });
        }
        
        return res.json({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        });
      })
      .catch((err) => {
        // console.log('<><><><><><>ERROR RECEIPT: \n\n', err);
        return res.status(400).send({ error: err.message });
      });
    })
    .catch((err) => {
      // console.log('getSignedInUserData err!', err);
      return res.status(400).send({ error: err.message });
    });
};

exports.updateUser = (req, res) => {
  const email = req.body.email.trim() || req.user.email;
  const first_name = req.body.first_name.trim() || req.user.first_name;
  const last_name = req.body.last_name.trim() || req.user.last_name;

  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      user.update({ email, first_name, last_name })
        .then((updatedUser) => {
          // console.log('===== UPDATED ===== \n', updatedUser);
          return res.json({
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
          });
        })
        .catch((error) => {
          // console.log('updating user err!', error);
          return res.status(400).send({ error: error.message });
        });
    })
    .catch((err) => {
      // console.log('finding updating user err!', err);
      return res.status(400).send({ error: err.message });
    });
};

exports.sendNewPassword = (req, res) => {
  const email = req.body.email;
  if (email.length === 0 || email.trim().length === 0) {
    return res.status(400).send({ error: 'Eamil required' });
  }

  const newPassword = generatePassword();

  User.findAll({ where: { email } })
    .then((user) => {
      // console.log('USER CHECK', user[0].email, email)
      if (user[0] && user[0].email === email) {
        // Update password and send the new password with mailgun
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        user[0].update({ password: hash })
          .then((updatedUser) => {
            const mailgun = new Mailgun({
              apiKey: process.env.MAILGUN_API_KEY,
              domain: process.env.MAILGUN_DOMAIN,
            });

            const data = {
              from: `ECommerce Admin <postmaster@${process.env.MAILGUN_DOMAIN}>`,
              to: updatedUser.email,
              subject: '[ECommerce Admin] - New Password',
              html: generateEmailTemplate(user.name, newPassword),
            };

            // console.log('NEW PASS: ', newPassword);

            mailgun.messages().send(data)
              .then((result) => {
                // console.log('Mailgun success!!', result);
                return res.status(200).send('Check your email!');
              })
              .catch((err) => {
                // console.log('Mailgun user err!', err);
                return res.status(400).send({ error: err.message });
              });
          })
          .catch((error) => {
            // console.log('User update err!', error);
            return res.status(401).send({ error: 'Unauthorized' });
          });

      } else {
        // console.log('User err!', user);
        return res.status(401).send({ error: 'Unauthorized' });
      }
    })
    .catch((err) => {
      // console.log('finding user err!', err);
      return res.status(400).send({ error: err.message });
    });
};
