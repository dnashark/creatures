const accountCreationView = require('../views/account-creation');

module.exports = {
  path: '/accountCreation',
  method: 'GET',
  handle: (req, res) => {
    const model = {
      err: req.query && req.query.err,
      username: req.query && req.query.username,
    };

    res.send(accountCreationView.render(model));
  }
};
