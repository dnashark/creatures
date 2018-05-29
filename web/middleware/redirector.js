const controllers = require('../controllers');
const routes = require('../routes');
const scenarios = require('../scenarios');
const util = require('../util');

const PlayerModel = require('../../models/player');

const LOGGED_OUT_WHITELIST = new Set([
  routes.get.HOME_PAGE,
  routes.get.LOGIN_PAGE,
  routes.post.LOGIN,
  routes.get.CREATE_ACCOUNT_PAGE,
  routes.post.CREATE_ACCOUNT,
]);

module.exports = async function(req, res, next) {
  if (!util.isLoggedIn(req)) {
    if (LOGGED_OUT_WHITELIST.has(req.path)) {
      next();
    } else {
      res.redirect(routes.get.HOME_PAGE);
    }
  } else {
    req.player = await PlayerModel.findById(util.getUserId(req));
    if (!req.player) {
      util.logout(req);
      res.redirect(routes.get.HOME_PAGE);
    } else if (req.path == routes.get.LOGOUT) {
      next();
    } else if (LOGGED_OUT_WHITELIST.has(req.path)) {
      if (req.player.scenario) {
        res.redirect(scenarios.routeScenarioMap.get(req.player.scenario));
      } else {
        res.redirect(routes.get.BASE_PAGE);
      }
    } else if (req.player.scenario) {
      const scenarioPath = scenarios.scenarioRouteMap.get(req.player.scenario);
      if (scenarioPath != req.path) {
        res.redirect(scenarioPath);
      } else {
        next();
      }
    } else if (scenarios.routes.contains(req.path)) {
      res.redirect(routes.get.BASE_PAGE);
    } else {
      next();
    }
  }
};
