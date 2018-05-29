const PlayerModel = require('../../models/player');

const routes = require('../routes');
const scenarios = require('../scenarios');
const error = require('../enums/account-creation-errors');
const util = require('../util');

/** @param {string} username */
function isValidUsername(username) {
  if (username.length < 1 || username.length > 32) return false;
  
  for (let i = 0; i < username.length; i++) {
    const c = username.charCodeAt(i);
    const isLower = c >= 97 && c <= 122;
    const isUpper = c >= 65 && c <= 90;
    const isDigit = c >= 48 && c <= 57;
    if (!isLower && !isUpper && !isDigit) return false;
    if (i == 0 && isDigit) return false;
  }

  return true;
}

/** param {string} password */
function isValidPassword(password) {
  return password.length >= 1 && password.length <= 32;
}

module.exports = async function (req, res) {
  const {username, password} = req.body;

  if (!isValidUsername(username)) {
    res.redirect(routes.GET.CREATE_ACCOUNT_PAGE + '?err=' + error.INVALID_USERNAME + '&username=' + username);
  }
  if (!isValidPassword(password)) {
    res.redirect(routes.GET.CREATE_ACCOUNT_PAGE + '?err=' + error.INVALID_PASSWORD);
  }

  let player = null;
  try {
    player = await PlayerModel.create({
        name: username,
        password: password,
        scenario: scenarios.scenarios.STARTER,
    });
  } catch(err) {
    if (err.name == 'MongoError' && err.code == 11000) {
      res.redirect(routes.GET.CREATE_ACCOUNT_PAGE + '?err=' + error.USERNAME_EXISTS + '&username=' + username);
    } else {
      console.log('Unknown account creation error: ' + err);
      res.redirect(routes.GET.CREATE_ACCOUNT_PAGE + '?err=' + error.UNKNOWN);
    }
    return;
  }

  util.login(req, player._id);
  res.redirect('/');
};
