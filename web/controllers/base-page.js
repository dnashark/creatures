const basePageView = require('../views/base-page');

module.exports = function(req, res) {
  res.send(basePageView.render());
}