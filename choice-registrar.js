const ids = {
  STARTER_MONSTER: 1,
};

let getChoices = [];
getChoices[ids.STARTER_MONSTER] = () => require('./game/choices/starter-monster');

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
