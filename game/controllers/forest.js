const battleController = require('./battle');

module.exports = async function(req, res) {
  req.player.activeBattle = {};
  await req.player.save();
  res.send(battleController.content.apply());
};
