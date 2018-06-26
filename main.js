const express = require('express');
const mongoose = require('mongoose');

const forcedSceneRedirector = require('./middleware/forced-scene-redirector');
const authenticatedRedirector = require('./middleware/authenticated-redirector');
const backstopRedirector = require('./middleware/backstop-redirector');
const choiceRegistrar = require('./choice-registrar');
const controllers = require('./controllers');
const playerModelAnnotator = require('./middleware/player-model-annotater');

// TODO: configurable
mongoose.connect('mongodb://localhost/creatures');
const app = express();

// TODO: Re-enable favicon when we have something
app.get('/favicon.ico', function(req, res) { res.status(404).end(); });

choiceRegistrar.init();

setupMiddleware(app);
app.use(authenticatedRedirector);
app.use(playerModelAnnotator);
app.use(forcedSceneRedirector);
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
