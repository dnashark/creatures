const starterPageView = require('../views/starter-page');

module.exports = function(req, res) {
  res.send(starterPageView.render());
};
