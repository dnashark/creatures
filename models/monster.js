const mongoose = require('mongoose');

const MonsterSchema = new mongoose.Schema({
  type: {type: Number, min: 1, required: true},
  
  hp: {type: Number, required: false, default: null},
});

module.exports = MonsterSchema;
