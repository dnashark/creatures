const Int32 = require('mongoose-int32');
const mongoose = require('mongoose');

const {monsters} = require('./monsters');
const {moves} = require('../moves/moves');

const MonsterSchema = new mongoose.Schema({
  type: {type: Int32, min: 1, required: true},
  level: {type: Int32, min: 1, max: 100, required: true},
  moves: {type: [Int32], required: true},
  
  hp: {type: Int32, required: false, min: 0},
  sp: {type: Int32, required: false, min: 0},
}, {_id: false});

MonsterSchema.computeStat = computeStat;
MonsterSchema.computeMaxHp = computeMaxHp;
MonsterSchema.computeMaxSp = computeMaxSp;
MonsterSchema.getMaxMovesetSize = () => 6;

MonsterSchema.methods.initRandomMoves = function() {
  const moves = this.archetype.movesList.getRandomMoves(MonsterSchema.getMaxMovesetSize(), this.level);
  this.moves.length = 0;
  for (const move of moves) {
    this.moves.push(move);
  }
};
MonsterSchema.methods.initTransients = function() {
  this.hp = this.maxHp;
  this.sp = this.maxSp;
};
MonsterSchema.methods.clearTransients = function() {
  this.hp = null;
  this.sp = null;
};
MonsterSchema.methods.learnMove = function(moveId) {
  if (this.moves.length < MonsterSchema.maxMovesetSize) {
    this.moves.push(moveId);
    return true;
  } else {
    return false;
  }
}
MonsterSchema.methods.replaceMove = function(index, moveId) {
  this.moves.set(index, moveId);
}

MonsterSchema.virtual('archetype').get(function() { return monsters[this.type]; });

MonsterSchema.virtual('name').get(function() { return this.archetype.name; });

MonsterSchema.virtual('health').get(function() { return computeStat(this.archetype.baseHealth, this.level); });
MonsterSchema.virtual('stamina').get(function() { return computeStat(this.archetype.baseStamina, this.level); });
MonsterSchema.virtual('speed').get(function() { return computeStat(this.archetype.baseSpeed, this.level); });
MonsterSchema.virtual('attack').get(function() { return computeStat(this.archetype.baseAttack, this.level); });
MonsterSchema.virtual('defense').get(function() { return computeStat(this.archetype.baseDefense, this.level); });
MonsterSchema.virtual('specialAttack').get(function() { return computeStat(this.archetype.baseSpecialAttack, this.level); });
MonsterSchema.virtual('specialDefense').get(function() { return computeStat(this.archetype.baseSpecialDefense, this.level); });

MonsterSchema.virtual('maxHp').get(function() { return computeMaxHp(this.archetype.baseHealth, this.level); });
MonsterSchema.virtual('maxSp').get(function() { return computeMaxSp(this.archetype.baseStamina, this.level); });

MonsterSchema.virtual('isKOed').get(function() { return this.hp == 0; });
MonsterSchema.virtual('isWinded').get(function() { return this.sp == 0; });

function computeStat(baseStat, level) {
  return 5 + Math.floor(baseStat * level / 100);
}

function computeMaxHp(baseHealth, level) {
  return 2 * computeStat(baseHealth, level);
}

function computeMaxSp(baseHealth, level) {
  return 2 * computeStat(baseHealth, level);
}

module.exports = MonsterSchema;
