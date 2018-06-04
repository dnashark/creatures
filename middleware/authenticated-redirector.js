const outerControllers = require('../outer/controllers');
const gameControllers = require('../game/controllers');

const LOGGED_IN_WHITELIST = new Set([
  outerControllers.PLAY.path,
  outerControllers.LOGOUT.path,
]);

const LOGGED_OUT_WHITELIST = new Set([
  outerControllers.CREATE_ACCOUNT.path,
  outerControllers.LOGIN.path,
]);

module.exports = function(req, res, next) {
  if (req.path.startsWith('/game/')) {
    if (!req.gameSession.isLoggedIn) {
      res.status(404).end();
    } else {
      next();
    } 
  } else if (req.gameSession.isLoggedIn && !LOGGED_IN_WHITELIST.has(req.path)) {
    res.redirect(outerControllers.PLAY.path);
  } else if (!req.gameSession.isLoggedIn && !LOGGED_OUT_WHITELIST.has(req.path)) {
    res.redirect(outerControllers.LOGIN.path);
  } else {
    next();
  }
};
