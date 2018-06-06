const controllers = require('../controllers');
const template = require('../framework/template');

class Transition {
  /**
   * @param {{event: {title: string, paragraphs: !Array<string>, handler: function}, next: ?Choice}} args
   */
  constructor(args) {
    /** @private */
    this.eventData_ = args.event && {
      template: constructEventTemplate(args.event.title, args.event.paragraphs, args.next),
      handler: args.event.handler,
    };

    /** @private */
    this.next_ = args.next;
  }

  async handleRequest(req, res) {
    if (this.next_) {
      req.player.activeChoice = this.next_.name;
    } else if (req.player.activeChoice) {
      req.player.activeChoice = null;
    }

    const respond = await (async () => {
      if (this.eventData_) {
        const model = this.eventData_.handler && await this.eventData_.handler(req);
        return () => res.send(this.eventData_.template.apply(model));
      } else if (this.next_) {
        return () => this.next_.handlePage(req, res);
      } else {
        return () => res.redirect(controllers.MAP.path);
      }
    })();

    await req.player.save();
    respond();
  }
}

function constructEventTemplate(title, paragraphs, next) {
  let content = '<h1>' + title + '</h1>'
  for (const paragraph of paragraphs) {
    content += '<p>' + paragraph + '</p>';
  }
  if (next) {
    content += '<p><a href="@{CHOICE}">Continue...</a></p>';
  } else {
    content += '<p><a href="@{MAP}">Return to the map...</a></p>';
  }

  return new template.StringTemplate(content);
}

module.exports = Transition;
