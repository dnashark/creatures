const Adventure = require('../../framework/adventure');
const Dungeon = require('../../framework/dungeon');
const WildMonsterBattleGenerator = require('../../battle/wild-monster-battle-generator');
const choiceRegistrar = require('../../choice-registrar');
const {monsterIds} = require('../../monsters/monsters');

const MENU = new Adventure({
  choiceId: choiceRegistrar.ids.HEALING_CENTER_MENU,
});

module.exports = new Dungeon('healing-center', false, [MENU]);