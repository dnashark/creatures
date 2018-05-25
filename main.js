const cookieSession = require('cookie-session');
const express = require('express');
const mongoose = require('mongoose');

const authentication = require('./middleware/authentication');
const accountCreationController = require('./web/controllers/account-creation');
const createAccountController = require('./web/controllers/create-account');
const logInController = require('./web/controllers/log-in');
const logOutController = require('./web/controllers/log-out');

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

registerController(app, accountCreationController);
registerController(app, createAccountController);
registerController(app, logInController);
registerController(app, logOutController);

app.use(authentication);

app.get('*', function(req, res) {
    res.send('<a href="/logOut">log out</a>');
});

app.listen(8080);

function registerController(app, controller) {
    app[controller.method.toLowerCase()](controller.path, controller.handle);
}
