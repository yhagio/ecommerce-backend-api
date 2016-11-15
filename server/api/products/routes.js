const router = require('express').Router();
const controller = require('./controller');

const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.route('/')
  .get(controller.getAllProducts);

router.route('/:id')
  .get(auth.hasJWT(), controller.getSingleProduct);

router.route('/:id/purchased')
  .get(checkUser, controller.getSinglePurchasedProductInfo);

// router.route('/purchased-list')
  // .get(checkUser, controller.getPurchasedList);

router.route('/:id/reviews')
  .post(checkUser, controller.submitReview)
  .delete(checkUser, controller.deleteReview);

module.exports = router;
