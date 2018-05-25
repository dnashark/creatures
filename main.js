const cookieSession = require('cookie-session');
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./web/routes');
const registerControllers = require('./web/register-controllers');

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

registerControllers(app);

app.get('*', function(req, res) {
    res.send('<a href="' + routes.get.LOGOUT + '">log out</a>');
});

app.listen(8080);

function registerController(app, controller) {
    app[controller.method.toLowerCase()](controller.path, controller.handle);
}
