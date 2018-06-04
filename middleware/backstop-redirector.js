const outerControllers = require('../outer/controllers');
const gameControllers = require('../game/controllers');

module.exports = function(req, res) {
  if (req.path.startsWith('/game/')) {
    res.redirect(gameControllers.MAP.path);
  } else if (req.gameSession.isLoggedIn) {
    res.redirect(outerControllers.PLAY.path);
  } else {
    res.redirect(outerControllers.LOGIN.path);
  }
};
