const choices = {
  STARTER_MONSTER: create(1, 'starter-monster'), 
};

function create(number, moduleName) {
  return {
    number,
    moduleName,
  };
}

const prototype = {};
prototype.init = function() {
  for (key of Object.keys(this)) {
    const value = this[key];
    value.module = require('./game/choices/' + value.moduleName);
    delete value.moduleName;
  }
};

Object.setPrototypeOf(choices, prototype);

module.exports = choices;
