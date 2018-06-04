module.exports = {
  MAP: controller('map'),
};

function controller(moduleName) {
  return {
    path: '/game/' + moduleName,
    requireHandler: () => require('./controllers/' + moduleName),
  };
}
