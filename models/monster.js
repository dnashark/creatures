const mongoose = require('mongoose');

const MonsterSchema = new mongoose.Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true, index: true},
  type: {type: Number, min: 1, required: true},
});

module.exports = {
  MonsterSchema: MonsterSchema,
  MonsterModel: mongoose.model('Monster', MonsterSchema),
};
