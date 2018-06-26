const Adventure = require('../../framework/adventure');

const BATTLE_ADVENTURE = new Adventure({battleGenerator: {}});

module.exports = async function(req, res) {
  const content = await BATTLE_ADVENTURE.handler(req);
  await req.player.save();
  res.send(content);
};
