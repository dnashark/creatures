const pageTemplate = require('../templates/page');
const routes = require('../routes');

const pageContent =
  '<p>Welcome to Companion Creatures</p>' +
  '<p><a href="' + routes.get.CREATE_ACCOUNT_PAGE + '">Click here to create an account.</a></p>' +
  '<h3>Login:</h3>' +
  '<form action="' + routes.post.LOGIN +'" method="POST">' +
    'Username: <input type="text" name="username">' +
    'Password: <input type="password" name="password">' +
    '<input type="submit" value="Log in">' +
  '</form>';


/** @returns {string} */
function render() {
  return pageTemplate(pageContent);
}

module.exports = {
  render,
};