const Adventure = require('../../framework/adventure');
const Choice = require('../../framework/choice');
const Event = require('../../framework/event');
const MonsterSchema = require('../../monsters/monster');
const drApplesLabController = require('../controllers/dr-apples-lab');
const forestDungeon = require('../dungeons/forest');
const healingCenterDungeon = require('../dungeons/healing-center');
const {monsters, monsterIds} = require('../../monsters/monsters');

module.exports = new Choice({
  title: 'Choose Your Starter Monster',
  paragraphs: [
    'Dr. Apple leads you to a room in the back of his lab. There is a table with three monster traps ' +
    'sitting on it.',
    
    '"It\'s time to pick your first monster. This monster will accompany you in your journeys and allow ' +
    'you to battle and catch wild monsters as well as those accompanying other trainers."',

    '"Choose wisely, you may pick the ant monster, Antible; the flower cat monster, Dandycat; ' +
    'or you may pick the rock badger monster, Crysbadger."',
  ],
  options: [
    new Choice.Option('Take Antible', adventure(monsterIds.ANTIBLE)),
    new Choice.Option('Take Dandycat', adventure(monsterIds.DANDYCAT)),
    new Choice.Option('Take Crysbadger', adventure(monsterIds.CRYSBADGER)),
  ],
});

/** @param {number} monsterId */
function adventure(monsterId) {
  const monster = monsters[monsterId];
  return new Adventure({
    event: new Event({
      title: 'I choose you!',
      paragraphs: ['You take the monster trap containing the ' + monster.name.toLowerCase() + ' from the table.'],
      handler: async function(player) {
        if (player.party.length) throw new Error('Player shouldn\'t have a monster yet.');
        player.addToParty({
          type: monsterId,
          level: 1,
          moves: monster.movesList.getRandomMoves(MonsterSchema.getMaxMovesetSize(), 1),
        });
        player.state.apple = drApplesLabController.STATE.HAVE_STARTER;
        forestDungeon.unlockFor(player);
        healingCenterDungeon.unlockFor(player);
      },
    }),
  });
}