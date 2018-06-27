const Adventure = require('../../framework/adventure');
const Choice = require('../../framework/choice');
const Event = require('../../framework/event');
const healingCenterDungeon = require('../dungeons/healing-center');
const {monsters, monsterIds} = require('../../monsters/monsters');

const HEAL = new Adventure({
  event: new Event({
    title: 'Your monsters are healed.',
    paragraphs: [],
    handler: async function(player) {
      for (const monster of player.party) {
        monster.hp = monster.maxHp;
        monster.sp = monster.maxSp;
      }
    },
  }),
});

const LEAVE = new Adventure({
  event: new Event({
    paragraphs: ['You leave the monster healing center.'],
  }),
});

module.exports = new Choice({
  title: 'Welcome to the healing center.',
  paragraphs: [],
  options: [
    new Choice.Option('Heal your monsters', HEAL),
    new Choice.Option('Leave', LEAVE),
  ],
});
