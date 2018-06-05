const PlayerModel = require('../../models/player');
const template = require('../../framework/template');
const controllers = require('../../controllers');

async function handleRequest(req, res) {
  if (req.method == 'POST') {
    const {username, password} = req.body;

    let playerId;
    try {
      playerId = await login(username, password);
    } catch (err) {
      if (err instanceof UnknownLoginError) {
        res.send(CONTENT.apply({ERROR_MESSAGE: 'Error encountered logging in. Please try again.'}));
      } else if (err instanceof BadUsernameOrPasswordError) {
        res.send(CONTENT.apply({ERROR_MESSAGE: 'Bad username or password.'}));
      } else {
        throw err;
      }
      return;
    }

    req.gameSession.login(playerId);
    res.redirect(controllers.PLAY.path);
  } else {
    res.send(CONTENT.apply());
  }
}

const CONTENT = new template.FileTemplate(require.resolve('../views/login.html'));

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
