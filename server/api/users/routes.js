const router = require('express').Router();
const controller = require('./controller');
const auth = require('../../auth/auth');

const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.route('/')
  .post(controller.saveUser);

router.route('/account')
  .get(checkUser, controller.getSingleUser)
  .put(checkUser, controller.updateUser);

router.route('/reset-password')
  .post(controller.sendNewPassword);

module.exports = router;
