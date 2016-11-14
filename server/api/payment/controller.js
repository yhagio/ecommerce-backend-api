const Model = require('../../../models');
const User = Model.User;
const Receipt = Model.Receipt;
const CartItem = Model.CartItem;

const stripe = require('stripe')(process.env.STRIPE_API_KEY);

/*
  Create a customer (if this is the first timer)
  Charge the card for each product
  Create the receipt for each product
*/
exports.payTotal = (req, res) => {
  if (!req.user) {
    return res.status(403).send({ error: 'Not authorized.' });
  }

  const token = req.body.token;
  const purchaseList = req.body.purchaseList;

  // CHECK IF THE USER PAID BEFORE

  /*****************************
   *  WHEN EXISTING CUSTOMER (PURCHASED BEFORE) PAYS
   *****************************/
  // console.log('=================\n\n', purchaseList);
  if (req.user.stripe_customer_id) {
    // 1. Payment
    const handleEachItem = (list) => {
      const promises = list.map((item) => {
        return stripe.charges.create({
          amount: item.product_price * 100, // Amount in cents
          currency: 'cad',
          customer: req.user.stripe_customer_id,
          description: item.product_name,
        })
        .then((charge) => {
          // 2. Save each charge to Purchase Hisotry
          return Receipt.create({
            user_id: req.user.id,
            product_id: item.product_id,
            stripe_charge_id: charge.id,
            stripe_customer_id: req.user.stripe_customer_id,
            price: item.product_price,
            description: item.product_name,
          });
        });
      });
      return Promise.all(promises);
    };

    // Handle charge + create receipt for each cart item
    handleEachItem(purchaseList)
    .then((result) => {
      // 3. Empty the cart after successfully paid
      return CartItem.destroy({
        where: {
          user_id: req.user.id,
        },
      });
    })
    .then(data => res.sendStatus(200))
    .catch(error => res.status(400).send(error));

  /*****************************
   *  WHEN NEW CUSTOMER PAYS
   *****************************/
  } else {
    // 1. New user setup
    let customerId;

    const handleNewCustomer = () => {
      return stripe.customers.create({
        source: token,
        description: 'Lovely ECommerce Customer',
        email: req.user.email,
      }).then((customer) => {
        req.user.stripe_customer_id = customer.id;
        customerId = customer.id;
        return User.update(
          {
            stripe_customer_id: customer.id
          }, {
            where: { id: req.user.id }
          });
      });
    };

    // 2. handle paymeny and purchase history
    const handlePurchaseAndReceipt = (list) => {
      const promises = list.map((item) => {
        return stripe.charges.create({
          amount: item.product_price * 100, // Amount in cents
          currency: 'cad',
          customer: req.user.stripe_customer_id,
          description: item.product_name,
        })
        .then((charge) => {
          // 2. Save each charge to Purchase Hisotry
          return Receipt.create({
            user_id: req.user.id,
            product_id: item.product_id,
            stripe_charge_id: charge.id,
            stripe_customer_id: req.user.stripe_customer_id || customerId,
            price: item.product_price,
            description: item.product_name,
          });
        });
      });
      return Promise.all(promises);
    };

    handleNewCustomer()
    .then((user) => {
    // Handle charge + create receipt for each cart item
      return handlePurchaseAndReceipt(purchaseList)
      .then((result) => {
        // 3. Empty the cart after successfully paid
        return CartItem.destroy({
          where: {
            user_id: req.user.id,
          },
        });
      })
      .then(data => res.sendStatus(200))
      .catch(error => res.status(400).send(error));
    })
    .catch(err => res.status(400).send('Payment failed.'));
  }
};
