const controllers = require('../controllers');

module.exports = function handleRequest(req, res) {
  req.gameSession.logout();
  res.redirect(controllers.LOGIN.path);
}
