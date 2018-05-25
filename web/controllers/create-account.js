const PlayerModel = require('../../models/player');
const accountCreationController = require('./account-creation');
const error = require('../enums/account-creation-errors');

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

module.exports = {
  path: '/createAccount',
  method: 'POST',
  handle: async (req, res) => {
    const {username, password} = req.body;

    if (!isValidUsername(username)) {
      res.redirect(accountCreationController.path + '?err=' + error.INVALID_USERNAME + '&username=' + username);
    }
    if (!isValidPassword(password)) {
      res.redirect(accountCreationController.path + '?err=' + error.INVALID_PASSWORD);
    }

    let player = null;
    try {
      player = await PlayerModel.create({
          name: username,
          password: password,
          scenario: 'start',
      });
    } catch(err) {
      if (err.name == 'MongoError' && err.code == 11000) {
        res.redirect(accountCreationController.path + '?err=' + error.USERNAME_EXISTS + '&username=' + username);
      } else {
        console.log(err);
        res.redirect(accountCreationController.path + '?err=' + error.UNKNOWN);
      }
      return;
    }

    req.session.userId = player._id;
    res.redirect('/');  
  }
};