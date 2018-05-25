const routes = require('../routes');

module.exports = function(req, res) {
  req.session = null;
  res.redirect(routes.get.HOME_PAGE);
};
