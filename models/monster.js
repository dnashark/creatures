const mongoose = require('mongoose');

const MonsterSchema = new mongoose.Schema({
  type: {type: Number, min: 1, required: true},
});

module.exports = {
  MonsterSchema: MonsterSchema,
  MonsterModel: mongoose.model('Monster', MonsterSchema),
};
