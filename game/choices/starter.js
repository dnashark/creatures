const Choice = require('../../framework/choice');
const Transition = require('../../framework/transition');

const transition2_1 = new Transition(new Transition.Event('Event 2', ['Event body'], null), null);
const test2 = new Choice('test2', 'Test Choice 2', ['This is only a test.'], [
  new Choice.Option('option1', 'Option 1', transition2_1),
]);

const transition1_1 = new Transition(null, null);
const transition1_2 = new Transition(null, test2);
const transition1_3 = new Transition(new Transition.Event('Event 1', ['Event body'], null), test2);

const test1 = new Choice('test1', 'Test Choice 1', ['This is only a test.'], [
  new Choice.Option('option1', 'Option 1', transition1_1),
  new Choice.Option('option2', 'Option 2', transition1_2),
  new Choice.Option('option3', 'Option 3', transition1_3),
]);

module.exports = {
  test1,
  test2,
};
