module.exports = {
  CREATE_ACCOUNT: controller('create-account'),
  LOGIN: controller('login'),
  LOGOUT: controller('logout'),
  PLAY: controller('play'),
};

function controller(moduleName) {
  return {
    path: '/' + moduleName,
    requireHandler: () => require('./controllers/' + moduleName),
  };
}
