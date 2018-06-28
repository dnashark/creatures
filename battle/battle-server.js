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

function handler(player, playerCommand, log) {
  const playerMonster = player.party[0];
  const enemyMonster = player.activeBattle.enemy;
  const enemyCommand = pickEnemyCommand(enemyMonster);
  
  const orderedActions = decideActionOrder(
    {monster: playerMonster, command: playerCommand, side: Side.PLAYER},
    {monster: enemyMonster, command: enemyCommand, side: Side.ENEMY}
  );

  let subject = orderedActions[0]
  performAction(orderedActions[0], orderedActions[1],  log);
  if (orderedActions[1].monster.isKOed) {
    return orderedActions[0].side == Side.PLAYER ? Result.WIN : Result.LOSS;
  }

  performAction(orderedActions[1], orderedActions[0], log);
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

function performAction(subject, target, log) {
  if (subject.command.isMove) {
    performMove(subject, moves[subject.monster.moves[subject.command.index]], target, log);
  } else {
    throw new Error('unimplemented command type');
  }
}

function performMove(subject, move, target, log) {
  log.push(constructMonsterIdentifier(subject, true) + ' uses ' + move.name + '.');
  if (move.accuracy && random.integer(1, 100) > move.accuracy) {
    log.push('The attack missed.');
    return;
  }
  
  const attack = move.isSpecial ? subject.monster.specialAttack : subject.monster.attack;
  const defense = move.isSpecial ? target.monster.specialDefense : subject.monster.defense;
  const damage = Math.ceil(calculateBaseDamage(move.power, attack, defense, subject.monster.level));

  log.push(constructMonsterIdentifier(target, true) + ' takes ' + damage + ' points of damage.');
  target.monster.hp = Math.max(0, target.monster.hp - damage);
  if (target.monster.isKOed) {
    log.push(constructMonsterIdentifier(target, true) + ' is knocked out.');
  }
}

function constructMonsterIdentifier(descriptor, capitalizeFirst) {
  if (capitalizeFirst) {
    return (descriptor.side == Side.PLAYER ? 'Your ' : 'Opponent ') + descriptor.monster.name;
  } else {
    return (descriptor.side == Side.PLAYER ? 'your ' : 'opponent ') + descriptor.monster.name;
  }
}

function calculateBaseDamage(power, attack, defense, level) {
  return 5 * power / 100 * attack / defense * level / 2;
}

module.exports = {
  Result,
  handler,
};
