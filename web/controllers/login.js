const PlayerModel = require('../../models/player');

const routes = require('../routes');
const error = require('../enums/log-in-errors');
const util = require('../util');

module.exports = async function(req, res) {
  const {username, password} = req.body;

  let player = null;
  try {
    player = await PlayerModel.findOne({name: username});
  } catch (err) {
    console.log('Unknown login error: ' + err);
    res.redirect(routes.get.LOGIN_PAGE + '?err=' + error.UNKNOWN);
    return;
  }

  if (player && player.password == req.body.password) {
    util.login(req, player._id);
    res.redirect('/');
  } else {
    res.redirect(routes.get.LOGIN_PAGE + '?err=' + error.WRONG_USERNAME_OR_PASSWORD);
  }
};
