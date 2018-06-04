const controllers = require('../controllers');

const LOGGED_IN_WHITELIST = new Set([
  controllers.PLAY.path,
  controllers.LOGOUT.path,
]);

const LOGGED_OUT_WHITELIST = new Set([
  controllers.CREATE_ACCOUNT.path,
  controllers.LOGIN.path,
]);

module.exports = function(req, res, next) {
  if (req.path.startsWith('/game/')) {
    if (!req.gameSession.isLoggedIn) {
      res.status(404).end();
    } else {
      next();
    } 
  } else if (req.gameSession.isLoggedIn && !LOGGED_IN_WHITELIST.has(req.path)) {
    res.redirect(controllers.PLAY.path);
  } else if (!req.gameSession.isLoggedIn && !LOGGED_OUT_WHITELIST.has(req.path)) {
    res.redirect(controllers.LOGIN.path);
  } else {
    next();
  }
};
