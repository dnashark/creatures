const battleHandler = require('./battle-handler');
const choiceRegistrar = require('../choice-registrar');
const controllers = require('../controllers');
const template = require('./template');

module.exports = class Adventure {
  constructor(args) {
    if (!args.event && !args.choiceId && !args.battleGenerator) throw new Error('empty adventure');
    if (args.choiceId && args.battleGenerator) throw new Error('either choice or battle');

    this.event_ = args.event;
    this.choiceId_ = args.choiceId;
    this.battleGenerator_ = args.battleGenerator;
  }

  async handler(req) {
    req.player.activeChoice = this.choiceId_ || null;
    req.player.activeBattle = this.battleGenerator_ ? {} : null;

    if (this.event_) {
      return await this.handleEvent_(req.player);
    } else if (this.choiceId_) {
      return choiceRegistrar.get(this.choiceId_).pageHandler();
    } else {
      return battleHandler.render(req.player);
    }
  }

  async handleEvent_(player) {
    let content = await this.event_.handler(player);
    if (this.choiceId_ || this.battleGenerator_) {
      content += '<p><a href="' + controllers.CHOICE.path + '">Continue...</a></p>';
    } else {
      content += '<p><a href="' + controllers.MAP.path + '">Return to map...</a></p>'
    }
    return content;
  }
}
