const PlayerModel = require('../models/player');
const transaction = require('../models/transaction');

module.exports = async function transactionCompleter(req, res, next) {
  if (req.player && req.player.transaction) {
    try {
      await transaction.ensure(req.player.transaction);
      req.player.transaction = null;
      await req.player.save();
    } catch (err) {
      res.status(500).end();
      return;
    }
  }

  next();
}
