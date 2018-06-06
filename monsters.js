const fs = require('fs');
const path = require('path');

const monsters = {};

const monsterDirectory = path.join(__dirname, 'monsters'); 
for (const filename of fs.readdirSync(monsterDirectory)) {
  const monster = require(path.join('./monsters/', filename));
  monsters[monster.number] = monster;
}

module.exports = monsters;