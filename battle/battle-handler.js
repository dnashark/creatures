const battleServer = require('./battle-server');
const command = require('./command');
const contentUtil = require('../framework/content-util');
const {moves} = require('../moves/moves');
const sceneRenderer = require('./scene-renderer');
const template = require('../framework/template');

const BATTLE_OVER_TEMPLATE = new template.StringTemplate(
  contentUtil.create({
    title: 'Battle Over',
    paragraphs: [
      'You ${result}.',
      '<a href="@{MAP}">Return to the map.</a>'
    ],
  })
);


function render(player) {
  return sceneRenderer(player);
}

async function handler(req) {
  // TODO: Should be using constants
  let playerCommand = null;
  if (req.body.action == 'move') {
    const index = parseInt(req.body.index, 10);
    if (index > 0 || index < req.player.party[0].moves.length) {
      playerCommand = command.move(index);
    }
  }
  
  let logContent = '';
  if (playerCommand) {
    const log = [];
    const result = battleServer.handler(req.player, playerCommand, log);
    logContent = log.map(line => '<p>' + line + '</p>').join('');
    if (result == battleServer.Result.WIN) {
      req.player.activeBattle = null;
      return logContent + BATTLE_OVER_TEMPLATE.apply({result: 'won'});
    } else if (result == battleServer.Result.LOSS) {
      req.player.activeBattle = null;
      return logContent + BATTLE_OVER_TEMPLATE.apply({result: 'lost'});
    }
  }

  return logContent + render(req.player);
}

module.exports = {
  render,
  handler,
};
