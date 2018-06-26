const choiceRegistrar = require('../choice-registrar');
const controllers = require('../controllers');
const template = require('./template');

module.exports = class Adventure {
  constructor(args) {
    if (!args.event && !args.choiceId) throw new Error('empty adventure');

    this.event_ = args.event;
    this.choiceId_ = args.choiceId;
  }

  async handler(req) {
    if (this.choiceId_) {
      req.player.activeChoice = this.choiceId_;
    } else {
      req.player.activeChoice = null;
    }

    if (this.event_) {
      return await this.handleEvent_(req.player);
    } else {
      return choiceRegistrar.get(this.choiceId_).pageHandler();
    }
  }

  async handleEvent_(player) {
    let content = await this.event_.handler(player);
    if (this.choiceId_) {
      content += '<p><a href="' + controllers.CHOICE.path + '">Continue...</a></p>';
    } else {
      content += '<p><a href="' + controllers.MAP.path + '">Return to map...</a></p>'
    }
    return content;
  }
}
