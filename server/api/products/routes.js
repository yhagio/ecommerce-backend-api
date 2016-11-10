const router = require('express').Router();
const controller = require('./controller');

router.route('/')
  .get(controller.getAllProducts);

router.route('/:id')
  .get(controller.getSingleProduct);

module.exports = router;
