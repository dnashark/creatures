const PlayerModel = require('../../models/player');

const error = require('../enums/log-in-errors');

module.exports = {
  path: '/logIn',
  method: 'POST',
  handle: async (req, res) => {
    let player = null;
    try {
      player = await PlayerModel.findOne({name: req.body.username});
    } catch (e) {
      console.log(e);
      res.redirect('/?err=' + error.UNKNOWN);
      return;
    }

    if (!player || player.password != req.body.password) {
      res.redirect('/?err=' + error.WRONG_USERNAME_OR_PASSWORD);
    } else {
      res.redirect('/');
    }
  },
};
