const router = require('express').Router();
const controller = require('./controller');

router.route('/')
  .post(controller.saveUser);

module.exports = router;