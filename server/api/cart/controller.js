const Model = require('../../../models');

const CartItem = Model.CartItem;
const Product = Model.Product;

exports.getCart = (req, res) => {
  if (!req.user) {
    return res.status(403).send({ error: 'Not authorized.' });
  }

  // HINT: http://stackoverflow.com/questions/11824501/inner-joining-three-tables
  // SELECT *
  // FROM dbo.tableA A 
  // INNER JOIN dbo.TableB B ON A.common = B.common
  // INNER JOIN dbo.TableC C ON A.common = C.common

  Model.sequelize.query(`
    SELECT * FROM "Products" AS product
    LEFT JOIN "CartItems" AS cart 
    ON product.id = cart.product_id 
    WHERE cart.user_id=` + req.user.id)
    .then(cart => res.json(cart))
    .catch(err => res.status(400).send({ error: err.message }));
};

exports.addToCart = (req, res) => {
  if (!req.user) {
    return res.status(403).send({ error: 'Not authorized.' });
  }

  CartItem.create({
    user_id: req.user.id,
    product_id: req.body.id,
  }).then(data => res.json(data))
    .catch(err => res.status(400).send({ error: err.message }));
};

exports.removeItemFromCart = (req, res) => {
  if (!req.user) {
    return res.status(403).send({ error: 'Not authorized.' });
  }

  CartItem.destroy({
    where: {
      id: req.params.id,
      user_id: req.user.id,
    },
  }).then(() => {
    // Get the updated cart of ther user after deleted one
    Model.sequelize.query(`
      SELECT * FROM "Products" AS product
      LEFT JOIN "CartItems" AS cart 
      ON product.id = cart.product_id 
      WHERE cart.user_id=` + req.user.id)
      .then(cart => res.json(cart))
      .catch(err => res.status(400).send({ error: err.message }));
  }).catch((err) => {
    res.status(400).send({ error: err.message });
  });
};
