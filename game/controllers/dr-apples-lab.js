const events = require('../events');

module.exports = (req, res) => events.DR_APPLE_WELCOME.handle(req, res);
