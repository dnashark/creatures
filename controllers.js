module.exports = {
  CREATE_ACCOUNT: outerController('create-account'),
  LOGIN: outerController('login'),
  LOGOUT: outerController('logout'),
  PLAY: outerController('play'),

  MAP: gameController('map'),
  FARM_TOWN: gameController('farm-town'),
  DR_APPLES_LAB: gameController('dr-apples-lab'),
};

function outerController(moduleName) {
  return {
    path: '/' + moduleName,
    requireHandler: () => require('./outer/controllers/' + moduleName),
  };
}

function gameController(moduleName) {
  return {
    path: '/game/' + moduleName,
    requireHandler: () => require('./game/controllers/' + moduleName),
  };
}
