const express = require('express');
const mongoose = require('mongoose');

const activeScenarioRedirector = require('./middleware/active-scenario-redirector');
const authenticatedRedirector = require('./middleware/authenticated-redirector');
const backstopRedirector = require('./middleware/backstop-redirector');
const controllers = require('./controllers');
const operationPerformer = require('./middleware/operation-performer');
const playerModelAnnotator = require('./middleware/player-model-annotater');

// TODO: configurable
mongoose.connect('mongodb://localhost/creatures');
const app = express();

// TODO: Re-enable favicon when we have something
app.get('/favicon.ico', function(req, res) { res.status(404).end(); });

setupMiddleware(app);
app.use(authenticatedRedirector);
app.use(playerModelAnnotator);
app.use(operationPerformer);
app.use(activeScenarioRedirector);
register(app, controllers);
app.use(backstopRedirector);

app.listen(8080);


function setupMiddleware(app) {
  const GameSession = require('./framework/game-session');

  // Enable sessions for login tracking.
  // TODO: Use a configurable secret!
  app.use(GameSession.middleware);

  // Enable decoding body parameters.
  app.use(express.urlencoded({extended: false}));
}

function register(app, controllers) {
  for (key of Object.keys(controllers)) {
    const controller = controllers[key];
    app.all(controller.path, controller.requireHandler());
  }
}
