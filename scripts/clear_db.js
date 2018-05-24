const mongoose = require('mongoose');

const MonsterModel = require('../models/monster');
const PlayerModel = require('../models/player');

mongoose.connect('mongodb://localhost/creatures');

async function dropCollection(name) {
  try {
    await mongoose.connection.dropCollection(name);
    console.log('Collection {' + name +'} dropped.');
  } catch (err) {
    if (err.name == 'MongoError' && err.code == 26) {
      console.log('Collection {' + name + '} not found.');
    } else {
      throw err;
    }
  }
}

// TODO: Configurable
(async function() {
  await dropCollection(MonsterModel.modelName);
  await dropCollection(PlayerModel.modelName);
  mongoose.disconnect();
})();
