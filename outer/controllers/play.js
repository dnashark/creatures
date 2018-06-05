const controllers = require('../../controllers');
const template = require('../../framework/template');

const CONTENT = new template.FileTemplate(require.resolve('../views/play.html'));

module.exports = function handleRequest(req, res) {
  res.send(CONTENT.apply({}));
};
