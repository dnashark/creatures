const mongoose = require('mongoose');

const MonsterSchema = require('../monsters/monster');

const BattleSchema = new mongoose.Schema({
}, {id: false});

module.exports = BattleSchema;
