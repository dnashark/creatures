const mongoose = require('mongoose');

const MonsterModel = require('../models/monster');
const PlayerModel = require('../models/player');

mongoose.connect('mongodb://localhost/creatures');

(async function(// TODO: Configurable
) {
  await MonsterModel.deleteMany();
  await PlayerModel.deleteMany();
  mongoose.disconnect();
})();
