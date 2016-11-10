const router = require('express').Router();
const controller = require('./controller');

const auth = require('../../auth/auth');

const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.route('/')
  .post(checkUser, controller.payTotal);

module.exports = router;