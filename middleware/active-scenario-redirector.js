const controllers = require('../controllers');

module.exports = function(req, res, next) {
  if (req.path.startsWith('/game/') && req.player.activeChoice && req.path != controllers.CHOICE.path) {
    res.redirect(controllers.CHOICE.path);
  } else {
    next();
  }
}