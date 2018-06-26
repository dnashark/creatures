const contentUtil = require('./content-util');
const template = require('./template');

const BATTLE_TEMPLATE = new template.StringTemplate(
  contentUtil.create({
    title: 'Battle!',
    paragraphs: ['<form action="@{BATTLE}" method="POST"><input type="hidden" name="acknowledge" value="1"><input type="submit" value="acknowledge"></form>'],
  })
);

const BATTLE_OVER_TEMPLATE = new template.StringTemplate(
  contentUtil.create({
    title: 'Battle Over',
    paragraphs: ['<a href="@{MAP}">Return to the map.</a>'],
  })
);


function render(player) {
  return BATTLE_TEMPLATE.apply();
}

async function handler(req) {
  if (req.body.acknowledge) {
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
