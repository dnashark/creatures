const pageTemplate = require('../templates/page');
const routes = require('../routes');

const content =
  '<p>' +
    'Welcome to the world of monster training. This world is inhabited by monsters that can' +
    'be caught, trained, and battled against each other.' +
  '</p>' +
  '<p>Please pick your starter monster:</p>' +
  '<form action="' + routes.post.CHOOSE_STARTER + '" method="POST">' +
    '<input type="hidden" value="firell" name="monster">' +
    '<input type="submit" value="firell">' +
  '</form>' +
  '<form action="' + routes.post.CHOOSE_STARTER + '" method="POST">' +
    '<input type="hidden" value="acornela" name="monster">' +
    '<input type="submit" value="acornela">' +
  '</form>' +
  '<form action="' + routes.post.CHOOSE_STARTER + '" method="POST">' +
    '<input type="hidden" value="squake" name="monster">' +
    '<input type="submit" value="squake">' +
  '</form>';

exports.render = function() {
  return pageTemplate(content, true);
}