const validateSchema = require('./framework/validate-schema');

module.exports = class MonsterType {
  constructor(args) {
    validateArgs(args);
    this.number_ = args.number;
    this.name_ = args.name;
  }

  /** @returns {number} */
  get number() { return this.number_; }
  
  /** @returns {string} */
  get name() { return this.name_; }
}

function validateArgs(args) {
  validateSchema(args, {
    number: Number,
    name: String,
  });
}