const mongoose = require('mongoose');

// TODO: Password should be hashed
const PlayerSchema = new mongoose.Schema({
  name: {type: String, required: true, min: 3, max: 32, unique: true},
  password: {type: String, required: true, min: 1},
  scenario: {type: String, required: false},
});

module.exports = mongoose.model('Player', PlayerSchema);