const cookieSession = require('cookie-session');
const express = require('express');
const mongoose = require('mongoose');

const controllers = require('./web/controllers');
const routes = require('./web/routes');
const redirector = require('./web/middleware/redirector');

const PlayerModel = require('./models/player');

const app = express();

// TODO: configurable
mongoose.connect('mongodb://localhost/creatures');

// TODO: Use a configurable secret!
app.use(cookieSession({
    secret: 'TODO: Set a secret here!',
    maxAge:  30 * 60 * 1000,
}));

app.use(express.urlencoded({extended: false}));
app.use(redirector);
controllers.registerControllers(app);
app.use(function(req, res) {
    res.redirect(routes.get.BASE_PAGE);
});

app.listen(8080);
