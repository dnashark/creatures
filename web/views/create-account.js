const pageTemplate = require('../templates/page');

const pageContent =
  '<p>Create a new account.</p>' +
  '<form action="/createAccount" method="POST">' +
    'Username: <input type="text" name="username">' +
    'Password: <input type="password" name="password">' +
    '<input type="submit" value="Create Account">' +
  '</form>';


/** @returns {string} */
function render() {
  return pageTemplate(pageContent);
}

module.exports = {
  render,
};