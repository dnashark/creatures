const routes = require('./routes');

module.exports = function(app) {
  const get = 'get', post = 'post';
  function register(method, route, name) {
    app[method](route, require('./controllers/' + name));
  }

  register(get, routes.get.HOME_PAGE, 'home-page');
  register(get, routes.get.LOGIN_PAGE, 'login-page');
  register(get, routes.get.CREATE_ACCOUNT_PAGE, 'create-account-page');
  register(get, routes.get.LOGOUT, 'logout');

  register(post, routes.post.LOGIN, 'login');
  register(post, routes.post.CREATE_ACCOUNT, 'create-account');
};
