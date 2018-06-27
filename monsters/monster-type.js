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
    this.moves_ = new MovesList(args.moves);
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

  get movesList() { return this.moves_; }
};

class MovesList {
  constructor(moves) {
    this.moves_ = [];
    for (const {level, moveId} of moves) {
      this.moves_.push({level, moveId})
    }
  }

  get size() { return this.moves_.length; }
  get(index) { return Object.assign({}, this.moves_[index]); }
  
  filterByLevel(level) {
    const possibleMoves = [];
    for (const move of this.moves_) {
      if (move.level <= level) possibleMoves.push(move.moveId);
    }
    return possibleMoves;
  }

  getRandomMoves(number, level) {
    const possibleMoves = this.filterByLevel(level);
    const randomMoves = []
    while (possibleMoves.length && randomMoves.length < number) {
      const index = Math.floor(Math.random() * possibleMoves.length);
      randomMoves.push(possibleMoves[index]);
      possibleMoves[index] = possibleMoves[possibleMoves.length - 1];
      possibleMoves.length--;
    }
    return randomMoves;
  }
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
    moves: [{
      level: Number,
      moveId: Number,
    }],
  });
}