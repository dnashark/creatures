const controllers = require('../../controllers');
const template = require('../../framework/template');

const BATTLE = new template.StringTemplate(
  '<p>You are in a battle!</p>' +
  '<p><form action="@{BATTLE}" method="POST"><input type="hidden" name="acknowledge" value="1"><input type="submit" value="acknowledge"></form></p>'
);

const BATTLE_OVER = new template.StringTemplate(
  '<h1>Battle Over</h1>' +
  '<p><a href="@{MAP}">Return to the map.</a></p>'
);

const battle = async function(req, res) {
  if (req.player.activeBattle) {
    if (req.body.acknowledge) {
      req.player.activeBattle = null;
      await req.player.save();
      res.send(BATTLE_OVER.apply());
    } else {
      res.send(BATTLE.apply());
    }
  } else {
    res.redirect(controllers.MAP);
  }
};

battle.content = BATTLE;

module.exports = battle;