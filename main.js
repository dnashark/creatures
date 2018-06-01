const express = require('express');
const mongoose = require('mongoose');

// TODO: configurable
mongoose.connect('mongodb://localhost/creatures');
const app = express();

setupMiddleware(app);
setupOuterShell(app);

app.listen(8080);


/** @param {express} app */
function setupMiddleware(app) {
  const GameSession = require('./framework/game-session');

  // Enable sessions for login tracking.
  // TODO: Use a configurable secret!
  app.use(GameSession.middleware);

  // Enable decoding body parameters.
  app.use(express.urlencoded({extended: false}));
}

/** @param {express} app */
function setupOuterShell(app) {
  const Controller = require('./framework/controller');
  const backstopRedirector = require('./outer/middleware/backstop-redirector');

  Controller.register(app, [
    require('./outer/controllers/login'),
    require('./outer/controllers/create-account'),
    require('./outer/controllers/play'),
    require('./outer/controllers/logout'),
  ]);

  app.use(backstopRedirector);
}