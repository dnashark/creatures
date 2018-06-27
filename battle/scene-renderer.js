const controllers = require('../controllers');
const {moves} = require('../moves/moves');

module.exports = function(player) {
  const enemyMonster = player.activeBattle.enemy;
  const playerMonster = player.party[0];
  let content = '<p>You are fighting a wild ' + enemyMonster.name + ' with ' + renderHpAndSp(enemyMonster) + '.</p>';
  content += '<p>Your ' + playerMonster.name + ' is out with ' + renderHpAndSp(playerMonster) + '.</p>';
  content += renderMoves(playerMonster.moves);
  return content;
}

function renderHpAndSp(monster) {
  return renderAmount(monster.hp, monster.maxHp) + ' HP & ' + renderAmount(monster.sp, monster.maxSp) + ' SP';
}

function renderAmount(points, maxPoints) {
  const finalize = (amount, color) => ('<strong style="color: ' + color + '">' + amount + '</strong>');

  const amount = points + '/' + maxPoints;
  if (points <= 1/3 * maxPoints) {
    return finalize(amount, 'red');
  } else if (points <= 2/3 * maxPoints) {
    return finalize(amount, 'yellow');
  } else {
    return finalize(amount, 'green');
  }
}

function renderMoves(moves) {
  let content = '';
  for (let i = 0; i < moves.length; i++) {
    content += renderMove(moves[i], i);
  }
  return content;
}

function renderMove(moveId, index) {
  return (
    '<form action="' + controllers.BATTLE.path + '" method="POST">' +
      '<input type="hidden" name="action" value="move">' +
      '<input type="hidden" name="index" value="' + index + '">' +
      '<input type="submit" value="' + moves[moveId].name + '">' +
    '</form>'
  );
}
