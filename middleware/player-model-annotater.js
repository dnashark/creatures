const PlayerModel = require('../models/player');
const controllers = require('../controllers');

module.exports = async function(req, res, next) {
  if (req.path.startsWith('/game/')) {
    try {
      req.player = await PlayerModel.findById(req.gameSession.playerId);
    } catch (err) {
      console.log('Error obtaining player: ' + err);
    }

    if (!req.player) {
      req.gameSession.logout();
      res.redirect(controllers.LOGIN.path);
      return;
    }
  }

  next();
}