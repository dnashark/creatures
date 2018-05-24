const mongoose = require('mongoose');

const MonsterSchema = new mongoose.Schema({
  type: {type: Number, min: 0, required: true},
});

module.exports = mongoose.Model('Monster', MonsterSchema);
