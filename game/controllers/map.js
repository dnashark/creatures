const Template = require('../../framework/template');
const outerControllers = require('../../outer/controllers');

const CONTENT = new Template(
  '<a href="' + outerControllers.LOGOUT.path + '" target="_parent">Log out</a>'
);

module.exports = function handleRequest(req, res) {
  res.send(CONTENT.apply({}));
};
