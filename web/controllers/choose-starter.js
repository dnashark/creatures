const PlayerModel = require('../../models/player');

const routes = require('../routes');

module.exports = async function(req, res) {
  await PlayerModel.update({_id: req.player._id}, {scenario: null});
  res.redirect(routes.get.BASE_PAGE);
};
