const routes = require('./routes');

const get = 'get';
const post = 'post';

/** @type {!Map<string, {method: string, controller: object}}> */
const controllers = new Map([
  [routes.get.HOME_PAGE, createControllerValue(get, 'home-page')],
  [routes.get.LOGIN_PAGE, createControllerValue(get, 'login-page')],
  [routes.get.CREATE_ACCOUNT_PAGE, createControllerValue(get, 'create-account-page')],
  [routes.get.LOGOUT, createControllerValue(get, 'logout')],
  [routes.post.LOGIN, createControllerValue(post, 'login')],
  [routes.post.CREATE_ACCOUNT, createControllerValue(post, 'create-account')],
  [routes.get.STARTER_PAGE, createControllerValue(get, 'starter-page')],
  [routes.get.BASE_PAGE, createControllerValue(get, 'base-page')],
  [routes.post.CHOOSE_STARTER, createControllerValue(post, 'choose-starter')],
]);

function getController(name) {
  return require('./controllers/' + name);
}

function createControllerValue(method, name) {
  return {
    method,
    controller: getController(name),
  };
}

function registerControllers(app) {
  for (const [path, controllerValue] of controllers.entries()) {
    app[controllerValue.method](path, controllerValue.controller);
  }
}

module.exports = {
  controllers,
  registerControllers,
};
