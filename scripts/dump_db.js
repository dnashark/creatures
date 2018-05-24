const mongoose = require('mongoose');

const MonsterModel = require('../models/monster');
const PlayerModel = require('../models/player');

mongoose.connect('mongodb://localhost/creatures');

async function getDocs(model) {
  const query = model.find();
  return await query.exec();
}

// TODO: Configurable
(async function() {
  console.log('Monsters: ' + await getDocs(MonsterModel));
  console.log();
  console.log('Players: ' + await getDocs(PlayerModel));
 
  mongoose.disconnect();
})();
