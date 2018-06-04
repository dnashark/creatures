const controllers = require('../controllers');

module.exports = function(req, res) {
  if (req.path.startsWith('/game/')) {
    res.redirect(controllers.MAP.path);
  } else if (req.gameSession.isLoggedIn) {
    res.redirect(controllers.PLAY.path);
  } else {
    res.redirect(controllers.LOGIN.path);
  }
};
