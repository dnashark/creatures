const pageTemplate = require('../templates/page');
const routes = require('../routes');
const error = require('../enums/account-creation-errors');

const basePageContent =
  '<h1>Create a new account.</h1>' +
  '<form action="' + routes.post.CREATE_ACCOUNT + '" method="POST">' +
    'Username: <input type="text" name="username">' +
    'Password: <input type="password" name="password">' +
    '<input type="submit" value="Create Account">' +
  '</form>';

/** @returns {string} */
function render(model) {
  let pageContent = basePageContent;
  if (model.err) {
    switch (model.err) {
      case error.USERNAME_EXISTS:
        pageContent += '<h2>Username ' + model.username + ' already exists.</h2>';
        break;
      case error.INVALID_USERNAME:
        pageContent += '<h2>Username must be between 3 and 32 characters long, must start' +
                       'with a letter and must only contain alphanumeric characters.</h2>';
        break;
      case error.INVALID_PASSWORD:
        pageContent += '<h2>Password must be at least one character long and no more than 32 characters long.</h2>';
        break;
      case error.UNKNOWN:
        pageContent += '<h2>Error creating account. Please try again later.</h2>'
        break;
    }
  }

  return pageTemplate(pageContent, model.err);
}

module.exports = {
  render,
};