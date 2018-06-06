const Choice = require('../../framework/choice');
const Transition = require('../../framework/transition');

const fierrel = require('../../monsters/fierrel');
const wahthon = require('../../monsters/wahthon');
const taycorn = require('../../monsters/taycorn');

module.exports = new Choice({
  name: 'starter',
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
    new Choice.Option('Take Fierrel', transition(fierrel)),
    new Choice.Option('Take Wahthon,', transition(wahthon)),
    new Choice.Option('Take Taycorn', transition(taycorn)),
  ],
});

/** @param {MonsterType} monster */
function transition(monster) {
  return new Transition({
    event: {
      title: 'I choose you!',
      paragraphs: [
        'You take the monster trap containing the ' + monster.name.toLowerCase() + ' from the table.',
      ],
      handler: function(req) {
        req.player.addMonsters.push({type: monster.number});
      },
    },
  });
}