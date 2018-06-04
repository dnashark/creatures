const Template = require('../../framework/template');
const controllers = require('../../controllers');

const CONTENT = new Template(
  '<p><a href="' + controllers.LOGOUT.path + '" target="_parent">Log out</a></p>' +
  '<ul>' +
    '<li><a href="' + controllers.FARM_TOWN.path + '">Go to Farm Town</a></li>' +
  '</ul>'
);

module.exports = function handleRequest(req, res) {
  res.send(CONTENT.apply({}));
};
