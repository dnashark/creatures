const loginController = require('../controllers/login');
const playController = require('../controllers/play');

module.exports = function(req, res) {
  if (req.gameSession.isLoggedIn) {
    res.redirect(playController.path);
  } else {
    res.redirect(loginController.path);
  }
};
