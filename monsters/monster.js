const mongoose = require('mongoose');

const {monsters} = require('./monsters');

const MonsterSchema = new mongoose.Schema({
  type: {type: Number, min: 1, required: true},
  level: {type: Number, min: 1, max: 100, required: true},
  
  hp: {type: Number, required: false, default: null},
}, {id: false});

MonsterSchema.statics.computeStat = (baseStat, level) => (5 + Math.floor(baseState * level / 100));

MonsterSchema.virtual('archetype').get(function() { return monsters[this.type]; });

for (const stat of ['health', 'stamina', 'speed'])
MonsterSchema.virtual('health').get(function() { return MonsterSchema.computeStat(this.archetype.baseHealth, this.level); });
MonsterSchema.virtual('stamina').get(function() { return MonsterSchema.computeStat(this.archetype.baseStamina, this.level); });
MonsterSchema.virtual('speed').get(function() { return MonsterSchema.computeStat(this.archetype.baseSpeed, this.level); });
MonsterSchema.virtual('attack').get(function() { return MonsterSchema.computeStat(this.archetype.baseAttack, this.level); });
MonsterSchema.virtual('defense').get(function() { return MonsterSchema.computeStat(this.archetype.baseDefense, this.level); });
MonsterSchema.virtual('specialAttack').get(
  function() { return MonsterSchema.computeStat(this.archetype.baseSpecialAttack, this.level); });
MonsterSchema.virtual('specialDefense').get(
  function() { return MonsterSchema.computeStat(this.archetype.baseSpecialDefense, this.level); });

MonsterSchema.virtual('maxHp').get(function() { return this.health * 2; });
MonsterSchema.virtual('maxSp').get(function() { return this.stamina * 2; });

module.exports = MonsterSchema;
