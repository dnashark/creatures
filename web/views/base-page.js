const pageTemplate = require('../templates/page');

exports.render = function() {
  return pageTemplate('base page', true);
}