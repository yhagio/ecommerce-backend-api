const Product = require('../../../models').Product;
const Receipt = require('../../../models').Receipt;
const Review = require('../../../models').Review;

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
      // console.log(' ++++ ++++ ++++ ', product)
      // console.log('User: ', req.user.id)
      // If logged-in, check if the user purchased this product
      // return the product with additional field (purchased: true)
      // Also, attach product's reviews
      Review.findAll({
        where: {
          product_id: product.id,
        },
      })
      .then((reviews) => {
        // console.log('===== REVIEWS ====\n\n', reviews);
        const productWithReviews = {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          reviews, // Add new field!
        };

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
              const productWithReviewsPurchased = Object.assign(productWithReviews, { purchased: true });
              return res.json(productWithReviewsPurchased);
              // return res.json({
              //   id: product.id,
              //   name: product.name,
              //   price: product.price,
              //   description: product.description,
              //   purchased: true, // Add new field!
              // });
            } else {
              return res.json(productWithReviews);
            }
          })
          .catch((error) => {
            console.log('----Product Receipt error!---\n', error);
            return res.status(400).send("Couldn't verify that you purchased it.");
          });
        // If user does not purchase this, just return product
        } else {
          console.log('----Product + Reviews ONLY !---\n');
          return res.json(productWithReviews);
        }
      })
      .catch((reviewErr) => {
        console.log('----Reviews ERROR !---\n', reviewErr);
        return res.status(400).send('Could not get the reviews.');
      });
    })
    .catch((err) => {
      console.log('\n<<<Product fetching err>>\n', err);
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

exports.submitReview = (req, res) => {
  console.log('REVIEW USER====>\n', req.user)
  console.log('REVIEW BODY====>\n', req.body)
}

exports.deleteReview = (req, res) => {
  console.log('REVIEW USER====>\n', req.user)
  console.log('REVIEW BODY====>\n', req.body)
}