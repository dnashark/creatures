const battleHandler = require('../../battle/battle-handler');
const controllers = require('../../controllers');

module.exports = async function(req, res) {
  if (req.player.activeBattle) {
    const content = await battleHandler.handler(req);
    req.player.save();
    res.send(content);
  } else {
    res.redirect(controllers.MAP.path);
  }
};