const Transition = require('../../framework/transition');
const starterChoice = require('../choices/starter');

const transition = new Transition(new Transition.Event('Original Event', ['some event body'], null), starterChoice.test1);

module.exports = async function (req, res) {
  await transition.handleRequest(req, res);
};
