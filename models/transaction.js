const mongoose = require('mongoose');

const {MonsterSchema, MonsterModel} = require('./monster');

const TransactionSchema = new mongoose.Schema({
  addMonsters: [MonsterSchema],
});

async function ensure(transaction) {
  await Promise.all([
    ensureAddMonsters(transaction.addMonsters),
  ]);
}

async function ensureAddMonsters(monsters) {
  if (monsters.length) {
    try {
      await MonsterModel.insertMany(monsters, {ordered: false});
    } catch (err) {
      if (err.name == 'BulkWriteError' &&
          ((!err.writeErrors && err.code == 11000) || (err.writeErrors && err.writeErrors.every((err) => err.code == 11000)))) {
        // All errors are failure to add the monster since it already exists. This is OK.
      } else {
        console.log('Unknown error adding monsters: ' + err);
        throw err;
      }
    }
  }
}

module.exports = {
  TransactionSchema,
  ensure,
};
