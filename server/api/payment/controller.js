const Model = require('../../../models');
const User = Model.User;
const Receipt = Model.Receipt;

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

  // console.log('>>> BODY >>> \n', req.body);

  const token = req.body.token;
  const purchaseList = req.body.purchaseList;

  // CHECK IF THE USER PAID BEFORE

  // WHEN USER EXISTS ALREADY
  if (req.user.stripe_customer_id) {
    console.log('++++++++++ WELCOME BACK\n\n\n');
    // 1. Payment
    // const receipts = [];

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // function chargeItem(item) {
    //   console.log("ITEM=========>\n");
    //   // return new Promise(
    //   return stripe.charges.create({
    //             amount: item.product_price * 100, // Amount in cents
    //             currency: 'cad',
    //             customer: req.user.stripe_customer_id,
    //             description: item.product_name,
    //           })
    //           .then((charge) => {
    //             console.log('CHARGED:::\n');
    //             // TODO: save each charge to Purchase Hisotry
    //             Receipt.create({
    //               user_id: req.user.id,
    //               product_id: item.product_id,
    //               stripe_charge_id: charge.id,
    //               stripe_customer_id: req.user.stripe_customer_id,
    //               price: item.product_price,
    //               description: item.product_name,
    //             })
    //             .then((receipt) => {
    //               console.log('RECEIPT \n');
    //               // receipts.push(receipt);
    //             }).catch((err2) => {
    //               console.log('ERR2 \n', err2);
    //               return res.status(400).send('Payment failed.');
    //             });
    //           })
    //           .catch((err3) => {
    //             console.log('Charge failed \n', err3);
    //             return res.status(400).send('Payment failed.');
    //           });
    //     // );
    // }

    const handleEachItem = (list) => {
      const promises = list.map((item) => {
        return stripe.charges.create({
          amount: item.product_price * 100, // Amount in cents
          currency: 'cad',
          customer: req.user.stripe_customer_id,
          description: item.product_name,
        })
        .then((charge) => {
          console.log('CHARGED:::\n');
          // TODO: save each charge to Purchase Hisotry
          return Receipt.create({
            user_id: req.user.id,
            product_id: item.product_id,
            stripe_charge_id: charge.id,
            stripe_customer_id: req.user.stripe_customer_id,
            price: item.product_price,
            description: item.product_name,
          })
          // .then((receipt) => {
          //   // console.log('CHARGE \n', charge);
          //   // console.log('RECEIPT \n', receipt);
          //   // receipts.push(receipt);
          //   return receipt;
          // }).catch((err2) => {
          //   console.log('ERR2 \n', err2);
          //   return res.status(400).send('Payment failed.');
          // });
        })
        // .catch((err3) => {
        //   console.log('Charge failed \n', err3);
        //   return res.status(400).send('Payment failed.');
        // });
      });
      return Promise.all(promises);
    };

    // Promise.all(purchaseList.forEach(chargeItem))
    handleEachItem(purchaseList)
    .then((result) => {
      console.log('RESULT:\n', result);
      // console.log('Items \n', items);
      // console.log('Charges \n', charges);
      return res.status(200).send(result);
    }).catch((error) => {
      console.log('ERROR PROMISE \n', error);
    });

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    /*
    purchaseList.forEach((item) => {
      stripe.charges.create({
        amount: item.product_price * 100, // Amount in cents
        currency: 'cad',
        customer: req.user.stripe_customer_id,
        description: item.product_name,
      }).then((charge) => {
        // TODO: save each charge to Purchase Hisotry
        Receipt.create({
          user_id: req.user.id,
          product_id: item.product_id,
          stripe_charge_id: charge.id,
          stripe_customer_id: req.user.stripe_customer_id,
          price: item.product_price,
          description: item.product_name,
        }).then((receipt) => {
          receipts.push(receipt);
        }).catch((err2) => {
          console.log('ERR2 \n', err2);
          return res.status(400).send('Payment failed.');
        });

      }).catch((err3) => {
        console.log('Charge failed \n', err3);
        return res.status(400).send('Payment failed.');
      });
    });

    console.log('SAVED receipts \n', receipts);
    return res.status(200).send(receipts);
    */
    // 2. Create Receipt for each product

  // WHEN NEW CUSTOMER PAYS
  } else {
    console.log('++++++++++ NEW USER\n\n\n');
    // 1. Create a customer
    stripe.customers.create({
      source: token,
      description: 'Lovely ECommerce Customer',
      email: req.user.email,
    }).then((customer) => {
      console.log('>>>>> CUSTOMER >>>>\n', customer);

      // TODO: update User to add stripe_customer_id
      if (!req.user.stripe_customer_id) {
        User.update(
          {
            stripe_customer_id: customer.id
          }, {
            where: { id: req.user.id }
          })
          .then((user) => {
            console.log('Updated user', user);
            req.user = user;
          })
          .catch((err1) => {
            return res.status(400).send('Failed to update User.');
          });
      }

      // 2. Charge each product purchase
      // and save Receipt & Purchased
      const receipts = [];

      purchaseList.forEach((item) => {
        stripe.charges.create({
          amount: item.product_price, // Amount in cents
          currency: 'cad',
          customer: customer.id,
          description: item.product_name,
        }).then((charge) => {
          // 3.
          // TODO: save each charge to Purchase Hisotry
          Receipt.create({
            user_id: req.user.id,
            product_id: item.product_id,
            stripe_charge_id: charge.id,
            stripe_customer_id: req.user.stripe_customer_id,
            price: item.product_price,
            description: item.product_name,
          }).then((receipt) => {
            receipts.push(receipt);
          }).catch((err2) => {
            console.log('ERR2 \n', err2);
            return res.status(400).send('Payment failed.');
          });

        }).catch((err3) => {
          console.log('Charge failed \n', err3);
          return res.status(400).send('Payment failed.');
        });
      });

      return receipts;
    }).then((charges) => {
      console.log('>>>>>> CHARGE >>>>>>: \n', charges);

      // 4. Return all receipts for the customer
      // TODO

      // REMOVED later:
      // Just to check: Retrieve invoices
      // stripe.invoices.list({ customer: customerId })
      //   .then((invoices) => {
      //     console.log('>>>>> Invoices >>>> \n', invoices);
      //   })
      //   .catch((invoiceErr) => {
      //     console.log('>>>>> Invoice Err >>> \n', invoiceErr);
      //   });

      return res.status(200).send('Paid successfully.');
    }).catch((err) => {
      console.log('>>>>>> ERROR STRIPE >>>>>>: \n', err);
      return res.status(400).send('Payment failed.');
    });
  }
};
