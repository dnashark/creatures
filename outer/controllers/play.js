const Template = require('../../framework/template');
const gameControllers = require('../../game/controllers');

const CONTENT = new Template(
  '<body style="margin: 0">' +
    '<iframe style="height: 100%; width: 100%; border: 0; margin: 0;" src="' + gameControllers.MAP.path + '"></iframe>' +
  '</body>'
);

module.exports = function handleRequest(req, res) {
  res.send(CONTENT.apply({}));
};
