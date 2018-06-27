const MonsterType = require('../monster-type');
const {moveIds} = require('../../moves/moves');

module.exports = new MonsterType({
  name: 'Dandycat',
  baseStats: {
    health: 100,
    stamina: 100,
    speed: 100,
    attack: 100,
    defense: 100,
    specialAttack: 100,
    specialDefense: 100,
  },
  moves: [
    {level: 1, moveId: moveIds.CLAW},
  ],
});