const router = require('express').Router();
const controller = require('./controller');

router.route('/')
  .post(controller.saveUser);

router.route('/:user_id')
  .get(controller.getSingleUser);

module.exports = router;