const pageTemplate = require('../templates/page');

const pageContent =
  '<p>Welcome to Companion Creatures</p>' +
  '<p><a href="/accountCreation">Click here to create an account.</a></p>' +
  '<h3>Login:</h3>' +
  '<form action="/logIn" method="POST">' +
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