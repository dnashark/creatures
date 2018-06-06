const mongoose = require('mongoose');

const {MonsterSchema} = require('./monster');

// TODO: Password should be hashed
const PlayerSchema = new mongoose.Schema({
  username: {type: String, required: true, min: 3, max: 32, unique: true},
  password: {type: String, required: true, min: 1},
  activeChoice: {type: String, require: false},

  addMonsters: [MonsterSchema],
});

module.exports = mongoose.model('Player', PlayerSchema);