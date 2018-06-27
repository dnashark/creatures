const contentUtil = require('../framework/content-util');
const {moves} = require('../moves/moves');
const template = require('../framework/template');

const BATTLE_TEMPLATE = new template.StringTemplate(
  contentUtil.create({
    title: 'Battle!',
    paragraphs: [
      'You are fighting a ${enemyType} with ${hp}/${maxHp} hp and ${sp}/${maxSp} sp.',
      'Its stats are:',
      'Health: ${health}',
      'Stamina: ${stamina}',
      'Speed: ${speed}',
      'Attack: ${attack}',
      'Defense: ${defense}',
      'Special Attack: ${specialAttack}',
      'Special Defense: ${specialDefense}',
      'Moves: ${moves}',
      '<form action="@{BATTLE}" method="POST"><input type="hidden" name="acknowledge" value="1"><input type="submit" value="acknowledge"></form>'
    ],
  })
);

const BATTLE_OVER_TEMPLATE = new template.StringTemplate(
  contentUtil.create({
    title: 'Battle Over',
    paragraphs: ['<a href="@{MAP}">Return to the map.</a>'],
  })
);


function render(player) {
  const enemy = player.activeBattle.enemy;
  return BATTLE_TEMPLATE.apply({
    enemyType: enemy.name,
    hp: enemy.hp,
    maxHp: enemy.maxHp,
    sp: enemy.sp,
    maxSp: enemy.maxSp,
    health: enemy.health,
    stamina: enemy.stamina,
    speed: enemy.speed,
    attack: enemy.attack,
    defense: enemy.defense,
    specialAttack: enemy.specialAttack,
    specialDefense: enemy.specialDefense,
    moves: enemy.moves.map(moveId => moves[moveId].name).join(', '),
  });
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
