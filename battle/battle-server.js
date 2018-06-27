const command = require('./command');
const {moves} = require('../moves/moves');
const random = require('../framework/random');

const Side = {
  PLAYER: 0,
  ENEMY: 1,
};

const Result = {
  ONGOING: 0,
  WIN: 1,
  LOSS: 2,
}

function handler(player, playerCommand) {
  const playerMonster = player.party[0];
  const enemyMonster = player.activeBattle.enemy;
  const enemyCommand = pickEnemyCommand(enemyMonster);
  
  const orderedActions = decideActionOrder(
    {monster: playerMonster, command: playerCommand, side: Side.PLAYER},
    {monster: enemyMonster, command: enemyCommand, side: Side.ENEMY}
  );

  performAction(orderedActions[0].monster, orderedActions[0].command, orderedActions[1].monster);
  if (orderedActions[1].monster.isKOed) {
    return orderedActions[0].side == Side.PLAYER ? Result.WIN : Result.LOSS;
  }

  performAction(orderedActions[1].monster, orderedActions[1].command, orderedActions[0].monster);
  if (orderedActions[0].monster.isKOed) {
    return orderedActions[1].side == Side.PLAYER ? Result.WIN : Result.LOSS;
  }

  return Result.CONTINUE;
}

function pickEnemyCommand(monster) {
  return command.move(random.integer(0, monster.moves.length - 1));
}

function decideActionOrder(side1, side2) {
  if (side1.monster.speed > side2.monster.speed) {
    return [side1, side2];
  } else if (side1.monster.speed < side2.monster.speed) {
    return [side2, side1];
  } else {
    return random.boolean() ? [side1, side2] : [side2, side1]; 
  }
}

function performAction(subject, command, target) {
  if (command.isMove) {
    performMove(subject, moves[subject.moves[command.index]], target);
  } else {
    throw new Error('unimplemented command type');
  }
}

function performMove(subject, move, target) {
  if (move.accuracy && random.integer(1, 100) > move.accuracy) {
    // The move missed.
    return;
  }

  const attack = move.isSpecial ? subject.specialAttack : subject.attack;
  const defense = move.isSpecial ? target.specialDefense : subject.defense;
  const damage = Math.ceil(calculateBaseDamage(move.power, attack, defense, subject.level));
  target.hp = Math.max(0, target.hp - damage);
}

function calculateBaseDamage(power, attack, defense, level) {
  return 5 * power / 100 * attack / defense * level / 2;
}

module.exports = {
  Result,
  handler,
};
