const pageTemplate = require('../templates/page');
const routes = require('../routes');
const error = require('../enums/log-in-errors');

const basePageContent =
  '<h1>Log into an account.</h1>' +
  '<form action="' + routes.post.LOGIN + '" method="POST">' +
    'Username: <input type="text" name="username">' +
    'Password: <input type="password" name="password">' +
    '<input type="submit" value="Log In">' +
  '</form>';

/** @returns {string} */
function render(model) {
  let pageContent = basePageContent;
  if (model.err) {
    switch (model.err) {
      case error.WRONG_USERNAME_OR_PASSWORD:
        pageContent += '<h2>Incorrect username or password.</h2>';
        break;
      case error.UNKNOWN:
        pageContent += '<h2>Error logging into account. Please try again later.</h2>'
        break;
    }
  }

  return pageTemplate(pageContent, model.err);
}

module.exports = {
  render,
};
