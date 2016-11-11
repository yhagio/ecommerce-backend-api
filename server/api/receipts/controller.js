const Receipt = require('../../../models').Receipt;

exports.getReceipts = (req, res) => {
  Receipt.findAll({
    where: {
      user_id: req.user.id,
    },
  })
  .then((receipts) => {
    if (receipts.length === 0) {
      return res.status(400).send('No receipts');
    }
    return res.json(receipts);
  })
  .catch((err) => {
    console.log('Receipts err!', err);
    return res.status(400).send({ error: err.message });
  });
};
