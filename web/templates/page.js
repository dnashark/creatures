const routes = require('../routes');

/** @returns {string} */
module.exports = function(bodyContent, loggedIn) {
  const pageContent =
    '<!doctype html>' +
    '<html>' +
      '<head>' +
        '<title>Companion Creatures</title>' +
      '</head>' +
      '<body>' +
        (loggedIn ? '<div><a href="' + routes.get.LOGOUT + '">Log out</a></div>' : '') +
        bodyContent +
      '</body>' +
    '</html>';
  return pageContent;
};
