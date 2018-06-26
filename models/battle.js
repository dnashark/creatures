const mongoose = require('mongoose');

const MonsterSchema = require('../monsters/monster');

const BattleSchema = new mongoose.Schema({
  enemy: {type: MonsterSchema, required: true},
}, {_id: false});

module.exports = BattleSchema;
