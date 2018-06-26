const validateSchema = require('../framework/validate-schema');

module.exports = class MonsterType {
  constructor(args) {
    validateArgs(args);
    this.name_ = args.name;
    this.base_ = {
      health_: args.baseStats.health,
      stamina_: args.baseStats.stamina,
      speed_: args.baseStats.speed,
      attack_: args.baseStats.attack,
      defense_: args.baseStats.defense,
      specialAttack_: args.baseStats.specialAttack,
      specialDefense_: args.baseStats.specialDefense,
    };
  }

  /** @returns {string} */
  get name() { return this.name_; }

  get baseHealth() { return this.base_.health_; }
  get baseStamina() { return this.base_.stamina_; }
  get baseSpeed() { return this.base_.speed_; }
  get baseAttack() { return this.base_.attack_; }
  get baseDefense() { return this.base_.defense_; }
  get baseSpecialAttack() { return this.base_.specialAttack_; }
  get baseSpecialDefense() { return this.base_.specialDefense_; }
}

function validateArgs(args) {
  validateSchema(args, {
    name: String,
    baseStats: {
      health: Number,
      stamina: Number,
      speed: Number,
      attack: Number,
      defense: Number,
      specialAttack: Number,
      specialDefense: Number,
    },
  });
}