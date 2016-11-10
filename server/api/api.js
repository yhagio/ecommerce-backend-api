const router = require('express').Router();

// api router will mount other routers for all our resources
router.use('/products', require('./products/routes'));
router.use('/users', require('./users/routes'));
router.use('/cart', require('./cart/routes'));
router.use('/admin', require('./admin/routes'));

module.exports = router;