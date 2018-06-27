const moveIds = {
  CLAW: 1,
  WHIP: 2,
};

const moves = [];
for (const move of Object.keys(moveIds)) {
  const number = moveIds[move];
  moves[number] = require('./moves/' + move.toLowerCase().replace(/_/g, '-'));
}

module.exports = {
  moveIds,
  moves,
};