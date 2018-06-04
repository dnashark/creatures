const cookieSession = require('cookie-session');

// TODO: Need a configurable duration.
const DURATION = 1000 * 60 * 30;

// TODO: Need an actual configurable secret.
const SECRET = 'Secret goes here.';

module.exports = class GameSession {
  constructor(req) {
    this.req_ = req;
  }

  login(playerId) {
    this.req_.session.playerId = playerId;
    this.renew();
  }

  renew() {
    this.req_.session.minute = Math.floor(Date.now() / (1000 * 60));
  }

  logout() {
    this.req_.session = null;
  }

  get isLoggedIn() { return !!this.req_.session.playerId; }

  get playerId() { return this.req_.session.playerId; }

  static get middleware() {
    const cookieSessionMiddleware = cookieSession({
      maxAge: DURATION,
      secret: SECRET,
    });

    return function(req, res, next) {
      cookieSessionMiddleware(req, res, function() {});
      req.gameSession = new GameSession(req);
      next();
    };
  }
};
