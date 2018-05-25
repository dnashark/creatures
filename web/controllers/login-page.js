const accountLoginView = require('../views/login-page');

module.exports = function(req, res) {
  res.send(
    accountLoginView.render({
      err: req.query && req.query.err,
    }));
};
