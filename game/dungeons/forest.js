const Adventure = require('../../framework/adventure');
const Dungeon = require('../../framework/dungeon');
const Event = require('../../framework/event');
const WildMonsterBattleGenerator = require('../../battle/wild-monster-battle-generator');
const {monsterIds} = require('../../monsters/monsters');

const BATTLE_ADVENTURE = new Adventure({
  battleGenerator: new WildMonsterBattleGenerator(monsterIds.CRYSBADGER, 1, 1),
});

const EVENT_ADVENTURE = new Adventure({
  event: new Event({
    title: 'Forest Event',
    paragraphs: ['You came across and event.'],
  }),
});

module.exports = new Dungeon('forest', true, [
  BATTLE_ADVENTURE,
  EVENT_ADVENTURE,
]);