const ids = {
  STARTER_MONSTER: 1,
  HEALING_CENTER_MENU: 2,
};

let getChoices = [];
getChoices[ids.STARTER_MONSTER] = () => require('./game/choices/starter-monster');
getChoices[ids.HEALING_CENTER_MENU] = () => require('./game/choices/healing-center-menu');

let choices;
module.exports = {
  ids,
  get: function(id) { return choices[id]; },
  init: function() {
    if (getChoices) {
      choices = getChoices.map(getter => getter && getter());
      getChoices = null;
    }
  },
};
