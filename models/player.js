const mongoose = require('mongoose');

const {MonsterSchema} = require('./monster');
const {TransactionSchema} = require('./transaction');

const StateSchema = new mongoose.Schema({
  apple: {type: Number, require: true, default: 0},
}, {_id: false});

// TODO: Password should be hashed
const PlayerSchema = new mongoose.Schema({
  username: {type: String, required: true, min: 3, max: 32, unique: true},
  password: {type: String, required: true, min: 1},
  activeChoice: {type: String, require: false},

  state: {type: StateSchema, require: true, default: {}},

  transaction: {type: TransactionSchema, require: false},
});

module.exports = mongoose.model('Player', PlayerSchema);