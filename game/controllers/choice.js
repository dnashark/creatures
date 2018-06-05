const fs = require('fs');

const Choice = require('../../framework/choice');
const controllers = require('../../controllers');

const CHOICES = createChoiceList();

module.exports = async function(req, res) {
  if (req.player.activeChoice) {
    const choice = CHOICES[req.player.activeChoice];
    if (!choice) {
      console.log('missing choice: ' + req.player.activeChoice);
      // TODO: Do something sane when we have a missing active choice
      res.status(500).end();
      return;
    }

    await choice.handleRequest(req, res);
  } else {
    res.redirect(controllers.MAP.path);
  }
};

function createChoiceList() {
  const choices = {};

  const directory = __dirname + '/../choices/';
  for (const filename of fs.readdirSync(directory)) {
    const module = require('../choices/' + filename);
    
    const loadChoice = (choice) => {
      if (!choice.name) throw new Error('Choice does not have a name.');
      if (choices[choice.name]) throw new Error('Trying to use existing choice name: ' + choice.name);
      choices[choice.name] = choice
    };

    if (module instanceof Choice) {
      loadChoice(module);
    } else {
      for (const key of Object.keys(module)) {
        loadChoice(module[key]);
      }
    }
  }

  return choices;
}

