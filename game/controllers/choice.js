const choiceRegistrar = require('../../choice-registrar');
const controllers = require('../../controllers');

module.exports = async function(req, res) {
  if (req.player.activeChoice) {
    const choice = choiceRegistrar.get(req.player.activeChoice);
    if (!choice) {
      console.log('missing choice: ' + req.player.activeChoice);
      // TODO: Do something sane when we have a missing active choice
      res.status(500).end();
      return;
    }

    const content = await choice.handler(req);
    await req.player.save();
    res.send(content);
  } else {
    res.redirect(controllers.MAP.path);
  }
};
