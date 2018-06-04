const express = require('express');
const mongoose = require('mongoose');

const authenticatedRedirector = require('./middleware/authenticated-redirector');
const backstopRedirector = require('./middleware/backstop-redirector');
const controllers = require('./controllers');

// TODO: configurable
mongoose.connect('mongodb://localhost/creatures');
const app = express();

setupMiddleware(app);
app.use(authenticatedRedirector);
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
