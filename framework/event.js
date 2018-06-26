const contentUtil = require('./content-util');
const template = require('./template');

module.exports = class Event {
  constructor(args) {
    this.template_ = new template.StringTemplate(contentUtil.create({title: args.title, paragraphs: args.paragraphs}));
    this.handler_ = args.handler;
  }

  async handler(player) {
    const model = this.handler_ && await this.handler_(player);
    return this.template_.apply(model);
  }
};
