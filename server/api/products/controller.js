const Product = require('../../../models').Product;
const Receipt = require('../../../models').Receipt;

exports.getAllProducts = (req, res) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch((err) => {
      console.log('Products err!', err);
      return res.status(400).send({ error: err.message });
    });
};

exports.getSingleProduct = (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch((err) => {
      console.log('Product fetching err!', err);
      return res.status(400).send({ error: err.message });
    });
};

// Purchased verified user of the product
// can access to this product read page
exports.getPurchasedroduct = (req, res) => {
  // 1. check to see if the user ID is in the product receipt
  // 2. if user id is found in the product's receipt then OK
  // console.log('>>>>>>>>>>>>>>> \n', req.params.id, req.user.id)
  Receipt.findAll({
    where: {
      product_id: req.params.id,
      user_id: req.user.id,
    },
  })
  .then((receipt) => {
    if (receipt.length > 0) {
      // console.log('<><><><><><>Receipt: \n\n', receipt[0]);
      return res.json(receipt[0]);
      // TODO: Give user downloadable link or readable page, etc
      // At the moment, just display a message that user purchased it
    }
    return res.status(403).send('No purcahsed product!');
  })
  .catch((err) => {
    // console.log('<><><><><><>ERROR RECEIPT: \n\n', err);
    return res.status(400).send({ error: err.message });
  });
};
