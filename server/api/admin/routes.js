const router = require('express').Router();
const controller = require('./controller');
const auth = require('../../auth/auth');

const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.route('/products/')
  .post(checkUser, controller.createProduct);

router.route('/products/:product_id')
  .put(checkUser, controller.updateProduct)
  .delete(checkUser, controller.deleteProduct);

module.exports = router;

