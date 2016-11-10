const router = require('express').Router();
const controller = require('./controller');

const auth = require('../../auth/auth');

const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.route('/')
  .get(checkUser, controller.getCart)
  .post(checkUser, controller.addToCart);

module.exports = router;