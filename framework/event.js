const template = require('./template');

/**
 * @callback EventLogicCallback
 * @param {*} req
 * @returns {!Promise<Object>}
 */

const PAGE_TEMPLATE = new template.FileTemplate(require.resolve('./event.html'));

class Event {
  /**
   * @param {string} title 
   * @param {!Array<!string>} paragraphs 
   * @param {EventLogicCallback=} logic 
   */
  constructor(title, paragraphs, logic) {
    /** @private */
    this.template_ = constructTemplate(title, paragraphs);
    /** @private */
    this.logic_ = logic;
  }

  async handle(req, res) {
    const model = this.logic_ && await this.logic_(req);
    const content = this.template_.apply(model);
    res.send(PAGE_TEMPLATE.apply({CONTENT: content}));
  }
}

/**
 * @param {string} title
 * @param {!Array<!string>} paragraphs
 */
function constructTemplate(title, paragraphs) {
  let content = '<h1>' + title + '</h1>'
  for (const paragraph of paragraphs) {
    content += '<p>' + paragraph + '</p>';
  }

  return new template.StringTemplate(content);
}

module.exports = Event;
