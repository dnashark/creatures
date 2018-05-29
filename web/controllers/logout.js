const routes = require('../routes');
const util = require('../util');

module.exports = function(req, res) {
  util.logout(req);
  res.redirect(routes.get.HOME_PAGE);
};
