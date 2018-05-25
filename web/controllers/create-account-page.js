const accountCreationView = require('../views/create-account-page');

module.exports = function(req, res) {
  res.send(
    accountCreationView.render({
      err: req.query && req.query.err,
      username: req.query && req.query.username,
    }));
};
