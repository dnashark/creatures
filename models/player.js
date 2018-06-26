const mongoose = require('mongoose');

const MonsterSchema = require('./monster');
const BattleSchema = require('./battle');

const StateSchema = new mongoose.Schema({
  apple: {type: Number, require: true, default: 0},

  unlocked: {
    forest: {type: Boolean, require: true, default: false},
  },
}, {_id: false});

// TODO: Password should be hashed
const PlayerSchema = new mongoose.Schema({
  username: {type: String, required: true, min: 3, max: 32, unique: true},
  password: {type: String, required: true, min: 1},
  
  activeChoice: {type: Number, require: false, default: null},
  activeBattle: {type: BattleSchema, require: false, default: null},

  party: {type: [MonsterSchema], require: true, default: []},

  state: {type: StateSchema, require: true, default: {}},
});

module.exports = mongoose.model('Player', PlayerSchema);