const cookieSession = require('cookie-session');
const express = require('express');
const mongoose = require('mongoose');

const authentication = require('./middleware/authentication');
const createAccountView = require('./web/views/create-account');

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

app.get('/accountCreation', function(req, res) {
    res.send(createAccountView.render());
});

app.post('/createAccount', async function(req, res) {
    // TODO: Sanitize input
    let player = null;
    try {
        player = await PlayerModel.create({
            name: req.body.username,
            password: req.body.password,
        });
    } catch(e) {
        console.log(e);
    }
    if (player) {
        req.session.userId = player._id;
    }
    res.redirect('/');
});

app.post('/logIn', async function(req, res) {
    let player = null;
    try {
        player = await PlayerModel.findOne({name: req.body.username});
        if (player && player.password != req.body.password) {
            player = null;
        }
    } catch (e) {
        console.log(e);
    }
    if (player) {
        req.session.userId = player._id;
    }
    res.redirect('/');
});

app.get('/logOut', function(req, res) {
    req.session = null;
    res.redirect('/');
})

app.use(authentication);

app.get('*', function(req, res) {
    res.send('<a href="/logOut">log out</a>');
});

app.listen(8080);
