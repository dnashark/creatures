const Adventure = require('../../framework/adventure');
const Choice = require('../../framework/choice');
const Event = require('../../framework/event');
const drApplesLabController = require('../controllers/dr-apples-lab');

const fierrel = require('../../monsters/fierrel');
const wahthon = require('../../monsters/wahthon');
const taycorn = require('../../monsters/taycorn');

module.exports = new Choice({
  title: 'Choose Your Starter Monster',
  paragraphs: [
    'Dr. Apple leads you to a room in the back of his lab. There is a table with three monster traps ' +
    'sitting on it.',
    
    '"It\'s time to pick your first monster. This monster will accompany you in your journeys and allow ' +
    'you to battle and catch wild monsters as well as those accompanying other trainers."',

    '"Choose wisely, you may pick the fire squirrel monster, Fierrel; the water snake monster, Wahthon; ' +
    'or you may pick seed monster, Taycorn."',
  ],
  options: [
    new Choice.Option('Take Fierrel', adventure(fierrel)),
    new Choice.Option('Take Wahthon', adventure(wahthon)),
    new Choice.Option('Take Taycorn', adventure(taycorn)),
  ],
});

/** @param {MonsterType} monster */
function adventure(monster) {
  return new Adventure({
    event: new Event({
      title: 'I choose you!',
      paragraphs: ['You take the monster trap containing the ' + monster.name.toLowerCase() + ' from the table.'],
      handler: async function(player) {
        if (player.party.length) throw new Error('Player shouldn\'t have a monster yet.');
        player.party.push({
          type: monster.number,
        });
        player.state.apple = drApplesLabController.STATE.HAVE_STARTER;
        player.state.unlocked.forest = 1;
      },
    }),
  });
}