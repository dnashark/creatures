const template = require('./template');

class Choice {
  /**
   * @param {string} name
   * @param {string} title
   * @param {!Array<!string>} paragraphs 
   * @param {!Array<!Option>} options 
   */
  constructor(name, title, paragraphs, options) {
    this.name_ = name;
    this.template_ = constructTemplate(title, paragraphs, options);
    this.optionNamesToTransitions_ = {};
    for (const option of options) {
      this.optionNamesToTransitions_[option.name] = option.transition;
    }
  }

  get name() { return this.name_; }

  handlePage(req, res) {
    res.send(this.template_.apply());
  }

  async handleRequest(req, res) {
    let transition;
    if (req.method == 'POST' && req.body.option && (transition = this.optionNamesToTransitions_[req.body.option])) {
      await transition.handleRequest(req, res);
    } else {
      this.handlePage(req, res);
    }
  }
}

Choice.Option = class {
  constructor(name, description, transition) {
    this.name = name;
    this.description = description;
    this.transition = transition;
  }
}

/**
 * @param {string} title
 * @param {!Array<!string>} paragraphs
 * @param {!Array<!Option>} options
 */
function constructTemplate(title, paragraphs, options) {
  let content = '<h1>' + title + '</h1>'
  for (const paragraph of paragraphs) {
    content += '<p>' + paragraph + '</p>';
  }
  for (const option of options) {
    content += (
      '<form action="@{CHOICE}" method=POST>' +
        '<input type="hidden" name="option" value="' + option.name + '">' +
        '<input type="submit" value="' + option.description + '">' +
      '</form>'
    );
  }

  return new template.StringTemplate(content);
}


module.exports = Choice;
