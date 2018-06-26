const MonsterSchema = require('../monsters/monster');

module.exports = class WildMonsterBattleGenerator {
  constructor(monsterId, minLevel, maxLevel) {
    this.monsterId_ = monsterId;
    this.minLevel_ = minLevel;
    this.maxLevel_ = maxLevel;
  }

  setActiveBattle(player) {
    const level = this.minLevel_ + Math.floor(Math.random() * (1 + this.maxLevel_ - this.minLevel_));
    player.activeBattle = {
      enemy: {
        type: this.monsterId_,
        level,
      },
    };
    player.activeBattle.enemy.initTransients();
  }
};
