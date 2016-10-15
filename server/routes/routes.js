const Router = require('express').Router();
const Product = require('../models').products;
// const User = require('../database').User;
// const Review = require('../database').Review;
const productsController = require('../controllers/products');

Router.route('/api/products')
  .get(productsController.getAllProducts);

Router.route('/api/admin/products')
  .post((req, res) => {
    const productObject = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };

    // TODO: Check if Admin and if the product is already in database (same name)
    // Validate the inputs
    Product.create(productObject).then((data) => {
      return res.json(data);
    }).catch((err) => {
      console.error('Error on post: ', err);
      return res.json({ error: err.message });
    });
  });

Router.route('/api/admin/products/:product_id')
  .put((req, res) => {
    // TODO: Check admin, inputs, params

    Product.findById(req.params.product_id)
    .then((product) => {
      const projectData = {
        name: req.body.name || product.name,
        price: req.body.price || product.price,
        description: req.body.description || product.description,
      };

      product.update(projectData)
      .then(data => res.json(data))
      .catch((error) => {
        console.error('Error on update: ', error);
        return res.json({ error: error.message });
      });
    })
    .catch((err) => {
      console.error('Error on finding a product: ', err);
      return res.json({ error: err.message });
    });
  })
  .delete((req, res) => {
    // TODO: Check admin, inputs, params
    Product.findById(req.params.product_id)
    .then((product) => {
      product.destroy()
      .then(data => res.json(data))
      .catch((error) => {
        console.error('Error on delete: ', error);
        return res.json({ error: error.message });
      });
    })
    .catch((err) => {
      console.error('Error on finding a product: ', err);
      return res.json({ error: err.message });
    });
  });

module.exports = Router;
