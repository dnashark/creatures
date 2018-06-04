const Template = require('../../framework/template');
const outerControllers = require('../../outer/controllers');
const gameControllers = require('../controllers');

const CONTENT = new Template(
  '<p><a href="' + outerControllers.LOGOUT.path + '" target="_parent">Log out</a></p>' +
  '<ul>' +
    '<li><a href="' + gameControllers.FARM_TOWN.path + '">Go to Farm Town</a></li>' +
  '</ul>'
);

module.exports = function handleRequest(req, res) {
  res.send(CONTENT.apply({}));
};
