const mongoose = require('mongoose');

const {MonsterModel} = require('../models/monster');
const PlayerModel = require('../models/player');

async function clear(model) {
  await model.deleteMany();
  await model.collection.dropIndexes();
}

mongoose.connect('mongodb://localhost/creatures');

(async function() {
  await clear(MonsterModel);
  await clear(PlayerModel);
  mongoose.disconnect();
})();
