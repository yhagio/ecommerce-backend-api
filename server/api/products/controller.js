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
 *  with corresponding reviews
 */
exports.getSingleProduct = (req, res) => {
  // console.log('\n\n USER ===>', req.user);
  // console.log('\n\n getSingleProduct \n\n', req.params.id);
  const getProductInfo = Product.findById(req.params.id);

  const getProductReviews = getProductInfo.then((product) => {
    return Review.findAll({
      where: {
        product_id: product.id,
      },
    });
  });

  Promise.all([
    getProductInfo,
    getProductReviews,
  ])
  .then((result) => {
    // console.log('###### Product #\n\n', result[0]);
    // console.log('###### Reviews #\n\n', result[1][0]);
    const product = result[0];
    const reviews = result[1];

    const productWithReviews = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      reviews, // Additional field
    };

    // If user is logged-in, check if the user purchased this product
    // and if purchased this, add a field "purchased: true"
    // In client, it can displays the product review form if the user
    // purchased the product.
    if (req.user && req.user.id) {
      Receipt.findAll({
        where: {
          product_id: product.id,
          user_id: req.user.id,
        },
      })
      .then((receipts) => {
        // console.log('\n===RECEIPTS\n', req.user);
        if (receipts[0] && receipts[0].user_id) {
          const productWithReviewsPurchased = Object.assign(
            productWithReviews, { 
              purchased: true,
              authedId: req.user.id,
            }
          );
          return res.json(productWithReviewsPurchased);
        } else {
          return res.json(productWithReviews);
        }
      })
      .catch((error) => {
        // console.log('----Product Receipt error!---\n', error);
        return res.status(400).send("Couldn't verify that you purchased it.");
      });
    // If user is not logged-in
    // just return product with reviews
    } else {
      // console.log('----Product + Reviews ONLY !---\n');
      return res.json(productWithReviews);
    }
  })
  .catch((err) => {
    // console.log('$$$$ ERR $$$\n\n', err);
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
    return res.status(400).send('Could not retrieve receipts.');
  });
};

exports.submitReview = (req, res) => {
  Review.findAll({
    where: {
      product_id: req.params.id,
      user_id: req.user.id,
    },
  })
  .then((reviews) => {
    // console.log("********\n\n", reviews);
    if (reviews && reviews[0]) {
      return res.status(403).send('Already wrote a review before.');
    } else {
      Review.create({
        user_id: req.user.id,
        product_id: req.params.id,
        body: req.body.body,
        rating: parseInt(req.body.rating, 10),
      })
      .then((result) => {
        // console.log('== Successfully saved review \n\n', result);
        return res.json(result);
      })
      .catch((error) => {
        return res.status(400).send('Could not save your review.');
      });
    }
  })
  .catch((err) => {
    return res.status(400).send('Could not submit your review.');
  });
};

exports.deleteReview = (req, res) => {
  // console.log('REVIEW USER====>\n', req.user);
  Review.destroy({
    where: {
      product_id: req.params.id,
      user_id: req.user.id,
    },
  })
  .then(() => {
    // console.log("********\n\n", reviews);
    return res.status(200).send('Successfully deleted your review.');
  })
  .catch((err) => {
    return res.status(400).send('Could not delete your review.');
  });
};
