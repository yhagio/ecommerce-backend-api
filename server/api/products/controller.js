const Product = require('../../../models').Product;

exports.getAllProducts = (req, res) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch((err) => {
      console.log('Products err!', err);
      return res.status(400).send({ error: err.message });
    });
};

exports.getSingleProduct = (req, res) => {
  Product.findById(req.params.product_id)
    .then(product => res.json(product))
    .catch((err) => {
      console.log('Product fetching err!', err);
      return res.status(400).send({ error: err.message });
    });
};

exports.addProductToCart = (req, res) => {
  Product.findById(req.params.product_id)
    .then((product) => {
      Cart
    })
    .catch((err) => {
      console.log('Product fetching err!', err);
      return res.status(400).send({ error: err.message });
    });
};

