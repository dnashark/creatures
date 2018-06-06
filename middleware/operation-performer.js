const {MonsterModel} = require('../models/monster');
const PlayerModel = require('../models/player');

module.exports = async function operationPerformer(req, res, next) {
  if (req.path.startsWith('/game/')) {
    try {
      await Promise.all([
        addMonsters(req.player),
      ]);
      await req.player.save();
    } catch (err) {
      res.status(500).end();
      return;
    }
  }
  next();
}

async function addMonsters(player) {
  if (player.addMonsters && player.addMonsters.length) {
    try {
      await MonsterModel.insertMany(player.addMonsters, {ordered: false});
    } catch (err) {
      if (err.name == 'BulkWriteError' &&
          ((!err.writeErrors && err.code == 11000) || (err.writeErrors && err.writeErrors.every((err) => err.code == 11000)))) {
        // All errors are failure to add the monster since it already exists. This is OK.
      } else {
        console.log('Unknown error adding monsters: ' + err);
        throw err;
      }
    }

    player.addMonsters = [];
  }
}