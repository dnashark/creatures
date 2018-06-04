module.exports = {
  MAP: controller('map'),
  FARM_TOWN: controller('farm-town'),
  DR_APPLES_LAB: controller('dr-apples-lab'),
};

function controller(moduleName) {
  return {
    path: '/game/' + moduleName,
    requireHandler: () => require('./controllers/' + moduleName),
  };
}
