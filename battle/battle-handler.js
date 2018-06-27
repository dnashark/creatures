const contentUtil = require('../framework/content-util');
const {moves} = require('../moves/moves');
const sceneRenderer = require('./scene-renderer');
const template = require('../framework/template');

const BATTLE_OVER_TEMPLATE = new template.StringTemplate(
  contentUtil.create({
    title: 'Battle Over',
    paragraphs: ['<a href="@{MAP}">Return to the map.</a>'],
  })
);


function render(player) {
  return sceneRenderer(player);
}

async function handler(req) {
  // TODO: Should be using constants
  if (req.body.action == 'move') {
    req.player.activeBattle = null;
    return BATTLE_OVER_TEMPLATE.apply();
  } else {
    return render(req.player);
  }
}

module.exports = {
  render,
  handler,
};
