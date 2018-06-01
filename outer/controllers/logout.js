const Controller = require('../../framework/controller');
const loginController = require('./login');

const PATH = '/logout';

function handleRequest(req, res) {
  req.gameSession.logout();
  res.redirect(loginController.path);
}

module.exports = new Controller(PATH, handleRequest);
