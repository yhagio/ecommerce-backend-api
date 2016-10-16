const router = require('express').Router();
const controller = require('./controller');

// TODO: checkIfAdmin() function

router.route('/products/')
  .post(controller.createProduct);

router.route('/products/:product_id')
  .put(controller.updateProduct)
  .delete(controller.deleteProduct);

module.exports = router;

