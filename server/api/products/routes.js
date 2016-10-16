const router = require('express').Router();
const controller = require('./controller');

router.route('/')
  .get(controller.getAllProducts);

router.route('/:product_id')
  .get(controller.getSingleProduct);

module.exports = router;
