const controllers = require('../controllers');
const template = require('../framework/template');

class Transition {
  /**
   * @param {?Transition.Event} event
   * @param {?Choice} next
   */
  constructor(event, next) {
    /** @private */
    this.eventData_ = event && {
      template: constructEventTemplate(event.title, event.paragraphs, next),
      handler: event.handler,
    };

    /** @private */
    this.next_ = next;
  }

  async handleRequest(req, res) {
    if (this.next_) {
      req.player.activeChoice = this.next_.name;
    } else if (req.player.activeChoice) {
      req.player.activeChoice = null;
    }

    const respond = (() => {
      if (this.eventData_) {
        const model = this.eventData_.handler && this.eventData_.handler(req);
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

Transition.Event = class {
  constructor(title, paragraphs, handler) {
    this.title = title;
    this.paragraphs = paragraphs.slice();
    this.handler = handler;
  }
}

module.exports = Transition;
