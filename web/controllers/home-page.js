const homePageView = require('../views/home-page');

module.exports = function(req, res) {
  res.send(homePageView.render());
};
