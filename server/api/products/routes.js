const router = require('express').Router();
const controller = require('./controller');

const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.route('/')
  .get(controller.getAllProducts);

router.route('/:id')
  .get(controller.getSingleProduct);

router.route('/:id/purchased')
  .get(checkUser, controller.getPurchasedroduct);

module.exports = router;
