const Template = require('../../framework/template');
const controllers = require('../../controllers');

const CONTENT = new Template(
  '<body style="margin: 0">' +
    '<iframe style="height: 100%; width: 100%; border: 0; margin: 0;" src="' + controllers.MAP.path + '"></iframe>' +
  '</body>'
);

module.exports = function handleRequest(req, res) {
  res.send(CONTENT.apply({}));
};
