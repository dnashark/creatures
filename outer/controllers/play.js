const Controller = require('../../framework/controller');
const Template = require('../../framework/template');
const loginController = require('./login');
const logoutController = require('./logout');

const PATH = '/play';

const CONTENT = new Template(
  'Game page' +
  '<div><a href="' + logoutController.path + '">Log out</a></div>'
);

function handleRequest(req, res) {
  if (req.gameSession.isLoggedIn) {
    res.send(CONTENT.apply({}));
  } else {
    res.redirect(loginController.path);
  }
}

module.exports = new Controller(PATH, handleRequest);
