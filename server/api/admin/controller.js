const Product = require('../../models').products;

exports.createProduct = (req, res) => {
  const name = req.body.name ? req.body.name.trim() : '';
  const description = req.body.description ? req.body.description.trim() : '';
  const price = parseFloat((Math.round(req.body.price * 100) / 100).toFixed(2));

  if (!name || !description || typeof price !== 'number') {
    return res
      .status(400)
      .send({ error: 'All inputs are required.' });
  }

  const productObject = {
    name,
    price,
    description,
  };

  // TODO: Check if Admin and if the product is already in database (same name)
  // Validate the inputs
  Product.create(productObject)
    .then(data => res.json(data))
    .catch((err) => {
      console.error('Error on post: ', err);
      return res.status(400).send({ error: err.message });
    });
};

exports.updateProduct = (req, res) => {
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
          return res.status(400).send({ error: err.message });
        });
    })
    .catch((err) => {
      console.error('Error on finding a product: ', err);
      return res.status(400).send({ error: err.message });
      // return res.json({ error: err.message });
    });
};

exports.deleteProduct = (req, res) => {
  // TODO: Check admin, inputs, params
  
  Product.findById(req.params.product_id)
    .then((product) => {
      product.destroy()
        .then(data => res.json(data))
        .catch((error) => {
          console.error('Error on delete: ', error);
          return res.status(400).send({ error: err.message });
        });
    })
    .catch((err) => {
      console.error('Error on finding a product: ', err);
      return res.status(400).send({ error: err.message });
    });
};
