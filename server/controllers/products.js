const Product = require('../models').products;

exports.getAllProducts = (req, res) => {
  console.log('GET PRODUCTS');

  Product.findAll()
  .then(products => res.json(products))
  .catch((err) => {
    console.log('Products err!', err);
    return res.json({ error: err.message });
  });
};
