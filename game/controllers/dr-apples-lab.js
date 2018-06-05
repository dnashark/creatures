const Transition = require('../../framework/transition');
const starterChoice = require('../choices/starter-monster');

const transition = new Transition({
  event: {
    title: 'Welcome to Monster Training World',
    paragraphs: [
      'This is a world inhabited by monsters that can be caught, trained, and battled.',
    ],
  },
  next: starterChoice,
})

module.exports = async function (req, res) {
  await transition.handleRequest(req, res);
};
