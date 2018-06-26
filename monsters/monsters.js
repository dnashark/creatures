const monsterIds = {
  ANTIBLE: 1,
  CRYSBADGER: 2,
  DANDYCAT: 3,
};

const monsters = [];
for (const monster of Object.keys(monsterIds)) {
  const number = monsterIds[monster];
  monsters[number] = require('./types/' + monster.toLowerCase());
}

module.exports = {
  monsterIds,
  monsters,
};