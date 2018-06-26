const Adventure = require('../../framework/adventure');
const Dungeon = require('../../framework/dungeon');
const Event = require('../../framework/event');

const BATTLE_ADVENTURE = new Adventure({
  battleGenerator: {}
});

const EVENT_ADVENTURE = new Adventure({
  event: new Event({
    title: 'Forest Event',
    paragraphs: ['You came across and event.'],
  }),
});

module.exports = new Dungeon('forest', [
  BATTLE_ADVENTURE,
  EVENT_ADVENTURE,
]);