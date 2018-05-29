const routes = require('./routes');

const scenarios = {
  STARTER: 'start',
}

const scenarioRoutes = new Set();
const scenarioRouteMap = new Map();

addScenarioRoute(scenarios.STARTER, routes.get.STARTER_PAGE);

function addScenarioRoute(scenario, route) {
  scenarioRoutes.add(route);
  scenarioRouteMap.set(scenario, route);
}

module.exports = {
  scenarios,
  routes: scenarioRoutes,
  scenarioRouteMap,
};
