const PlayerModel = require('../../models/player');
const Template = require('../../framework/template');
const controllers = require('../controllers');

async function handleRequest(req, res) {
  if (req.method == 'POST') {
    const {username, password} = req.body;

    let playerId;
    try {
      playerId = await login(username, password);
    } catch (err) {
      if (err instanceof UnknownLoginError) {
        res.send(CONTENT.apply({ERROR_MESSAGE: '<p><em>Error encountered logging in. Please try again.</em></p>'}));
      } else if (err instanceof BadUsernameOrPasswordError) {
        res.send(CONTENT.apply({ERROR_MESSAGE: '<p><em>Bad username or password.</em></p>'}));
      } else {
        throw err;
      }
      return;
    }

    req.gameSession.login(playerId);
    res.redirect(controllers.PLAY.path);
  } else {
    res.send(CONTENT.apply({ERROR_MESSAGE: ''}));
  }
}

const CONTENT = new Template(
  '<h1>Welcome to Monster Training Unlimited!</h1>' +
  '<h2>Login</h2>'+
  '${ERROR_MESSAGE}' +
  '<form action="' + controllers.LOGIN.path + '" method="POST">' +
    '<p>Username: <input type="text" name="username"></p>' +
    '<p>Password: <input type="password" name="password"></p>' +
    '<p><input type="submit" value="login"></p>' +
  '</form>' +
  '<h2>Don\'t have an account? <a href="' + controllers.CREATE_ACCOUNT.path + '">Create one!</a></h2>'
);

class UnknownLoginError {}
class BadUsernameOrPasswordError {}

async function login(username, password) {
  let player = null;
  try {
    player = await PlayerModel.findOne({username: username});
  } catch (err) {
    console.log('Unknown login error: ' + err);
    throw new UnknownLoginError();
  }

  if (!player || player.password != password)  throw new BadUsernameOrPasswordError();

  return player._id;
}

module.exports = handleRequest;
