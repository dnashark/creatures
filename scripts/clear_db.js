const mongoose = require('mongoose');

const PlayerModel = require('../models/player');

async function clear(model) {
  await model.deleteMany();
  await model.collection.dropIndexes();
}

mongoose.connect('mongodb://localhost/creatures');

(async function() {
  await clear(PlayerModel);
  mongoose.disconnect();
})();
