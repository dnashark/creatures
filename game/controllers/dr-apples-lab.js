const Transition = require('../../framework/transition');
const choices = require('../../choices');

/** @enum {number} */
const STATE = {
  WAITING_FOR_STARTER: 0,
  HAVE_STARTER: 1,
};

const starterTransition = new Transition({
  event: {
    title: 'Welcome to Monster Training World',
    paragraphs: [
      'This is a world inhabited by monsters that can be caught, trained, and battled.',
    ],
  },
  next: choices.STARTER_MONSTER,
});

const comeBackLaterTransition = new Transition({
  event: {
    title: 'Come back later',
    paragraphs: [
      'I don\'t have anything for you right now.',
    ],
  },
  next: null,
})

module.exports = async function (req, res) {
  if (req.player.state.apple == STATE.WAITING_FOR_STARTER) {
    await starterTransition.handleRequest(req, res);
  } else {
    await comeBackLaterTransition.handleRequest(req, res);
  }
};

module.exports.STATE = STATE;
