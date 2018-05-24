const unauthenticatedView = require('../web/views/unauthenticated');

module.exports = function (req, res, next) {
  if (req.session.userId) {
    req.session.now = Date.now();
    next();
  } else {
    res.send(unauthenticatedView.render());
  }
};
