const controllers = require('../controllers');

module.exports = function(req, res, next) {
  if (req.path.startsWith('/game/')) {
    if (req.player.activeChoice && req.path != controllers.CHOICE.path) {
      res.redirect(controllers.CHOICE.path);
    } else if (req.player.activeBattle && req.path != controllers.BATTLE.path) {
      res.redirect(controllers.BATTLE.path);
    } else {
      next();
    }
  } else {
    next();
  }
}