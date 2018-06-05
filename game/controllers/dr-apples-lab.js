const controllers = require('../../controllers');
const template = require('../../framework/template');

const CONTENT = new template.FileTemplate(require.resolve('../views/dr-apples-lab.html'));

module.exports = function(req, res) {
  res.send(CONTENT.apply());
};
