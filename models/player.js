const mongoose = require('mongoose');

const MonsterSchema = require('../monsters/monster');
const BattleSchema = require('./battle');

const StateSchema = new mongoose.Schema({
  apple: {type: Number, require: true, default: 0},
}, {_id: false});

const DungeonSchema = new mongoose.Schema({
  isUnlocked: {type: Boolean, required: true, default: false},
}, {_id: false});

// TODO: Password should be hashed
const PlayerSchema = new mongoose.Schema({
  username: {type: String, required: true, min: 3, max: 32, unique: true},
  password: {type: String, required: true, min: 1},
  
  activeChoice: {type: Number, require: false, default: null},
  activeBattle: {type: BattleSchema, require: false, default: null},

  party: [MonsterSchema],

  state: {type: StateSchema, required: true, default: {}},

  dungeon_data: {type: Map, of: DungeonSchema, required: true, default: {}},
});

PlayerSchema.methods.addToParty = function(monster) {
  if (this.isPartyFull) return null;

  this.party.push(monster);
  this.party[this.party.length - 1].initTransients();
  return this.party[this.party.length - 1];
}

PlayerSchema.virtual('hasAbleMonster').get(function() {
  for (const monster of this.party) {
    if (!monster.isKOed && !monster.isWinded) return true;
  }
  return false;
});

PlayerSchema.virtual('isPartyFull').get(function() { return this.party.length == 6; });

module.exports = mongoose.model('Player', PlayerSchema);
