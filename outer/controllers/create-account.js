const PlayerModel = require('../../models/player');
const Template = require('../../framework/template');
const controllers = require('../controllers');

async function handleRequest(req, res) {
  if (req.method == 'POST') {
    const {username, password, reenter} = req.body;

    let playerId;
    try {
      playerId = await createAccount(username, password, reenter);
    } catch(err) {
      if (err instanceof InvalidUsernameError) {
        res.send(CONTENT.apply({
          ERROR_MESSAGE: '<p><em>Username must be alphanumeric and between 3 and 32 characters long.</em></p>'
        }));
      } else if (err instanceof UsernameExistsError) {
        res.send(CONTENT.apply({ERROR_MESSAGE: '<p><em>Username, ' + username + ', is already in use.</em></p>'}));
      } else if (err instanceof InvalidPasswordError) {
        res.send(CONTENT.apply({ERROR_MESSAGE: '<p><em>Passwords must be between 1 and 32 characters long.</em></p>'}));
      } else if (err instanceof PasswordsDoNotMatchError) {
        res.send(CONTENT.apply({ERROR_MESSAGE: '<p><em>Passwords did not match.</em></p>'}));
      } else {
        throw err;
      }
      return;
    }

    req.gameSession.login(playerId);
    res.redirect(controllers.PLAY.path);
  } else {
    res.send(CONTENT.apply({ERROR_MESSAGE: ''}))
  }
}

const CONTENT = new Template(
  '<h2>Create account:</h2>' +
  '${ERROR_MESSAGE}' +
  '<form action="' + controllers.CREATE_ACCOUNT.path + '" method="POST">' +
    '<p>Username: <input type="text" name="username"></p>' +
    '<p>Password: <input type="password" name="password"></p>' +
    '<p>Re-enter password: <input type="password" name="reenter"></p>' +
    '<p><input type="submit" value="Create Account"></p>' +
  '</form>'
);

/** @param {string} username */
function isValidUsername(username) {
  if (!username) return false;
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
  return password && password.length >= 1 && password.length <= 32;
}

class PasswordsDoNotMatchError {}
class InvalidUsernameError {}
class InvalidPasswordError {}
class UsernameExistsError {}
class UnknownError {}

async function createAccount(username, password, reenter) {
  if (!isValidUsername(username)) throw new InvalidUsernameError();
  if (!isValidPassword(password)) throw new InvalidPasswordError();
  if (password != reenter) throw new PasswordsDoNotMatchError();

  let player;
  try {
    player = await PlayerModel.create({
      username: username,
      password: password,
    });
  } catch(err) {
    if (err.name == 'MongoError' && err.code == 11000) {
      throw new UsernameExistsError();
    } else {
      console.log('Unknown account creation error: ' + err);
      throw new UnknownError();
    }
  }

  return player._id;
}

module.exports = handleRequest;
