const Router = require('express').Router();
const Product = require('../models').products;
// const User = require('../database').User;
// const Review = require('../database').Review;
const productsController = require('../controllers/products');

Router.route('/api/products')
  .get(productsController.getAllProducts);

Router.route('/api/admin/products')
  .post(productsController.createProduct);

Router.route('/api/admin/products/:product_id')
  .put(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = Router;
