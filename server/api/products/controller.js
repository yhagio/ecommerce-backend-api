const Product = require('../../../models').Product;
const Receipt = require('../../../models').Receipt;

exports.getAllProducts = (req, res) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch((err) => {
      // console.log('Products err!', err);
      return res.status(400).send(err.message);
    });
};

/** Retrieve single product information
 *  Check if user purchased this if logged-in
 *  WIP: with corresponding reviews
 */
exports.getSingleProduct = (req, res) => {
  // console.log('\n\n USER ===>', req.user);
  // console.log('\n\n getSingleProduct \n\n', req.params.id);
  Product.findById(req.params.id)
    .then((product) => {
      // console.log(' ++++ ++++ ++++ ')
      // console.log('User: ', req.user.id)
      // If logged-in, check if the user purchased this product
      // return the product with additional field (purchased: true)
      if (req.user && req.user.id) {
        Receipt.findAll({
          where: {
            product_id: product.id,
            user_id: req.user.id,
          },
        })
        .then((receipts) => {
          // console.log('\n===RECEIPTS\n', receipts);
          if (receipts[0] && receipts[0].user_id) {
            return res.json({
              id: product.id,
              name: product.name,
              price: product.price,
              description: product.description,
              purchased: true, // Add new field!
            });
          }
          return res.json(product);
        })
        .catch((error) => {
          // console.log('----Product Receipt error!---\n', error);
          return res.status(400).send(error.message);
        });
      // If user does not purchase this, just return product
      } else {
        // console.log('=====JUST PRODUCT====');
        return res.json(product);
      }
    })
    .catch((err) => {
      // console.log('\n<<<Product fetching err>>\n', err);
      return res.status(400).send('Could not get the product infomation.');
    });
};

/** Verify that the user purchased the product
 *  if purchased, return the product info
 *  WIP: Give user downloadable link or readable page
 */
exports.getSinglePurchasedProductInfo = (req, res) => {
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
    return res.status(400).send(err.message);
  });
};

