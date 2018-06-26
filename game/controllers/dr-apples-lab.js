const Adventure = require('../../framework/adventure');
const Event = require('../../framework/event');
const choiceRegistrar = require('../../choice-registrar');
const template = require('../../framework/template');

/** @enum {number} */
const STATE = {
  WAITING_FOR_STARTER: 0,
  HAVE_STARTER: 1,
};

const WELCOME_EVENT = new Event({
  title: 'Welcome to Monster Training World',
  paragraphs: ['This is a world inhabited by monsters that can be caught, trained, and battled.'],
});

const WELCOME_ADVENTURE = new Adventure({
  event: WELCOME_EVENT,
  choiceId: choiceRegistrar.ids.STARTER_MONSTER,
});

const COME_BACK_LATER_ADVENTURE = new Adventure({
  event: new Event({
    title: 'Come Back Later',
    paragraphs: ['I don\'t have anything for you right now.'],
  }),
});

module.exports = async function (req, res) {
  let content;
  if (req.player.state.apple == STATE.WAITING_FOR_STARTER) {
    content = await WELCOME_ADVENTURE.handler(req);
  } else {
    content = await COME_BACK_LATER_ADVENTURE.handler(req);
  }

  await req.player.save();
  res.send(content);
};

module.exports.STATE = STATE;
